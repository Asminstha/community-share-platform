import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Card, CardHeader, Avatar, CardContent, Button } from "@mui/material";
import { mockPosts } from "../utils/mockPosts"; // use backend later

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = mockPosts.find((p) => p.id === Number(id));
  const navigate = useNavigate();

  if (!post) {
    // If post not found
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">Post not found!</Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card>
        <CardHeader
          avatar={<Avatar src={post.author.avatar} />}
          title={<Typography sx={{ fontWeight: 700 }}>{post.title}</Typography>}
          subheader={post.location}
        />
        {post.image &&
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <img
              src={post.image}
              alt={post.title}
              style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 12 }}
            />
          </Box>
        }
        <CardContent>
          <Typography variant="body1" sx={{ mb: 2 }}>{post.description}</Typography>
          <Typography variant="caption" color="text.secondary">
            By {post.author.name} • {new Date(post.date).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
        Back to Feed
      </Button>
    </Container>
  );
};

export default PostPage;