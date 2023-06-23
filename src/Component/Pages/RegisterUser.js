import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import ProgressBar from "react-progressbar-on-scroll";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterUser=()=> {

  
    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        domain_name:Yup.string().required(),
        content_page_id:Yup.string().required(),
        pages_page_id:Yup.string().required(),
        author_page_id:Yup.string().required(),
        token_secretid:Yup.string().required(),
        template:Yup.string().required(),
    });

      const {register,handleSubmit,resetField,formState: { errors }} = useForm({resolver: yupResolver(validationSchema)}  );

    const onSubmit =async(data) =>{ 
        console.log(data)
        const list={
            email:data.email,
            domain:data.domain_name,
            content_page_id:data.content_page_id,
            pages_page_id:data.pages_page_id,
            author_page_id:data.author_page_id,
            token_secretid:data.token_secretid,
            temp:data.template,
        }
        await axios.post(`https://vercel-notion.vercel.app/submitFormToNotion`,list)
        .then((response)=>{
            resetField("email")
            resetField("domain_name")
            resetField("content_page_id")
            resetField("pages_page_id")
            resetField("author_page_id")
            resetField("token_secretid")
            resetField("template")
            toast("register user successfully")
        })
        .catch((err)=>{
            console.log(err);
            toast("massage",err)
        })
        }

  return (
    <>
     <ProgressBar
          color="gray"
          // gradient={true}
          position="top-0"
          // colorGradient="red"
          height={2}
        />
        
        <ToastContainer />
    <div className='bg-[#fff]'>
          <section className='lg:max-w-[75%] contents'>
           <div className='w-full'>
           <h2 className='sm:text-3xl text-center my-5'>Registeration For Template</h2>
           <div className=' md:w-full flex flex-col lg:max-w-[80%] m-auto lg:items-center'>
           
            <form class="w-full contents text-sm" method="post" onSubmit={handleSubmit(onSubmit)}>
                
                {/* <div class="text-start flex flex-col lg:w-5/6 2xl:w-5/6  md:items-center mb-2 px-10">
                    <div class="text-start  md:w-2/3 pb-2">
                    <label class="flex text-start text-sm  text-gray-500  md:text-right mb-1 md:mb-0 pr-4  2xl:text-xl" >
                        User Name
                    </label>
                    </div>
                    <div class="md:w-2/3">
                    <input class=" appearance-none border border-gray-200 rounded w-full 2xl:text-xl text-sm p-1.5 leading-8 focus:outline-1px focus:bg-white focus:outline-gray-200 focus:border-2"  {...register('name',{required:true})} />
                    {errors.name && <p className='text-red-600'>name is required.</p>}
                    </div>
                </div> */}
                <div class="text-start flex flex-col lg:w-5/6 2xl:w-5/6  md:items-center mb-2 px-10">
                    <div class="text-start  md:w-2/3 pb-2">
                    {/* <label class="flex text-start text-sm  text-gray-500  md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg" >
                        Your Email (Enter notion registered email)
                    </label> */}
                    </div>
                    <div class="md:w-2/3">
                    <input class=" appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:bg-white focus:outline-gray-200 focus:border-2" id="email"  placeholder=" Your Email (Enter notion registered email)" type="text" {...register('email',{required:true})} />
                    {errors.email && <p className='text-red-600'>Please enter a valid email address.</p>}
                    </div>
                </div>
                <div class=" text-start flex flex-col lg:w-5/6 2xl:w-5/6  md:items-center mb-2 px-10">
                    <div class="text-start  md:w-2/3 pb-2">
                    {/* <label class="flex text-start text-gray-500 text-sm 2xl:text-lg md:text-right mb-0 md:mb-0 pr-4" >
                        Damain Name
                    </label> */}
                    </div>
                    <div class="md:w-2/3">
                    <input class=" appearance-none border border-gray-200 rounded w-full md:text-md 2xl:text-md text-sm p-1.5 leading-8   focus:outline-1px focus:bg-white focus:outline-gray-200 focus:border-2 " placeholder=' Damain Name' id="domain" type="text" {...register('domain_name',{required:true})} />
                    {errors.domain_name && <p className='text-red-600'>Domain name is required.</p>}
                    </div>
                </div>
                <div class="text-start flex flex-col lg:w-5/6 2xl:w-5/6  md:items-center mb-2 px-10">
                    <div class="text-start  md:w-2/3 pb-2">
                    {/* <label class="text-start flex text-sm  text-gray-500  2xl:text-lg md:text-right mb-0 md:mb-0 pr-4" >
                       Notion Contents Page-Id
                    </label> */}
                    </div>
                    <div class="md:w-2/3">
                    <input class=" appearance-none border border-gray-200 rounded block text-sm  2xl:text-md w-full p-1.5  leading-8 focus:outline-1px focus:bg-white focus:outline-gray-200 focus:border-2" placeholder=' Notion Contents Page-Id' id="content-page"  {...register('content_page_id',{required:true})}/>
                    {errors.content_page_id && <p className='text-red-600'>Notion contents page-id required.</p>}
                    </div>
                </div>
               
                <div class="text-start flex flex-col lg:w-5/6 2xl:w-5/6  md:items-center mb-2 px-10">
                    <div class="text-start  md:w-2/3 pb-2">
                    {/* <label class="text-start flex text-sm  text-gray-500  2xl:text-lg md:text-right mb-0 md:mb-0 pr-4" >
                       Notion pages Page-Id
                    </label> */}
                    </div>
                    <div class="md:w-2/3">
                    <input class=" appearance-none border border-gray-200 rounded block text-sm  2xl:text-md w-full p-1.5  leading-8 focus:outline-1px focus:bg-white focus:outline-gray-200 focus:border-2" placeholder=' Notion pages Page-Id' id="pages-page" {...register('pages_page_id',{required:true})}/>
                    {errors.pages_page_id && <p className='text-red-600'>Notion pages page-id required.</p>}

                    </div>
                </div>
                <div class="text-start flex flex-col lg:w-5/6 2xl:w-5/6  md:items-center mb-2 px-10">
                    <div class="text-start  md:w-2/3 pb-2">
                    {/* <label class="text-start flex text-sm  text-gray-500  2xl:text-lg md:text-right mb-0 md:mb-0 pr-4" >
                       Notion pages Page-Id
                    </label> */}
                    </div>
                    <div class="md:w-2/3">
                    <input class=" appearance-none border border-gray-200 rounded block text-sm  2xl:text-md w-full p-1.5  leading-8 focus:outline-1px focus:bg-white focus:outline-gray-200 focus:border-2" placeholder=' Notion author Page-Id' id="author_page_id" {...register('author_page_id',{required:true})}/>
                    {errors.author_page_id && <p className='text-red-600'>Notion author page-id required.</p>}

                    </div>
                </div>

                <div class="text-start flex flex-col lg:w-5/6 2xl:w-5/6  md:items-center mb-2 px-10">
                    <div class="text-start  md:w-2/3 pb-2">
                    {/* <label class="text-start flex text-sm  text-gray-500  2xl:text-lg md:text-right mb-0 md:mb-0 pr-4" >
                       Notion Token
                    </label> */}
                    </div>
                    <div class="md:w-2/3">
                    <input class=" appearance-none border border-gray-200 rounded block text-sm  2xl:text-md w-full p-1.5  leading-8 focus:outline-1px focus:bg-white focus:outline-gray-200 focus:border-2" placeholder='Notion Token' id="token-id" {...register('token_secretid',{required:true})}/>
                    {errors.token_secretid && <p className='text-red-600'>Notion-API token required.</p>}
                    </div>
                </div>
                <div class="text-start flex flex-col lg:w-5/6 2xl:w-5/6  md:items-center mb-2 px-10">
                    <div class="text-start  md:w-2/3 pb-2">
                    {/* <label class="text-start flex text-sm  text-gray-500  2xl:text-lg md:text-right mb-0 md:mb-0 pr-4" >
                       Template Name
                    </label> */}
                    </div>
                    <div class="md:w-2/3">
                    <input class=" appearance-none border border-gray-200 rounded block text-sm  2xl:text-md w-full p-1.5  leading-8 focus:outline-1px focus:bg-white focus:outline-gray-200 focus:border-2" placeholder='Template Name' id="template"  {...register('template',{required:true})}/>
                    {errors.template && <p className='text-red-600'>Template name required.</p>}
                    </div>
                </div>
                <div class="text-start  flex flex-col 2xl:w-5/6  lg:w-5/6 md:items-center mb-2 px-10">
                    <div class="md:w-3/3 flex">
                    <button class="shadow bg-gray-500 hover:bg-gray-300 border-2 2xl:text-xl hover:border-gray-600 focus:shadow-outline active:bg-gray-300 focus:outline-none  text-white font-bold py-2 px-4 rounded-full" type="submit"  >
                        SEND
                    </button>
                    {/* {loader?<Loader />:''} */}
                    </div>
                </div>
               
            </form>
          </div>
         
    
          </div> 

          </section>
          </div>
    </>
  )
}

export default RegisterUser;