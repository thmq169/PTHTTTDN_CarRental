const authReducer = (state, action) => {
    const { type, payload: { isAuthenticated, user, documents, currentPage } } = action

    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user,
                documents,
                currentPage
            }

        case 'SET_AUTH_LOADING':
            return {
                ...state,
                authLoading: true,
            }

        case 'SET_UPDATE_LOADING':
            return {
                ...state,
                accountLoading: true,
            }

        case 'UPDATE_ACCOUNT':
            return {
                ...state,
                accountLoading: false,
                user,
                documents
            }

        default:
            return state
    }
}

export { authReducer }