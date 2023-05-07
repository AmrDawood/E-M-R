import React ,{useState , useEffect ,createContext} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const mediaContext = createContext(0);
export function MediaContextProvider(props) {

    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTv, setTrendingTv] = useState([]);
    const [trendingPeople, setTrendingPeople] = useState([]);
  
    async function getTrending(mediaType , callback){
      const {data} =await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=8906c339de6b4f155e12b0b5ae756c10`);
      callback(data.results);
    }
    
    useEffect(() => {
      getTrending('movie',setTrendingMovies);
      getTrending('tv',setTrendingTv);
      getTrending('person',setTrendingPeople);
    }, [])

  return <mediaContext.Provider value={{trendingMovies,trendingTv,trendingPeople}}>
    {props.children}
  </mediaContext.Provider>  
}

export const popularMediaContext = createContext(0);
export function PopularMediaContextProvider(props){
  const [popularPeople , setPopularPeople] = useState([])
  async function getPopularMedia(mediaType ,callback , pagNumber=1){
    const {data} =await axios.get(`https://api.themoviedb.org/3/${mediaType}/popular?api_key=8906c339de6b4f155e12b0b5ae756c10&language=en-US&page=${pagNumber}`);
    callback(data.results);
  }
  useEffect(() => {
    
    getPopularMedia('person', setPopularPeople);

  }, [])
  
  return <popularMediaContext.Provider value={{popularPeople,getPopularMedia,setPopularPeople}}>
    {props.children}
  </popularMediaContext.Provider>
}

export const mediaDetailsContext = createContext(0);
export function MediaDetailsContextProvider(props) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [personDetails, setPersonDetails] = useState(null);
  const [tvDetails, setTvDetails] = useState(null);
  async function getMedianDetails(mediaType,id,callback){
    const {data}=await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=8906c339de6b4f155e12b0b5ae756c10&language=en-US`);
    callback(data);
}
  return <mediaDetailsContext.Provider value={{movieDetails,personDetails,tvDetails,getMedianDetails ,setMovieDetails,setPersonDetails,setTvDetails}}>
    {props.children}
  </mediaDetailsContext.Provider>
}