import { ForecastData } from "@/api/types"
import { format } from "date-fns/format";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps {
    data: ForecastData;
}

interface DailyForecast {
    date: number,
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind: number;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }

}

//Functional component that takes as prop data of the type WeatherForecastProps defined above
const WeatherForecast = ({data}: WeatherForecastProps) => {
    
    // data.list = array of weather forecast objects
    //reduce() iterates through the list of forecasts and accumulates the results into a new object (acc)
    const dailyForecasts = data.list.reduce((acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), "yyy-MM-dd")

        if(!acc[date]){
            acc[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity, 
                wind: forecast.wind.speed,
                weather:forecast.weather[0], 
                date: forecast.dt,
            }

        }else{
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
        }

        return acc;

    }, {} as Record <string, DailyForecast>)

    const nextDays = Object.values(dailyForecasts).slice(0,6);

    const formatTemp = (temp:number) => `${Math.round(temp)}º`
    
    return <Card>
    <CardHeader>
      <CardTitle>5-Day Forecast</CardTitle>
    
    </CardHeader>
    <CardContent>
  <div className="grid gap-4">
    {nextDays.map((day) => (
      <div key={day.date} className="grid grid-cols-1 gap-4 rounded-lg border p-4">
        
        {/* Date and Weather Description in one row */}
        <div className="flex justify-between items-center">
          <p className="font-medium uppercase">{format(new Date(day.date * 1000), "EEE, MMM d")}</p>
          <p className="font-medium text-muted-foreground capitalize">
            {day.weather.description || 'No description available'}
          </p>
        </div>

        {/* Temperature Min/Max and Humidity/Wind in one row */}
        <div className="flex justify-between gap-4 mt-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center text-blue-500">
              <ArrowDown className="mr-1 h-4 w-4" />
              {formatTemp(day.temp_min) || 'N/A'}
            </span>
            <span className="flex items-center text-red-500">
              <ArrowUp className="mr-1 h-4 w-4" />
              {formatTemp(day.temp_max) || 'N/A'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm">{day.humidity}%</span>
            </span>
            <span className="flex items-center gap-1">
              <Wind className="h-4 w-4 text-blue-500" />
              <span className="text-sm">{day.wind} m/s</span>
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
</CardContent>

  </Card>
}

export default WeatherForecast