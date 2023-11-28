import axios from "axios";

const iconsAPI = axios.create({baseURL:"https://compararcartoes.com.br/icons"})

async function getIcons(){
    try{
        const response = await iconsAPI.get("/")
        return response.data
    } catch(error){
        console.log("Error fetching Icons")
    }
}

export{
    getIcons
}