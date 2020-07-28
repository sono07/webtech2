import EventEmitter from 'events'

class UserStore extends EventEmitter{
    _user = undefined;
    _books = [];

    emitUserChange(){
        this.emit('user-change');
    }

    addUserChangeListener(callback) {
        this.addListener('user-change', callback);
    }

    removeUserChangeListener(callback) {
        this.removeListener('user-change', callback);
    }

    emitBooksChange(){
        this.emit('books-change');
    }

    addBooksChangeListener(callback) {
        this.addListener('books-change', callback);
    }

    removeBooksChangeListener(callback) {
        this.removeListener('books-change', callback);
    }
}

export default new UserStore();