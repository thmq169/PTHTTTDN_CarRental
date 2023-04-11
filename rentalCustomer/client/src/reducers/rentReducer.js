const rentReducer = (state, action) => {
    const { type, payload: { paymentCode, paymentTotal,
        carUnvaliableInDateStart, carUnvaliableInDateEnd } } = action

    switch (type) {
        case 'RENT_CAR':
            return {
                ...state,
                rentLoading: false,
                paymentCode,
                paymentTotal
            }

        case 'VERIFY_DATE':
            return {
                ...state,
                rentLoading: false,
                carUnvaliableInDateStart,
                carUnvaliableInDateEnd,
            }

        case 'SET_RENT_LOADED':
            return {
                ...state,
                rentLoading: false,
            }

        case 'SET_RENT_LOADING':
            return {
                ...state,
                rentLoading: true,
            }

        default:
            return state
    }
}

export { rentReducer }