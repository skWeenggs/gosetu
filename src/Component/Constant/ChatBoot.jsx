import React, { useState } from "react";
// import { isBlank,isLength,isMobile,isValid,isMassageLength,validateEmail } from '../content/Checks';
import {RiCloseCircleFill} from 'react-icons/ri'
const ChatBoot=()=>{
    const [state,setState]=useState(true);
    const handleChange=()=>{
         setState(!state)
     }
     const [name,setName]=useState('');
     const [email,setEmail]=useState('');
     const [contact,setContact]=useState('');
     const [massage,setMassage]=useState('');
     const [loader, setLoader] = useState(false);
     var error;
    //  const handleSubmit=async(e)=>{
    //     e.preventDefault()
        
    //     error=false;
    //     // console.log(name,email,subject,massage);
    //     setLoader(true);
    //     if(isBlank(name.trim())){
    //         error='true'
    //         document.getElementById('name-error').innerHTML = "Name should not be empty";
    //     }else if(isLength(name)){
    //         error=true;
    //         document.getElementById('name-error').innerHTML = "Name should be 1 to 15 char";
    //     }else {
    //         // name.style.background = 'White';
    //         document.getElementById('name-error').innerHTML = '';
    //       }
    //     if(isBlank(email.trim())){
    //         error=true;
    //         document.getElementById('email-error').innerHTML = "Email should not be blank";
    //         // msg+="<font color='#e74c3c'><b> Email shoulde not be blank </b></font><br>";
    //       }else if(validateEmail(email)){  
    //           error=true;
    //         document.getElementById('email-error').innerHTML = "Please enter valid email";
    //           console.log(email);
    //       }
    //       else {
    //         // name.style.background = 'White';
    //         document.getElementById('email-error').innerHTML = '';
    //       }
    //       if(isBlank(massage.trim())){
    //         error='true'
    //         document.getElementById('massage-error').innerHTML = "massage shouldn't empty";
    //     }else  if(isMassageLength(massage)){
    //         error='true'
    //         document.getElementById('massage-error').innerHTML = "massage should be min-5 to 49 char";
    //     }else{
    //         document.getElementById('massage-error').innerHTML = "";
    //     }
    //       if(isBlank(contact.trim())){
    //         error=true;
    //         document.getElementById('contact-error').innerHTML = "Contact no should not be empty"; 
    //       }
    //       else if(isValid(contact)){
    //         error=true;
    //         document.getElementById('contact-error').innerHTML = "Enter valid mobile no";
    //       }
    //       else if(isMobile(contact)){
    //         error=true;
    //         document.getElementById('contact-error').innerHTML = "Contact range should be 10 digit";
    //       } else{
    //         document.getElementById('contact-error').innerHTML = '';
    //       }
          
    //       if(error){
    //             setLoader(false)
    //             // document.getElementById('m-error').innerHTML = "One or more fields have an error. Please check and try again."; 
    //       }else{
    //         // document.getElementById('m-error').innerHTML = '';
    //           setLoader(true);
    //           const data={
    //               name:name,
    //               contact:contact,
    //               email:email,
    //               massage:massage,
    //           }
    //           console.log(data);
            
    //           setTimeout(() => {
    //               setLoader(false)
    //           },1000);
    //       }
    // }


    return(
     <>
    {state ?
    
      <div  className="bg-[#b92b2f] fixed block right-0 top-[30%] hover:cursor-pointer h-[40%] max-w-[9%] rounded-r-lg scale-[-1] z-50" onClick={handleChange}>
        <h1 className=" text-white font-solid  mt-4 md:m-2 " style={{ 'writingMode': 'vertical-rl',display:'table-caption'}}> send massage</h1> 
     </div>
    
     :
     <div  className='z-50 h-[500px]  max-w-[320px] bottom-0 right-0 fixed inline-grid'>
        <div className="bg-[#b92b2f] ">
          <div className="w-full grid justify-end">
         <button  onClick={handleChange} className='m-2 flex w-fit justify-end p-2  hover:text-white opacity-0.89  hover:bg-black-500/100 ' >
         <RiCloseCircleFill />
         </button>
            </div>  
        <div className="p-1 text-sm  text-white ">
         Please fill out the form below and we will get back to you as soon as possible.
        </div>
        </div>
         <div className=" overflow-auto bg-white p-5">
         <form class="w-full max-w-sm p-5 bg-[#fafafa] border-l-4 border-red-500 rounded"  /* onSubmit={handleSubmit} */>
            
                <div class="relative z-0 mb-6 w-full group text-xs ">
                    <input type="text"  class="block py-2.5 px-0 w-full outline-1 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " name={name} onChange={(e)=>{setName(e.target.value)}} />
                    <label for="name" class="absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">* Name</label>
                    <div style={{color:'red'}} id="name-error" class="error"></div>
                </div>

                <div class="relative z-0 mb-6 w-full group text-xs">
                    <input type="number"
                     onInput={(e) => {
                      if (e.target.value.length > e.target.maxLength)
                      e.target.value = e.target.value.slice(0,e.target.maxLength);
                      }}  maxLength="12"
                      onWheel={(e) => e.target.blur()}
                      class="block py-2.5 px-0 w-full outline-1 text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-100 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " name={contact} onChange={(e)=>{setContact(e.target.value)}} />
                    <label for="name" class="absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Phone</label>
                    <div style={{color:'red'}} id="contact-error" class="error "></div>
                </div>
                
                <div class="relative z-0 mb-6 w-full group text-xs">
                    <input type="Email"  class="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " name={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    <label for="email" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">* Email</label>
                    <div style={{color:'red'}} id="email-error" class="error"></div>
                </div>
               
                <div class="relative z-0 mb-6 w-full group text-xs">
                    <textarea type="text"  class="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " name={massage} onChange={(e)=>{setMassage(e.target.value)}} />
                    <label for="subject" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">* Massage</label>
                    <div style={{color:'red'}} id="massage-error" class="error"></div>
                </div>

            <div class="md:flex md:items-center">
               
                <button type="submit" class="inline-block px-6 py-2.5 w-full bg-red-600 text-white font-medium text-sm  uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"> <i class="fa fa-paper-plane rotate-45 m-2 "></i> Submit</button>
            </div>
            
        </form>
        </div>
        <div className="text-center bg-[#e5e5e5] z-50">
            <button class=" hover:bg-white text-xs w-full m-auto  my-1 rounded-full justify-center ">
                <a href="https://www.tawk.to/?utm_source=tawk-messenger&utm_medium=link&utm_campaign=referral&utm_term=5858baa75191003fde7bc865">

            <img src="https://embed.tawk.to/_s/v4/assets/images/Tawky_16x16.svg" className="w-5 m-2 inline" />
            add free live chat to your site
                </a>
            </button>
        </div>
     </div>
    }
    </>
 )
}
export default ChatBoot;