import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";

function CreateBestSeller() {
  const [title, setTitle] = useState("");
  const [authorName, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [year, setYear] = useState(new Date());
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const books = {
      title: title,
      authorName: authorName,
      category: category,
      rating: rating,
      year: year,
      description: description,
      image: image,
      price:price
    };

    console.log(books);
    await axios
      .post("/bestsellers", books)
      .then(() => {
        navigate("/bestsellerlist");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop: 50}}>
      <div className="modal-content">
        <form className="form" onSubmit={handleSubmit}>
          <div style={{ marginTop: "30px" }} className="modal-header d-flex justify-content-between">
            <h4 className="modal-title">Add Article</h4>
            <Link to="/bestsellerlist">
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </Link>
          </div>
          <div style={{ marginTop: "10px" }} className="modal-body">
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthor(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <ReactQuill
                className="quill-editor"
                value={description}
                onChange={(value) => setDescription(value)}
              />
            </div>

            <div className="form-group">
              <label>Category:</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="date"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Rating:</label>
              <input
                type="text"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div style={{ marginTop: "10px" }} className="modal-footer">
            <Link to="/bestsellerlist">
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

export default CreateBestSeller;