import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("/reviews");
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this review?");
    if (confirmed) {
      try {
        await axios.delete(`/reviews/${id}`);
        setReviews(reviews.filter((review) => review.id !== id));
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  const handleReadMore = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "5px" }}>Reviews</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="float-right">
            <Link to="/createreview">
              <button className="btn btn-primary">Create New</button>
            </Link>
          </div>
        </div>

        <table className="table table-bordered" id="reviewTable" width="100%" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Book ID</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.userName}</td>
                <td>{review.bookId}</td>
                <td>
                  {review.comment.length > 150 ? (
                    <div>
                      <div>{`${review.comment.slice(0, 150)}...`}</div>
                      <button
                        style={{ border: "none", background: "none", color: "blue" }}
                        onClick={() => handleReadMore(review)}
                      >
                        Read More
                      </button>
                    </div>
                  ) : (
                    <div>{review.comment}</div>
                  )}
                </td>
                <td>{review.rating}</td>
                <td>
                  <Link to={`/editreview/${review.id}`}>
                    <button className="btn btn-primary" style={{ marginRight: "5px" }}>
                      Edit
                    </button>
                  </Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(review.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Review Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>User Name:</strong> {selectedReview?.userName}</p>
          <p><strong>Book ID:</strong> {selectedReview?.bookId}</p>
          <p><strong>Comment:</strong> {selectedReview?.comment}</p>
          <p><strong>Rating:</strong> {selectedReview?.rating}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReviewList;
