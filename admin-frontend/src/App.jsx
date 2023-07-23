import { useEffect, useState } from "react";
import "./styles/App.css";
import { API_URL } from "./utils/config";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "./utils/authService";

function App() {
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const { fetch: originalFetch } = window;
    window.fetch = async (...args) => {
      let [resource, options] = args;
      const jwtToken = localStorage.getItem("jwt_token");
      if (jwtToken) {
        const loginStatus = isLoggedIn();
        if (loginStatus === true) {
          options.headers = { ...options.headers, Authorization: jwtToken };
        } else {
          logout();
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
      const response = await originalFetch(resource, options);
      return response;
    };
  });

  const getAllPosts = async () => {
    const response = await fetch(`${API_URL}/admin/posts`, {});
    return response.json();
  };

  const handlePublishedStatus = async (id) => {
    await fetch(`${API_URL}/admin/post/${id}`, {
      method: "PUT",
    });
    const newPosts = await getAllPosts();
    setAllPosts(newPosts);
    return;
  };

  useEffect(() => {
    async function fetchAllPosts() {
      const newPosts = await getAllPosts();
      setAllPosts(newPosts);
    }
    fetchAllPosts();
  }, []);

  return (
    <div className="AllPosts">
      <h1>Home page</h1>
      <ul className="allPosts">
        {allPosts.map((post) => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
            <input
              type="checkbox"
              checked={post.published}
              onChange={() => {
                handlePublishedStatus(post._id);
              }}
            />
          </li>
        ))}
      </ul>
      <Link to={`/new-post`}>Create new post</Link>
    </div>
  );
}

export default App;
