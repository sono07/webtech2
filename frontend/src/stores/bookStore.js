
import EventEmitter from 'events'

class BookStore extends EventEmitter{
    _allBooks = [];

    emitAllBooksChange() {
        this.emit('all-books-change');
    }

    addAllBooksChangeListener(callback) {
        this.addListener('all-books-change', callback);
    }

    removeAllBooksChangeListener(callback) {
        this.removeListener('all-books-change', callback);
    }
}

export default new BookStore();