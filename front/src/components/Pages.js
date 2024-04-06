import { Route, Routes } from "react-router";
import BookList from "./Books/BookList";

const Pages = () =>{
    return(
        <>
        <Routes>
        <Route path="/booklist" element={<BookList />} />
        </Routes>
        </>
    );
}

export default Pages;