import { useEffect, useState } from "react";
import "../styles/App.css";
import { API_URL } from "../utils/config";
import { Link, useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
// import { v4 as uuidv4 } from "uuid";

function PostDetail() {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const getPostDetails = async (id) => {
    const response = await fetch(`${API_URL}/post/${id}`);
    return response.json();
  };

  useEffect(() => {
    async function fetchPostDetails() {
      if (!id) return;
      const [newPost, newComments] = await getPostDetails(id);
      setPostDetails(newPost);
      setComments(newComments);
    }
    fetchPostDetails();
  }, [id, comments]);

  const handleForm = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div className="PostDetails">
      <Link to={`/`}>Home</Link>

      <div className="postDetails">
        <div>
          <h1>{postDetails.title}</h1>
          <p>{postDetails.timestamp}</p>
        </div>
        <p>{postDetails.postContent}</p>
      </div>
      <CommentForm handleForm={handleForm} />
      <ul className="comments">
        {comments.map((comment) => (
          <li key={comment._id}>
            <h3>{comment.name}</h3>
            <p>{comment.commentContent}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostDetail;
