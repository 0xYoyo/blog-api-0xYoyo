import { useEffect, useState } from "react";
import "../styles/AllPosts.css";
import { API_URL } from "../utils/config";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import Nav from "./Nav";

function AllPosts() {
  const [allPosts, setAllPosts] = useState([]);

  const getAllPosts = async () => {
    const response = await fetch(`${API_URL}/posts`);
    return response.json();
  };

  useEffect(() => {
    async function fetchAllPosts() {
      const newPosts = await getAllPosts();
      setAllPosts(newPosts);
    }
    fetchAllPosts();
  }, []);
  console.log(allPosts);

  return (
    <div className="AllPosts">
      <Nav />
      <div className="content">
        <h1>All Posts</h1>
        <ul className="allPosts">
          {allPosts.map((post) => (
            <li key={post._id}>
              <Link to={`/posts/${post._id}`}>
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
      </div>
    </div>
  );
}

export default AllPosts;
