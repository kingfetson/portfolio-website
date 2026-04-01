# Portfolio & Smart ATS Builder

> A modern, professional portfolio website with an integrated **Smart ATS Resume & CV Builder** - helping job seekers create ATS-optimized resumes in minutes.

![Portfolio Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)

---

## 🌟 Features

### Portfolio Section
- ✅ **Modern Hero Section** - Eye-catching introduction with animated morphing image
- ✅ **About Me** - Professional background with statistics
- ✅ **Skills Showcase** - Interactive skill cards with icons
- ✅ **Project Portfolio** - Display your best work
- ✅ **Contact Form** - Easy client communication
- ✅ **Responsive Design** - Perfect on all devices
- ✅ **Smooth Scrolling** - Elegant navigation experience

### Smart ATS Builder
- ✅ **File Upload** - Upload existing resume (PDF, DOCX, TXT)
- ✅ **Auto-Parsing** - Extract information automatically
- ✅ **Manual Entry** - Fill form if preferred
- ✅ **Job Description Analysis** - Paste job posting for keyword extraction
- ✅ **ATS Match Score** - See how well your resume matches
- ✅ **Keyword Highlighting** - Visual feedback on matched keywords
- ✅ **Dual Output** - Generate both Resume (1-2 pages) and CV (detailed)
- ✅ **PDF Export** - Professional, print-ready documents
- ✅ **100% Client-Side** - Your data never leaves your browser

### Resume & CV Download
- ✅ **Quick Download** - Pre-made resume and CV files
- ✅ **ATS-Optimized** - Format passes Applicant Tracking Systems
- ✅ **Professional Design** - Clean, modern layout

---

## ️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure |
| **CSS3** | Modern styling with CSS Grid & Flexbox |
| **JavaScript (ES6+)** | Interactive functionality |
| **Font Awesome 6** | Professional icons |
| **PDF.js** | PDF text extraction |
| **Mammoth.js** | DOCX file parsing |
| **html2pdf.js** | Client-side PDF generation |

---

## 📦 Installation

### Option 1: Direct Download
1. Download the project files
2. Extract the ZIP file
3. Open `index.html` in your browser

### Option 2: Clone Repository
```bash
git clone https://github.com/yourusername/marlon-portfolio.git
cd marlon-portfolio
```

### Option 3: Use Local Server (Recommended)
```bash
# Using Python
python3 -m http.server 8000

# Using Node.js (http-server)
npx http-server -p 8000

# Visit: http://localhost:8000
```

---

## 📁 Project Structure

```
marlon-portfolio/
│
├── index.html              # Main HTML file
├── style.css               # Complete styling
├── script.js               # All JavaScript functionality
├── config.js               # ATS keywords & configuration
├── README.md               # This file
│
└── assets/                 # (Optional) Images, fonts, etc.
    └── images/
```

---

## 🚀 Usage Guide

### Portfolio Navigation
- Click navigation links to scroll to sections
- Mobile: Use hamburger menu (☰) on small screens
- Social links in hero section and footer

### Using the Smart ATS Builder

#### Step 1: Your Details
**Option A - Upload Resume:**
1. Click "Browse Files" or drag & drop your resume
2. Supported formats: PDF, DOCX, TXT (max 10MB)
3. Review extracted information
4. Click "Use This Data" or "Edit Manually"

**Option B - Manual Entry:**
1. Click "Fill Form Manually"
2. Enter personal information
3. Add skills (type + press Enter)
4. Add work experience and education
5. Click "Next: Job Description"

#### Step 2: Job Description
1. Copy job posting from LinkedIn, Indeed, etc.
2. Paste into the text area
3. Click "Generate Documents"
4. Review:
   - **Keywords Found** - Important terms from job description
   - **ATS Match Score** - Percentage match (aim for 80%+)
   - **Highlighted Keywords** - Green = matched, Yellow = missing

#### Step 3: Preview & Download
1. Toggle between **Resume** and **CV** tabs
2. Review formatted documents
3. Click:
   - **Download Resume PDF** - 1-2 page concise version
   - **Download CV PDF** - Detailed academic/professional version
