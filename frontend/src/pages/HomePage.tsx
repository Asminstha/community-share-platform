import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import PostCard from "../components/PostCard";
import { mockPosts } from "../utils/mockPosts";
import { Link } from "react-router-dom";
import button from "@mui/material/Button";
const HomePage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom  sx={{ fontWeight: 700 }}>
        Community Feed
      </Typography>
     <Grid container spacing={3}>
  {mockPosts.map((post, idx) => (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
      <PostCard post={post} index={idx} />
    </Grid>
  ))}
</Grid>
<Button color="inherit" component={Link} to="/create-post">
  Create Post
</Button>
    </Container>

  );
};

export default HomePage;