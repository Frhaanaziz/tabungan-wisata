"use client";

import { env } from "@/env";
import {
  GoogleMap as GoogleMapApi,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Skeleton } from "@ui/components/shadcn/skeleton";
import React from "react";

const containerStyle = {
  width: "300px",
  height: "300px",
};

const center = {
  // lat: -3.745,
  // lng: -38.523,
  lat: -6.9174,
  lng: 107.7133,
};

const GoogleMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMapApi
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMapApi>
  ) : (
    <Skeleton className="h-[300px] w-[300px]" />
  );
};

export default GoogleMap;
