import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import AuthorsPage from "./pages/AuthorsPage/AuthorsPage";
import BlogPostPage from "./pages/BlogPostPage/BlogPostPage";
import BlogPostDetailPage from "./pages/BlogPostDetailPage/BlogPostDetailPage";
import AuthorDetailPage from "./pages/AuthorDetailPage/AuthorDetailPage";
import NewPostPage from "./pages/NewPostPage/NewPostPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import GoogleCallbackPage from "./pages/OAuth/GoogleCallbackPage"

export default function App() {
  return (
    <Routes>
{/* unica rotta non protetta raggiungibile senza token */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth/google/callback" element={<GoogleCallbackPage />} />

{/*rotte protette da RequireAuth raggiungibile solo con token */}
      <Route element={<RequireAuth />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<BlogPostPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/blogposts/:id" element={<BlogPostDetailPage />} />
          <Route path="/authors/:id" element={<AuthorDetailPage />} />
          <Route path="/new" element={<NewPostPage />} />
        </Route>
      </Route>
    </Routes>
  );
}


