// Global State
let appData = JSON.parse(JSON.stringify(defaultData));
let currentStep = 1;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupUploadHandlers();
    setupSkillInput();
    addExperienceField();
    addEducationField();
    setupTabSwitching();
    setupNavigation();
    setupMobileMenu();
});

// Navigation
function setupNavigation() {
    const links = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile Menu
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.flexDirection = 'column';
        navLinks.style.background = 'white';
        navLinks.style.padding = '2rem';
        navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    });
}

// Step Navigation
function nextStep(step) {
    if (step === 2 && currentStep === 1) {
        if (!validateStep1()) return;
        collectFormData();
    }
    
    document.querySelectorAll('.step-content').forEach(el => el.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');
    
    document.querySelectorAll('.step').forEach(el => {
        el.classList.remove('active');
        if (parseInt(el.dataset.step) === step) {
            el.classList.add('active');
        }
    });
    
    currentStep = step;
    window.scrollTo({ top: document.getElementById('ats-builder').offsetTop, behavior: 'smooth' });
}

function validateStep1() {
    const required = ['fullName', 'jobTitle', 'email'];
    for (let id of required) {
        if (!document.getElementById(id).value.trim()) {
            alert(`Please fill in ${id}`);
            return false;
        }
    }
    return true;
}

function collectFormData() {
    appData.personal = {
        fullName: document.getElementById('fullName').value.trim(),
        jobTitle: document.getElementById('jobTitle').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        location: document.getElementById('location').value.trim(),
        linkedin: document.getElementById('linkedin').value.trim()
    };
    appData.summary = document.getElementById('summary').value.trim();
    appData.skills = JSON.parse(document.getElementById('skillsData').value || '[]');
    
    appData.experience = [];
    document.querySelectorAll('.experience-item').forEach(item => {
        if (item.querySelector('.job-title').value.trim()) {
            appData.experience.push({
                role: item.querySelector('.job-title').value.trim(),
                company: item.querySelector('.company').value.trim(),
                date: item.querySelector('.job-date').value.trim(),
                details: item.querySelector('.job-details').value.trim()
            });
        }
    });
    
    appData.education = [];
    document.querySelectorAll('.education-item').forEach(item => {
        if (item.querySelector('.degree').value.trim()) {
            appData.education.push({
                degree: item.querySelector('.degree').value.trim(),
                school: item.querySelector('.school').value.trim(),
                year: item.querySelector('.edu-date').value.trim()
            });
        }
    });
}

// File Upload
function setupUploadHandlers() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    
    dropZone.addEventListener('click', () => fileInput.click());
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
    });
    
    dropZone.addEventListener('drop', (e) => {
        if (e.dataTransfer.files.length) handleFileSelect(e.dataTransfer.files[0]);
    }, false);
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) handleFileSelect(e.target.files[0]);
    });
}

async function handleFileSelect(file) {
    const fileInfo = document.getElementById('fileInfo');
    fileInfo.textContent = `Parsing ${file.name}...`;
    
    try {
        let text = '';
        if (file.type === 'text/plain') {
            text = await file.text();
        } else if (file.type === 'application/pdf') {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                text += (await page.getTextContent()).items.map(item => item.str).join(' ');
            }
        } else if (file.type.includes('wordprocessingml')) {
            const arrayBuffer = await file.arrayBuffer();
            text = (await mammoth.extractRawText({ arrayBuffer })).value;
        }
        
        const parsed = parseResumeText(text);
        document.getElementById('extractedPreview').innerHTML = 
            `<p><strong>Name:</strong> ${parsed.personal.fullName || 'Not found'}</p>
             <p><strong>Email:</strong> ${parsed.personal.email || 'Not found'}</p>
             <p><strong>Skills:</strong> ${parsed.skills.join(', ') || 'None detected'}</p>`;
        
        document.getElementById('uploadResult').style.display = 'block';
        window.extractedData = parsed;
        fileInfo.textContent = `✓ ${file.name}`;
    } catch (error) {
        fileInfo.textContent = 'Error parsing file';
        console.error(error);
    }
}

function parseResumeText(text) {
    const data = { ...defaultData };
    const emailMatch = text.match(PARSING_RULES.patterns.email);
    if (emailMatch) data.personal.email = emailMatch[0];
    
    const phoneMatch = text.match(PARSING_RULES.patterns.phone);
    if (phoneMatch) data.personal.phone = phoneMatch[0];
    
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length > 0) data.personal.fullName = lines[0].trim();
    
    const lowerText = text.toLowerCase();
    data.skills = PARSING_RULES.knownSkills.filter(skill => 
        lowerText.includes(skill.toLowerCase())
    ).slice(0, 10);
    
    data.summary = text.substring(0, 300) + '...';
    return data;
}

function confirmUpload() {
    if (!window.extractedData) return;
    const d = window.extractedData;
    if (d.personal.fullName) document.getElementById('fullName').value = d.personal.fullName;
    if (d.personal.email) document.getElementById('email').value = d.personal.email;
    if (d.personal.phone) document.getElementById('phone').value = d.personal.phone;
    if (d.summary) document.getElementById('summary').value = d.summary;
    if (d.skills.length) {
        document.getElementById('skillsData').value = JSON.stringify(d.skills);
        d.skills.forEach(s => renderSkillTag(s));
    }
    document.getElementById('uploadSection').style.display = 'none';
    document.getElementById('manualForm').style.display = 'block';
}

function resetUpload() {
    document.getElementById('uploadResult').style.display = 'none';
    document.getElementById('fileInput').value = '';
    document.getElementById('fileInfo').textContent = '';
}

function skipUpload() {
    document.getElementById('uploadSection').style.display = 'none';
    document.getElementById('manualForm').style.display = 'block';
}

// Skills
function setupSkillInput() {
    const input = document.getElementById('skillInput');
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
            e.preventDefault();
            const skill = input.value.trim();
            let skills = JSON.parse(document.getElementById('skillsData').value || '[]');
            if (!skills.includes(skill)) {
                skills.push(skill);
                document.getElementById('skillsData').value = JSON.stringify(skills);
                renderSkillTag(skill);
            }
            input.value = '';
        }
    });
}

function renderSkillTag(skill) {
    const container = document.getElementById('skillsList');
    const tag = document.createElement('div');
    tag.className = 'skill-tag';
    tag.innerHTML = `${skill} <button onclick="this.parentElement.remove()">×</button>`;
    container.appendChild(tag);
}

// Dynamic Fields
function addExperienceField() {
    const template = document.getElementById('experienceTemplate');
    document.getElementById('experienceList').appendChild(template.content.cloneNode(true));
}

function addEducationField() {
    const template = document.getElementById('educationTemplate');
    document.getElementById('educationList').appendChild(template.content.cloneNode(true));
}

function removeField(btn) {
    btn.parentElement.remove();
}

// Job Analysis
function analyzeAndGenerate() {
    const jd = document.getElementById('jobDescription').value.trim();
    if (jd.length < 50) {
        alert('Please paste a complete job description');
        return;
    }
    
    appData.jobDescription = jd;
    const keywords = extractKeywords(jd);
    appData.matchedKeywords = keywords;
    
    const userSkills = appData.skills.map(s => s.toLowerCase());
    const matched = keywords.filter(k => userSkills.some(us => us.includes(k)));
    const score = keywords.length ? Math.round((matched.length / keywords.length) * 100) : 0;
    
    document.getElementById('analysisResult').style.display = 'block';
    document.getElementById('matchScore').textContent = score;
    
    const container = document.getElementById('keywordTags');
    container.innerHTML = '';
    keywords.forEach(kw => {
        const tag = document.createElement('div');
        tag.className = 'skill-tag';
        tag.style.background = matched.includes(kw) ? '#dcfce7' : '#fef3c7';
        tag.textContent = kw;
        container.appendChild(tag);
    });
    
    generateResume();
    generateCV();
    nextStep(3);
}

function extractKeywords(text) {
    const clean = text.toLowerCase().replace(/[^\w\s]/g, ' ');
    const words = clean.split(' ').filter(w => w.length > 4);
    const stopWords = new Set(['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was', 'one', 'our', 'out', 'has', 'have', 'been', 'were', 'they', 'this', 'that', 'with']);
    const candidates = words.filter(w => !stopWords.has(w));
    
    const allKeywords = Object.values(ATS_KEYWORDS).flat();
    const matches = allKeywords.filter(kw => clean.includes(kw));
    
    const freq = {};
    candidates.forEach(w => freq[w] = (freq[w] || 0) + 1);
    const frequent = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([w]) => w);
    
    return [...new Set([...matches, ...frequent])].slice(0, 15);
}

// Document Generation
function generateResume() {
    const d = appData;
    let html = RESUME_TEMPLATE.header
        .replace('{{fullName}}', d.personal.fullName)
        .replace('{{jobTitle}}', d.personal.jobTitle)
        .replace('{{email}}', d.personal.email)
        .replace('{{phone}}', d.personal.phone)
        .replace('{{location}}', d.personal.location)
        .replace('{{linkedin}}', d.personal.linkedin);
    
    html += RESUME_TEMPLATE.summary.replace('{{summary}}', d.summary);
    html += RESUME_TEMPLATE.skills.replace('{{skills}}', d.skills.join(', '));
    
    let expHTML = '';
    d.experience.forEach(job => {
        expHTML += `<div class="job-item">
            <div style="display:flex;justify-content:space-between;font-weight:bold">
                <span>${job.role}</span><span>${job.date}</span>
            </div>
            <div style="font-style:italic">${job.company}</div>
            <p class="job-details">${job.details}</p>
        </div>`;
    });
    html += RESUME_TEMPLATE.experience.replace('{{experienceItems}}', expHTML);
    
    let eduHTML = '';
    d.education.forEach(edu => {
        eduHTML += `<div class="job-item">
            <div style="display:flex;justify-content:space-between;font-weight:bold">
                <span>${edu.degree}</span><span>${edu.year}</span>
            </div>
            <div style="font-style:italic">${edu.school}</div>
        </div>`;
    });
    html += RESUME_TEMPLATE.education.replace('{{educationItems}}', eduHTML);
    
    document.getElementById('resumeDocument').innerHTML = html;
}

function generateCV() {
    const d = appData;
    let html = CV_TEMPLATE.header
        .replace('{{fullName}}', d.personal.fullName)
        .replace('{{jobTitle}}', d.personal.jobTitle)
        .replace('{{email}}', d.personal.email)
        .replace('{{phone}}', d.personal.phone)
        .replace('{{location}}', d.personal.location)
        .replace('{{linkedin}}', d.personal.linkedin);
    
    html += CV_TEMPLATE.summary.replace('{{summary}}', d.summary);
    html += CV_TEMPLATE.skills.replace('{{skills}}', d.skills.join(', '));
    
    let expHTML = '';
    d.experience.forEach(job => {
        expHTML += `<div class="job-item">
            <div style="display:flex;justify-content:space-between;font-weight:bold">
                <span>${job.role}</span><span>${job.date}</span>
            </div>
            <div style="font-style:italic">${job.company}</div>
            <p class="job-details">${job.details}</p>
        </div>`;
    });
    html += CV_TEMPLATE.experience.replace('{{experienceItems}}', expHTML);
    
    let eduHTML = '';
    d.education.forEach(edu => {
        eduHTML += `<div class="job-item">
            <div style="display:flex;justify-content:space-between;font-weight:bold">
                <span>${edu.degree}</span><span>${edu.year}</span>
            </div>
            <div style="font-style:italic">${edu.school}</div>
        </div>`;
    });
    html += CV_TEMPLATE.education.replace('{{educationItems}}', eduHTML);
    
    document.getElementById('cvDocument').innerHTML = html;
}

// Tabs
function setupTabSwitching() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.preview-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`${btn.dataset.tab}Preview`).classList.add('active');
        });
    });
}

// PDF Download
function downloadPDF(type) {
    const element = document.getElementById(type === 'resume' ? 'resumeDocument' : 'cvDocument');
    const name = appData.personal.fullName.replace(/\s+/g, '_') || 'Resume';
    
    const opt = {
        margin: 0,
        filename: `${name}_${type}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
}
