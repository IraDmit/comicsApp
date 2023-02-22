import axios from 'axios';
import { API_KEY } from '../constants/api';

class GetDataApi {
    async getData(url, limit = 10) {
        try {
            const response = await axios.get(url, {
                params: {
                    apikey: API_KEY,
                    limit
                }
            });
            
            return {comics: response.data.data.results, limit};
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    async getDataSlug(url){
        try{
            const response = await axios.get(url, {
                params:{
                    apikey: API_KEY
                }
            })
            return response.data.data.results[0];
        } catch{
            console.log(error.message);
            return false;
        }
    }
    async getAllChar(url){
        try{
            const response = await axios.get(url, {
                params:{
                    apikey: API_KEY
                }
            })
            return response.data.data.results;
        } catch{
            console.log(error.message);
            return false;
        }
    }
}

export const getDataApi = new GetDataApi();