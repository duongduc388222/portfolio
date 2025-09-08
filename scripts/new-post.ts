#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';
import { generateSlug } from '../lib/mdx';

interface PostTemplate {
  title: string;
  date: string;
  tags: string[];
  summary: string;
  cover?: string;
  isHot?: boolean;
  portfolioLink?: string;
  author?: string;
  published?: boolean;
}

function createPostTemplate(title: string): PostTemplate {
  const now = new Date();
  const date = now.toISOString().split('T')[0]; // YYYY-MM-DD format
  
  return {
    title,
    date,
    tags: ['general'],
    summary: `A new blog post about ${title.toLowerCase()}.`,
    author: 'Your Name',
    published: true,
  };
}

function generateFrontmatter(template: PostTemplate): string {
  let frontmatter = `---
title: "${template.title}"
date: "${template.date}"
tags: [${template.tags.map(tag => `"${tag}"`).join(', ')}]
summary: "${template.summary}"`;

  if (template.cover) {
    frontmatter += `\ncover: "${template.cover}"`;
  }

  if (template.isHot) {
    frontmatter += `\nisHot: ${template.isHot}`;
  }

  if (template.portfolioLink) {
    frontmatter += `\nportfolioLink: "${template.portfolioLink}"`;
  }

  if (template.author) {
    frontmatter += `\nauthor: "${template.author}"`;
  }

  if (template.published !== undefined) {
    frontmatter += `\npublished: ${template.published}`;
  }

  frontmatter += '\n---\n';
  return frontmatter;
}

function generatePostContent(title: string): string {
  return `# ${title}

Write your blog post content here.

## Introduction

Start with an engaging introduction that hooks your readers.

## Main Content

Add your main content here. You can include:

- Lists
- **Bold text**
- *Italic text*
- \`Code snippets\`
- [Links](https://example.com)

## Code Examples

\`\`\`typescript
// Example code block
function example() {
  console.log('Hello, world!');
}
\`\`\`

## Conclusion

Wrap up your post with a compelling conclusion.

<ResumeCTA variant="default" />

---

*Thanks for reading! Feel free to reach out if you have any questions.*`;
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Usage: npm run new-post "Your Post Title"');
    console.error('Example: npm run new-post "Building a Neural Network"');
    process.exit(1);
  }

  const title = args.join(' ');
  const slug = generateSlug(title);
  const filename = `${slug}.mdx`;
  
  const postsDir = path.join(process.cwd(), 'content', 'posts');
  const filePath = path.join(postsDir, filename);

  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.error(`Error: Post "${filename}" already exists!`);
    process.exit(1);
  }

  // Ensure posts directory exists
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  // Generate post content
  const template = createPostTemplate(title);
  let frontmatter = generateFrontmatter(template);
  const content = generatePostContent(title);
  const fullContent = frontmatter + '\n' + content;

  // Write file
  try {
    fs.writeFileSync(filePath, fullContent, 'utf8');
    console.log(`✅ Created new blog post: ${filename}`);
    console.log(`📝 Title: ${title}`);
    console.log(`🔗 Slug: ${slug}`);
    console.log(`📁 Location: ${filePath}`);
    console.log('\n📋 Next steps:');
    console.log('1. Edit the post content in your editor');
    console.log('2. Update the frontmatter (tags, summary, etc.)');
    console.log('3. Add a cover image if desired');
    console.log('4. Test your post by running the development server');
  } catch (error) {
    console.error('Error creating post:', error);
    process.exit(1);
  }
}

// Interactive mode for creating posts with prompts
function interactiveMode() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(query, resolve);
    });
  };

  (async () => {
    try {
      console.log('📝 Create a new blog post\n');

      const title = await question('Post title: ');
      if (!title.trim()) {
        console.error('Title is required!');
        process.exit(1);
      }

      const summary = await question('Summary (optional): ');
      const tagsInput = await question('Tags (comma-separated, optional): ');
      const author = await question('Author (optional): ');
      const cover = await question('Cover image URL (optional): ');
      const isHotInput = await question('Is this a hot/featured post? (y/n): ');

      const tags = tagsInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const template: PostTemplate = {
        title: title.trim(),
        date: new Date().toISOString().split('T')[0],
        tags: tags.length > 0 ? tags : ['general'],
        summary: summary.trim() || `A new blog post about ${title.toLowerCase()}.`,
        author: author.trim() || 'Your Name',
        published: true,
        isHot: isHotInput.toLowerCase().startsWith('y'),
      };

      if (cover.trim()) {
        template.cover = cover.trim();
      }

      const slug = generateSlug(title);
      const filename = `${slug}.mdx`;
      const postsDir = path.join(process.cwd(), 'content', 'posts');
      const filePath = path.join(postsDir, filename);

      if (fs.existsSync(filePath)) {
        console.error(`Error: Post "${filename}" already exists!`);
        process.exit(1);
      }

      if (!fs.existsSync(postsDir)) {
        fs.mkdirSync(postsDir, { recursive: true });
      }

      let frontmatter = generateFrontmatter(template);
      const content = generatePostContent(title);
      const fullContent = frontmatter + '\n' + content;

      fs.writeFileSync(filePath, fullContent, 'utf8');
      
      console.log(`\n✅ Created new blog post: ${filename}`);
      console.log(`📝 Title: ${title}`);
      console.log(`🔗 Slug: ${slug}`);
      console.log(`📁 Location: ${filePath}`);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      rl.close();
    }
  })();
}

// Check if running in interactive mode
if (process.argv.includes('--interactive') || process.argv.includes('-i')) {
  interactiveMode();
} else {
  main();
}
