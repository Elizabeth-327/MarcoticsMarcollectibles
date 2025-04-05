interface ListProps {
    items: string[];
  }
  
  export default function List({ items }: ListProps) {
    return (
      <div>
        <h1>List of Items</h1>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }