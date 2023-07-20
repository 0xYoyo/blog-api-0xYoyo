import App from "../App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostDetail from "../components/PostDetail.jsx";
import NewPost from "../components/NewPost.jsx";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/new-post",
      element: <NewPost />,
    },
    {
      path: "/posts/:id",
      element: <PostDetail />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
