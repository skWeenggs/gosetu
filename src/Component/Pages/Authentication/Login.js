import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
const Login = () => {

    // const [email, setEmail] = React.useState('');
    // const [password, setPassword] = React.useState('');
    // const [type,setType]=useState('User')
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email is invalid').required(),
        password:Yup.string().required()
    });
    const navigate = useNavigate();

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        const admin = sessionStorage.getItem('user');
        if (user) {
            navigate("/")
        }
        else if(admin){
            navigate("/dashboard")
        }
    }, [])

    // const handleLoginUser = async (e) => {
    //     console.log("call");
    //     e.preventDefault();
    //     const data={
    //         email:email,
    //         // password:password
    //     }
    //     // axios.post('https://vercel-notion.vercel.app/loginuser',data)
    //     axios.post('http://localhost:5000/loginuser',data)
    //     .then((res)=>{
    //         console.log(res);
    //         console.log("response",res.request.status);   
           
    //             sessionStorage.setItem('user', JSON.stringify(res.data));
    //             sessionStorage.setItem('token', JSON.stringify(res.data.auth));
    //             // sessionStorage.setItem('user', JSON.stringify(res.data.results));
    //             navigate("/")
    //      })
    //     .catch((err)=>{
    //         console.log("response",err.request.status);  
    //         console.log(err);
    //         alert(err.response.data.msg)
    //         navigate('/contactform')
    //     })
    //  }
    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
      } = useForm({resolver: yupResolver(validationSchema)}  );

    //   const handleLoginAdmin = async (e) => {
    //     console.log("call");
    //     e.preventDefault();
    //     const data={
    //         email:email,
    //         password:password
    //     }
    //     axios.post('https://vercel-notion.vercel.app/loginadmin',data)
    //     // axios.post('http://localhost:5000/loginadmin',data)
    //     .then((res)=>{
    //         console.log(res);
    //         console.log("response",res.request.status);   
           
    //             sessionStorage.setItem('admin', JSON.stringify(res.data));
    //             sessionStorage.setItem('token', JSON.stringify(res.data.auth));
    //             // sessionStorage.setItem('user', JSON.stringify(res.data.results));
    //             navigate("/userlist")
    //      })
    //     .catch((err)=>{
    //         console.log("response",err.request.status);  
    //         console.log(err);
    //     })
    //  }
       
    return (
        <div className='login m-20'>
            
            <h1 className='sm:text-2xl'>Admin Login Form</h1>

            <form method='post' onSubmit={handleSubmit(async(data)=>{
                const list={
                            email:data.email,
                            password:data.password
                        }
                        axios.post('https://vercel-notion.vercel.app/loginadmin',list)
                            // axios.post('http://localhost:5000/loginadmin',data)
                            .then((res)=>{
                                console.log(res);
                                console.log("response",res.request.status);   
                               
                                    sessionStorage.setItem('admin', JSON.stringify(res.data));
                                    sessionStorage.setItem('token', JSON.stringify(res.data.auth));
                                    // sessionStorage.setItem('user', JSON.stringify(res.data.results));
                                    navigate("/userlist")
                             })
                            .catch((err)=>{
                                console.log("response",err.request.status);  
                                console.log(err);
                            })

            })}>
                 <input type="text" className="inputBox sm:w-[350px] focus:outline-gray-300 " placeholder='Enter Email'
                /* {...register('email',{required:true})}   */  {...register("email", { 
                    required: true, 
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
                  })} />
                  {errors.email && <p className='text-red-600 ml-3'>Please enter a valid email address.</p>}
                <input  className="inputBox sm:w-[350px] focus:outline-gray-300" placeholder='Enter Password'
                {...register('password',{required:true})} />
                  {errors.password && <p className='text-red-600 ml-3'>Password is required.</p>}
                <div className='text-center'>

                 <button /* onClick={(e)=>{handleLoginAdmin(e)}}  */ type="submit" className='reg  focus:outline-gray-400' >Login</button>
                </div>
            </form> 
        </div>
    )
}

export default Login;