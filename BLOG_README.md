# Blog + Portfolio Bridge

A comprehensive blog system integrated with your portfolio, featuring a Sudoku + Deep Learning theme, MDX-powered content, and modern web technologies.

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000/blog` to see your blog in action!

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── blog/
│   │   ├── layout.tsx          # Blog layout with navigation
│   │   ├── page.tsx            # Blog index page
│   │   └── [slug]/
│   │       └── page.tsx        # Individual blog post page
│   └── resume/
│       └── page.tsx            # Resume page
├── components/
│   ├── BlogCard.tsx            # Blog post card component
│   ├── HotBadge.tsx            # Animated "Hot News" badge
│   ├── PostMeta.tsx            # Post metadata display
│   ├── SudokuNeuralBg.tsx      # Animated background
│   ├── TagPill.tsx             # Tag display component
│   ├── ResumeCTA.tsx           # Resume call-to-action
│   └── Navbar.tsx              # Navigation component
├── lib/
│   ├── theme.ts                # Shared theme configuration
│   ├── mdx.ts                  # MDX parsing utilities
│   ├── posts.ts                # Blog post management
│   └── readingTime.ts          # Reading time calculations
├── content/
│   ├── posts/                  # Blog post MDX files
│   │   ├── portfolio-hot-news.mdx
│   │   └── building-neural-sudoku-solver.mdx
│   └── resume.md               # Resume content
└── scripts/
    └── new-post.ts             # Post creation script
```

## ✨ Features

### 🎨 Visual Theme
- **Sudoku + Deep Learning Motif**: Animated Sudoku grid with neural network connections
- **Consistent Color Palette**: Shared theme tokens across portfolio and blog
- **Glass Morphism**: Modern glassmorphism design with backdrop blur effects
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### 📝 Content Management
- **MDX Support**: Write posts in Markdown with React components
- **Frontmatter**: Rich metadata including tags, dates, and custom fields
- **Hot Posts**: Special "Hot News 🔥" posts with bouncing badges
- **Portfolio Integration**: Hot posts can link directly to your portfolio

### 🔍 Blog Features
- **Search & Filter**: Client-side search and tag filtering
- **Reading Time**: Automatic calculation and display
- **Word Count**: Post length indicators
- **Related Posts**: Automatic related post suggestions
- **SEO Optimized**: Built-in metadata and Open Graph support

### 🛠 Developer Experience
- **TypeScript**: Full type safety throughout
- **Hot Reload**: Instant updates during development
- **Post Scaffolding**: Automated post creation script
- **Performance**: Optimized with static generation

## 📖 How to Use

### Adding New Blog Posts

#### Method 1: Command Line Script
```bash
# Simple post creation
npm run new-post "My Amazing Post Title"

# Interactive mode with prompts
npm run new-post:interactive
```

#### Method 2: Manual Creation
1. Create a new `.mdx` file in `content/posts/`
2. Add frontmatter with required fields
3. Write your content in Markdown

### Post Frontmatter

```yaml
---
title: "Your Post Title"
date: "2025-01-07"
tags: ["tag1", "tag2", "tag3"]
summary: "Brief description of your post"
cover: "https://example.com/image.jpg"  # Optional
isHot: false                           # Optional: true for hot posts
portfolioLink: "/"                     # Optional: for hot posts
author: "Your Name"                    # Optional
published: true                        # Optional: false to hide
---
```

### Creating Hot Posts

Hot posts are special announcements that link to your portfolio:

```yaml
---
title: "My Portfolio — Hot News"
date: "2025-01-07"
tags: ["portfolio", "update"]
summary: "Check out my updated portfolio!"
isHot: true
portfolioLink: "/"
---
```

### Using MDX Components

In your posts, you can use custom components:

```mdx
# My Post Title

Regular markdown content here.

<ResumeCTA variant="prominent" />

## Code Example

```typescript
function example() {
  console.log('Hello, world!');
}
```
```

## 🎨 Customizing the Theme

### Color Palette

Edit `lib/theme.ts` to customize colors:

```typescript
export const theme = {
  primary: "#0ea5e9",    // Main blue
  accent: "#1d4ed8",     // Accent blue
  warn: "#ef4444",       // Red for hot badges
  bg: "#0b1020",         // Background
  grid: "rgba(255,255,255,0.06)", // Grid lines
  // ... more colors
};
```

### Background Animation

Customize the SudokuNeuralBg component:

```tsx
<SudokuNeuralBg 
  intensity="medium"  // low, medium, high
  showNeural={true}   // Show neural network
  showSudoku={true}   // Show Sudoku grid
/>
```

### Tailwind Configuration

The theme is integrated with Tailwind CSS. Custom animations are defined in `tailwind.config.js`:

```javascript
animation: {
  'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
  'neural-pulse': 'neural-pulse 3s ease-in-out infinite',
  // ... more animations
}
```

## 📄 Resume Integration

### Markdown Resume

The resume page supports both Markdown and PDF formats:

1. **Markdown**: Edit `content/resume.md`
2. **PDF**: Add a PDF file and update the resume page

### Resume CTA Component

Use the ResumeCTA component in your posts:

```mdx
<ResumeCTA variant="default" />    # Default style
<ResumeCTA variant="minimal" />    # Minimal style  
<ResumeCTA variant="prominent" />  # Prominent style
```

## 🔧 Configuration

### Next.js Configuration

The `next.config.js` includes MDX support:

```javascript
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter],
  },
});
```

### Package Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build", 
    "start": "next start",
    "new-post": "ts-node scripts/new-post.ts",
    "new-post:interactive": "ts-node scripts/new-post.ts --interactive"
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The blog is built with Next.js and can be deployed to any platform that supports Node.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📊 Analytics Integration

The blog is ready for analytics integration. Add your tracking code to:

1. **Google Analytics**: Add to `app/layout.tsx`
2. **Vercel Analytics**: Install `@vercel/analytics`
3. **Custom Analytics**: Add to the blog layout

## 🎯 SEO Features

- **Metadata API**: Automatic meta tags
- **Open Graph**: Social media sharing
- **Structured Data**: Rich snippets
- **Sitemap**: Automatic sitemap generation
- **RSS Feed**: Blog RSS feed (can be added)

## 🐛 Troubleshooting

### Common Issues

1. **MDX not rendering**: Check `next.config.js` and dependencies
2. **Posts not showing**: Verify frontmatter format and file location
3. **Styling issues**: Check Tailwind configuration and imports
4. **Build errors**: Ensure all dependencies are installed

### Development Tips

- Use `npm run dev` for development with hot reload
- Check browser console for client-side errors
- Use TypeScript for better error catching
- Test posts in different screen sizes

## 📚 Dependencies

### Core Dependencies
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **MDX**: Markdown with JSX components

### Content Dependencies
- **gray-matter**: Frontmatter parsing
- **reading-time**: Reading time calculation
- **remark**: Markdown processing
- **remark-gfm**: GitHub Flavored Markdown

### UI Dependencies
- **lucide-react**: Icon library
- **framer-motion**: Animation library

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section
2. Search existing issues
3. Create a new issue with detailed information
4. Include error messages and steps to reproduce

---

**Happy blogging! 🎉**

Your blog is now ready to showcase your thoughts on machine learning, web development, and technology. The Sudoku + Deep Learning theme creates a unique and engaging experience for your readers.