4. Or use browser Print → Save as PDF

### Downloading Pre-made Resume/CV
1. Scroll to "Resume & CV" section
2. Click "Download Resume" or "Download CV"
3. Files download automatically

---

## 🎨 Customization

### Change Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary: #4169e1;        /* Main blue color */
    --primary-dark: #2d4dbf;   /* Darker shade */
    --secondary: #1e293b;      /* Dark text */
    --text: #64748b;           /* Body text */
    --bg: #f8fafc;             /* Background */
}
```

### Update Personal Information
In `index.html`, find and replace:
```html
<!-- Hero Section -->
<h1>Hi,<br>I'am <span class="highlight">Marlon</span><br>Web Designer</h1>

<!-- Contact Info -->
<p>marlon@example.com</p>
<p>+1 234 567 890</p>
<p>New York, NY</p>

<!-- Social Links -->
<a href="YOUR_LINKEDIN_URL"><i class="fab fa-linkedin-in"></i></a>
<a href="YOUR_GITHUB_URL"><i class="fab fa-github"></i></a>
<a href="YOUR_BEHANCE_URL"><i class="fab fa-behance"></i></a>
```

### Add ATS Keywords
Edit `config.js`:
```javascript
const ATS_KEYWORDS = {
    yourIndustry: ['keyword1', 'keyword2', 'keyword3'],
    // Add more industries as needed
};

PARSING_RULES.knownSkills.push('your-skill', 'another-skill');
```

### Update Projects
In `index.html`, modify the Works section:
```html
<div class="work-card">
    <div class="work-image">
        <img src="your-image.jpg" alt="Project Name">
    </div>
    <div class="work-info">
        <h3>Your Project Title</h3>
        <p>Category/Description</p>
    </div>
</div>
```

---

## 🔧 ATS Builder Configuration

### File Upload Settings
In `config.js`:
```javascript
PARSING_RULES = {
    maxFileSize: 10 * 1024 * 1024,  // 10MB limit
    allowedTypes: [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
    ]
};
```

### PDF Generation Options
In `script.js`, `downloadPDF()` function:
```javascript
const opt = {
    margin: 0,                    // Page margins
    filename: 'Resume.pdf',       // Default filename
    image: { quality: 0.98 },     // Image quality (0-1)
    html2canvas: { scale: 2 },    // Resolution (higher = sharper)
    jsPDF: { 
        format: 'a4',             // Paper size
        orientation: 'portrait'   // Portrait or landscape
    }
};
```

---

## 🌐 Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Opera | 76+ | ✅ Full |

---

## 🔒 Privacy & Security

### Why This is Safe:
- ✅ **No Server Uploads** - All processing happens in your browser
- ✅ **No Data Storage** - Nothing is saved to databases
- ✅ **No Tracking** - No analytics or cookies
- ✅ **Open Source** - Code is transparent and auditable
- ✅ **Works Offline** - After initial load, no internet needed

### Where Your Data Goes:
```
Your File → Browser Memory → Text Extraction → Form Fields → PDF Generation → Download
           ↓
    (Never leaves your computer)
```

---

## 🐛 Troubleshooting

### Common Issues

**"File won't upload"**
- Check file size (max 10MB)
- Ensure file is PDF, DOCX, or TXT format
- Try converting DOC to DOCX or PDF

**"PDF shows garbled text"**
- PDF may be image-based (scanned)
- Use OCR software first or copy-paste text manually
- Try uploading as TXT file

**"Download button doesn't work"**
- Check browser pop-up blocker settings
- Try using browser Print → Save as PDF
- Clear browser cache and reload

**"Keywords not highlighting"**
- Ensure job description is pasted before generating
- Check that keywords exist in your resume content
- Match score below 50% means few matches found

**"Mobile menu not working"**
- Clear browser cache
- Check JavaScript console for errors
- Ensure all files are loaded correctly

### Browser Console Debugging
Press `F12` to open DevTools, then:
```javascript
// View current resume data
console.log(appData);

