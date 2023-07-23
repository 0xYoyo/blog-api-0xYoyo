import { useEffect, useState } from "react";
import "../styles/App.css";
import { API_URL } from "../utils/config";
import { Link, useParams } from "react-router-dom";

function PostDetail() {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const getPostDetails = async (id) => {
    const response = await fetch(`${API_URL}/post/${id}`, {});
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

  const deleteComment = async (commentid) => {
    if (!id) return;
    await fetch(`${API_URL}/admin/post/${id}/comment/${commentid}`, {
      method: "DELETE",
    });
    return;
  };

  const handleDelete = (commentid) => {
    deleteComment(commentid);
    setComments(() => comments.filter((c) => c !== commentid));
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

      <ul className="comments">
        {comments.map((comment) => (
          <li key={comment._id}>
            <div className="comment">
              <h3>{comment.name}</h3>
              <p>{comment.commentContent}</p>
            </div>
            <button
              onClick={() => {
                handleDelete(comment._id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostDetail;
