import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";

function CreateBook() {
  const initalbooks = {
    title: "",
    type: 0,
    category: "",
    rating: 0,
    year: new Date(),
    description: "",
    image: "",
    price: 0,
    authorId: "",
  };
  const [books, setBooks] = useState(initalbooks);
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    await axios
      .get("/author")
      .then((res) => {
        setAuthors(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBooks({ ...books, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    console.log(books);
    await axios
      .post("/books", books)
      .then(() => {
        navigate("/booklist");
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
            <h4 className="modal-title">Add Article</h4>
            <Link to="/booklist">
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
                value={books.title}
                name="title"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <select
                onChange={handleInputChange}
                name="authorId"
                value={books.authorId}
              >
                <option value="">Select Author</option>
                {authors.map((author, index) => (
                <option key={index} value={author.id}>{author.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Description:</label>
              <ReactQuill
                className="quill-editor"
                value={books.description}
                onChange={(e)=> setBooks({...books, description:e})}
              />
            </div>

            <div className="form-group">
              <label>Category:</label>
              <input
                value={books.category}
                name="category"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="text"
                value={books.image}
                name="image"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="date"
                value={books.year}
                name="year"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Rating:</label>
              <input
                type="text"
                value={books.rating}
                name="rating"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input
                type="text"
                value={books.price}
                name="price"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Type:</label>
              <select
                onChange={handleInputChange}
                name="type"
                value={books.type}
              >
                <option value={0}>All</option>
                <option value={1}>Bestseller</option>
                <option value={2}>Recommended</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: "10px" }} className="modal-footer">
            <Link to="/booklist">
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

export default CreateBook;
