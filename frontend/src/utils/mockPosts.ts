import { Post } from "../types/Post";

export const mockPosts: Post[] = [
  {
    id: 1,
    type: "offer",
    title: "Lawn Mower for Lending",
    description: "Available this weekend. Good for small yards. Pick up in Jawalakhel.",
    author: {
      name: "Alice",
      avatar: "https://i.pravatar.cc/100?img=1"
    },
    date: "2026-05-22T12:00:00Z",
    location: "Jawalakhel, Lalitpur",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    type: "request",
    title: "Need Help Moving Boxes",
    description: "Seeking 2 people to help move boxes Saturday. Food included!",
    author: {
      name: "Bob",
      avatar: "https://i.pravatar.cc/100?img=2"
    },
    date: "2026-05-23T09:00:00Z",
    location: "Baneshwor, Kathmandu",
    image: "",
  },
];