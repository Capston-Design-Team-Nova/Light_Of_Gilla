import React,{useState,useRef} from "react";
import { SearchInput, SearchBar } from "../styles/CommunityStyles";

function SearchField({onWrite}) {
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef(null); // 검색 입력창 참조
    const handleSearch = async () => {
        console.log(searchTerm)
       onWrite(searchTerm)
    };
    
    // 검색창에서 Enter 키 입력 가능하도록 설정
    const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
    };

    return(
        <SearchBar>
            <SearchInput
            type="text"
            placeholder="글을 검색해보세요"
            ref={inputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress} // Enter 키로 검색 가능
        />
        <img
            src={require("../assets/images/돋보기.png")}
            alt=" "
            onClick={handleSearch}
        />
        </SearchBar>
        
    );
};

export default SearchField;