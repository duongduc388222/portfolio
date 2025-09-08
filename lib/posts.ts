import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostFrontmatter, parseFrontmatter, validateFrontmatter, generateSlug } from './mdx';
import { calculateReadingTime } from './readingTime';


// Re-export types for external use
export type { Post, PostFrontmatter } from './mdx';


/**
 * Get all post slugs from the posts directory
 * @returns Array of post slugs
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }
  
  const filenames = fs.readdirSync(POSTS_DIRECTORY);
  return filenames
    .filter(name => name.endsWith('.mdx') || name.endsWith('.md'))
    .map(name => generateSlug(name));
}

/**
 * Get post data by slug
 * @param slug - The post slug
 * @returns Post data or null if not found
 */
export function getPostBySlug(slug: string): Post | null {
  try {
    // Find the actual file (could be .mdx or .md)
    const filenames = fs.readdirSync(POSTS_DIRECTORY);
    const filename = filenames.find(name => 
      generateSlug(name) === slug && (name.endsWith('.mdx') || name.endsWith('.md'))
    );
    
    if (!filename) {
      return null;
    }
    
    const fullPath = path.join(POSTS_DIRECTORY, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Parse frontmatter and content
    const { data: frontmatter, content } = matter(fileContents);
    
    // Validate frontmatter
    validateFrontmatter(frontmatter as PostFrontmatter);
    
    // Calculate reading time and word count
    const readingTimeResult = calculateReadingTime(content);
    
    return {
      slug,
      frontmatter: frontmatter as PostFrontmatter,
      content,
      readingTime: readingTimeResult,
      wordCount: readingTimeResult.words,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all posts with optional filtering
 * @param options - Filtering options
 * @returns Array of posts
 */
export function getAllPosts(options: {
  publishedOnly?: boolean;
  sortByDate?: boolean;
  limit?: number;
  tag?: string;
} = {}): Post[] {
  const { publishedOnly = true, sortByDate = true, limit, tag } = options;
  
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }
  
  const filenames = fs.readdirSync(POSTS_DIRECTORY);
  const posts: Post[] = [];
  
  for (const filename of filenames) {
    if (!filename.endsWith('.mdx') && !filename.endsWith('.md')) {
      continue;
    }
    
    try {
      const slug = generateSlug(filename);
      const post = getPostBySlug(slug);
      
      if (!post) {
        continue;
      }
      
      // Apply filters
      if (publishedOnly && post.frontmatter.published === false) {
        continue;
      }
      
      if (tag && !post.frontmatter.tags.includes(tag)) {
        continue;
      }
      
      posts.push(post);
    } catch (error) {
      console.error(`Error processing post ${filename}:`, error);
    }
  }
  
  // Sort by date if requested
  if (sortByDate) {
    posts.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateB.getTime() - dateA.getTime(); // Newest first
    });
  }
  
  // Apply limit if specified
  if (limit && limit > 0) {
    return posts.slice(0, limit);
  }
  
  return posts;
}

/**
 * Get all unique tags from all posts
 * @returns Array of unique tags
 */
export function getAllTags(): string[] {
  const posts = getAllPosts({ publishedOnly: true });
  const tagSet = new Set<string>();
  
  for (const post of posts) {
    for (const tag of post.frontmatter.tags) {
      tagSet.add(tag);
    }
  }
  
  return Array.from(tagSet).sort();
}

/**
 * Get related posts by tags
 * @param currentPost - The current post
 * @param limit - Maximum number of related posts to return
 * @returns Array of related posts
 */
export function getRelatedPosts(currentPost: Post, limit: number = 3): Post[] {
  const allPosts = getAllPosts({ publishedOnly: true });
  const relatedPosts: Post[] = [];
  
  for (const post of allPosts) {
    if (post.slug === currentPost.slug) {
      continue; // Skip the current post
    }
    
    // Check if posts share any tags
    const sharedTags = post.frontmatter.tags.filter(tag => 
      currentPost.frontmatter.tags.includes(tag)
    );
    
    if (sharedTags.length > 0) {
      relatedPosts.push(post);
    }
  }
  
  // Sort by number of shared tags (most related first)
  relatedPosts.sort((a, b) => {
    const aSharedTags = a.frontmatter.tags.filter(tag => 
      currentPost.frontmatter.tags.includes(tag)
    ).length;
    const bSharedTags = b.frontmatter.tags.filter(tag => 
      currentPost.frontmatter.tags.includes(tag)
    ).length;
    
    return bSharedTags - aSharedTags;
  });
  
  return relatedPosts.slice(0, limit);
}

/**
 * Search posts by query
 * @param query - Search query
 * @returns Array of matching posts
 */
export function searchPosts(query: string): Post[] {
  const posts = getAllPosts({ publishedOnly: true });
  const lowercaseQuery = query.toLowerCase();
  
  return posts.filter(post => {
    const title = post.frontmatter.title.toLowerCase();
    const summary = post.frontmatter.summary.toLowerCase();
    const content = post.content.toLowerCase();
    const tags = post.frontmatter.tags.join(' ').toLowerCase();
    
    return (
      title.includes(lowercaseQuery) ||
      summary.includes(lowercaseQuery) ||
      content.includes(lowercaseQuery) ||
      tags.includes(lowercaseQuery)
    );
  });
}

/**
 * Get hot/pinned posts
 * @returns Array of hot posts
 */
export function getHotPosts(): Post[] {
  return getAllPosts({ publishedOnly: true }).filter(post => post.frontmatter.isHot);
}

/**
 * Get paginated posts
 * @param page - Page number (1-based)
 * @param pageSize - Number of posts per page
 * @returns Object with posts and pagination info
 */
export function getPaginatedPosts(page: number = 1, pageSize: number = 10): {
  posts: Post[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} {
  const allPosts = getAllPosts({ publishedOnly: true });
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const posts = allPosts.slice(startIndex, endIndex);
  
  return {
    posts,
    totalPosts,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}
