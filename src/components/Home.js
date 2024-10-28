import React, { useState } from 'react';
import Header from './Header';
import Body from './Body';

const HomePage = () => {
  const [category, setCategory] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearch, setIsSearch] = useState(false)
  const handleOnSearch = (searchResult) => {
    setIsSearch(true)
    setSearchResults(searchResult)
  }
  return (
    <>
      <Header
        onCategoryChange={setCategory}
        onSearchChange={handleOnSearch}
        
      />
      <Body
        category={category}
        searchResult={searchResults}
        isSearch = {isSearch}
      />
    </>
  );
};

export default HomePage;
