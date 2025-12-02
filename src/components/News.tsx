import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowRight, AlertCircle } from 'lucide-react';
import NewsLoader from './NewsLoader';
import { getAllBlogPosts, BlogPost } from '../services/caisyApi';

const News = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Animate cards when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.news-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in-up');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAllBlogPosts();
        setPosts(data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError("Unable to load blog posts at the moment. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleArticleClick = (post: BlogPost) => {
    navigate(`/blog/${post.slug}`);
  };

  const handleViewAllClick = () => {
    navigate('/blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleRetry = () => {
    setError(null);
    window.location.reload();
  };

  return (
    <section ref={sectionRef} id="news" className="py-16 md:py-20 lg:py-24" style={{ backgroundColor: '#f5f5f0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-blue-900">
            Latest Blog Posts
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 leading-relaxed">
            Stay updated with our latest legal insights, case victories, and important legal developments
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 mx-auto mt-4 md:mt-6"></div>
        </div>

        {isLoading && (
          <NewsLoader
            message="Loading latest blog posts..."
            variant="cards"
          />
        )}

        {error && !isLoading && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 md:p-8 max-w-md mx-auto">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Posts</h3>
              <p className="text-red-600 mb-6 text-sm md:text-base">{error}</p>
              <button
                onClick={handleRetry}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {!isLoading && !error && posts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Posts Available</h3>
              <p className="text-gray-600">Check back later for new content.</p>
            </div>
          </div>
        )}

        {!isLoading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="news-card bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl opacity-0 group"
                onClick={() => handleArticleClick(post)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleArticleClick(post);
                  }
                }}
                aria-label={`Read article: ${post.title}`}
              >
                {post.featuredImage && (
                  <div className="aspect-video overflow-hidden bg-gray-200">
                    <img
                      src={post.featuredImage.src}
                      alt={post.featuredImage.title || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm md:text-base leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      {post.publishedDate && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.publishedDate)}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-1 text-yellow-600 group-hover:text-yellow-700 font-medium">
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {post.author && (
                    <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {post.author}
                      </span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {!isLoading && !error && posts.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={handleViewAllClick}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:from-yellow-700 hover:to-yellow-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm md:text-base"
              type="button"
              aria-label="View all blog posts"
            >
              <span>View All Posts</span>
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
