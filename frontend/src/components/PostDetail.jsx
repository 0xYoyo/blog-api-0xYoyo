import { useEffect, useState } from "react";
import "../styles/PostDetail.css";
import { API_URL } from "../utils/config";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import Nav from "./Nav";
import { DateTime } from "luxon";
// import { v4 as uuidv4 } from "uuid";

function PostDetail() {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [commentStatus, setCommentStatus] = useState(true);

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
    setCommentStatus(true);
  };

  const addComment = () => {
    setCommentStatus(false);
  };

  return (
    <div className="PostDetails">
      <Nav />
      <div className="content">
        <div className="postDetails">
          <div className="top">
            <h1>{postDetails.title}</h1>
            <p>{DateTime.fromISO(postDetails.timestamp).toLocaleString()}</p>
          </div>
          <p>{postDetails.postContent}</p>
        </div>
        {commentStatus ? (
          <button onClick={addComment}>Add new comment</button>
        ) : (
          <CommentForm handleForm={handleForm} />
        )}
        <ul className="comments">
          {comments.map((comment) => (
            <li className="card" key={comment._id}>
              <h3>{comment.name}</h3>
              <p>{comment.commentContent}</p>
              <p id="fulltime">
                {DateTime.fromISO(comment.timestamp).toLocaleString(
                  DateTime.DATETIME_FULL
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostDetail;
