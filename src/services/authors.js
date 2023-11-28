import axios from "axios";

const authorAPI = axios.create({baseURL:"https://compararcartoes.com.br/autores/todos"})

async function getAuthors(){
    const response = await authorAPI.get("/")

    return response.data
}

export{
    getAuthors
}