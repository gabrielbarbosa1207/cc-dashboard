import axios from "axios";

const bankAPI =  axios.create({baseURL:"https://compararcartoes.com.br/cartoes-de-credito/banco" })

async function getBankContent(slug){
    const response = await bankAPI.get(`/${slug}`)
    return response.data
}

export{
    getBankContent
}