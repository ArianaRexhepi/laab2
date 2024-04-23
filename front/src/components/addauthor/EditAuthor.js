import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditAuthor() {
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`author/${id}`).then((response) => {
      setAuthors(response.data);
    });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAuthors({ ...authors, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.put(`author/${id}`, authors).then(() => {
        setLoading(false);
        navigate("/authorlist");
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!authors) return <div>Loading...</div>;

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop: "50px" }}>
      <div className="modal-content">
        <form className="form">
          <div
            style={{ marginTop: "30px" }}
            className="modal-header d-flex justify-content-between"
          >
            <h4 className="modal-title">Edit Author</h4>
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
          <div className="modal-footer">
            <Link to="/booklist">
              <input
                type="button"
                style={{ margin: "5px" }}
                className="btn btn-danger"
                value="Dismiss"
              />
            </Link>
            <input
              onClick={handleSubmit}
              type="submit"
              disabled={loading}
              value="Edit"
              className="btn btn-primary float-right"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAuthor;
