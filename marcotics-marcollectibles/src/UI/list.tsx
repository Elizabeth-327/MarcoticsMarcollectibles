 
type LocationInfo = {
  displayName: string;
  wayId: string;
  coordinates: [number, number];
};

interface ListProps {
  items: { name: string; address: string; coordinates: { lat: number; lng: number }, toys: string; }[];
  onViewInfo: (location: { name: string; address: string; coordinates: { lat: number; lng: number }, toys: string; }) => void;
}

export default function List({ items, onViewInfo }: ListProps) {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <button
            style={{
              border: "1px solid black",
              padding: "5px",
              margin: "5px",
              marginTop: "5px",
              borderRadius: "5px",
              textAlign: "left",
              backgroundColor: "white",
            }}
            onClick={() => onViewInfo(item)} // Call the callback with the location data
          >
            <h2>{item.name}</h2>
            <p>{item.address}</p>
          </button>
        </div>
      ))}
      <p>Click any address to show on the map!</p>
    </div>
  );
}