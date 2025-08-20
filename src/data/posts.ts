import type { Post } from '../types/Post';
import { fetchPostFromAPI, fallbackPost } from '../services/api';

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
  } else {
    console.log('API failed, using fallback post with slug:', fallbackPost.slug);
    cachedPost = fallbackPost;
  }
  
  return [cachedPost];
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug);
}