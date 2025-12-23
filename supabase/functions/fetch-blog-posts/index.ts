import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const endpoint = url.searchParams.get("endpoint") || "posts?maxResults=50";

    const BLOGGER_API_KEY = Deno.env.get("BLOGGER_API_KEY");
    const BLOGGER_BLOG_ID = Deno.env.get("BLOGGER_BLOG_ID");

    if (!BLOGGER_API_KEY || !BLOGGER_BLOG_ID) {
      throw new Error("Missing Blogger API credentials");
    }

    const bloggerUrl = `https://www.googleapis.com/blogger/v3/blogs/${BLOGGER_BLOG_ID}/${endpoint}${endpoint.includes('?') ? '&' : '?'}key=${BLOGGER_API_KEY}`;

    const response = await fetch(bloggerUrl);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Blogger API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to fetch blog posts"
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});