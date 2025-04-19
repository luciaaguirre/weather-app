import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/use-geolocation";
import {  AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";

const WeatherDashboard = () => {
    // Geolocation hook using browser's geolocation API
    const {
        coordinates, 
        error: locationError,
        getLocation, 
        isLoading: locationLoading,
    } = useGeolocation()

     //uses TanStack Query to send API requests, cache results and handle error/loading states
    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const locationQuery = useReverseGeocodeQuery(coordinates)

    const handleRefresh = () => {
        getLocation()
        if(coordinates) {
            weatherQuery.refetch()
            forecastQuery.refetch()
            locationQuery.refetch()
        }
    };

    //CONDITIONAL RENDERING BLOCKS
    //if location is loading

    if (locationLoading) {
        return <WeatherSkeleton/>
    }

    // if location fails or its denied
    if (locationError) {
        return (
     <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle> Location Error </AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>{locationError}</p>
        <Button onClick={getLocation} variant= {"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4"/>
            Enable Location
        </Button>
      </AlertDescription>
    </Alert>
        )
    }

    // If there are no coordinates at all 
    if(!coordinates) {
        return (
 
     <Alert variant="destructive">
      <AlertTitle> Location Required </AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Please enable location access to see your local weather</p>
        <Button onClick={getLocation} variant= {"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4"/>
            Enable Location
        </Button>
      </AlertDescription>
    </Alert>
        )
    }
    

    const locationName = locationQuery.data?.[0];


    //If API fetch fails (error o no internet)
    if (weatherQuery.error || forecastQuery.error) {
       return ( <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle> Error </AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Failed to fetch weather data. Please try again</p>
        <Button onClick={handleRefresh} variant= {"outline"} className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4"/>
            Retry
        </Button>
      </AlertDescription>
    </Alert>
    )
}

    // If data is not ready yet
    if(!weatherQuery.data || !forecastQuery.data) {
        return <WeatherSkeleton/>
    }


    // MAIN UI (if everythind is working)
    return <div className="space-y-4">
        {/* Favorite Cities*/}
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight">My Location</h1>
            <Button variant={'outline'}
            size={"icon"}
            onClick={handleRefresh}
            disabled={weatherQuery.isFetching || forecastQuery.isFetching}
            >
               <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching? "animate-spin":""}` }/>
            </Button>
        </div>

        {/* Current and Hourly Weather */}
    </div>
}
export default WeatherDashboard; 