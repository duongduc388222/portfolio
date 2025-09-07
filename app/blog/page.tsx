'use client';

import { useState, useMemo } from 'react';
import { getAllPosts, getAllTags, getHotPosts } from '@/lib/posts';
import BlogCard from '@/components/BlogCard';
import TagPill from '@/components/TagPill';
import { Search, Filter } from 'lucide-react';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  // Get all posts and tags
  const allPosts = getAllPosts({ publishedOnly: true, sortByDate: true });
  const allTags = getAllTags();
  const hotPosts = getHotPosts();

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    // Apply search filter
    if (searchQuery.trim()) {
      posts = posts.filter(post => 
        post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.frontmatter.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.frontmatter.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply tag filter
    if (selectedTag) {
      posts = posts.filter(post => post.frontmatter.tags.includes(selectedTag));
    }

    // Sort posts
    if (sortBy === 'title') {
      posts = [...posts].sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title));
    }

    return posts;
  }, [allPosts, searchQuery, selectedTag, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Blog
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Thoughts on machine learning, web development, and technology
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Tag Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Filter by tag:</span>
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTag === null
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              All
            </button>
            {allTags.slice(0, 8).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTag === tag
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
              className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Date</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hot Posts */}
      {hotPosts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">🔥 Hot News</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hotPosts.map((post) => (
              <BlogCard
                key={post.slug}
                post={post}
                isHot={true}
                className="md:col-span-2 lg:col-span-1"
              />
            ))}
          </div>
        </div>
      )}

      {/* All Posts */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {selectedTag ? `Posts tagged "${selectedTag}"` : 'All Posts'}
          </h2>
          <span className="text-sm text-gray-400">
            {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto mb-4" />
              <p className="text-lg">No posts found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.slug}
                post={post}
                isHot={post.frontmatter.isHot}
              />
            ))}
          </div>
        )}
      </div>

      {/* All Tags */}
      <div className="mt-12 pt-8 border-t border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">All Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <TagPill
              key={tag}
              tag={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              size="sm"
              variant="outline"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
