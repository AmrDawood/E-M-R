import React , {useState} from 'react';
import  Axios  from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const [isloading, setIsLoading] = useState(false);
  const [validationErrorList, setValidationerrorList] = useState([]);
  const [error, setError] = useState("");
  const[user,setUser]=useState({first_name:"",last_name:'',email:'',password:'',age:0});

  let naviagte = useNavigate();
 function getuserData(e){
    let myUser={...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser);
  }

async function submitRegisterationForm(e){
  e.preventDefault();
  setIsLoading(true);
  //console.log(user);
  const validationResault = validateRegisterForm();
  if(validationResault.error){
    setValidationerrorList(validationResault.error.details);
    console.log(validationResault.error.details);
    setError('');
    setIsLoading(false);
  }else{
  // let response = await Axios.post('https://route-movies-api.vercel.app/signup',user);
  // console.log(response);
  const {data} = await Axios.post('https://route-movies-api.vercel.app/signup',user);
  
  if(data.message==='success'){
    // console.log(data.message);
    setIsLoading(false);
    naviagte('../login');
    
  }else{
    setError(data.message);
    setValidationerrorList([]);
    setIsLoading(false);
  }
  }
  
}

function validateRegisterForm(){
  const schema = Joi.object({first_name:Joi.string().alphanum().min(3).max(30).required(),
    last_name:Joi.string().alphanum().min(3).max(30).required(),
    email:Joi.string().email({tlds:false}).required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    age:Joi.number().min(16).max(150).required()
  })
   
    return  schema.validate(user,{abortEarly:false});
} 
 
  return (
    <>
      <div className="mx-auto w-75">
        <h2>Register</h2>
        <form onSubmit={submitRegisterationForm}>

          { validationErrorList.map((error)=><div className="alert alert-warning">{error.message}</div>) }
          {error.length>0?<div className="alert alert-warning">{error}</div>:''}
          
          <label htmlFor="first_name">First name :</label>
          <input onChange={getuserData} type="text" name="first_name" id="first_name" className='form-control mb-2 bg-transparent'/>

          <label htmlFor="last_name">Last name :</label>
          <input onChange={getuserData} type="text" name="last_name" id="last_name" className='form-control mb-2 bg-transparent'/>

          <label htmlFor="email">Email :</label>
          <input onChange={getuserData} type="email" name="email" id="email" className='form-control mb-2 bg-transparent'/>

          <label htmlFor="password">Password :</label>
          <input onChange={getuserData} type="password" name="password" id="password" className='form-control mb-2 bg-transparent'/>

          <label htmlFor="age">Age :</label>
          <input onChange={getuserData} type="number" name="age" id="age" className='form-control mb-2 bg-transparent'/>

          <button type="submit" className='btn btn-outline-info'>
            {isloading===true?<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
  <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
</svg>:'Register'}
          </button>
        </form>
      </div>
    </>
  )
}
