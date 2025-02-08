import React , {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { bell_icon, hemburger_icon, mic_icon, search_icon, youtube_logo, YOUTUBE_SEARCH_API , user_icon } from '../utils/constant';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { cacheResults } from '../utils/searchSlice';


const Head = () => {

  const [searchQuery , setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]); 
  const [showSuggestions , setShowSuggestions] = useState(false);

  const searchCache = useSelector( store => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    // Debouncing logic
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions(); 
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };

  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]); 
    dispatch(cacheResults({searchQuery:json[1]}));
  };

  

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  }

  return (
    <div className="flex flex-wrap items-center bg-gray-100 px-4 py-2 fixed z-50 top-0 left-0 w-full">
      {/* Left: YouTube Logo */}
      <div className="flex items-center flex-shrink-0">
        <img
          onClick={()=>toggleMenuHandler()}
          className="w-10 h-10 p-2 sm:w-12 sm:h-12 cursor-pointer"
          src= {hemburger_icon}
          alt="menu"
        />
        <Link to="/">
          <img
            className="w-16 h-10 sm:w-20 sm:h-14"
            src= {youtube_logo}
            alt="YouTube"
          />
        </Link>
      </div>

      
      <div className="flex items-center flex-grow justify-center mt-2 sm:mt-0 relative">
        <input
          className="border border-gray-300 w-full max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[600px] px-4 py-2 rounded-l-full bg-white"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus = {() => setShowSuggestions(true)}
          onBlur={()=> setShowSuggestions(false)}
        />
        <button className="border border-gray-300 border-l-0 px-4 py-2 rounded-r-full text-gray-500">
          <img
                      src= {search_icon}
                      alt="search-icon"
                      className="mr-2"
                    />
        </button>
        <img
          className="h-6 ml-2 sm:ml-4 rounded-full"
          src= {mic_icon}
          alt="mic-icon"
        />
        
        
        {showSuggestions && searchQuery.length > 0 && suggestions.length > 0 && (
          <div className="absolute ml-72 top-full left-0 w-full max-w-[600px] bg-white border border-gray-300 rounded-lg mt-2 shadow-md z-10">
            <ul className="">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="px-4 py-1 cursor-pointer hover:bg-gray-300 flex items-center">
                  
                  <img
                    src= {search_icon}
                    alt="search-icon"
                    className="mr-2"
                  />
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      
      <div className="flex items-center mt-2 sm:mt-0">
        <img
          className="h-6 sm:h-8 mr-2 sm:mr-4"
          src= {bell_icon}
          alt="bell-icon"
        />
        <img
          className="h-6 w-6 sm:h-8 sm:w-8 rounded-full"
          src= {user_icon}
          alt="user"
        />
      </div>
    </div>
  );
};

export default Head;
