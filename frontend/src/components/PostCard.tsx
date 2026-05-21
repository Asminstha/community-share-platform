import React, { useRef, useEffect } from "react";
import { Card, CardHeader, CardMedia, CardContent, Typography, Chip, Avatar, Box } from "@mui/material";
import { Post } from "../types/Post";
import { gsap } from "gsap";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";


type Props = {
  post: Post;
  index?: number;
};

const PostCard: React.FC<Props> = ({ post, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: index ? index * 0.07 : 0, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <Box ref={cardRef} sx={{ my: 2 }}>
      <Card sx={{ width: "100%", boxShadow: 2, borderRadius: 3 }}>
       <CardHeader
  avatar={<Avatar src={post.author.avatar} />}
  title={
    <Link
      component={RouterLink}
      to={`/post/${post.id}`}
      underline="hover"
      color="inherit"
      sx={{ fontWeight: 700, fontSize: 18, cursor: "pointer" }}
    >
      {post.title}
    </Link>
  }
  subheader={
    <>
      <Chip
        size="small"
        label={post.type === "offer" ? "Offer" : "Request"}
        color={post.type === "offer" ? "success" : "info"}
        sx={{ mr: 1 }}
      />
      <span>{post.location}</span>
    </>
  }
/>
        {post.image && (
          <CardMedia
            component="img"
            image={post.image}
            alt={post.title}
            sx={{ maxHeight: 200, objectFit: "cover" }}
          />
        )}
        <CardContent>
          <Typography variant="body2" gutterBottom>
            {post.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            By {post.author.name} • {new Date(post.date).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostCard;