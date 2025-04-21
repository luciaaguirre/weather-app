import { WeatherData } from '@/api/types';
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react';
import { format } from 'date-fns';

interface WeatherDetailProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailProps) => {
  const { wind, main, sys } = data;
  
  const formatTime = (timeStamp: number)  => {
    return format(new Date (timeStamp * 1000),"h:mm a")
  }

  const getWindDirection = (degree:number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    const index = Math.round(((degree%=360)<0?degree+360 : degree) / 45) % 8;
    return directions[index]
  }

  const details = [
    {
        title : "Sunrise", 
        value: formatTime(sys.sunrise),
        icon: Sunrise,
        color: "text-orange-500",
    },
    {
        title : "Sunset", 
        value: formatTime(sys.sunset),
        icon: Sunset,
        color: "text-blue-500",
    },
    {
        title : "Wind Direction", 
        value: `${getWindDirection(wind.deg)} (${wind.deg}º)`,
        icon: Compass,
        color: "text-green-500",
    },
    {
        title : "Pressure", 
        value: `${main.pressure} hPa)`,
        icon: Gauge,
        color: "text-purple-500",
    },



  ]

};

export default WeatherDetails;
