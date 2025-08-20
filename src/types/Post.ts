export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  publishedAt: Date;
  excerpt?: string;
}