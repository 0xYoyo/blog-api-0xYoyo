import { useNavigate } from "react-router-dom";
import "../styles/App.css";
import { API_URL } from "../utils/config";
import { useEffect } from "react";
import { isLoggedIn, logout } from "../utils/authService";

function NewPost() {
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

  async function postFormDataAsJson({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
    return response.json();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const url = form.action;

    try {
      const formData = new FormData(form);
      const responseData = await postFormDataAsJson({ url, formData });
      console.log({ responseData });
      form.reset();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="PostForm">
      <h1>New Post</h1>
      <form
        action={`${API_URL}/admin/post`}
        method="POST"
        onSubmit={handleSubmit}
      >
        <ul>
          <li>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" required />
          </li>
          <li>
            <label htmlFor="postContent">Content:</label>
            <input type="text" id="postContent" name="postContent" required />
          </li>
        </ul>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default NewPost;
