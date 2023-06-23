import React,{useState,useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import {  NotionRenderer} from 'react-notion';

import 'react-notion/src/styles.css';
import "prismjs/themes/prism-tomorrow.css"
import axios from 'axios';



import '../Style/notion.css'
import ProgressBar from "react-progressbar-on-scroll";
import NotFound from '../Pages/notFound';



const NotionPage = () => {

    // const itemData = useLocation().state?.itemData;
    //   console.log(itemData);

    
    const navigate=useNavigate()

    const myData = useLocation().state?.myData;
    const domain=useLocation().state?.domain;
 
    

    const [dataNotion,setNotionData]=useState({});

    

    // const blockMap = dataNotion?.recordMap?.block;
    // console.log(dataNotion);
    
    const call=async()=>{
        try{

          // const response= await axios.get(`https://notion-api.splitbee.io/v1/page/${myData.id}`)   
          const response= await axios.get(`https://vercel-notion.vercel.app/fetchdata/${myData.id}`)   
          // const response= await axios.get(`http://localhost:5000/fetchdata/${myData.id}`)   
          console.log(response);
          setNotionData(response.data.recordMap.block)

          // response.id=myData.id;
          sessionStorage.setItem("resPage",JSON.stringify(response))
        }catch(err){
          // alert("page not found")
          navigate('/')
        }
          // sessionStorage.setItem("time",new Date(response.headers).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
        }
        
        useEffect(()=>{
          // const res=sessionStorage.getItem("resPage")
    
          const res=sessionStorage.getItem("resPage")
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



  return (
    <div className='mt-[-8px]'>
      
       <ProgressBar
          color="gray"
          // gradient={true}
          position="top-[-2]"
          // colorGradient="red"
          height={2}
        />
        {dataNotion && dataNotion ?
        <NotionRenderer
        blockMap={dataNotion} 
        fullPage
        hideHeader
       
        >
    
        </NotionRenderer>
     :
     <div>Loading ....</div>
     }
       
    </div>
  )
}

export default NotionPage;