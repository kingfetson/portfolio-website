// ATS Keywords by Industry
const ATS_KEYWORDS = {
    tech: ['javascript', 'python', 'react', 'node.js', 'aws', 'docker', 'agile', 'scrum', 'sql', 'api', 'git'],
    design: ['figma', 'adobe xd', 'sketch', 'ui/ux', 'wireframing', 'prototyping', 'user research', 'design system'],
    marketing: ['seo', 'sem', 'google analytics', 'content strategy', 'social media', 'campaign management', 'crm'],
    general: ['leadership', 'communication', 'project management', 'problem solving', 'team collaboration', 'time management']
};

// Parsing Rules
const PARSING_RULES = {
    patterns: {
        email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
        phone: /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g,
        linkedin: /linkedin\.com\/in\/[a-zA-Z0-9_-]+/gi,
        sections: {
            experience: /experience|work history|professional experience/i,
            education: /education|qualifications|academic/i,
            skills: /skills|technical skills|expertise/i
        }
    },
    knownSkills: [
        'javascript', 'python', 'java', 'react', 'node.js', 'html', 'css',
        'figma', 'photoshop', 'illustrator', 'sql', 'mongodb', 'aws',
        'leadership', 'communication', 'project management'
    ],
    maxFileSize: 10 * 1024 * 1024
};

// Resume Template
const RESUME_TEMPLATE = {
    header: `
        <div class="doc-header">
            <h1>{{fullName}}</h1>
            <h2>{{jobTitle}}</h2>
            <div class="contact-info">{{email}} | {{phone}} | {{location}} | {{linkedin}}</div>
        </div>
    `,
    summary: `<section class="doc-section"><h3>Professional Summary</h3><p>{{summary}}</p></section>`,
    skills: `<section class="doc-section"><h3>Skills</h3><p>{{skills}}</p></section>`,
    experience: `<section class="doc-section"><h3>Experience</h3>{{experienceItems}}</section>`,
    education: `<section class="doc-section"><h3>Education</h3>{{educationItems}}</section>`
};

// CV Template
const CV_TEMPLATE = {
    header: RESUME_TEMPLATE.header,
    summary: `<section class="doc-section"><h3>Professional Profile</h3><p>{{summary}}</p></section>`,
    skills: `<section class="doc-section"><h3>Technical Skills</h3><p>{{skills}}</p></section>`,
    experience: `<section class="doc-section"><h3>Professional Experience</h3>{{experienceItems}}</section>`,
    education: `<section class="doc-section"><h3>Education</h3>{{educationItems}}</section>`
};

// Default Data
const defaultData = {
    personal: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        location: '',
        linkedin: ''
    },
    summary: '',
    skills: [],
    experience: [],
    education: [],
    jobDescription: '',
    matchedKeywords: []
};
