import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Overview from "./pages/Overview";

import PostListContainer from "./pages/PostListContainer";
import NewPost from "./pages/NewPost";
import PostDetail from "./pages/PostDetail";
import { memo } from "react";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/Posts" element={<PostListContainer />} />
        <Route path="/New" element={<NewPost />} />
        <Route path="/Posts/:postId" element={<PostDetail />} />
      </Routes>
      <Greeting name={"123"} />
    </Layout>
  );
}

export default App;

const Greeting = memo(function Greeting({ name }) {
  return (
    <footer>
      <p>&copy; LYX BLOG. All Rights Reserved.</p>
    </footer>
  );
});
