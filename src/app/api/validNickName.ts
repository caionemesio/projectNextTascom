import axios from "axios";

const API_KEY= 'RGAPI-f4a580dc-52ad-4d30-9d90-d43c6958b67f';
const apiKeyQueryParam = `api_key=${API_KEY}`;
// const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
interface propsValidNickname{
    summonerName:string,
    tagline:string
}
export const validNickName=async({summonerName,tagline}:propsValidNickname)=>{
    const url=`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagline}?${apiKeyQueryParam}`
    try {
        const response = await axios.get(url)
        if(response.status===200){
            return 'playerFound';
        }
    } catch (error:any) {
        if (error.response && error.response.status === 404) {
            return 'playerNotFound';
    }else{
        throw new Error('Erro ao validar o nickname');
    }
 }
}