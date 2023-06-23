import React from 'react'
import { useNavigate } from 'react-router-dom'
import template1 from '../Constant/Images/template1.png'
const Page = () => {
    const navigate=useNavigate();
    const handleCall=()=>{
          // navigate('/')
        // const user=localStorage.getItem("user")
        // if(user){
        //     navigate('/')
        // }
        // else{
        //     alert("please first login the user")
        //     navigate('/login')

        // }
    }
  return (
    <div>
      
      <h2 className='text-center font-bold my-2 text-3xl' >Templates Designes </h2>

      <div className='w-fit'>
        <p className='text-center'>Template-1</p>
        {/* <a href="https://notion-template.netlify.app/" target='_blank'> */}
        <img src={template1} onClick={handleCall} className='object-cover  h-[400px]' alt='template-1' />
        {/* </a> */}
      </div>

    </div>
  )
}

export default Page 
