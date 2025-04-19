// we create a class for managing all our APIs endpoints

import { API_CONFIG } from "./config"
import { Coordinates, WeatherData, GeocodingResponse } from "./types";


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

    async getCurrentWeather({lat, lon}:Coordinates ):Promise <WeatherData>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`,{
            lat:lat.toString(), 
            lon:lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units,

         });

         return this.fetchData<WeatherData>(url)

    }



    async getForecast({lat, lon}:Coordinates ):Promise <ForecastData>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`,{
            lat:lat.toString(), 
            lon:lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units,

         });

         return this.fetchData<ForecastData>(url)

    }

    async reverseGeocode({lat, lon}:Coordinates ):Promise <GeocodingResponse[]>{
        const url = this.createUrl(`${API_CONFIG.GEO}/reverse`,{
            lat:lat.toString(), 
            lon:lon.toString(),
            limit: 1,

         });

         return this.fetchData<GeocodingResponse[]>(url)
}
}

export const weatherAPI = new WeatherAPI()