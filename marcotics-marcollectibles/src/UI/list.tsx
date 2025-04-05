interface ListProps {
    items: string[];
  }
  
  export default function List({ items }: ListProps) {
    return (
      <div>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }