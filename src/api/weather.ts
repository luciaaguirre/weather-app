// we create a class for managing all our APIs endpoints

import { API_CONFIG } from "./config";
import {
  Coordinates,
  WeatherData,
  GeocodingResponse,
  ForecastData,
} from "./types";

class WeatherAPI {
  //private functinos, cannot be accesible from the outside
  private createUrl(
    endpoint: string,
    params: Record<string, string | number> //this means it will be an object with key of string and value of string or number
  ) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY, //Adds the API key to the query
      ...params, // spreads the params object into it, adding all the other parameters
    });
    //template literal which builds and returns a full URL string with query parameters
    return `${endpoint}?${searchParams.toString()}`;
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // public asyncrhonous functions that can be accesible from the outside

  async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });

    return this.fetchData<WeatherData>(url);
  }

  async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });

    return this.fetchData<ForecastData>(url);
  }

  async reverseGeocode({
    lat,
    lon,
  }: Coordinates): Promise<GeocodingResponse[]> {
    const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: 1,
    });
    // the function is expected to return a list of location data in the form of an array of GeocodingResponse objects
    return this.fetchData<GeocodingResponse[]>(url);
  }

  async searchLocations(query: string): Promise<GeocodingResponse[]> {
    const url = this.createUrl(`${API_CONFIG.GEO}/direct`, {
      q: query,
      limit: 5, // limits the results to 5 locations
    });

    return this.fetchData<GeocodingResponse[]>(url);
  }
}

// Creates a single instance of the WeatherAPI class that can be imported and used throughout the app, to interact with the weather API in a clean, reusable and organized way// Keeps the code DRY, makes all methods (getCurrentWeather, getForecast, etc)easily accesible from anywhere in the app

export const weatherAPI = new WeatherAPI();
