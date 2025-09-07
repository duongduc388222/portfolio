'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';
import HotBadge from './HotBadge';
import PostMeta from './PostMeta';
import TagPill from './TagPill';

interface BlogCardProps {
  post: Post;
  className?: string;
  showCover?: boolean;
  showSummary?: boolean;
  showTags?: boolean;
  isHot?: boolean;
}

export default function BlogCard({
  post,
  className = '',
  showCover = true,
  showSummary = true,
  showTags = true,
  isHot = false,
}: BlogCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    // If it's a hot post with portfolio link, prevent default and navigate
    if (post.frontmatter.isHot && post.frontmatter.portfolioLink) {
      e.preventDefault();
      if (post.frontmatter.portfolioLink.startsWith('http')) {
        window.open(post.frontmatter.portfolioLink, '_blank');
      } else {
        window.location.href = post.frontmatter.portfolioLink;
      }
    }
  };

  const cardContent = (
    <article
      className={`
        group relative overflow-hidden
        bg-white/5 backdrop-blur-sm
        border border-white/10
        rounded-xl p-6
        transition-all duration-300
        hover:bg-white/10 hover:border-white/20
        hover:shadow-xl hover:shadow-blue-500/10
        hover:-translate-y-1
        ${isHot ? 'ring-2 ring-red-500/30' : ''}
        ${className}
      `}
      onClick={handleClick}
    >
      {/* Hot Badge */}
      {post.frontmatter.isHot && (
        <div className="absolute top-4 right-4 z-10">
          <HotBadge>
            Hot News 🔥
          </HotBadge>
        </div>
      )}

      {/* Cover Image */}
      {showCover && post.frontmatter.cover && (
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
          <Image
            src={post.frontmatter.cover}
            alt={post.frontmatter.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="space-y-4">
        {/* Title */}
        <h2 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
          {post.frontmatter.title}
        </h2>

        {/* Summary */}
        {showSummary && post.frontmatter.summary && (
          <p className="text-gray-300 line-clamp-3">
            {post.frontmatter.summary}
          </p>
        )}

        {/* Meta Information */}
        <PostMeta
          frontmatter={post.frontmatter}
          readingTime={post.readingTime}
          showTags={false}
          showReadingTime={true}
          showWordCount={true}
        />

        {/* Tags */}
        {showTags && post.frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.frontmatter.tags.slice(0, 3).map((tag) => (
              <TagPill key={tag} tag={tag} size="sm" />
            ))}
            {post.frontmatter.tags.length > 3 && (
              <span className="text-xs text-gray-400">
                +{post.frontmatter.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Read More Indicator */}
        {!post.frontmatter.isHot && (
          <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
            <span className="text-sm font-medium">Read more</span>
            <svg
              className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        )}

        {/* Portfolio Link Indicator for Hot Posts */}
        {post.frontmatter.isHot && post.frontmatter.portfolioLink && (
          <div className="flex items-center text-red-400 group-hover:text-red-300 transition-colors">
            <span className="text-sm font-medium">View Portfolio</span>
            <svg
              className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </article>
  );

  // If it's a hot post with portfolio link, render as div instead of Link
  if (post.frontmatter.isHot && post.frontmatter.portfolioLink) {
    return cardContent;
  }

  // Regular blog post - wrap in Link
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      {cardContent}
    </Link>
  );
}
