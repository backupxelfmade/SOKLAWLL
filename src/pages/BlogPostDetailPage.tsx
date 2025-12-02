import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { getBlogPostBySlug, BlogPost } from '../services/caisyApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogPostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('No post slug provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getBlogPostBySlug(slug);

        if (!data) {
          setError('Blog post not found');
        } else {
          setPost(data);
        }
      } catch (err) {
        setError('Failed to load blog post. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-24 mb-8" />
            <div className="h-12 bg-slate-200 rounded w-3/4 mb-4" />
            <div className="flex gap-6 mb-8">
              <div className="h-4 bg-slate-200 rounded w-32" />
              <div className="h-4 bg-slate-200 rounded w-32" />
            </div>
            <div className="w-full h-96 bg-slate-200 rounded-xl mb-8" />
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <p className="text-red-800 text-lg">{error || 'Blog post not found'}</p>
          </div>
        </div>
      </div>
      <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-slate-600">
            {post.publishedDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.publishedDate)}</span>
              </div>
            )}

            {post.author && (
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
            )}
          </div>
        </header>

        {post.featuredImage && (
          <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
            <img
              src={post.featuredImage.src}
              alt={post.featuredImage.title || post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {post.excerpt && (
          <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
            <p className="text-lg text-slate-700 leading-relaxed italic">
              {post.excerpt}
            </p>
          </div>
        )}

        <div className="prose prose-lg prose-slate max-w-none">
          <div
            className="text-slate-700 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Link>
        </div>
      </article>
    </div>
    <Footer />
    </>
  );
};

export default BlogPostDetailPage;
