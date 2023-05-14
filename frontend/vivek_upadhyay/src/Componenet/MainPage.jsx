import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [data,setData] = useState([])

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);
    try {
      const response = await axios.get(`http://localhost:2000/mentor?search=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:2000/data`);
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div>
      <h1>Search Page</h1>
      <input
        type="text"
        placeholder="Search here"
        value={searchQuery}
        onChange={handleSearch}
      /><hr/>
     {searchResults.map((curElem,id)=>{
      return(
        <div key={id}>
            <img src={curElem.imageUrl} alt={curElem.companyName} />
            <h2>{curElem.companyName}</h2>
            <p>{curElem.primaryText}</p>
            <p>{curElem.headline}</p>
            <p>{curElem.description}</p>
            <br/><hr/>
          </div>
      )
     })}
    </div>
  );
};

export default MainPage;
