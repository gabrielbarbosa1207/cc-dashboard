import axios from "axios";

const catContentAPI = axios.create({ baseURL:"https://compararcartoes.com.br/cartoes-de-credito/forms" })

async function getCatContent(slug){
    const response = await catContentAPI.get(`/${slug}`)
    return response.data
}

export{
    getCatContent
}