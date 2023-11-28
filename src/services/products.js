import axios from "axios";

const articlesAPI = axios.create({baseURL:"https://compararcartoes.com.br/articles/all"})

async function getArticles(){

    try{
        const response = await articlesAPI.get("/")
        return response.data

    } catch(error){
        console.log("Error to fetch Articles")
    }


}

export{
    getArticles
}