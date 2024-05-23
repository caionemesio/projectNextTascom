import axios from "axios";

const API_KEY= 'RGAPI-f7f67743-8ea7-4c09-b85b-5298b75b4225';
const apiKeyQueryParam = `api_key=${API_KEY}`;
interface propsValidNickname{
    summonerName:string,
    tagline:string
}
export const validNickName=async({summonerName,tagline}:propsValidNickname)=>{
    const url=`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagline}?${apiKeyQueryParam}`
    let message=""
    try {
        const response = await axios.get(url)
        if(response.status===200){
            return 
        }
    } catch (error:any) {
        if (error.response && error.response.status === 404) {
            return message= 'player Not Found';
    }else{
        return message='Something wrong was happened:/'
    }
 }
}