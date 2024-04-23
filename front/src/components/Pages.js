import React from "react";
import { Route, Routes } from "react-router";
import BookList from "./addbooks/BookList";
import EditBook from "./addbooks/EditBook";
import CreateBook from './addbooks/CreateBook';
import BestSellerList from "./addbestseller/BestSellerList";
import EditBestSeller from "./addbestseller/EditBestSeller";
import CreateBestSeller from './addbestseller/CreateBestSeller';
import MagazineList from "./addmagazine/MagazineList";
import EditMagazine from "./addmagazine/EditMagazine";
import CreateMagazine from './addmagazine/CreateMagazine';
import AuthorList from "./addauthor/AuthorList";
import CreateAuthor from "./addauthor/CreateAuthor";
import EditAuthor from "./addauthor/EditAuthor";



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
        <Route path="/magazinelist" element={<MagazineList/>} />
        <Route path="/createmagazine" element={<CreateMagazine />} />
        <Route path="/editmagazine/:id" element={<EditMagazine />} />
        <Route path="/authorlist" element={<AuthorList />} />
        <Route path="/createauthor" element={<CreateAuthor />} />
        <Route path="/editauthor/:id" element={<EditAuthor />} />
        </Routes>
        </>
    );
}

export default Pages;