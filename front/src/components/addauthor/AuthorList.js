import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function AuthorList() {
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/author");
      setAuthor(res.data);
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this author?"
    );
    if (confirmed) {
      await axios.delete(`/author/${id}`);
      setAuthor(author.filter((book) => book.id !== id));
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "5px" }}>Author</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="float-right"
          >
            <Link to="/createauthor">
              <button className="btn btn-primary">Create New</button>
            </Link>
          </div>
        </div>

        <table
          className="table table-bordered"
          id="dataTable"
          width="100%"
          cellSpacing="0"
        >
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Name</th>
              <th>Biography</th>
              <th>Genre</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {author.map((book) => (
              <tr key={book.id}>
                {/* <td>{book.id}</td> */}
                <td>{book.name}</td>
                <td>{book.biography}</td>
                <td>{book.genre}</td>
                <td>
                  <img
                    src={book.image}
                    alt=""
                    style={{
                      width: "200px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>
                  <Link to={`/editauthor/${book.id}`}>
                    <button
                      style={{ margin: "5px" }}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AuthorList;
