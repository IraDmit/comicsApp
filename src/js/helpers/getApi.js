import axios from 'axios';
import { API_KEY } from '../constants/api';

class GetDataApi {
    async getData(url, limit = 50) {
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
}

export const getDataApi = new GetDataApi();