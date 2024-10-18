import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }){

    const [books, setbooks] = useState([]);

    const fetchBooks = async () => {
        const reponse = await axios.get('http://localhost:3001/books')

        setbooks(reponse.data)
    };

    const editBookByID = async(id, newTitle) => {
        const reponse = await axios.put(`http://localhost:3001/books/${id}`, {
            title : newTitle
        })

        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return { ...book, ...reponse.data };
            }
            return book;
        });
        setbooks(updatedBooks);
    };

    const deleteBookById =  async(id) => {
        const reponse = await axios.delete(`http://localhost:3001/books/${id}`
        )
        const updatedBooks= books.filter((book)=> {
            return book.id !== id;
        
        });
       
        setbooks(updatedBooks);
     
    };

    const createBook = async(title) => {

        const reponse = await axios.post('http://localhost:3001/books' , {
            title

        });

        const updatedBooks = [
            ...books, reponse.data
        ];
        setbooks(updatedBooks);
        };

    const valueToShare = {
        books,
        deleteBookById, 
        editBookByID, 
        createBook, 
        fetchBooks
    }

    return (<BooksContext.Provider value={valueToShare}>
    {children}
    </BooksContext.Provider>
    );
}

export { Provider }
export default BooksContext;