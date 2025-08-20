import type { Post } from '../types/Post';

interface ApiPageResponse {
  data: {
    id: number;
    url: string;
    name: string;
    description: string;
    content: string;
    updated_at?: string;
  };
  meta: {
    title: string;
    description: string;
  };
}

export async function fetchPostFromAPI(): Promise<Post | null> {
  try {
    // Get environment variables
    const baseUrl = import.meta.env.PUBLIC_API_BASE_URL;
    const apiHash = import.meta.env.PUBLIC_API_HASH;
    const authToken = "YWRtaW46U0F3S3EzQUg5bVZxVg=="; // Hardcoded for testing
    const pageSlug = import.meta.env.PUBLIC_API_PAGE_SLUG;

    if (!baseUrl || !apiHash || !pageSlug) {
      throw new Error('Missing required environment variables');
    }

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("X-API-Hash", apiHash);
    myHeaders.append("Authorization", `Basic ${authToken}`);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
    };

    const apiUrl = `${baseUrl}/page/${pageSlug}`;
    console.log('=== API REQUEST DEBUG ===');
    console.log('Base URL:', baseUrl);
    console.log('Page Slug:', pageSlug);
    console.log('Full API URL:', apiUrl);
    console.log('Request Headers:', Object.fromEntries(myHeaders.entries()));
    console.log('========================');
    
    const response = await fetch(apiUrl, requestOptions);
    
    console.log('=== API RESPONSE DEBUG ===');
    console.log('Response Status:', response.status);
    console.log('Response OK:', response.ok);
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
    console.log('=========================');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiPageResponse = await response.json();
    
    console.log('=== API DEBUG INFO ===');
    console.log('Full API Response:', JSON.stringify(result, null, 2));
    console.log('API data.url field:', result.data.url);
    console.log('Expected route: /posts/licensed-trading-companies-saudi');
    console.log('====================');
    
    // Validate required fields
    if (!result.data.content) {
      console.error('API Error: Missing content field in response');
      console.error('Available fields:', Object.keys(result.data));
      throw new Error('Content is missing from API response');
    }

    if (!result.data.name) {
      console.error('API Error: Missing name field in response');
      throw new Error('Title/name is missing from API response');
    }

    // Transform API response to our Post interface
    const post: Post = {
      id: result.data.id || 1,
      title: result.data.name,
      content: result.data.content,
      slug: result.data.url || "default-slug",
      publishedAt: result.data.updated_at ? new Date(result.data.updated_at) : new Date(),
      excerpt: result.data.description || "No description available"
    };

    console.log('=== PROCESSED POST DEBUG ===');
    console.log('Generated slug:', post.slug);
    console.log('Title:', post.title);
    console.log('Content length:', post.content.length);
    console.log('============================');
    
    return post;
  } catch (error) {
    console.error("=== API FETCH ERROR ===");
    console.error("Error type:", error instanceof Error ? error.constructor.name : typeof error);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Full error object:", error);
    
    // Log environment variables (without sensitive data)
    console.error("Environment check:");
    console.error("- BASE_URL exists:", !!import.meta.env.PUBLIC_API_BASE_URL);
    console.error("- API_HASH exists:", !!import.meta.env.PUBLIC_API_HASH);
    console.error("- AUTH_TOKEN exists:", true); // Hardcoded for testing
    console.error("- PAGE_SLUG exists:", !!import.meta.env.PUBLIC_API_PAGE_SLUG);
    console.error("======================");
    
    return null;
  }
}

