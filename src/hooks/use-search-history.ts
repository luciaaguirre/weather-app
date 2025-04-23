import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface SearchHistoryItem {
    id:string;
    query:string;
    lat:number;
    lon:number;
    name: string;
    country:string;
    state?:string;
    searchedAt: number; //time when this was searched
}

export function useSearchHistory(){
    const [history, setHistory] = useLocalStorage<SearchHistoryItem[]>("search-history", [])

    const queryClient = useQueryClient()

    const historyQuery = useQuery({
        queryKey:["search-history"],
        queryFn: () => history, // value that we will be returning after updating our history
        initialData:history,
    })

    //UseMutation: hook from Tanstack that allows to perform mutations (like creating, updating or deleting data. Used for making side-effectful operations like adding data on a server.)
    const addToHistory = useMutation({
        mutationFn:async(
            search: Omit<SearchHistoryItem, "id" | "SearchedAt"> // The search object should have all properties defined in SearchHistoryItem except fot id and dsearchedAt
        ) => {
            const newSearch: SearchHistoryItem = {
                ...search, //spread operator!! copies all the properties of search objec into newSearch.
                id: `${search.lat}-${search.lon}-${Date.now()}`,// generates a new id for the newSearch object
                searchedAt: Date.now() //generates a new searchedAt (captures when the search was performed) for the newSearch object.
            }

            const filteredHistory = history.filter(
                (item) => !(item.lat === search.lat && item.lon ===search.lon)
            );

            const newHistory = [newSearch, ...filteredHistory].slice(0,10) //whatever the search is is added to the previous history, then sliced 

            //we update the setHistory with the newHistory
            setHistory(newHistory);
            return newHistory;
        },
        onSuccess:(newHistory) => {
            queryClient.setQueryData(["search-history"], newHistory)
        }
    });

    const clearHistory = useMutation({
        mutationFn:async()=> {
            setHistory([]) //updates the state by clearing the history array
            return [] //returns an empty array which is the result of the mutation
        },
        //queryClient= instance of React Query'sQueryClient, used to manage and update the cache of query data. setQueryData updates the data for a given query key (in this case "search-history)
        onSuccess:() => {
            queryClient.setQueryData(["search-history"], []) // setting the data fot the ["search-history"] query key to an empty array, it ensures that the cached search history is cleared as well
        }
    })
    return{
        history:historyQuery.data??[],
        addToHistory,
        clearHistory,
    }
}


