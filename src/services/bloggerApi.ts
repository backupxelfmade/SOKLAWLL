export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedDate: string;
  featuredImage?: {
    src: string;
    title: string;
  };
  author?: string;
  url?: string;
}

interface BloggerPost {
  id: string;
  title: string;
  content: string;
  published: string;
  url: string;
  author?: {
    displayName: string;
  };
  images?: Array<{
    url: string;
  }>;
}

interface BloggerApiResponse {
  items?: BloggerPost[];
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const fetchFromBlogger = async (endpoint: string): Promise<BloggerApiResponse> => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase configuration is missing');
  }

  try {
    const url = `${SUPABASE_URL}/functions/v1/fetch-blog-posts?endpoint=${encodeURIComponent(endpoint)}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API request failed: ${response.status} ${errorData.error || response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Blogger API Error:', error);
    throw error;
  }
};

const stripHtml = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const extractExcerpt = (content: string, maxLength: number = 200): string => {
  const text = stripHtml(content);
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const extractFeaturedImage = (post: BloggerPost) => {
  if (post.images && post.images.length > 0) {
    return {
      src: post.images[0].url,
      title: post.title
    };
  }

  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = post.content.match(imgRegex);

  if (match && match[1]) {
    return {
      src: match[1],
      title: post.title
    };
  }

  return undefined;
};

const generateSlug = (title: string, id: string): string => {
  const slugFromTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${slugFromTitle}-${id.substring(0, 8)}`;
};

const transformBloggerPost = (post: BloggerPost): BlogPost => {
  return {
    id: post.id,
    title: post.title,
    slug: generateSlug(post.title, post.id),
    excerpt: extractExcerpt(post.content),
    content: post.content,
    publishedDate: post.published,
    featuredImage: extractFeaturedImage(post),
    author: post.author?.displayName,
    url: post.url
  };
};

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await fetchFromBlogger('posts?maxResults=50');

  if (!response.items || response.items.length === 0) {
    return [];
  }

  return response.items.map(transformBloggerPost);
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const allPosts = await getAllBlogPosts();
  return allPosts.find(post => post.slug === slug) || null;
};

export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const response = await fetchFromBlogger(`posts/${id}`);

    if (!response || typeof response !== 'object' || !('id' in response)) {
      return null;
    }

    return transformBloggerPost(response as unknown as BloggerPost);
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    return null;
  }
};
