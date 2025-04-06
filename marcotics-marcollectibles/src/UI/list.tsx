 
  type LocationInfo = {
  displayName: string;
  wayId: string;
  coordinates: [number, number];
};

interface ListProps {
  items: { name: string; address: string; coordinates: { lat: number; lng: number } }[];
  onViewInfo: (location: { name: string; address: string; coordinates: { lat: number; lng: number } }) => void;
}

export default function List({ items, onViewInfo }: ListProps) {
  return (
    <div>
      {items.map((item, index) => (
        <div
          style={{
            border: "1px solid black",
            padding: "5px",
            margin: "5px",
            marginTop: "10px",
            borderRadius: "8px",
          }}
          key={index}
        >
          <h3>{item.name}</h3>
          <p>{item.address}</p>
          <button
            style={{
              border: "1px solid black",
              padding: "1px",
              marginTop: "2px",
              borderRadius: "2px",
            }}
            onClick={() => onViewInfo(item)} // Call the callback with the location data
          >
            View Info
          </button>
        </div>
      ))}
      <p>Click any address to show on the map!</p>
    </div>
  );
}