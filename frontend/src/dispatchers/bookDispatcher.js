import { Dispatcher } from 'flux'
import axios from "axios/index";
import BookConstants from '../constants/bookConstants'
import BookStore from '../stores/bookStore'
import UserStore from '../stores/userStore'

class BookDispatcher extends Dispatcher {

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            action : action
        });
    }
}

const dispatcher = new BookDispatcher();

dispatcher.register((data) => {
    if(data.action.actionType !== BookConstants.CREATE_BOOK){
        return;
    }
	
	const body = {
        "book": data.action.payload
    };
	
	axios.post("/book/readBookForISBN", {"isbn": body.book.isbn})
        .then((response) => {
			
			if(response.data !== null){ 
				alert("Error: Book by ISBN is already in the database!");
				return;
			}
			
			axios.post("/book/createBook", body)
				.then((response) => {

            const bookID = response.data.bookID;
            axios.post("/book/readBookForId", {
                "id": bookID
            })
                .then((response) => {
                    UserStore._books = [...UserStore._books, response.data.book];
                    UserStore.emitBooksChange();
                    BookStore._allBooks = [...BookStore._allBooks, response.data.book];
                    BookStore.emitAllBooksChange();
                })
        })
    })

    
});

dispatcher.register((data) => {
    if(data.action.actionType !== BookConstants.REFRESH_BOOKS){
        return;
    }

    axios.get("/book/readBooks")
        .then((response) => {
            BookStore._allBooks = response.data.books;
            BookStore.emitAllBooksChange();
        })
});

export default dispatcher;