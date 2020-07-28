import BookConstants from '../constants/bookConstants'
import BookDispatcher from '../dispatchers/bookDispatcher'

class BookActions {

    createBook(book) {
        BookDispatcher.handleViewAction({
            actionType : BookConstants.CREATE_BOOK,
            payload : book
        })
    }

    refreshBooks() {
        BookDispatcher.handleViewAction({
            actionType : BookConstants.REFRESH_BOOKS
        })
    }
}

export default new BookActions();