"use client";
import Image from "next/image";
import styles from "./page.module.css";
import List from "@/UI/list";
import SearchBar from "@/Hooks/SearchBar";
import { useState } from "react";

export default function Home() {
  const listItems: string[] = ["mcdonalds 1", "mcdonalds 2", "mcdonalds 3"];
  const [ListItems, setListItems] = useState<string[]>([]);
  const [isQueryDone, setIsQueryDone] = useState(false);
  const handleSearchResults = (results: string[]) => {
    setListItems(results);
    setIsQueryDone(true);
  };

  return (
    <div className={styles.container}>
      {/* map area */}
    < div className={styles.mapArea}>
      <h1> Map Display Area</h1>
      <h1>{/*add map component here */ }</h1>
      
      </div>
      {/* sidebar area */}
      
      <div className={styles.sidebar}>
        <div className={styles.SearchBar}>
          {/* Search bar comonent receives items and displays the list*/}
        <h1>Search for locations</h1>
        <SearchBar
            onSearch={(results: string[]) => {
              handleSearchResults(results);

            }}
          />
          {/*conditionally render the list based on the search results*/}

        { isQueryDone && <List items={listItems} />}
      </div>
      </div>
    </div> 
  
  );
}




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
    //       changed message 
    //     </a>
    //   </footer>
    // </div>
//   );
// }
