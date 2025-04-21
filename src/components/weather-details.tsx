import { WeatherData } from '@/api/types';

interface WeatherDetailProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailProps) => {
  const { wind, main, sys } = data;
  return <div>WeatherDetails</div>;
};

export default WeatherDetails;
