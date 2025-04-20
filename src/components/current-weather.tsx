import { GeocodingResponse, WeatherData } from "@/api/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";

interface CurrentWeatherProps {
    data:WeatherData,
    locationName?:GeocodingResponse
}


const CurrentWeather = ({data, locationName}: CurrentWeatherProps) => {
    const {
        weather: [CurrentWeather],
        main: {temp, feels_like, temp_min, temp_max, humidity},
        wind: {speed},
    } = data;
    
    return (
    <Card className="overflow-hidden">
        <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2"> 
                <div className="space-y-4">
                    <div className="space-2">
                        <div className="flex items-center">
                            <h2>{locationName?.name}</h2>
                            {locationName?.state && (
                                <span className="text-muted-foreground">
                                    , {locationName.state}

                                </span>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {locationName?.country}
                        </p>

                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
    )
}

export default CurrentWeather;