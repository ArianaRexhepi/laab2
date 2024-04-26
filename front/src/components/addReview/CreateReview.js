import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateReview() {
  const [bookId, setBookId] = useState("");
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const reviewData = {
      bookId: bookId,
      userName: userName,
      comment: comment,
      rating: rating,
    };

    console.log(reviewData);
    await axios
      .post("/reviews", reviewData)
      .then(() => {
        navigate("/reviewlist");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h2>Add Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bookId">Book ID:</label>
          <input
            type="text"
            id="bookId"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userName">Your Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-control"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="form-control"
            min="1"
            max="5"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
        <Link to="/reviewlist" className="btn btn-danger ml-2">
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default CreateReview;
