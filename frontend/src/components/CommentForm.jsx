import "../styles/App.css";
import { API_URL } from "../utils/config";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

function CommentForm({ handleForm }) {
  const { id } = useParams();

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
      handleForm(responseData);
      console.log({ responseData });
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="CommentForm">
      <form
        action={`${API_URL}/post/${id}/comment`}
        method="POST"
        onSubmit={handleSubmit}
      >
        <ul>
          <li>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </li>
          <li>
            <label htmlFor="commentContent">Content:</label>
            <input
              type="text"
              id="commentContent"
              name="commentContent"
              required
            />
          </li>
        </ul>
        <button>Submit</button>
      </form>
    </div>
  );
}

CommentForm.propTypes = {
  handleForm: PropTypes.func,
};

export default CommentForm;
