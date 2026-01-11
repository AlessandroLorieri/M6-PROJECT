import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import AuthorsPage from "./pages/AuthorsPage/AuthorsPage";
import BlogPostPage from "./pages/BlogPostPage/BlogPostPage";
import BlogPostDetailPage from "./pages/BlogPostDetailPage/BlogPostDetailPage";
import AuthorDetailPage from "./pages/AuthorDetailPage/AuthorDetailPage";
import NewPostPage from "./pages/NewPostPage/NewPostPage";




export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<BlogPostPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/blogposts/:id" element={<BlogPostDetailPage />} />
        <Route path="/authors/:id" element={<AuthorDetailPage />} />
        <Route path="/new" element={<NewPostPage />} />
      </Route>
    </Routes>
  );
}


