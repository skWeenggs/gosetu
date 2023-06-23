import React,{useState,useEffect,useLayoutEffect, useRef} from 'react'

import { Link, useNavigate,NavLink } from 'react-router-dom';
// import '../Style/nav.css'
import axios from 'axios';

const Nav = () => {

  // localStorage.setItem("navId",'2ec2121978bc4fe4b0563f9feeb9ca56')
  const item=sessionStorage.getItem("UserList")
  const [databaseId, setDatabaseId] = useState(null);
  const [domain,setDomain]=useState('')
  const [array,setArray]=useState(item ? JSON.parse(item):[]);

 
  const admin=sessionStorage.getItem('admin');
//   const time=sessionStorage.getItem('time');
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate('/login')
  }
  const [open,setOpen]=useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const handleResize = () => {
    if (window.innerWidth > 768) {
      setOpen(false)
    } 
  }
  
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  // console.log(JSON.parse(auth).listUsersResponse.results[0].name )
  const [header,setHeader]=useState([])
  


useLayoutEffect(()=>{

   async function LoadData(){
      // const res=await axios.get('https://notion-api.splitbee.io/v1/table/82c796b9a232481ca43002087faa0a81');
      const res=await axios.get(`https://vercel-notion.vercel.app/users`);
      // const uniqueData = res.data.filter(newData => !array.some(existingData => existingData.ContentPageId === newData.ContentPageId));
      const uniqueData = res.data.results.filter(newData => !array.some(existingData => existingData.properties.ContentPageId.rich_text.plain_text === newData.properties.ContentPageId.rich_text.plain_text));
  
      sessionStorage.setItem("UsersList",JSON.stringify(uniqueData))
      setArray(uniqueData)
    }

    async function callonce(){
      // const response=await axios.get(`http://localhost:4000/fetchuserdata/c3947bed200c49c39490e3d14ad199c0`)
    
      // const response=await axios.get(`https://notion-api.splitbee.io/v1/table/${databaseId}`)
      // const response=await axios.get(`https://notion-api.splitbee.io/v1/table/${databaseId}`)
      const response=await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/${databaseId}/${domain}`)
      // const response=await axios.get(`http://localhost:5000/fetchuserdata/${databaseId}/${domain}`)
      // console.log("nav response",response.data);
      setHeader(response.data)
      sessionStorage.setItem('header',JSON.stringify(response.data))
    
    }

    if(array.length <1  ){
      LoadData()
    }

  
  const head=sessionStorage.getItem("header")
   setHeader(JSON.parse(head));
    // console.log(header);
    const currentDomain = window.location.hostname;

    // const matchingDomain = domainDatabaseMap.find(mapping => mapping.domain === currentDomain);

    // if (matchingDomain) {
    //   // localStorage.setItem("navId",matchingDomain.databaseId)
    //    setDatabaseId(matchingDomain.databaseId);
    //    setDomain(matchingDomain.domain)
    //  }

    // const matchingDomain = array.find(mapping => mapping.Domain === currentDomain);
    const matchingDomain = array?.find(mapping => mapping.properties.Domain.rich_text[0].plain_text === currentDomain);
   
    if (matchingDomain) {
     
      //  setDatabaseId(matchingDomain.PagesPageId);
      //  setDomain(matchingDomain.Domain)
      setDatabaseId(matchingDomain.properties.PagesPageId.rich_text[0].plain_text);
      setDomain(matchingDomain.properties.Domain.rich_text[0].plain_text)
     }
  
     if(databaseId !==null && !header){
       
       callonce()
     }
   

},[array,databaseId])

const handlecall=(res)=>{
  setOpen(!open)
console.log(res);
  navigate(`/${res?.properties.Slug.rich_text[0].plain_text}`,{ state: { myData: res}, replace:true })
  // navigate(`/${res?.Slug}`,{ state: { myData: res}, replace:true })
  // navigate(`/${res?.properties.Slug.rich_text[0].plain_text }`,{ state: { myData: res}, replace:true })
  // navigate(`/${res?.Slug }`,{ state: { myData: res}, replace:true })
  
 }

