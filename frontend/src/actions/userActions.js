import UserConstants from '../constants/userConstants'
import UserDispatcher from '../dispatchers/userDispatcher'

class UserActions {

    setUser(user) {
        UserDispatcher.handleViewAction({
            actionType : UserConstants.SET_USER,
            payload : user
        });
    }

    unsetUser() {
        UserDispatcher.handleViewAction({
            actionType : UserConstants.UNSET_USER
        });
    }
}

export default new UserActions();