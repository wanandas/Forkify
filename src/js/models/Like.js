export default class Likes { 
    constructor() {
        this.likes = []
    }

    addLike(id, title, author, img) { 
        const like = { id, title, author, img }
        this.likes.push(like)

        // Perist data in localstorage
        this.persistData()

        return like
    } 

    deleteLike(id) { 
        const index  = this.likes.findIndex(el => el.id === id)
        this.likes.splice(index, 1)

        // Perist data in localstorage
        this.persistData()

    }

    isLiked(id) { 
        return this.likes.findIndex(el => el.id === id) !== -1
    }

    getNumLike() { 
        return this.likes.length
    }

    persistData() { 
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'))

        // Restoring from the localstorage
        if (storage) this.likes = storage
    }

}