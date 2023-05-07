import logo from '../logo.svg';
import '../App.css';
import { Route , Routes , Navigate ,useNavigate} from 'react-router-dom';
import Home from './Home';
import Movies from './Movies';
import Tv from './Tv';
import People from './People';
import Login from './Login';
import Register from './Register';
import NotFound from './NotFound';
import Navbar from './Navbar';
import Footer from './Footer';
import About from './About';
import Contacts from './Contacts';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import MovieDetails from './MovieDetails';
import PersonDetails from './PersonDetails';
import { MediaContextProvider , PopularMediaContextProvider , MediaDetailsContextProvider} from '../Context/Store';
import TvDetails from './TvDetails';

function App() {
  let navigate = useNavigate();//to be used with logOut Func

  const [userData, setUserData] = useState(null)
   function decodeUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken) ;
    setUserData(decodedToken) ;
    // console.log(decodedToken);
  }

function ProtectedRoute(props){//routing gaurd
  if(localStorage.getItem('userToken')===null){
    return <Navigate to='/login'/>;
  }else{
    return props.children;
  }
}

//App Component first componant to start in the whole application
//app component conatains user data
//component did mount (to fix refresh problem) will work once App component start
useEffect(() => {
  
   if(localStorage.getItem('userToken')){
    decodeUserData() 
  }
}, [])

function logOut(){
  localStorage.removeItem('userToken');
  setUserData(null);
  navigate('/login');
}

  return (
  <>
    <Navbar logOut={logOut} userData={userData}/>
    <MediaContextProvider>
    <PopularMediaContextProvider>
    <MediaDetailsContextProvider>
  <div className='container-fluid'>
      <Routes>
      

        <Route path='' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path='home' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path='moviedetails' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}>
            <Route path=':id' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}></Route>
        </Route> 
        <Route path='movies' element={<ProtectedRoute><Movies/></ProtectedRoute>}></Route>
        <Route path='tvdetails' element={<ProtectedRoute><TvDetails/></ProtectedRoute>}>
           <Route path=':id' element={<ProtectedRoute><TvDetails/></ProtectedRoute>}></Route>
        </Route>
        <Route path='tv' element={<ProtectedRoute><Tv/></ProtectedRoute>}></Route>
        <Route path='persondetails' element={<ProtectedRoute><PersonDetails/></ProtectedRoute>}>
           <Route path=':id' element={<ProtectedRoute><PersonDetails/></ProtectedRoute>}></Route>
        </Route>
        <Route path='people' element={<ProtectedRoute><People/></ProtectedRoute>}></Route>


        <Route path='login' element={<Login decodeToken={decodeUserData}/>}></Route>
        <Route path='register' element={<Register/>}></Route>
        <Route path='about' element={<ProtectedRoute><About/></ProtectedRoute>}></Route>
        <Route path='contact' element={<ProtectedRoute><Contacts/></ProtectedRoute>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
  </div>
  </MediaDetailsContextProvider>
  </PopularMediaContextProvider>
  </MediaContextProvider>
  <Footer/>
  </>

  );
}

export default App;
