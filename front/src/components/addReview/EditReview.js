import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState({
    bookId: "",
    userName: "",
    comment: "",
    rating: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`/reviews/${id}`);
        setReview(response.data);
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };
    fetchReview();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/reviews/${id}`, review);
      setLoading(false);
      navigate("/reviewlist");
    } catch (error) {
      console.error("Error updating review:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Edit Review</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bookId">Book ID:</label>
          <input
            type="text"
            className="form-control"
            id="bookId"
            name="bookId"
            value={review.bookId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="userName"
            value={review.userName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            className="form-control"
            id="comment"
            name="comment"
            value={review.comment}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="text"
            className="form-control"
            id="rating"
            name="rating"
            value={review.rating}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Review"}
        </button>
        <Link to="/reviewlist" className="btn btn-secondary ms-2">
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default EditReview;
