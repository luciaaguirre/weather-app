import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

//Creation of a custom hook for geolocation

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

export function useGeolocation() {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  //React state update functino, commonly used with the useState hook - it updates the locationData state
  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));
    //...prev - copies all existing values in the state object

    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Geolocation is not supported by your browser",
        isLoading: false,
      });
      return;
    }

    // built-in browser API - asks user for permission to access their location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Please enable location access.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = " Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred" + error.message;
        }

        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        //this is the optional third parameter for navigator.geolocation.getCurrentPosition()- lets you tune how the browser fetches the location

        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  //getLocation will be called as soon as the app is loaded
  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
}
