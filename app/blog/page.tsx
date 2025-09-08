import { getAllPosts, getAllTags, getHotPosts } from '@/lib/posts';
import BlogClient from './BlogClient';

export default function BlogPage() {
  // Get all posts and tags on the server
  const allPosts = getAllPosts({ publishedOnly: true, sortByDate: true });
  const allTags = getAllTags();
  const hotPosts = getHotPosts();

  return (
    <BlogClient 
      initialPosts={allPosts}
      allTags={allTags}
      hotPosts={hotPosts}
    />
  );
}