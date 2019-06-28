import axios from 'axios'
export default class Search {
    constructor(query){
        this.query = query
    }

    async getResults(){
        const key = '631fdec2374475f067d926a3c4cd7820'
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
            this.result = res.data.recipes
        } catch(error) {
            alert(error)
        }
    }
}








