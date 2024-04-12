import React from "react";
import { Route, Routes } from "react-router";
import BookList from "./addbooks/BookList";
import EditBook from "./addbooks/EditBook";
import CreateBook from './addbooks/CreateBook';
import BestSellerList from "./addbestseller/BestSellerList";
import EditBestSeller from "./addbooks/EditBestSeller";
import CreateBestSeller from './addbestseller/CreateBestSeller';

const Pages = () =>{
    return(
        <>
        <Routes>
        <Route path="/booklist" element={<BookList />} />
        <Route path="/createbook" element={<CreateBook />} />
        <Route path="/editbook/:id" element={<EditBook />} />
        <Route path="/bestsellerlist" element={<BestSellerList />} />
        <Route path="/createbestseller" element={<CreateBestSeller />} />
        <Route path="/editbestseller/:id" element={<EditBestSeller />} />
        </Routes>
        </>
    );
}

export default Pages;