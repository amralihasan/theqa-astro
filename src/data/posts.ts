import type { Post } from '../types/Post';
import { fetchPostFromAPI } from '../services/api';

let cachedPost: Post | null = null;

export async function getAllPosts(): Promise<Post[]> {
  if (cachedPost) {
    console.log('Using cached post with slug:', cachedPost.slug);
    return [cachedPost];
  }
  
  const apiPost = await fetchPostFromAPI();
  if (apiPost) {
    console.log('Using API post with slug:', apiPost.slug);
    cachedPost = apiPost;
    return [cachedPost];
  } else {
    console.error('Failed to fetch post from API - no fallback will be used');
    throw new Error('Unable to fetch post data from API');
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug);
}