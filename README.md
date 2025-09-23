# Portfolio Website

A modern, responsive portfolio website built with Next.js 14, featuring a liquid glass design aesthetic and an intelligent local chatbot.

## 🚀 Features

- **Liquid Glass Design**: Beautiful glassmorphism effects with animated SVG blobs
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Local Chatbot**: Interactive AI assistant (Duong) that answers questions about your profile
- **Keyboard Shortcuts**: Ctrl/Cmd+K to open chatbot, Esc to close
- **Dynamic Content**: All content managed through a single JSON file
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **SEO Optimized**: Built with Next.js 14 App Router for optimal performance
- **Vercel Ready**: One-click deployment to Vercel

## 🛠️ Tech Stack

### Core Framework & Language
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Runtime**: Node.js

### Styling & UI
- **CSS Framework**: Tailwind CSS with custom theme
- **Animation Library**: Framer Motion
- **Icons**: Lucide React
- **Design System**: Custom glassmorphism components

### Content & Data Management
- **Content Format**: MDX (Markdown + JSX) for blog posts
- **Markdown Processing**: 
  - `@next/mdx` for MDX compilation
  - `gray-matter` for frontmatter parsing
  - `remark-gfm` for GitHub Flavored Markdown
  - `remark-frontmatter` for frontmatter support
- **Reading Time**: `reading-time` for post duration calculation
- **Remote MDX**: `next-mdx-remote` for dynamic content rendering

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint with Next.js configuration
- **TypeScript Config**: Strict mode with path mapping
- **Development Scripts**: Custom post creation with `ts-node`

### Deployment & Build
- **Deployment Platform**: Vercel
- **Build Output**: Static export optimized
- **Image Optimization**: Disabled for static export compatibility

### Special Features
- **Neural Sudoku Visualization**: Custom React hooks and animations
- **Interactive Chatbot**: Local AI assistant with keyword matching
- **Responsive Design**: Mobile-first approach with custom breakpoints
- **Dark Theme**: Custom blue gradient color scheme with glass effects

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Home screen with navigation
│   └── portfolio/
│       └── page.tsx         # Portfolio page with all sections
├── components/
│   ├── Card.tsx             # Reusable glass card component
│   ├── duong/
│   │   └── Chatbot.tsx      # Local chatbot with Q&A functionality (renamed from Lam)
│   ├── ui/
│   │   ├── GlowButton.tsx   # Animated button component
│   │   └── Separator.tsx    # Decorative separator component
│   ├── LiquidGlassWrapper.tsx # SVG blob animations and glass effects
│   ├── Navbar.tsx           # Navigation with smooth scrolling
│   ├── ProjectCard.tsx      # Project showcase cards
│   └── SectionWrapper.tsx   # Section layout wrapper
├── data/
│   └── profile.json         # Your profile data (edit this!)
├── public/
│   └── images/              # Your images (profile, projects, etc.)
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind theme and animations
└── vercel.json              # Vercel deployment configuration
```

## 🚀 Quick Start

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

### Customization

1. **Update your profile data**
   Edit `/data/profile.json` with your information:
   - Personal details
   - Education history
   - Work experience
   - Projects
   - Skills and technologies
   - Awards and certifications

2. **Add your images**
   Place your images in `/public/images/`:
   - `profile.jpg` - Your profile photo
   - `project1.jpg`, `project2.jpg`, etc. - Project screenshots

3. **Customize the design**
   Modify `/tailwind.config.js` to adjust:
   - Color scheme
   - Animations
   - Breakpoints

## 🌐 Vercel Deployment

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio setup"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and deploy

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Link to existing project or create new
   - Choose deployment settings
   - Your site will be live in minutes!

## 🎨 Customization Guide

### Colors and Theme

The color palette is defined in `tailwind.config.js`:
```javascript
colors: {
  blue: {
    950: '#0c1445',  // Darkest background
    900: '#1e3a8a',  // Main background
    // ... more shades
  },
  cyan: {
    400: '#22d3ee',  // Accent color
    500: '#06b6d4',  // Secondary accent
  }
}
```

### Profile Data Structure

The `/data/profile.json` file contains all your content:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "bio": "Your bio...",
    "profileImage": "/images/profile.jpg"
  },
  "education": [...],
  "experience": [...],
  "projects": [...],
  "skills": {...},
  "awards": [...]
}
```

### Chatbot Responses

Customize chatbot responses in the `chatbot.responses` section of `profile.json`. The bot uses keyword matching to provide relevant answers about:
- Skills and technologies
- Work experience
- Projects
- Education
- Contact information

### Adding New Sections

To add a new section:

1. Add data to `profile.json`
2. Create a new section in `app/page.tsx`
3. Add navigation link to `components/Navbar.tsx`

## 🔧 Advanced Features

### API Integration for Chatbot

To integrate with external APIs (OpenAI, Anthropic, etc.):

1. Copy `.env.example` to `.env.local`
2. Add your API keys
3. Modify the `generateReply` function in `ChatBot.tsx`

Example integration:
```typescript
// In ChatBot.tsx
async function generateReply(question: string): Promise<string> {
  // Use profile data for context
  const context = JSON.stringify(profileData);
  
  // Call your preferred AI API
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, context })
  });
  
  return response.json();
}
```

### Performance Optimization

The site is optimized for performance with:
- Static export for fast loading
- Image optimization (when not using static export)
- Code splitting with Next.js App Router
- Lazy loading of components
- Efficient animations with Framer Motion

## 🎯 Best Practices

1. **Images**: Keep images under 1MB for fast loading
2. **Content**: Keep descriptions concise but informative
3. **Skills**: Update skill levels honestly and regularly
4. **Projects**: Include live demos when possible
5. **SEO**: Update meta tags in `layout.tsx`

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**: Ensure images are in `/public/images/` and paths start with `/images/`
2. **Build fails**: Check TypeScript errors with `npm run build`
3. **Styles not applying**: Verify Tailwind classes are correct and CSS is imported

### Support

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Tailwind CSS docs](https://tailwindcss.com/docs)
- Consult [Framer Motion guides](https://www.framer.com/motion/)

## 📄 License

MIT License - feel free to use this template for your own portfolio!

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS