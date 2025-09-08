import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts, getAllPostSlugs } from '@/lib/posts';
import { serializeMDX } from '@/lib/mdx';
import MDXContent from '@/components/MDXContent';
import PostMeta from '@/components/PostMeta';
import BlogCard from '@/components/BlogCard';
import TagPill from '@/components/TagPill';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import ShareButton from '@/components/ShareButton';


interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.frontmatter.title} - Blog`,
    description: post.frontmatter.summary,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      type: 'article',
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const mdxSource = await serializeMDX(post.content);
  const relatedPosts = getRelatedPosts(post, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back to Blog */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {post.frontmatter.title}
        </h1>

        <PostMeta
          frontmatter={post.frontmatter}
          readingTime={post.readingTime}
          showTags={true}
          showReadingTime={true}
          showWordCount={true}
          className="mb-6"
        />

        {/* Share Button */}
        <ShareButton slug={params.slug} title={post.frontmatter.title} />
      </header>

      {/* Cover Image */}
      {post.frontmatter.cover && (
        <div className="mb-8">
          <img
            src={post.frontmatter.cover}
            alt={post.frontmatter.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="prose prose-lg prose-invert max-w-none mb-12">
        <Suspense fallback={<div>Loading...</div>}>
          <MDXContent source={mdxSource} />
        </Suspense>
      </article>

      {/* Tags */}
      {post.frontmatter.tags.length > 0 && (
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <TagPill key={tag} tag={tag} size="md" />
            ))}
          </div>
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Related Posts</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <BlogCard
                key={relatedPost.slug}
                post={relatedPost}
                showCover={false}
                showSummary={true}
                showTags={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Back to Blog Footer */}
      <div className="text-center pt-8 border-t border-white/10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Posts
        </Link>
      </div>
    </div>
  );
}

