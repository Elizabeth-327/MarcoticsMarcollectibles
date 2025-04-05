import { Marker, Popup } from "react-leaflet";

type ResultData = {
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

export default function ResultPins({ results }: { results: Map<number, ResultData> }) {
  const listResults = Array.from(results.keys()).map(key => (
    <Marker key={key} position={[results.get(key)!.coordinates.lat, results.get(key)!.coordinates.lng]}>
      <Popup>
        <h1>{results.get(key)!.name}</h1>
        <p>{results.get(key)!.address}</p>
      </Popup>
    </Marker>
  ));

  return <>{listResults}</>;
}
