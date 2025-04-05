import Image from "next/image";
import styles from "./page.module.css";
import 'leaflet/dist/leaflet.css'
import React, { useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";


import jsonData from "./output.json" assert { type: "json" };
console.log(jsonData);


const SimpleMap = () => {
  const mapRef = useRef(null);
  const latitude = 51.505;
  const longitude = -0.09;

  return ( 
    // Make sure you set the height and width of the map container otherwise the map won't show
      <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef} style={{height: "100vh", width: "100vw"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Additional map layers or components can be added here */}
      </MapContainer>
  );
};




type resultData = {
  name: string,
  address: string
}

export function JsonList() {
  const results = new Map<number, resultData>();

  for (const i in jsonData) {
    let address = "";
    if (jsonData[i].address["house_number"] != undefined) {
      address += jsonData[i].address["house_number"] + " ";
    }
    address += jsonData[i].address["road"] + ", "
      + jsonData[i].address["city"] + ", "
      + jsonData[i].address["state"] + ", "
      + jsonData[i].address["country"];
    const newPlace = {
      name: jsonData[i].name,
      address: address
    };

    results.set(jsonData[i].place_id, newPlace);
  }

  return (
    <div>
      <h1>Results:</h1>
      <ul>
        {Array.from(results.entries()).map(([key, value]) => (
          <li key={key}>
            {value.name}: {value.address}
          </li>
        ))}
      </ul>
    </div>
  );
}



export default function Home() {
  return (
    <div>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""/>
      <div className={styles.page}>
        <main className={styles.main}>
          <SimpleMap />
          {/* <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          /> */}
          {/* <label>
            Your first name:<br></br>
            <input name="searchquery" /> 
            <button>Search</button>
          </label> */}
          {/* <JsonList /> */}
        </main>
      </div>
    </div>
    // <div className={styles.page}>
    //   <main className={styles.main}>
    //     <Image
    //       className={styles.logo}
    //       src="/next.svg"
    //       alt="Next.js logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //     <ol>
    //       <li>
    //         Get started by editing <code>src/app/page.tsx</code>.
    //       </li>
    //       <li>Save and see your changes instantly.</li>
    //     </ol>

    //     <div className={styles.ctas}>
    //       <a
    //         className={styles.primary}
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className={styles.logo}
    //           src="/vercel.svg"
    //           alt="Vercel logomark"
    //           width={20}
    //           height={20}
    //         />
    //         Deploy now
    //       </a>
    //       <a
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className={styles.secondary}
    //       >
    //         Read our docs
    //       </a>
    //     </div>
    //   </main>
    //   <footer className={styles.footer}>
    //     <a
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/file.svg"
    //         alt="File icon"
    //         width={16}
    //         height={16}
    //       />
    //       Learn
    //     </a>
    //     <a
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to nextjs.org →
    //     </a>
    //   </footer>
    // </div>
  );
}
