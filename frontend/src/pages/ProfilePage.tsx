import React from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Box, Avatar, Typography, Paper, Divider, Grid, Button } from "@mui/material";
import { mockPosts } from "../utils/mockPosts"; // Replace with real API fetch later

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null; // Optionally, redirect or show loading

  // Filter posts for those by this user
  // For real data, filter by user ID/email, here just "Alice" as a placeholder
  const myPosts = mockPosts.filter(
    (post) =>
      post.author.name === user.displayName ||
      post.author.name === user.email ||
      post.author.email === user.email
  );

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar src={user.photoURL || undefined} sx={{ width: 90, height: 90, mb: 2 }}>
            {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {user.displayName || user.email}
          </Typography>
          {user.email && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {user.email}
            </Typography>
          )}
        </Box>
        <Divider sx={{ my: 3 }} />
        <Button
  variant="contained"
  sx={{ mt: 2 }}
  onClick={() => alert("Edit profile coming soon!")}
>
  Edit Profile
</Button>
        <Typography variant="h6" sx={{ mb: 1 }}>
          My Posts
        </Typography>
        {myPosts.length ? (
          <Grid container spacing={2}>
            {myPosts.map((post) => (
              <Grid item xs={12} sm={6} key={post.id}>
                <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.description.slice(0, 40)}...
                  </Typography>
                  {/* Optional: Add button to view post */}
                  <Button
                    href={`/post/${post.id}`}
                    sx={{ mt: 1 }}
                    size="small"
                    variant="outlined"
                  >
                    View
                  </Button>
                  
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography color="text.secondary">No posts yet.</Typography>
        )}
      </Paper>
      
    </Container>
  );
};

export default ProfilePage;