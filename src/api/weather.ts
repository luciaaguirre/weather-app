// we create a class for managing all our APIs endpoints

import { API_CONFIG } from "./config"

class WeatherAPI {

    //private functinos, cannot be accesible from the outside
    private createUrl(
        endpoint: string, 
        params: Record <string,string | number>  //this means it will be an object with key of string and value of string or number
    ){
        const searchParams = new URLSearchParams({
            appid:API_CONFIG.APY_KEY, //Adds the API key to the query
            ...params, // spreads the params object into it, adding all the other parameters
        })
        //template literal which builds and returns a full URL string with query parameters
        return `${endpoint}?${searchParams.toString()}`
    }
    
    private async fetchData<T>(url:string):Promise<T> {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error (`Weather API Error: ${response.statusText}`)
        }

        return response.json()

    }

    // public asyncrhonous functions that can be accesible from the outside

    async getCurrentWeather({lat, lon}:Coordinates )

    }

    async getForecast (){}

    async reverGeocode(){}
}