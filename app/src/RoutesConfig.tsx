import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Article from './pages/Article';
import AuthTest from './pages/AuthTest';
import CreateAd from './pages/CreateAd';
import Home from './pages/Home';
import InvalidPage from './pages/InvalidPage';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article" element={<Article />} />
      <Route path="authtest" element={<AuthTest />} />
      <Route path="ad" element={<CreateAd />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="invalidpage" element={<InvalidPage />} />
      <Route path="*" element={<Navigate to="/invalidpage" />} />
    </Routes>
  );
}
