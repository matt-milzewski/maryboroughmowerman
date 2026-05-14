# The Maryborough Mower Man - Static Website

A professional, mobile-first static website for The Maryborough Mower Man lawn care service.

## 🚀 Quick Start

1. **Local Preview**

   ```bash
   python3 -m http.server 4173
   ```

   Open `http://127.0.0.1:4173/`.

2. **Formspree**
   - The contact form posts to the Formspree endpoint in `index.html`
   - Keep the phone number and email visible as a fallback if Formspree rejects a request

3. **Images**
   - `hero-lawn.jpg` is the JPEG fallback hero image
   - `hero-lawn.webp` is the optimized hero image used by browsers that support WebP
   - `og-hero.jpg` is the 1200 x 630 social sharing image
   - `favicon-mower.png` is the browser icon

4. **Deployment**
   - Upload the entire directory to an AWS S3 bucket
   - Enable "Static website hosting" in bucket settings
   - Configure bucket policy for public access

5. **Optional: HTTPS Setup**
   - Set up Route 53 for domain management
   - Configure CloudFront distribution
   - Point domain to CloudFront distribution
   - Redirect `www.maryboroughmowerman.com.au` to `maryboroughmowerman.com.au` at CloudFront or Route 53/S3 website endpoint level

## 🛠️ Technical Details

- Pure HTML5, CSS3, and vanilla JavaScript
- No build tools or frameworks
- Mobile-first responsive design
- SEO optimized with JSON-LD schema
- WCAG 2.1 AA compliant
- Performance optimized

## 📁 File Structure

```
/
├── index.html          # Main website
├── 404.html           # Custom 404 page
├── style.css          # Main stylesheet
├── scripts.js         # JavaScript functionality
├── images/            # Optimized image assets
└── README.md          # This file
```

## 🎨 Design System

- **Colors**
  - Primary: #2E7D32 (green)
  - Accent: #66BB6A (light green)
  - Dark: #333333 (grey)
  - White: #FFFFFF

- **Typography**
  - Headings: Poppins (600)
  - Body: Open Sans (400)

- **Breakpoints**
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: 1024px - 1440px
  - Large Desktop: > 1440px

## 🔒 Security

- Form submissions handled via Formspree
- No sensitive data stored
- HTTPS recommended for production
- `.git`, `.github`, `.DS_Store`, `.gitignore`, `README.md`, and deployment config are excluded from S3 uploads

## 📱 Features

- Mobile-first responsive design
- Smooth scroll navigation
- Form validation
- Testimonial carousel
- Interactive map
- Social media integration
- SEO optimization
- Accessibility features

## 📄 License

© 2024 The Maryborough Mower Man. All rights reserved.
