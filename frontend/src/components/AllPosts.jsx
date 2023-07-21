import { useEffect, useState } from "react";
import "../styles/App.css";
import { API_URL } from "../utils/config";
import { Link } from "react-router-dom";
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
      <ul className="allPosts">
        {allPosts.map((post) => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <Link to={`/`}>Home</Link>
    </div>
  );
}

export default AllPosts;
