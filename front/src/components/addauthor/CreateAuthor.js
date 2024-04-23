import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateAuthor() {
  const initalauthor = {
    name: "",
    genre: "",
    biography: "",
    image: ""
  };
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState(initalauthor);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAuthors({ ...authors, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    console.log(authors);
    await axios
      .post("/author", authors)
      .then(() => {
        navigate("/authorlist");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop: 50 }}>
      <div className="modal-content">
        <form className="form" onSubmit={handleSubmit}>
          <div
            style={{ marginTop: "30px" }}
            className="modal-header d-flex justify-content-between"
          >
            <h4 className="modal-title">Add Author</h4>
            <Link to="/authorlist">
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </Link>
          </div>
          <div style={{ marginTop: "10px" }} className="modal-body">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={authors.name}
                name="name"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Biography:</label>
              <textarea
                cols="7"
                value={authors.biography}
                name="biography"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Genre:</label>
              <input
                value={authors.genre}
                name="genre"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="text"
                value={authors.image}
                name="image"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          </div>
          <div style={{ marginTop: "10px" }} className="modal-footer">
            <Link to="/authorlist">
              <input
                type="button"
                style={{ margin: "5px" }}
                className="btn btn-danger"
                value="Dismiss"
              />
            </Link>
            <input
              type="submit"
              value="Create"
              disabled={loading}
              className="btn btn-primary float-right"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAuthor;
