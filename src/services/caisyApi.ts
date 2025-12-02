const CAISY_API_KEY = 'f2iiXhHIObO05aNEle1vDlaDq0iGHmbr';
const CAISY_PROJECT_ID = '7763a144-9074-4dc5-a2f5-e2521e343d6b';
const CAISY_GRAPHQL_ENDPOINT = `https://cloud.caisy.io/api/v3/e/${CAISY_PROJECT_ID}/graphql`;

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
}

interface CaisyBlogPost {
  id: string;
  title: string;
  slug: string;
  author?: string;
  publishedDate: string;
  featuredImage?: {
    src: string;
    title: string;
  };
  content?: {
    json: any;
  };
}

interface CaisyResponse {
  data: {
    allBlog: {
      edges: Array<{
        node: CaisyBlogPost;
      }>;
    };
  };
}

const fetchFromCaisy = async (query: string): Promise<CaisyResponse> => {
  try {
    const response = await fetch(CAISY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-caisy-apikey': CAISY_API_KEY,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    return result;
  } catch (error) {
    console.error('Caisy API Error:', error);
    throw error;
  }
};

const convertCaisyContentToHTML = (content: any): string => {
  if (!content || !content.json) return '';

  try {
    const doc = content.json;
    if (!doc.content || !Array.isArray(doc.content)) return '';

    return doc.content.map((node: any) => {
      if (node.type === 'paragraph') {
        const text = node.content?.map((c: any) => c.text || '').join('') || '';
        return `<p>${text}</p>`;
      }
      return '';
    }).join('');
  } catch (e) {
    return '';
  }
};

const extractExcerpt = (content: any, maxLength: number = 200): string => {
  const html = convertCaisyContentToHTML(content);
  const text = html.replace(/<[^>]*>/g, '');
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  const query = `
    query AllBlogPosts {
      allBlog {
        edges {
          node {
            id
            title
            slug
            author
            publishedDate
            featuredImage {
              src
              title
            }
            content {
              json
            }
          }
        }
      }
    }
  `;

  const response = await fetchFromCaisy(query);
  return response.data.allBlog.edges.map(edge => {
    const node = edge.node;
    return {
      id: node.id,
      title: node.title,
      slug: node.slug,
      author: node.author,
      publishedDate: node.publishedDate,
      featuredImage: node.featuredImage,
      content: convertCaisyContentToHTML(node.content),
      excerpt: extractExcerpt(node.content)
    };
  });
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const allPosts = await getAllBlogPosts();
  return allPosts.find(post => post.slug === slug) || null;
};
