import React from "react";
import { Route, Routes } from "react-router";
import BookList from "./addbooks/BookList";
import EditBook from "./addbooks/EditBook";
import CreateBook from './addbooks/CreateBook';


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