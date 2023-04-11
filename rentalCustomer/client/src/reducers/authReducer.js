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

        default:
            return state
    }
}

export { authReducer }