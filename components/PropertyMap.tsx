"use client";
import { IPropertyProp } from "@/interfaces";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import { FC, useEffect, useState } from "react";
import { setDefaults, fromAddress, OutputFormat } from "react-geocode";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import Spinner from "./Spinner";

interface IViewport {
  latitude: number;
  longitude: number;
  zoom: number;
  width: string;
  height: string;
}

const PropertyMap: FC<IPropertyProp> = ({ property }) => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [viewport, setViewport] = useState<IViewport>({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [geocodeError, setGeocodeError] = useState<boolean>(false);

  if (!process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY) {
    throw new Error("Google Geocoding API key is missing");
  }

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY as string,
    language: "en",
    region: "ch",
    outputFormat: "json" as OutputFormat,
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );
        if (res.results.length === 0) {
          setGeocodeError(true);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCoords();
  }, []);

  if (loading) return <Spinner />;
  if (geocodeError) {
    return <div className="text-xl">No location data found</div>;
  }

  return (
    !loading &&
    lat !== null &&
    lng !== null && (
      <Map
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: 15,
        }}
        style={{ width: "100%", height: "500px" }}
        mapStyle="mapbox://styles/mapbox/standard"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        <Marker latitude={lat} longitude={lng} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
