import { Dispatcher } from 'flux'
import axios from "axios/index";
import UserConstants from '../constants/userConstants'
import UserStore from '../stores/userStore'
import BookStore from '../stores/bookStore'

class UserDispatcher extends Dispatcher {

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            action : action
        });
    }
}

const dispatcher = new UserDispatcher();

dispatcher.register((data) => {
    if(data.action.actionType !== UserConstants.SET_USER){
        return;
    }

    axios.get("/book/readBooks")
        .then((response) => {
            UserStore._user = data.action.payload;
            BookStore._allBooks = response.data.books;
            UserStore.emitUserChange();
            BookStore.emitAllBooksChange();
        })
});

dispatcher.register((data) => {
    if(data.action.actionType !== UserConstants.UNSET_USER){
        return;
    }

    UserStore._user = undefined;
    UserStore._books = [];
    UserStore.emitUserChange();
    UserStore.emitBooksChange();
});

dispatcher.register((data) => {
    if(data.action.actionType !== UserConstants.REFRESH_USER_BOOKS){
        return;
    }

    axios.get("/book/readBooks")
        .then((response) => {
            UserStore._books = response.data.books;
            UserStore.emitBooksChange();
        })
});

export default dispatcher;