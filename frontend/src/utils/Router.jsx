import App from "../App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllPosts from "../components/AllPosts.jsx";
import PostDetail from "../components/PostDetail.jsx";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/posts",
      element: <AllPosts />,
    },
    {
      path: "/posts/:id",
      element: <PostDetail />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
