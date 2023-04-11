export default {
    get(item){
        return JSON.parse(localStorage.getItem(item)) || [];
    },
    set(item,store){
        localStorage.setItem(store,JSON.stringify(item))
    }
}