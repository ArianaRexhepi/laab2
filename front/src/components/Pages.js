import React from "react";
import { Route, Routes } from "react-router";
import BookList from "./Books/BookList";
import CreateBook from "./Books/CreateBook";
import EditBook from "./Books/EditBook";

const Pages = () =>{
    return(
        <>
        <Routes>
        <Route path="/booklist" element={<BookList />} />
        <Route path="/createbook" element={<CreateBook />} />
        <Route path="/editbook/:id" element={<EditBook />} />
        </Routes>
        </>
    );
}

export default Pages;