// View uploaded file data
console.log(extractedData);

// View keyword libraries
console.log(ATS_KEYWORDS);
```

---

## 📝 License

This project is licensed under the **MIT License** - see below for details:

```
MIT License

Copyright (c) 2024 Marlon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Ways to Contribute
1. 🐛 **Report Bugs** - Create an issue with details
2. 💡 **Suggest Features** - Share your ideas
3. 🔧 **Fix Bugs** - Submit a pull request
4. 📝 **Improve Docs** - Enhance this README
5. 🎨 **Design Improvements** - Suggest UI/UX enhancements

### Development Guidelines
```bash
# 1. Fork the repository
# 2. Create feature branch
git checkout -b feature/amazing-feature

# 3. Make changes
# 4. Test thoroughly
# 5. Commit with clear message
git commit -m "Add amazing feature"

# 6. Push and create PR
git push origin feature/amazing-feature
```

### Code Style
- Use 2-space indentation
- Follow existing code structure
- Comment complex logic
- Test on multiple browsers
- Ensure responsive design

---

## 📞 Support

| Channel | Link | Response Time |
|---------|------|---------------|
| **Email** | marlon@example.com | 24-48 hours |
| **GitHub Issues** | Create Issue | 1-3 days |
| **LinkedIn** | linkedin.com/in/marlon | 1-2 days |

### Frequently Asked Questions

**Q: Can I use this commercially?**  
A: Yes! The MIT license allows personal and commercial use.

**Q: Do I need to know coding to use this?**  
A: No! The portfolio is ready to use. Just replace text and images.

**Q: Will my resume data be stored?**  
A: No! Everything happens in your browser. Nothing is saved.

**Q: Can I host this on GitHub Pages?**  
A: Yes! Just push the files to a GitHub repository and enable GitHub Pages.

**Q: Does this work offline?**  
A: After initial load, yes! All processing is client-side.

---

##  ATS Optimization Tips

### What Makes a Resume ATS-Friendly?

✅ **Do's:**
- Use standard section headings (Experience, Education, Skills)
- Use simple formatting (no columns, tables, or graphics)
- Include keywords from job description
- Use standard fonts (Arial, Calibri, Times New Roman)
- Save as PDF or DOCX
- Use bullet points for achievements
- Include dates in standard format (MM/YYYY)

❌ **Don'ts:**
- Don't use images or icons in resume body
- Don't use headers/footers for important info
- Don't use tables or text boxes
- Don't use creative fonts or colors
- Don't submit as image file (JPG, PNG)

### Keyword Matching Strategy
1. **Analyze Job Description** - Identify required skills
2. **Match Your Skills** - Include exact keywords
3. **Use Variations** - "JavaScript" and "JS"
4. **Context Matters** - Use keywords naturally
5. **Don't Stuff** - Maintain readability

---

## 🙏 Acknowledgments

- **Font Awesome** - Icon library
- **PDF.js** - Mozilla's PDF renderer
- **Mammoth.js** - DOCX parser
- **html2pdf.js** - PDF generation
- **Unsplash** - Stock photos
- **All Contributors** - Thank you!

---

## 📄 Additional Resources

- [ATS Resume Guide](https://www.jobscan.co/ats-resume)
- [Resume Keywords](https://www.resume-worded.com)
- [Web Design Best Practices](https://web.dev)
- [JavaScript ES6 Guide](https://javascript.info)

---

## 🚀 Quick Start Checklist

- [ ] Download/clone project
- [ ] Open `index.html` in browser
- [ ] Update personal information
- [ ] Replace profile image
- [ ] Add your projects
- [ ] Update social links
- [ ] Test ATS Builder
- [ ] Download your resume
- [ ] Deploy to hosting (optional)

---

**Ready to showcase your work and help others land their dream jobs?** 🎉

Open `index.html` and start building your professional presence today!

---

*Made with ❤️ by Marlon | Helping job seekers succeed since 2024*
