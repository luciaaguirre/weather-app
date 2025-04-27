import { WeatherData } from "@/api/types";
import { useFavorite } from "@/hooks/use-favorite";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

interface FavoriteButtonProps {
    data: WeatherData;
}

const FavoriteButton = ({ data } : FavoriteButtonProps) => {
    const { addFavorite, isFavorite, removeFavorite } = useFavorite();
    const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon)

    return <Button variant={isCurrentlyFavorite ? "default" : "outline"} size={"icon"}
    className={ isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
    >
        <Star
        className= {`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}
        />
    </Button>
};

export default FavoriteButton