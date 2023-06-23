import React,{useEffect,useState} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import {  NotionRenderer } from 'react-notion';
import 'react-notion/src/styles.css';
import "prismjs/themes/prism-tomorrow.css"
import axios from 'axios';


import '../Style/notion.css'
import ProgressBar from "react-progressbar-on-scroll";

function About() {

    const myData = useLocation().state?.myData;
    // console.log(myData.id);
    // {myData=== undefined ?  navigate('/dsd/dsd') :''}

    const [dataNotion,setNotionData]=useState({});
  

  
    const call=async()=>{
        // const response= await axios.get(`https://notion-api.splitbee.io/v1/page/${myData.id}`)   
        // const response= await axios.get(`http://localhost:4000/fetchpagenotion/${myData}`)   
          // console.log(response)
          // setNotionData(response.data)
          const response= await axios.get(`https://vercel-notion.vercel.app/fetchdata/${myData.id}`)   
          
          setNotionData(response.data.recordMap.block)
          sessionStorage.setItem("AboutID",myData.id)
          response.id=myData.id;
          sessionStorage.setItem("resAbout",JSON.stringify(response))
          // sessionStorage.setItem("time",new Date(response.headers).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
        }
    useEffect(()=>{
        // const res=sessionStorage.getItem("resPage")
        const Id=sessionStorage.getItem("AboutID")
        const res=sessionStorage.getItem("resAbout")
         const data = JSON.parse(res);
        // console.log(data.id);
        // console.log(res[Id]);
        // console.log(Id);
        // console.log(myData.id);
        // setNotionData(JSON.parse(res))
        // if(res){
          // console.log(myData.id !== Id);
           if(myData.id !== Id ){

            call()  
          }
          else if(Id === data.id){
              setNotionData(data.data.recordMap.block)
          }
        // }
      },[])

  return (
    <>
     <ProgressBar
          color="gray"
          // gradient={true}
          position="top-0"
          // colorGradient="red"
          height={2}
        />
        
        <NotionRenderer
        blockMap={dataNotion} 
        fullPage
        hideHeader
       
        >
    
        </NotionRenderer>
     
    </>
  )
}

export default About;