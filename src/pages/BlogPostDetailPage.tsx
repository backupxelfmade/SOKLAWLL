import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar, User, ArrowLeft, ArrowRight,
  Share2, BookOpen, Loader2, AlertCircle,
} from 'lucide-react';
import { getBlogPostBySlug, BlogPost } from '../services/caisyApi';
import Footer from '../components/Footer';

const BlogPostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) { setError('No post slug provided'); setLoading(false); return; }
      try {
        setLoading(true);
        setError(null);
        const data = await getBlogPostBySlug(slug);
        if (!data) setError('Blog post not found');
        else setPost(data);
      } catch (err) {
        setError('Failed to load blog post. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleShare = async () => {
    if (navigator.share && post) {
      try { await navigator.share({ title: post.title, url: window.location.href }); } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-white w-full overflow-x-hidden">
          {/* Header skeleton */}
          <div className="bg-[#0d2340] pt-24 sm:pt-28 pb-8 sm:pb-12">
            <div className="max-w-3xl mx-auto px-3 sm:px-6 lg:px-8 animate-pulse">
              <div className="h-3 bg-white/10 rounded-full w-20 mb-5" />
              <div className="h-6 bg-white/10 rounded-full w-2/3 mb-3" />
              <div className="h-4 bg-white/10 rounded-full w-1/3" />
            </div>
          </div>
          <div className="max-w-3xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 animate-pulse space-y-4">
            <div className="w-full aspect-video bg-[#f0ece3] rounded-xl sm:rounded-2xl" />
            <div className="h-4 bg-[#f0ece3] rounded-full w-full" />
            <div className="h-4 bg-[#f0ece3] rounded-full w-full" />
            <div className="h-4 bg-[#f0ece3] rounded-full w-3/4" />
            <div className="h-4 bg-[#f0ece3] rounded-full w-full" />
            <div className="h-4 bg-[#f0ece3] rounded-full w-5/6" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ── Error ── */
  if (error || !post) {
    return (
      <>
        <div className="min-h-screen bg-white flex items-center justify-center pt-20 px-4 w-full overflow-x-hidden">
          <div className="text-center max-w-sm">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#bfa06f]/10 mx-auto mb-4">
              <BookOpen className="h-5 w-5 text-[#bfa06f]" />
            </div>
            <div className="w-4 h-0.5 bg-[#bfa06f] mx-auto mb-3" />
            <h1 className="text-base sm:text-xl font-bold text-[#0d2340] mb-2">Post Not Found</h1>
            <p className="text-xs sm:text-sm text-[#6a6a6a] mb-6 leading-relaxed">
              {error || "The post you're looking for doesn't exist or has been removed."}
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 bg-[#bfa06f] hover:bg-[#a08a5f] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ── Article ── */
  return (
    <>
      <div className="min-h-screen bg-white w-full overflow-x-hidden">

        {/* ── Dark header band ── */}
        <div className="bg-[#0d2340] pt-24 sm:pt-28 pb-8 sm:pb-12 relative overflow-hidden">
          <div
            className="hidden lg:block absolute right-0 top-0 bottom-0 w-[38%] opacity-[0.04]"
            style={{ backgroundImage: 'repeating-linear-gradient(-55deg, #bfa06f 0px, #bfa06f 1px, transparent 1px, transparent 28px)' }}
          />
          <div className="max-w-3xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">

            {/* Back + breadcrumb */}
            <div className="flex items-center gap-1.5 mb-4 sm:mb-6 min-w-0">
              <Link
                to="/blog"
                className="group inline-flex items-center gap-1 text-white/50 hover:text-white text-[0.6rem] sm:text-xs font-semibold transition-colors flex-shrink-0"
              >
                <ArrowLeft className="h-2.5 w-2.5 group-hover:-translate-x-0.5 transition-transform" />
                Back
              </Link>
              <span className="text-white/20 text-[0.6rem] flex-shrink-0">/</span>
              <Link
                to="/"
                className="text-white/40 hover:text-white/70 text-[0.6rem] sm:text-xs transition-colors flex-shrink-0"
              >
                Home
              </Link>
              <span className="text-white/20 text-[0.6rem] flex-shrink-0">/</span>
              <Link
                to="/blog"
                className="text-white/40 hover:text-white/70 text-[0.6rem] sm:text-xs transition-colors flex-shrink-0"
              >
                Blog
              </Link>
              <span className="text-white/20 text-[0.6rem] flex-shrink-0">/</span>
              <span className="text-white/40 text-[0.6rem] sm:text-xs truncate min-w-0">
                {post.title}
              </span>
            </div>

            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="block h-px w-5 sm:w-8 bg-[#bfa06f] flex-shrink-0" />
              <span className="text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#bfa06f]">
                Insights
              </span>
            </div>

            {/* Title */}
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 sm:mb-5">
              {post.title}
            </h1>

            {/* Meta strip */}
            <div className="flex items-center flex-wrap gap-2 sm:gap-4">
              {post.publishedDate && (
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#bfa06f] flex-shrink-0" />
                  <span className="text-[0.6rem] sm:text-xs text-white/50">{formatDate(post.publishedDate)}</span>
                </div>
              )}
              {post.author && (
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <User className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#bfa06f] flex-shrink-0" />
                  <span className="text-[0.6rem] sm:text-xs text-white/50">{post.author}</span>
                </div>
              )}

              {/* Share */}
              <button
                onClick={handleShare}
                className="ml-auto flex items-center gap-1 text-white/40 hover:text-[#bfa06f] transition-colors text-[0.6rem] sm:text-xs font-semibold"
              >
                <Share2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                {copied ? 'Copied!' : 'Share'}
              </button>
            </div>
          </div>
        </div>

        {/* ── Article body ── */}
        <div className="max-w-3xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-12">

          {/* Featured image */}
          {post.featuredImage && (
            <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl border border-[#e8e0d0] mb-5 sm:mb-10">
              <img
                src={post.featuredImage.src}
                alt={post.featuredImage.title || post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Excerpt lede */}
          {post.excerpt && (
            <p className="text-sm sm:text-lg text-[#4a4a4a] leading-relaxed border-l-2 border-[#bfa06f] pl-3 sm:pl-4 mb-6 sm:mb-10 italic">
              {post.excerpt}
            </p>
          )}

          {/* Content */}
          <div
            className="
              prose prose-sm sm:prose-base max-w-none
              prose-headings:font-bold prose-headings:text-[#0d2340] prose-headings:leading-snug
              prose-h2:text-base sm:prose-h2:text-xl prose-h2:mt-7 prose-h2:mb-3
              prose-h3:text-sm sm:prose-h3:text-lg prose-h3:mt-5 prose-h3:mb-2
              prose-p:text-[#4a4a4a] prose-p:leading-relaxed prose-p:text-[0.8rem] sm:prose-p:text-base
              prose-a:text-[#bfa06f] prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              prose-strong:text-[#0d2340]
              prose-ul:text-[#4a4a4a] prose-ol:text-[#4a4a4a]
              prose-li:text-[0.8rem] sm:prose-li:text-base prose-li:leading-relaxed
              prose-blockquote:border-l-2 prose-blockquote:border-[#bfa06f] prose-blockquote:text-[#6a6a6a]
              prose-blockquote:not-italic prose-blockquote:pl-3 sm:prose-blockquote:pl-4
              prose-img:rounded-xl prose-img:border prose-img:border-[#e8e0d0]
              prose-hr:border-[#e8e0d0]
              prose-code:text-[#bfa06f] prose-code:bg-[#f9f7f1] prose-code:rounded prose-code:px-1
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* ── Footer actions ── */}
          <div className="mt-8 sm:mt-14 pt-5 sm:pt-8 border-t border-[#e8e0d0] flex items-center justify-between gap-3 flex-wrap">
            <Link
              to="/blog"
              className="group inline-flex items-center gap-1.5 border border-[#e8e0d0] hover:border-[#bfa06f]/50 text-[#4a4a4a] hover:text-[#bfa06f] text-[0.65rem] sm:text-sm font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200"
            >
              <ArrowLeft className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 group-hover:-translate-x-0.5 transition-transform" />
              All Posts
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 bg-[#bfa06f] hover:bg-[#a08a5f] text-white text-[0.65rem] sm:text-sm font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-colors"
            >
              <Share2 className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" />
              {copied ? 'Link Copied!' : 'Share Post'}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogPostDetailPage;
