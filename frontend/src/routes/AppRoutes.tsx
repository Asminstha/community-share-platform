import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PostPage from '../pages/PostPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import AuthPage from '../pages/AuthPage';
import PrivateRoute from './PrivateRoute';
import CreatePostPage from "../pages/CreatePostPage";


const AppRoutes: React.FC = () => (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/post/:id" element={<PostPage />} /> */}
      {/* <Route path="/profile/:id" element={<ProfilePage />} /> */}
      <Route path="*" element={<NotFoundPage />} />
      
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<PrivateRoute />}>
  {/* Put all private routes inside here */}
     <Route path="/profile/:id" element={<ProfilePage />} />
  <Route path="/post/:id" element={<PostPage />} />
    <Route path="/create-post" element={<CreatePostPage />} />

  {/* ...more private routes */}
</Route> 
    </Routes>
);

export default AppRoutes;