import { useEffect, useState } from "react";
import "./styles/App.css";
import { API_URL } from "./utils/config";
import { Link } from "react-router-dom";
import Nav from "./components/Nav";
import { DateTime } from "luxon";

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
      <Nav />
      <div className="content">
        <h1>Latest Posts</h1>
        <ul className="homePosts">
          {homePosts.map((post) => (
            <li key={post._id}>
              <Link to={`posts/${post._id}`}>
                <div className="card">
                  <div className="top">
                    <h2>{post.title}</h2>
                    <p>{DateTime.fromISO(post.timestamp).toLocaleString()}</p>
                  </div>
                  <p>{post.postContent.substr(0, 200) + "..."}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <button>
          <Link to={`posts`}>Discover All Posts</Link>
        </button>
      </div>
    </div>
  );
}

export default App;
