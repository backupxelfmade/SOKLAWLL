import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';
import NewsLoader from './NewsLoader';
import { getAllBlogPosts, BlogPost } from '../services/caisyApi';

const News = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.news-card').forEach((card, i) => {
              setTimeout(() => card.classList.add('animate-fade-in-up'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAllBlogPosts();
        setPosts(data.slice(0, 6));
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Unable to load blog posts at the moment. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleArticleClick = (post: BlogPost) => navigate(`/blog/${post.slug}`);

  const handleViewAllClick = () => {
    navigate('/blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <section ref={sectionRef} id="news" className="py-10 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10">

        {/* ── Section header ── */}
        <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="block h-px w-5 sm:w-6 bg-[#bfa06f]" />
              <span className="text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-widest text-[#bfa06f]">
                Insights & Updates
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight">
              Latest Blog Posts
            </h2>
          </div>

          {/* Desktop "View All" */}
          {!isLoading && !error && posts.length > 0 && (
            <button
              onClick={handleViewAllClick}
              className="hidden sm:flex items-center gap-2 self-end text-sm font-semibold text-[#bfa06f] hover:text-[#a08a5f] transition-colors duration-200 group pb-1 border-b border-[#bfa06f]/40 hover:border-[#a08a5f] whitespace-nowrap"
            >
              <span>View All Posts</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>

        {/* Subheading — desktop only */}
        <p className="hidden sm:block text-base text-[#4a4a4a] max-w-2xl mb-10 leading-relaxed">
          Stay updated with our latest legal insights, case victories, and important
          legal developments affecting individuals and businesses in Kenya.
        </p>

        {/* ── Loading ── */}
        {isLoading && (
          <NewsLoader message="Loading latest blog posts..." variant="cards" />
        )}

        {/* ── Error ── */}
        {error && !isLoading && (
          <div className="py-10 flex justify-center">
            <div className="bg-[#f9f7f1] border border-[#e8e0d0] rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center">
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-red-100 mx-auto mb-4">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="text-sm font-bold text-[#1a1a1a] mb-1">Unable to Load Posts</h3>
              <p className="text-xs text-[#6a6a6a] mb-5 leading-relaxed">{error}</p>
              <button
                onClick={() => { setError(null); window.location.reload(); }}
                className="flex items-center justify-center gap-2 bg-[#bfa06f] hover:bg-[#a08a5f] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 mx-auto"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        )}

        {/* ── Empty ── */}
        {!isLoading && !error && posts.length === 0 && (
          <div className="py-10 flex justify-center">
            <div className="bg-[#f9f7f1] border border-[#e8e0d0] rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center">
              <h3 className="text-sm font-bold text-[#1a1a1a] mb-1">No Posts Yet</h3>
              <p className="text-xs text-[#6a6a6a]">Check back later for new content.</p>
            </div>
          </div>
        )}

        {/* ── Posts grid ── */}
        {!isLoading && !error && posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="news-card opacity-0 group bg-white border border-[#e8e0d0] hover:border-[#bfa06f]/40 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
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
                  {/* Featured image */}
                  {post.featuredImage && (
                    <div className="aspect-video overflow-hidden bg-[#e8e0d0]">
                      <img
                        src={post.featuredImage.src}
                        alt={post.featuredImage.title || post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Card body */}
                  <div className="p-3.5 sm:p-5">
                    {/* Gold rule */}
                    <div className="w-4 sm:w-5 h-0.5 bg-[#bfa06f] mb-2 sm:mb-3 transition-all duration-300 group-hover:w-6 sm:group-hover:w-8" />

                    {/* Title */}
                    <h3 className="font-bold text-[#1a1a1a] leading-snug line-clamp-2 mb-1.5 sm:mb-2
                      text-sm sm:text-base lg:text-lg group-hover:text-[#bfa06f] transition-colors duration-200">
                      {post.title}
                    </h3>

                    {/* Excerpt — desktop only */}
                    <p className="hidden sm:block text-[#6a6a6a] text-sm leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        {post.publishedDate && (
                          <div className="flex items-center gap-1 text-[#6a6a6a]">
                            <Calendar className="h-3 w-3 flex-shrink-0" />
                            <span className="text-[0.6rem] sm:text-xs truncate">
                              {formatDate(post.publishedDate)}
                            </span>
                          </div>
                        )}
                        {post.author && (
                          <div className="hidden sm:flex items-center gap-1 text-[#6a6a6a]">
                            <User className="h-3 w-3 flex-shrink-0" />
                            <span className="text-xs truncate">{post.author}</span>
                          </div>
                        )}
                      </div>

                      {/* Read more */}
                      <div className="flex items-center gap-1 text-[#bfa06f] font-semibold flex-shrink-0
                        text-[0.6rem] sm:text-xs group-hover:gap-1.5 transition-all duration-200">
                        <span>Read</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Mobile "View All" */}
            <div className="mt-6 flex justify-center sm:hidden">
              <button
                onClick={handleViewAllClick}
                className="flex items-center justify-center gap-2 bg-[#bfa06f] hover:bg-[#a08a5f] text-white font-semibold text-sm px-6 py-2.5 rounded-full shadow-md transition-all duration-200 group w-full max-w-xs"
              >
                <span>View All Posts</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default News;
