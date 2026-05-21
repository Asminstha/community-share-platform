export type PostType = "offer" | "request";

export interface Post {
  id: number;
  type: PostType;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  location: string; // Example: "Kathmandu, Nepal"
  image?: string;
}