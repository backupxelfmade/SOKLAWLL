import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { getAllBlogPosts, BlogPost } from '../services/caisyApi';
import Footer from '../components/Footer';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllBlogPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-slate-900 mb-4">Blog</h1>
            <p className="text-xl text-slate-600">Insights, updates, and expertise</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="w-full h-64 bg-slate-200" />
                <div className="p-6">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-4" />
                  <div className="h-3 bg-slate-200 rounded w-full mb-2" />
                  <div className="h-3 bg-slate-200 rounded w-5/6 mb-4" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-slate-900 mb-4">Blog</h1>
            <p className="text-xl text-slate-600">Insights, updates, and expertise</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 text-lg">{error}</p>
          </div>
        </div>
      </div>
      <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Blog</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Insights, updates, and expertise from our team
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No blog posts available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100"
              >
                {post.featuredImage && (
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.featuredImage.src}
                      alt={post.featuredImage.title || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    {post.publishedDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.publishedDate)}</span>
                      </div>
                    )}

                    {post.author && (
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default BlogPage;
