import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import { calculateReadingTime } from './readingTime';

export interface PostFrontmatter {
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

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: ReturnType<typeof calculateReadingTime>;
  wordCount: number;
}

/**
 * Serialize MDX content with frontmatter
 * @param source - Raw MDX content
 * @returns Serialized MDX content
 */
export async function serializeMDX(source: string): Promise<MDXRemoteSerializeResult> {
  return await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkFrontmatter],
      rehypePlugins: [],
    },
  });
}

/**
 * Parse frontmatter from MDX content
 * @param content - Raw MDX content with frontmatter
 * @returns Parsed frontmatter and content
 */
export function parseFrontmatter(content: string): { frontmatter: PostFrontmatter; content: string } {
  const frontmatterRegex = /^---\s*\n(.*?)\n---\s*\n(.*)$/s;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('No frontmatter found in content');
  }
  
  const frontmatterYaml = match[1];
  const mdxContent = match[2];
  
  // Simple YAML parser for frontmatter
  const frontmatter: PostFrontmatter = {
    title: '',
    date: '',
    tags: [],
    summary: '',
    isHot: false,
    portfolioLink: '',
  };
  
  const lines = frontmatterYaml.split('\n');
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      const cleanKey = key.trim();
      
      switch (cleanKey) {
        case 'title':
          frontmatter.title = value.replace(/['"]/g, '');
          break;
        case 'date':
          frontmatter.date = value.replace(/['"]/g, '');
          break;
        case 'summary':
          frontmatter.summary = value.replace(/['"]/g, '');
          break;
        case 'portfolioLink':
          frontmatter.portfolioLink = value.replace(/['"]/g, '');
          break;
        case 'author':
          frontmatter.author = value.replace(/['"]/g, '');
          break;
        case 'tags':
          // Parse array format: ["tag1", "tag2", "tag3"]
          const tagsMatch = value.match(/\[(.*?)\]/);
          if (tagsMatch) {
            const tagsString = tagsMatch[1];
            frontmatter.tags = tagsString
              .split(',')
              .map(tag => tag.trim().replace(/['"]/g, ''))
              .filter(tag => tag.length > 0);
          }
          break;
        case 'isHot':
          frontmatter.isHot = value.toLowerCase() === 'true';
          break;
        case 'published':
          frontmatter.published = value.toLowerCase() === 'true';
          break;
        case 'cover':
          frontmatter.cover = value.replace(/['"]/g, '');
          break;
      }
    }
  }
  
  return { frontmatter, content: mdxContent };
}

/**
 * Validate required frontmatter fields
 * @param frontmatter - Parsed frontmatter
 * @throws Error if required fields are missing
 */
export function validateFrontmatter(frontmatter: PostFrontmatter): void {
  const requiredFields: (keyof PostFrontmatter)[] = ['title', 'date', 'summary'];
  
  for (const field of requiredFields) {
    if (!frontmatter[field] || (typeof frontmatter[field] === 'string' && frontmatter[field].trim() === '')) {
      throw new Error(`Missing required frontmatter field: ${field}`);
    }
  }
  
  // Validate date format
  if (frontmatter.date && isNaN(Date.parse(frontmatter.date))) {
    throw new Error('Invalid date format in frontmatter');
  }
  
  // Validate tags array
  if (!Array.isArray(frontmatter.tags)) {
    throw new Error('Tags must be an array');
  }
}

/**
 * Generate slug from filename
 * @param filename - The filename (with or without extension)
 * @returns URL-friendly slug
 */
export function generateSlug(filename: string): string {
  return filename
    .replace(/\.(mdx?|md)$/, '') // Remove file extension
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}
