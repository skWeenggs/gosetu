import React,{useState,useEffect} from 'react'
import { NavLink, useLocation,useNavigate } from 'react-router-dom';
import {  NotionRenderer } from 'react-notion';
import 'react-notion/src/styles.css';
import "prismjs/themes/prism-tomorrow.css"
import axios from 'axios';
import {FaLocationArrow} from 'react-icons/fa'

import '../../Style/notion.css'
import ProgressBar from "react-progressbar-on-scroll";




const Tags = () => {

  
    // const itemData = useLocation().state?.itemData;
    //   console.log(itemData);

    
    const navigate=useNavigate()

    const myData = useLocation().state?.myData;
    // const domain=useLocation().state?.domain;
    const [array,setArray]=useState([]);
    const [domain,setDomain]=useState(null) 
    
    const [databaseId, setDatabaseId] = useState(null);
    const [dataNotion,setNotionData]=useState({});
    const [data,setData]=useState([]);
    // const blockMap = dataNotion?.recordMap?.block;
    // console.log(dataNotion);
    
    const call=async()=>{
        try{

          // const response= await axios.get(`https://notion-api.splitbee.io/v1/page/${myData.id}`)   
          // const response= await axios.get(`https://vercel-notion.vercel.app/fetchdata/${myData.id}`)   
          const response= await axios.get(`https://vercel-notion.vercel.app/fetchdata/${myData.id}`)   
            
          setNotionData(response.data.recordMap.block)

          // response.id=myData.id;
          sessionStorage.setItem("resPage",JSON.stringify(response))
        }catch(err){
          // alert("page not found")
          navigate('/')
        }
          // sessionStorage.setItem("time",new Date(response.headers).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    }

    const tagsdata=async()=>{
      try{
        const res=await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/${databaseId}/${domain}`)

        setData(res.data)
      }catch(e){
        console.log(e);
      }
    }
    console.log(data);

        useEffect(() => {


          async function LoadData() {
              ////Load Master Page User-List/////
              // const res=await axios.get('https://notion-api.splitbee.io/v1/table/82c796b9a232481ca43002087faa0a81');
              const res = await axios.get(`https://vercel-notion.vercel.app/users`);
  
              const uniqueData = res.data.results.filter(newData => !array.some(existingData => existingData.properties.TagPageId.rich_text.plain_text === newData.properties.TagPageId.rich_text.plain_text));
  
              setArray(uniqueData)
          }
  
          const currentDomain = window.location.hostname;
          const matchingDomain = array && array.find(mapping => mapping.properties.Domain?.rich_text[0]?.plain_text === currentDomain);
          console.log("matc",matchingDomain);
          if (matchingDomain) {
              setDatabaseId(matchingDomain.properties.TagPageId?.rich_text[0]?.plain_text);
              setDomain(matchingDomain.properties.Domain?.rich_text[0]?.plain_text)
              // setAuthorDatabaseId(matchingDomain.properties.AuthorPageId.rich_text[0].plain_text)
          }
  
          console.log("1");
  
          if (array?.length < 1) {
              LoadData()
          }
          console.log(data !== null);
          if(data !== null && databaseId !== null && domain !== null){
            tagsdata()
          }
  
      }, [array,databaseId])


        useEffect(()=>{
          // const res=sessionStorage.getItem("resPage")
          const Id=sessionStorage.getItem("TagID")
          const res=sessionStorage.getItem("resTagPage")
          const data = JSON.parse(res);
          
          // console.log(data);
         
            // if(myData?.id !== Id ){
            //    call()  
            // }
            // else if(Id === data.id){
            //     setNotionData(data.data)
            // }
          call()
        },[myData])

   const Datafilter=(fil)=>{
    console.log("tags list",fil);
    navigate(`/tags/${fil?.properties?.Slug?.rich_text[0]?.plain_text}`, { state: { myData: fil, domain: domain } })
   }
     



  return (
    <div className='mt-[-2px]'>
      
       <ProgressBar
          color="gray"
          // gradient={true}
          position="top-[-2]"
          // colorGradient="red"
          height={2}
        />
        {dataNotion && dataNotion ?
        (<>
        <section class="bg-gray-50 py-12 sm:py-16 lg:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
            <nav class="flex items-center justify-center" aria-label="Breadcrumb">
                <NavLink tp={'/'} className="flex items-center justify-center font-medium text-secondary-500 hover:text-secondary-700 sm:hidden " >
                    <svg class="h-5 w-5 flex-shrink-0 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 12H4M4 12L10 18M4 12L10 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    Go to Home
                </NavLink>
                <ol class="hidden items-center space-x-4 sm:flex">
                    <li>
                        <div>
                            <NavLink to={'/'} class="text-secondary-400 hover:text-secondary-600 " >
                                <svg class="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9 21V13.6C9 13.0399 9 12.7599 9.10899 12.546C9.20487 12.3578 9.35785 12.2049 9.54601 12.109C9.75992 12 10.0399 12 10.6 12H13.4C13.9601 12 14.2401 12 14.454 12.109C14.6422 12.2049 14.7951 12.3578 14.891 12.546C15 12.7599 15 13.0399 15 13.6V21M11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764Z"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                </svg>
                                <span class="sr-only">Home</span>
                            </NavLink>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center">
                            <svg class="h-5 w-5 flex-shrink-0 text-secondary-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <p class="truncate text-sm font-medium text-secondary-500 ml-4 text-left hover:text-secondary-700">{myData.properties.Name.title[0].plain_text}</p>
                        </div>
                    </li>
                </ol>
            </nav>
            <h1 class="text-3xl font-bold tracking-tight text-secondary-900 mt-8 sm:text-4xl lg:text-5xl">Find all the {myData.properties.Name.title[0].plain_text}</h1>
        </div>
    </div>
</section>
        <div >
          <div className='bg-white py-12 sm:py-16 lg:py-20'>
          {data && data.users?.results.map((list,i)=>{
            console.log(list);
            return(
              <>
                <div onClick={() => Datafilter(list)} className='max-w-2xl mx-auto px-4 sm:px-6 py-4 items-center lg:px-8 flex  justify-between w-full cursor-pointer text-gray-500 hover:text-gray-900 '>
                <h1 className='truncate whitespace-normal text-lg font-semibold text-gray-900 sm:text-xl sm:ml-5 hover:text-gray-900 lg:text-2xl'>{list?.properties?.Name?.title[0]?.plain_text}</h1>
                <p key={i}  className=' flex gap-3  text-center font-semibold  ml-auto  sm:text-lg lg:text-xl'>
                 {list?.properties?.Contents?.relation?.length} Posts

                <p className='m-auto'><FaLocationArrow /></p> 
               </p>
                </div>              
                <hr className='max-w-2xl mx-auto  items-center lg:px-8 flex  justify-between w-full' />
                </>
              )
            })}
          </div>

        </div>
        </>)
     :
     <div>Loading ....</div>
     }
       
    </div>
  )
}

export default Tags;