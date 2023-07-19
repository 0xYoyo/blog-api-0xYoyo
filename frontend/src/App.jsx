import { useEffect, useState } from "react";
import "./styles/App.css";
import { API_URL } from "./utils/config";
import { Link } from "react-router-dom";

function App() {
  const [homePosts, setHomePosts] = useState([]);

  const getHomePosts = async () => {
    const response = await fetch(`${API_URL}`);
    return response.json();
  };

  useEffect(() => {
    async function fetchHomePosts() {
      const newPosts = await getHomePosts();
      setHomePosts(newPosts);
    }
    fetchHomePosts();
  }, []);
  console.log(homePosts);

  return (
    <div className="App">
      <ul className="homePosts">
        {homePosts.map((post) => (
          <li key={post._id}>
            <Link to={`posts/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <Link to={`posts`}>Discover All Posts</Link>
    </div>
  );
}

export default App;
