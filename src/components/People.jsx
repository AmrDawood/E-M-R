import React, { useContext } from 'react'
import { popularMediaContext } from '../Context/Store'
import { Link } from 'react-router-dom';

export default function People() {
  const nums = new Array(10).fill(1).map((num,index)=>index+1);
  const {popularPeople,getPopularMedia,setPopularPeople} =useContext(popularMediaContext)
  return (
    <>
    <div className="row py-5">
<div className="col-md-4 d-flex align-items-center">
  <div className="">
    <div className="brdr w-25"></div>
    <h2 className='h1 py-3'>Popular<br/> People<br/>To follow</h2>
    <p className="text-muted">most popular actor and actress</p>
    <div className="brdr "></div>
  </div>
</div>
{popularPeople.map((person,i)=><div key={i} className='col-md-2'>
  <div className="tv py-2">
    <Link to={'../persondetails/'+person.id}>
    <img className="w-100" src={'https://image.tmdb.org/t/p/w500'+person.profile_path} alt="" />
    <h3 className='h5 pt-2'> {person.name}</h3>
    </Link>
  </div>
</div>)}
</div>
<nav aria-label="...">
    <ul className="pagination pagination-lg d-flex justify-content-center">
        {nums.map((num,index)=> <li key={index} className="page-item">
      <span onClick={()=> getPopularMedia('person', setPopularPeople,num)}  role="button" className="page-link bg-transparent text-white"  >
        {num}
      </span>
    </li>)}
    </ul>
   </nav>
</>
  )
}
