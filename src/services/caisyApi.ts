const CAISY_API_KEY = 'f2iiXhHIObO05aNEle1vDlaDq0iGHmbr';
const CAISY_PROJECT_ID = '[PROJECT_ID]';
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
  author?: {
    name: string;
  };
}

interface CaisyResponse {
  data: {
    allBlogPost: {
      edges: Array<{
        node: BlogPost;
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

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  const query = `
    query AllBlogPosts {
      allBlogPost {
        edges {
          node {
            id
            title
            slug
            excerpt
            content
            publishedDate
            featuredImage {
              src
              title
            }
            author {
              name
            }
          }
        }
      }
    }
  `;

  const response = await fetchFromCaisy(query);
  return response.data.allBlogPost.edges.map(edge => edge.node);
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const allPosts = await getAllBlogPosts();
  return allPosts.find(post => post.slug === slug) || null;
};
