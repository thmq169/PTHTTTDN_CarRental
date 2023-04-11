import isFavouriteCar from '../utils/isFavouriteCar'

const accountReducer = (state, action) => {
    const { type, payload: { accountInfo, CICInfo, driverLicenseInfo, wishlist, rentalHistory } } = action

    switch (type) {
        case 'UPDATE_ACCOUNT':
            return {
                ...state,
                accountLoading: false,
                accountInfo,
                CICInfo,
                driverLicenseInfo,
            }

        case 'SET_ACCOUNT_LOADING':
            return {
                ...state,
                accountLoading: true,
            }

        case 'SET_WISHLIST':
            return {
                ...state,
                accountLoading: false,
                wishlist
            }

        case 'SET_HISTORY':
            return {
                ...state,
                accountLoading: false,
                rentalHistory
            }

        default:
            return state
    }
}

export { accountReducer }