// const handlecallFull=(res)=>{
// console.log(res);
//   navigate(`/${res?.properties.Slug.rich_text[0].plain_text }`,{ state: { myData: res}, replace:true  })
//  }

const handleresetFilter=()=>{
  // sessionStorage.removeItem('filter')
  setOpen(!open)
}

  return (
    <>
   
   
    <div className='bg-white xl:px-[10%] px-[5%]  w-full flex sticky top-0  z-10'  ref={menuRef}>
        <div className='w-[15%] flex  m-auto'>

        <Link to='/'>
         <img
            alt='logo'
            className="logo md:block ml-2 sm:mx-20 mt-[-8px] lg:mt-0 sm:float-left h-10 w-10"
            src='https://cdn.feather.blog/?src=https%3A%2F%2Fimagedelivery.net%2FhQTLE0NTlcNyb_tOYFnnyA%2F988101f9-545f-47de-5627-17abbb63e300%2Fsquare&optimizer=image/' />
          {/* {time && time } */}
        </Link>
        </div>
              <>  
                {admin?
                <>
                <ul className="nav-ul nav-right w-[90%]">
                        <div className='lg:hidden flex   justify-end mr-3 sm:mt-2' >
                        <svg onClick={()=>{setOpen(!open)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                         
                         </div>
                      {open?
                       (
                        <> 
                      
                        <NavLink to="/dashboard" onClick={handleresetFilter}><li className= 'hover:bg-gray-200 text-gay-500 hover:text-black hover:text-gay-500 hover:text-black w-full  ' >Home</li></NavLink>
                        <NavLink to="/userlist" onClick={()=>{setOpen(!open)}}><li className='hover:bg-gray-200 text-gay-500 hover:text-black  w-full '>USer List</li></NavLink>
                       
                         <NavLink to="/login"  onClick={logout}><li className='hover:bg-gray-200 text-gay-500 hover:text-black  w-full'>Logout ({(JSON.parse(admin)?.listUsersResponse?.results[0].name )})</li></NavLink>
                  
                        </>
                       )
                      :(
                      <> 
                        <div className="hidden lg:flex lg:justify-end">
                        
                         <li className='mt-[10px]'><NavLink to="/dashboard"   className='hover:bg-gray-200 text-gay-500 hover:text-black  '>Home</NavLink></li>
                         <li className='mt-[10px]'><Link to="/userlist" className='hover:bg-gray-200 text-gay-500 hover:text-black  '>User List</Link></li>
                         
                        <li className='mt-[10px]'>
                       <NavLink onClick={logout} to="/login" className='hover:bg-gray-200 text-gay-500 hover:text-black  '>Logout({(JSON.parse(admin)?.listUsersResponse?.results[0].name )})</NavLink>
                          </li>
                      
                        {/* <li><Link to="#" className='hover:bg-gray-200 text-gay-500 hover:text-black  '>Home</Link></li>
                          <li><Link to="/users" className='hover:bg-gray-200 text-gay-500 hover:text-black  '>Users</Link></li> 
                          <li><NavLink to='/course' className='hover:bg-gray-200 text-gay-500 hover:text-black  w-full'>Add Course</NavLink></li> */}
                        </div>
                      </>
                      )
                      }
                  </ul>
                </>
                :
                <>
                <ul className="nav-ul nav-right w-[90%]">
                        <div className='lg:hidden flex   justify-end mr-3 sm:mt-2' >
                        <svg onClick={()=>{setOpen(!open)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                         
                         </div>
                      {open?
                       (
                        <> 
                        <NavLink to="/" onClick={handleresetFilter}><li className='hover:bg-gray-200 text-gay-500 hover:text-black  w-full '>Home</li></NavLink>
                        {header && header?.users?.results.map((data,key)=>
                           {
                              console.log("data=--====",data);
                               return(
                                <div key={key}  onClick={()=>{handlecall(data)}} className='hover:bg-gray-200 text-gay-500 hover:text-black  w-full  cursor-pointer'>
                                 <button ><li>{data.properties.Name.title[0].plain_text}</li></button>
                                 {/* <button ><li>{data.Name}</li></button> */}
                                </div>
                                )
                            }
                        )}
                         <NavLink to="/register"  ><li onClick={()=>{setOpen(!open)}} className='hover:bg-gray-200 text-gay-500 hover:text-black  w-full'>Registeration </li></NavLink>
                         <NavLink to="/login" /*  onClick={logout} */><li onClick={()=>{setOpen(!open)}} className='hover:bg-gray-200 text-gay-500 hover:text-black  w-full'>LogIn </li></NavLink>
                        {/* <NavLink to="/form" onClick={()=>{setOpen(!open)}}><li className='hover:bg-gray-200 text-gay-500 hover:text-black  w-full '>Form</li></NavLink>
                        <NavLink to="#" onClick={()=>{setOpen(!open)}}><li className='hover:bg-gray-200 text-gay-500 hover:text-black  w-full '>Home</li></NavLink>
                        <NavLink to="/users" onClick={()=>{setOpen(!open)}}><li className='hover:bg-gray-200 text-gay-500 hover:text-black  w-full'>Users</li></NavLink>
                        <NavLink to='/course' onClick={()=>{setOpen(!open)}}><li className='hover:bg-gray-200 text-gay-500 hover:text-black  w-full'>Add Course</li></NavLink> */}
                        {/* <NavLink to="/login"  onClick={logout}><li className='hover:bg-gray-200 text-gay-500 hover:text-black  w-full'>Logout ({(JSON.parse(auth).listUsersResponse.results[0].name )})</li></NavLink>  */}
                        {/* <li><Link to="/profile">Profile</Link></li> */}
                        {/* <li> <Link onClick={logout} to="/signup">Logout ({(JSON.parse(auth).listUsersResponse.results[0].name )})</Link></li> */}
                        </>
                       )
                      :(
                      <> 
                        <div className="hidden lg:flex lg:justify-end">
                        
                         <li className='mt-[10px]'><Link to="/" /* onClick={sessionStorage.removeItem('filter')}  */className='hover:bg-gray-200 text-gay-500 hover:text-black  '>Home</Link></li>
                        {header && header?.users?.results.map((data)=>
                           {

                             return(
                               <div key={data.id} className="hidden lg:block">
                                <li>

                                  {/* <Link to={`/${data?.Slug}`} state={{ myData: data }} replace  className='flex hover:bg-gray-200 text-gay-500 hover:text-black  '>{data.Name}</Link> */}
                                  <Link to={`/${data?.properties.Slug.rich_text[0].plain_text}`} state={{ myData: data }} replace  className='flex hover:bg-gray-200 text-gay-500 hover:text-black  '>{data.properties.Name.title[0].plain_text}</Link>
                                  {/* <Link to={`/${data.Slug}`} state={{ myData: data }} replace  className='flex hover:bg-gray-200 text-gay-500 hover:text-black  '>{data.Name}</Link> */}
                                  </li>
                                  {/* <Link  to={`/${data?.properties.Slug.rich_text[0].plain_text}`} state={{ myData: data }} replace >{data.properties.Name.title[0].plain_text}</Link> */}
                                </div>
                                )
                            }
                        )}
                          <NavLink to="/register" ><li className='hover:bg-gray-200 mt-[10px] text-gay-500 hover:text-black  w-full'>Registeration </li></NavLink>
                        <li className='mt-[10px]'>

                       <NavLink /* onClick={logout} */ to="/login" className='hover:bg-gray-200 text-gay-500 hover:text-black  '>LogIn {/* ({(JSON.parse(auth).listUsersResponse.results[0].name )}) */}</NavLink>
                          </li>
                      
                        {/* <li><Link to="#" className='hover:bg-gray-200 text-gay-500 hover:text-black  '>Home</Link></li>
                          <li><Link to="/users" className='hover:bg-gray-200 text-gay-500 hover:text-black  '>Users</Link></li> 
                          <li><NavLink to='/course' className='hover:bg-gray-200 text-gay-500 hover:text-black  w-full'>Add Course</NavLink></li> */}
                        </div>
                      </>
                      )
                      }
                  </ul>
                </>

                }
               

              </>

    </div>
    </>
  )
}

export default Nav;