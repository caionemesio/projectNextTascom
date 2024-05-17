import axios from 'axios'

const CHAMPIONS_API_URL = `https://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json`;


export const getChampions= async()=>{
    try{
        const response = await axios.get(CHAMPIONS_API_URL)
        const championsData=response.data.data
        const championNames = Object.values(championsData).map((champion: any) => champion.name);
        return championNames
    }catch(error){
        console.error(`Algo deu errado :< ${error}`)
        return []
    }
}
