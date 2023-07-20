import { useNavigate } from "react-router-dom";
import "../styles/App.css";
import { API_URL } from "../utils/config";

function NewPost() {
  const navigate = useNavigate();

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
