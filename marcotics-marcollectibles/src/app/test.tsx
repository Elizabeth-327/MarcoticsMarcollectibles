let results = [
    {name: 'McDonald\'s', address: '123 Example St', id: 123}
]

export default function ResultsList() {
    const listResults = results.map(result =>
        <li key={result.id}>
          {result.name} - {result.address}
        </li>
      );
    
      return (
        <ul>{listResults}</ul>
      );
}