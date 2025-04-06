import React,{useState,useRef} from "react";
import { SearchInput, SearchBar } from "../styles/CommunityStyles";

function SearchField({onWrite}) {
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef(null); // 검색 입력창 참조
    const handleSearch = async () => {
        console.log(searchTerm)
       onWrite(searchTerm)
    };
    
    return(
        <SearchBar>
            <SearchInput
            type="text"
            placeholder="글을 검색해보세요"
            ref={inputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
            src={require("../assets/images/검색버튼.png")}
            alt=" "
            onClick={handleSearch}
        />
        </SearchBar>
        
    );
};

export default SearchField;