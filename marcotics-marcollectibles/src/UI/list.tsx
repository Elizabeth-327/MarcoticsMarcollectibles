interface ListProps {
    items: string[];
  }
  
  export default function List({ items }: ListProps) {
    return (
      <div>
          {items.map((item, index) => (
            <div style={{border: "1px solid black", padding: "5px", margin: "5px", marginTop: "10px", borderRadius: "8px"}} key={index}>
              <h3>{item}</h3>
              <button style={{border: "1px solid black", padding: "1px", marginTop: "2px", borderRadius: "2px"}}>View Info</button>
            </div>
          ))}
      </div>
    );
  }