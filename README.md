# The Maryborough Mower Man - Static Website

A professional, mobile-first static website for The Maryborough Mower Man lawn care service.

## 🚀 Quick Start

1. **Formspree Setup**
   - Replace the Formspree ID in `index.html` with your own
   - Find the form action URL and update it to your Formspree endpoint

2. **Images**
   - Replace placeholder images in `/images` with real photos
   - Ensure all images are optimized for web
   - Required images:
     - `hero-lawn.jpg` (hero section)
     - `og-hero.jpg` (social sharing)
     - Service icons (SVG format)

3. **Deployment**
   - Upload the entire directory to an AWS S3 bucket
   - Enable "Static website hosting" in bucket settings
   - Configure bucket policy for public access

4. **Optional: HTTPS Setup**
   - Set up Route 53 for domain management
   - Configure CloudFront distribution
   - Point domain to CloudFront distribution

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
├── images/            # Image assets
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