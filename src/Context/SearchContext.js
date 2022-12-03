import { createContext, useState } from "react";

export const SearchContext = createContext(null);


export default function Searcher({children}){
    const [proSearch, setproSearch] = useState("");

    return(
        <SearchContext.Provider value={{proSearch, setproSearch}}>
          {children}
        </SearchContext.Provider>
    )
}

