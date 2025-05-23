import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface FavoriteCity {
    id:string;
    
    lat:number;
    lon:number;
    name: string;
    country:string;
    state?:string;
    addedAt: number; 
}

export function useFavorite(){
    const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>("favorites", [])

    const queryClient = useQueryClient()

    const favoritesQuery = useQuery({
        queryKey:["favorites"],
        queryFn: () => favorites, 
        initialData:favorites,
        staleTime: Infinity, //so it doesn't expire
    })

    const addFavorite = useMutation({
        mutationFn:async(
            city: Omit<FavoriteCity, "id" | "addedAt"> 
        ) => {
            const newFavorite: FavoriteCity = {
                ...city,
                id: `${city.lat}-${city.lon}`,
                addedAt: Date.now() 
            }

            // If the city alerady exists in the list of fav cities I want to remove it
            const exists = favorites.some((fav) => fav.id === newFavorite.id);
            if (exists) return favorites

            const newFavorites = [...favorites, newFavorite].slice(0,10) // the new Fav is add to the previous list of favs

           
            setFavorites(newFavorites);
            return newFavorites;
        },
        onSuccess:() => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"],

            })
        }
    });

    const removeFavorite = useMutation({
        mutationFn:async(cityId:string)=> {
            const newFavorites = favorites.filter((city) => city.id !== cityId);
            setFavorites(newFavorites)
            return newFavorites
        },
        
        onSuccess:() => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"],
            })
        }
    })
    return{
        favorites: favoritesQuery.data,
        addFavorite, 
        removeFavorite,
        isFavorite: (lat:number, lon:number) => favorites.some((city) => city.lat === lat && city.lon ===lon )
    };
}


