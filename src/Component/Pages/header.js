import React,{useEffect, useState,useRef} from 'react'
import axios from 'axios'
import { NavLink,useNavigate } from 'react-router-dom';
import logo from '../Constant/Images/Saide-menu-Gosetu-logo.png';
const Header = () => {
    const item=sessionStorage.getItem("UserList")
    const [open, setOpen] = useState(false);
    const [header,setHeader]=useState([])
    const [databaseId, setDatabaseId] = useState(null);
    const [domain,setDomain]=useState('')
    const [array,setArray]=useState(item ? JSON.parse(item):[]);
    const navigate = useNavigate();
    let menuRef = useRef(null);

    useEffect(() => {
      let handler = (e) => {
        if (menuRef.current &&  !menuRef.current.contains(e.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
  
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    });

  
    useEffect(()=>{
        async function LoadData(){
            const res=await axios.get(`https://vercel-notion.vercel.app/users`);
            const uniqueData = res.data.results.filter(newData => !array.some(existingData => existingData.properties.ContentPageId.rich_text.plain_text === newData.properties.ContentPageId.rich_text.plain_text));
            sessionStorage.setItem("UsersList",JSON.stringify(uniqueData))
            setArray(uniqueData)
        }
        async function callonce(){
            const response=await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/${databaseId}/${domain}`)
            setHeader(response.data)
            sessionStorage.setItem('header',JSON.stringify(response.data))
        }
        if(array.length <1  ){
            LoadData()
        }
        const head=sessionStorage.getItem("header")
        setHeader(JSON.parse(head));
        const currentDomain = window.location.hostname;
        const matchingDomain = array?.find(mapping => mapping.properties?.Domain?.rich_text[0]?.plain_text === currentDomain);
   
        if (matchingDomain) {
    
        setDatabaseId(matchingDomain.properties.PagesPageId.rich_text[0].plain_text);
        setDomain(matchingDomain.properties.Domain.rich_text[0].plain_text)
        }
    
        if(databaseId !==null && !header){
        
        callonce()
        }
    },[array,databaseId])
   
     const handlecall=(res)=>{
        setOpen(!open)
         navigate(`/${res?.properties.Slug.rich_text[0].plain_text}`,{ state: { myData: res}, replace:true })
     
       }

  
  return (
    <section class=" bg-gray-50  sm:py-16 lg:py-20  sticky z-20 h-16 bg-white/90 shadow-sm backdrop-blur-lg top-0 py-3 "ref={menuRef}>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
                 <div className="shrink-0">
                   <a
                    className="logo flex items-center umami--click---"
                    href="https://gosetu.com/"
                    onClick={()=>setOpen(false)}
                  >
                    <img
                      alt="gosetu logo"
                      src={logo}
                      className="h-8 w-auto mr-1"
                    />
                  </a>
                </div>
               <div className='flex gap-5'>
                <div className='flex '>
                <div className=" hidden lg:flex lg:items-center lg:justify-end lg:gap-4 lg:ml-auto lg:mr-8">
                    <NavLink  to={'/'}   className='nav-link group no-underline inline-flex items-center justify-center gap-1 text-base transition-all duration-200 rounded px-3 py-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium text-gray-500 hover:text-gray-900 focus:ring-gray-900' >Home</NavLink>
                </div>
                {header && header?.users?.results.map((data)=>
                           {

                             return(
                                 <div className=" hidden lg:flex lg:items-center lg:justify-end lg:gap-4 lg:ml-auto lg:mr-8">
                                     <NavLink  to={`/${data?.properties.Slug.rich_text[0].plain_text}`} state={{ myData: data }} replace  className='nav-link group no-underline inline-flex items-center justify-center gap-1 text-base transition-all duration-200 rounded px-3 py-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium text-gray-500 hover:text-gray-900 focus:ring-gray-900' >{data.properties.Name.title[0].plain_text}</NavLink>
                                 </div>
                                )
                            }
                        )}
                </div>
                <div className="nav-links-wrapper-right flex items-center justify-end gap-3 lg:gap-4">
                  <div className="flex items-center justify-end gap-3 lg:gap-2">
                    <button
                      type="button"
                      className="site-search-btn inline-flex h-10 w-10 items-center justify-center text-gray-600 transition-all duration-200 rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                      aria-label="Search"
                    
                    >
                      <span className="sr-only">Search</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                      >
                        <path
                          d="M21 21L17.364 17.364M17.364 17.364C18.9926 15.7353 20 13.4853 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.4853 20 15.7353 18.9926 17.364 17.364Z"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>
                      </svg>
                    </button>
                  </div>
                
                  <div class="hidden sm:flex sm:items-center sm:gap-4">
                        <div
                             onClick={()=>console.log("ss")}
                            class="nav-link nav-link-right  group inline-flex h-10 items-center justify-center gap-1.5 bg-red-600 text-base font-semibold text-gray-50 transition-all duration-200 rounded-md border border-transparent px-3 py-1.5 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 "
                        >
                            Subscribe
                            <svg class="external-link-icon h-4 w-4 ml-1.5 -mr-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 17L17 7M17 7H7M17 7V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </div>
                    </div>

                  
                  <div className="flex lg:hidden">
                    {/* <details className="menu-details"> */}
                        {/* <span className="sr-only">Open main menu</span> */}
                        {open ? (
                          <div onClick={() => setOpen(false) }>
                              <summary className="inline-flex p-2   items-center justify-center text-gray-600 transition-all duration-200 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                          <svg
                            className="expanded-icon h-6 w-6"
                            
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                          </summary>
                          </div>
                        ) : (

                          <summary   onClick={() => setOpen(true)} className="inline-flex  p-2 items-center justify-center text-gray-600 transition-all duration-200 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
       
                          <svg
                          
                            className="collapsed-icon h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M3 12H21M3 6H21M3 18H21"
                            ></path>
                          </svg>
                          </summary>
                        )}
                      
                      <div className="absolute z-10 w-full bg-white shadow-lg left-0 mt-2 top-[50px]">
                        {open  ?
                        <div  className="nav-link-items-mobile px-4 pb-4 ">
                         <div className="-mx-2 space-y-1 pt-4">
                        <NavLink  to='/' onClick={()=>setOpen(false)} className="nav-link no-underline nav-link-left group flex items-center text-base rounded-lg px-3 py-1.5 hover:bg-gray-100 font-medium text-gray-500 hover:text-gray-900 focus:ring-gray-900 " >Home</NavLink>
                        </div>
                        {header && header?.users?.results.map((data,key)=>
                           {
                             
                               return(
                                <div key={key}  onClick={()=>{handlecall(data)}} className="-mx-2 space-y-1 pt-4">
                                  <NavLink  className="nav-link no-underline nav-link-left group flex items-center text-base rounded-lg px-3 py-1.5 hover:bg-gray-100 font-medium text-gray-500 hover:text-gray-900 focus:ring-gray-900 " >{data.properties.Name.title[0].plain_text}</NavLink>
                                 
                                </div>
                                )
                            }
                        )}
                         
                          <div className="nav-links-wrapper-right-mobile -mx-3 space-y-4 px-3 pt-4">
                            <NavLink
                              className="nav-link nav-link-right hover:text-gray-50 rounded-lg  group inline-flex h-10 w-full items-center justify-center gap-1.5 bg-red-600 text-base font-semibold text-red-50 transition-all duration-200  border border-transparent px-3 py-1.5 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 "
                              // href="/about-me"
                            >
                              Subscribe
                            </NavLink>
                          </div>
                        </div>
                       :''}
                      </div>
                    {/* </details> */}
                  </div>
                </div>
                </div>
              </div>
          </div>
          </section>
    // </main>
  
    )
}

export default Header;