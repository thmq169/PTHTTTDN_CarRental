const isFavouriteCar = (carInWishList = [], id_car) => {
    for (let index = 0; index < carInWishList.length; index++) {
        const car = carInWishList[index];

        console.log("Dadasdsad  ",car._id,id_car)

        if (car._id === id_car) {
            return true
        }
    }

    return false
}

export default isFavouriteCar