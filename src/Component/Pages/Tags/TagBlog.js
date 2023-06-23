import React, { useState, useEffect, useCallback } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { NotionRenderer } from 'react-notion';

import 'react-notion/src/styles.css';
import "prismjs/themes/prism-tomorrow.css"
import axios from 'axios';
import moment from 'moment';
import ProgressBar from "react-progressbar-on-scroll";




const TagBlog = () => {

  // const itemData = useLocation().state?.itemData;
  //   console.log(itemData);

  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const myData = useLocation().state?.myData;
  // const domain = useLocation().state?.domain;

  console.log("data tags",myData);

  const [dataNotion, setNotionData] = useState({});
  const [pageData, setPageDAta] = useState()
  const [filteredArray, setFilterData] = useState([])

  const [tagsArray, setTagsArray] = useState([]);
  const [currentpage, setCurrentPage] = useState(1)
  const [open, setOpen] = useState(false);
  const [databaseId, setDatabaseId] = useState(null);
  const [domain, setDomain] = useState(null)

    const recordsperpage = 3;
    const lastIndex = currentpage * recordsperpage;
    const firstIndex = lastIndex - recordsperpage;
    const records = filteredArray && filteredArray?.slice(firstIndex, lastIndex);
    const npage = Math.ceil(filteredArray?.length / recordsperpage)
    const num = []
    for (let i = 1; i <= npage; i++) {
        num.push(i)
    }

    const datacount = JSON.parse(sessionStorage.getItem("getallrecords"))
    const [name, setName] = useState('')
    const [count, setCount] = useState('' || datacount?.length)
    const [array,setArray]=useState([]);
    useEffect(() => {
      sessionStorage.setItem("name", "all")
  }, [name])

  const sortFilter=async(sort)=>{
    console.log(sort);
    setName(sort.name)
    setCurrentPage(1);
    setCount('')
    const response = await axios.get(`https://vercel-notion.vercel.app/pagesfilter/${databaseId}/${domain}/?q=${sort?.id}`)
    setFilterData(response.data)
    setCount(response.data?.length)
    sessionStorage.setItem("sorting", JSON.stringify(response.data))
}


  // const blockMap = dataNotion?.recordMap?.block;
  // console.log(dataNotion);

  const call = async () => {
    try {

      setPageDAta(JSON.parse(sessionStorage.getItem("getall")))
      setArray(JSON.parse(sessionStorage.getItem("UsersList")))
      // const response= await axios.get(`https://notion-api.splitbee.io/v1/page/${myData.id}`)   
      const response = await axios.get(`https://vercel-notion.vercel.app/fetchdata/${myData.id}`)
      // const response= await axios.get(`http://localhost:5000/fetchdata/${myData.id}`)   

      setNotionData(response.data.recordMap.block)

      // response.id=myData.id;
      sessionStorage.setItem("resPage", JSON.stringify(response))
    } catch (err) {
      // alert("page not found")
      navigate('/')
    }
    // sessionStorage.setItem("time",new Date(response.headers).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
  }

  useEffect(() => {
    // const res=sessionStorage.getItem("resPage")

    const res = sessionStorage.getItem("resPage")
    const data = JSON.parse(res);

    // console.log(data);

    // if(myData?.id !== Id ){
    //    call()  
    // }
    // else if(Id === data.id){
    //     setNotionData(data.data)
    // }
    call()
  }, [myData])

  const fetchData = useCallback(() => {
    setPageDAta(JSON.parse(sessionStorage.getItem("getall")))
    var tagUrls = [];
    if (myData?.properties?.Contents && myData?.properties?.Contents.relation) {
      var relationTags = myData?.properties?.Contents.relation;

      relationTags.forEach(function (tag) {
        if (tag.id) {
          tagUrls.push(tag.id);
        }
      });
    }

    const filter = pageData && pageData.filter(function (obj) {
      return tagUrls && tagUrls.includes(obj.id);
    });



    if (filter && filter.length > 0) {
      setFilterData(filter);
      setIsLoading(false);
    }
  }, [dataNotion])

  useEffect(() => {
    fetchData()
    const currentDomain = window.location.hostname;
    const matchingDomain = array && array.find(mapping => mapping?.properties.Domain?.rich_text[0]?.plain_text === currentDomain);

    if (matchingDomain) {
        setDatabaseId(matchingDomain?.properties?.ContentPageId.rich_text[0]?.plain_text);
        setDomain(matchingDomain?.properties?.Domain?.rich_text[0]?.plain_text)
        // setAuthorDatabaseId(matchingDomain.properties.AuthorPageId.rich_text[0].plain_text)
        // setTagDatabaseId(matchingDomain.properties.TagPageId.rich_text[0].plain_text)
    }

  }, [fetchData]);
  console.log(filteredArray,array);

  const halndleallfetch=async(sort)=>{
    setName(sort)
    setCurrentPage(1);
    setCount('')
    const response = await axios.get(`https://vercel-notion.vercel.app/pages/${databaseId}/${domain}`)
    setFilterData(response.data, { replace: true })
    setCount(response.data?.length)
    sessionStorage.setItem("sorting",JSON.stringify(response.data))
}

const prevPage = () => {
  if (currentpage !== 1) {
      setCurrentPage(currentpage - 1)
  }
}
const nextPage = () => {
  if (currentpage !== npage) {
      setCurrentPage(currentpage + 1)
  }
}
const changeCPage = (id) => {
  setCurrentPage(id)
}
const handlecall = (res) => {
     
  console.log(res?.properties.Slug.rich_text[0].plain_text);
  navigate(`/${res?.PageData?.properties?.Slug?.rich_text[0]?.plain_text}`, { state: { myData: res, domain: domain } })
}

useEffect(() => {
  // Assuming you have fetched and set the `alldata` in the component's state using some API call or other means
  // You can replace this with your actual data source and retrieval logic

  // const uniqueTagsArray = alldata && alldata
  // .map((item) => (item.tags || []))
  // .reduce((accumulator, tags) => accumulator.concat(tags), [])
  // .filter((tag, index, self) => self.findIndex((t) => t.id === tag.id) === index);


  const uniqueTagsArray = pageData && pageData?.flatMap((m) => m.tags || []) // Extract tags array from each item and flatten the array
      .filter((tag, index, self) => self.findIndex((t) => t.id === tag.id) === index); // Filter unique tags based on their id

  setTagsArray(uniqueTagsArray);
  }, [filteredArray]);
  return (
    <div className='mt-[-8px]'>

      <ProgressBar
        color="gray"
        // gradient={true}
        position="top-[-2]"
        // colorGradient="red"
        height={2}
      />
      {!isLoading && filteredArray ? (<> {filteredArray && filteredArray.map((all, i) => {
        console.log("tags",all);
        return (
          <>
            {all && i === 0 ? (

              <>
                <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">

                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                      <nav className="flex items-center justify-center" aria-label="Breadcrumb">
                        <NavLink to={'/'} className="flex items-center justify-center font-medium text-secondary-500 hover:text-secondary-700 sm:hidden ">
                          <svg className="h-5 w-5 flex-shrink-0 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 12H4M4 12L10 18M4 12L10 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                          Go to Home
                        </NavLink>
                        <ol className="hidden items-center space-x-4 sm:flex">
                          <li>
                            <div>
                              <NavLink className="text-secondary-400 hover:text-secondary-600 " to="/">
                                <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M9 21V13.6C9 13.0399 9 12.7599 9.10899 12.546C9.20487 12.3578 9.35785 12.2049 9.54601 12.109C9.75992 12 10.0399 12 10.6 12H13.4C13.9601 12 14.2401 12 14.454 12.109C14.6422 12.2049 14.7951 12.3578 14.891 12.546C15 12.7599 15 13.0399 15 13.6V21M11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764Z"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                                <span className="sr-only">Home</span>
                              </NavLink>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center">
                              <svg className="h-5 w-5 flex-shrink-0 text-secondary-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                              </svg>
                              <a className="truncate text-sm font-medium text-secondary-500 ml-4 text-left hover:text-secondary-700 ">Tags</a>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center">
                              <svg className="h-5 w-5 flex-shrink-0 text-secondary-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                              </svg>
                              <a className="truncate text-sm font-medium text-secondary-500 ml-4 text-left hover:text-secondary-700 " >{all?.tags[0].name}</a>
                            </div>
                          </li>
                        </ol>
                      </nav>
                      <div className="flex flex-col items-center justify-center mt-8 mr-4">                      
                        <h1 className="text-3xl font-bold tracking-tight text-secondary-900 mt-5 sm:text-4xl lg:text-5xl">{all?.tags[0].name}</h1>
                      </div>
                      <p className="prose mt-6 sm:prose-lg lg:prose-xl">Writer @ Weenggs Technology</p>
                      <ul className="flex flex-wrap items-center justify-center mt-6 space-x-3">
                        <li>
                          <a  
                           href="#"
                            className="inline-flex h-10 w-10 items-center justify-center text-secondary-900 transition-all duration-200 rounded-full hover:bg-secondary-100 focus:bg-secondary-200 focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:ring-offset-2 umami--click--https-twitter-com-feather_blogs"
                          >
                            <span className="sr-only">Twitter</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
                              <path
                                d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                              ></path>
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
                <section id="all-posts" class="normal-articles-list bg-white py-12 sm:py-16 lg:py-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-xl font-bold text-gray-900 sm:text-2xl">All posts</h2>
                    <div class="relative grid grid-cols-1 items-start gap-16 mt-8 lg:grid-cols-12">
                        <div class="categories-sidebar lg:sticky lg:col-span-3 lg:top-28">
                            <p class="hidden text-xs font-bold uppercase tracking-widest text-gray-500 lg:block">Tags</p>
                            {/* <form method="get"> */}

                            <nav class="max-h-[50vh] overflow-y-auto mt-5 space-y-1 hidden lg:block" aria-label="Sidebar">
                                <div className={`${"all" === name && name ? 'group flex w-full items-center text-sm font-medium rounded-lg px-3 py-2 bg-gray-100 text-gray-900' : 'text-gray-500'}  font-[700] text-sm hover:text-black  space-y-0.5 px-3 py-2 flex w-[100%] outline-2  hover:bg-gray-100 '`} /* onClick={() => halndleallfetch('all')} */>
                                    All Tags
                                    {"all" === name && name ? (<span className="inline-block  text-xs ml-auto rounded-full py-0.5 px-3  bg-white"> {count}</span>) : ''}
                                </div>
                                {tagsArray && tagsArray?.map((d, e) => {
                              
                                    return (

                                        <ul className={`nav space-y-0.5 hover:bg-gray-100 rounded flex-col py-2 px-3 flex w-[100%] hover:text-gray-900  cursor-pointer ${d.name === name && name ? 'bg-gray-100 text-gray-900 ' : 'text-gray-500 '}`} key={e} onClick={() => sortFilter(d)}>

                                            <li className={" flex border-b-3 active:border-b-[3px] font-sans font-[700] text-sm  hover:text-gray-900 "} >{d.name}
                                                <>
                                                    {d.name === name ? (<span className="inline-block text-xs ml-auto rounded-full py-0.5 px-3 active1 active:bg-slate-200 bg-white" > {count}</span>) : ''}

                                                </>
                                            </li>
                                        </ul>
                                    )
                                })}

                            </nav>
                            {/* </form> */}
                            <details class="menu-details lg:hidden">
                                <summary
                                    onClick={() => setOpen(!open)}
                                    class="flex w-full cursor-pointer items-center justify-between text-base font-semibold text-gray-900 -m-2 rounded-lg p-2 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900"
                                >

                                    View Tags
                                    {open ? (
                                        <span aria-hidden="true" class="collapsed-icon">
                                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                        </span>)
                                        : (
                                            <span aria-hidden="true" class="expanded-icon">
                                                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                                    <polyline points="18 15 12 9 6 15"></polyline>
                                                </svg>
                                            </span>
                                        )}
                                </summary>
                                <div className='mt-2'>
                                    <form method="get" action="/?page=1">
                                        <input type="hidden" name="page" value="1" />
                                        <nav class="max-h-[50vh] overflow-y-auto mt-3 space-y-1" aria-label="Sidebar">

                                            <div className={`${"all" === name && name ? 'bg-gray-100 rounded-lg ' : 'text-gray-500'} w-full font-[700] text-sm hover:text-gray-900  space-y-0.5 px-3 py-2 flex  outline-2  hover:bg-gray-100 '`} /* onClick={() => halndleallfetch('all')} */>
                                                All Tags

                                                {"all" === name && name ? (<span className="inline-block  text-xs ml-auto rounded-full py-0.5 px-3  bg-white"> {/* allResponses?.users?.results.length */ count}</span>) : ''}
                                            </div>
                                            {/* <button type="submit" name="tag" value="all-tags" class="group flex w-full items-center text-sm font-medium rounded-lg px-3 py-2 bg-gray-100 text-gray-900" aria-current="page">
                                                <span class="truncate">All Tags</span><span class="inline-block bg-white text-xs ml-auto rounded-full py-0.5 px-3">3</span>
                                            </button> */}
                                            {tagsArray?.map((d, c) => {
                                              
                                                return (
                                                    <ul className={`nav hover:bg-gray-100 flex-col py-2 px-3 flex w-[100%] outline-2   cursor-pointer ${d?.name === name && name ? 'bg-gray-100 rounded-lg' : 'text-gray-500'}`} key={c} onClick={() => sortFilter(d)}>
                                                        <li className="active space-y-0.5  flex border-b-3  active:border-b-[3px]  font-[700] text-sm hover:text-black ">{d?.name}
                                                            <>
                                                                {d?.name === name ? (<span className="inline-block text-xs ml-auto rounded-full py-0.5 px-3   bg-white"> {count}</span>) : ''}
                                                            </>
                                                        </li>
                                                    </ul>
                                                )
                                            })}
                                            {/* <button
                                                type="submit"
                                                name="tag"
                                                value="software-engineering"
                                                class="group flex w-full items-center text-sm font-medium rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                            >
                                                <span class="truncate">Software Engineering</span>
                                            </button>
                                            <button type="submit" name="tag" value="product" class="group flex w-full items-center text-sm font-medium rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                                                <span class="truncate">Product</span>
                                            </button>
                                            <button type="submit" name="tag" value="presentation" class="group flex w-full items-center text-sm font-medium rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                                                <span class="truncate">Presentation</span>
                                            </button>
                                            <button type="submit" name="tag" value="research" class="group flex w-full items-center text-sm font-medium rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                                                <span class="truncate">Research</span>
                                            </button> */}
                                        </nav>
                                    </form>
                                </div>
                            </details>
                        </div>
                        <div class="lg:col-span-9">
                            <div className='articles-grid grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-y-12 xl:grid-cols-3 my-5' >

                                {records && records.map((res, f) => {
                               
                                    return (<>

                                        <div class="normal-article group relative">
                                            <div class="article-cover aspect-w-16 aspect-h-8 block  bg-gray-200 rounded-lg ">
                                                {/* <span class="sr-only">{res?.properties.Excerpt.rich_text[0].plain_text}</span> */}
                                                <img
                                                    alt=""
                                                    src={res?.PageData?.cover?.external?.url} onClick={() => handlecall(res)}
                                                    class="cursor-pointer h-full w-full object-fill rounded transition-all duration-100 group-hover:opacity-75"
                                                />
                                            </div>
                                            <div class="mt-6">
                                                <div class="flex flex-wrap items-center space-x-2">
                                                    <div class="article-author flex items-center">
                                                        <div class="flex-shrink-0 ">

                                                            {/* <span class="sr-only ">{logo && logo?.properties?.title[0]}</span> */}

                                                            {/* <span

                                                            class="h-5 w-5 mr-2 rounded-full"
                                                        >
                                                            {logo && logo?.format?.page_icon}
                                                        </span> */}
                                                            <span className='text-sm font-medium text-gray-500 mr-1'> by </span>
                                                        </div>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {res.author.name}
                                                            {/* {uniqueData && uniqueData.map((a,i)=>{
                                                                  
                                                                    return(
                                                                        <>
                                                                        {a.id === res.properties.Authors.relation[0].id  ?(<> {a.properties.title[0]}</>):''}
                                                                        </>
                                                                    )
                                                                   }) } */}
                                                        </p>
                                                    </div>
                                                    <p class="article-publish-date-separator text-sm font-medium text-gray-500">/</p>
                                                    <p class="article-publish-date text-sm font-medium text-gray-500 "><time datetime="2022-01-20">{moment(res?.PageData?.properties?.PublishDate?.date?.start).format('MMMM DD, YYYY')}</time> </p>
                                                    <p class="article-publish-date-separator text-sm font-medium text-gray-500">/</p>
                                                    <p className='text-sm font-medium text-gray-500'> <span>0 COMMENTS</span> </p>
                                                </div>
                                                <div class="block mt-4 cursor-pointer" onClick={() => handlecall(res)}>
                                                    <h3 class="article-title text-xl font-bold tracking-tight text-gray-900">{res?.PageData?.properties.Name.title[0].plain_text}</h3>
                                                    <p class="article-excerpt text-base font-medium text-gray-500 line-clamp1 mt-3">{res?.PageData?.properties.Excerpt.rich_text[0].plain_text}</p>
                                                </div>
                                                <div class="article-tags-list flex flex-wrap sm:mt-2 mt-4">
                                                    {res.tags.map((tag) => {
                                                        return (
                                                            <strong className='article-tag inline-flex items-center bg-gray-100 text-xs font-bold text-gray-600 transition-all duration-200 mr-2 mb-2 rounded-full px-2.5 py-0.5 hover:bg-gray-200 hover:text-gray-900 '>
                                                                {tag.name}
                                                            </strong>
                                                        )
                                                    })}

                                                </div>
                                            </div>
                                        </div>
                                    </>

                                        // <div key={f} className='lg:w-[100%]  flex-col  mb-5 md:p-2 '>
                                        //   <img src={res?.cover?.file?.url || res?.cover?.external?.url} onClick={() => handlecall(res)}  className="hover:contrast-[1.1]  md:h-[200px] rounded-md object-cover md:w-full h-[200px]  cursor-pointer" alt='' />
                                        //   <div className='mt-6'>
                                        //     <span className='cursor-pointer '> {/* {logo?.users?.icon.emoji} */}  {logo && logo?.format?.page_icon} <span className='font-[600] text-sm'>{/* {logo?.users?.title[0].plain_text} */} {logo && logo?.properties?.title[0]}</span> </span>  <span className='font-[500] text-sm text-slate-400'> / {moment(res.properties['Publish Date'].date.start).format('MMMM d, YYYY')}</span>
                                        //   </div>
                                        //   <h4 className='cursor-pointer py-1 font-[700] p-1 text-xl' onClick={() => handlecall(res)}>{res?.properties.Name.title[0].plain_text}</h4>
                                        //   <p className='cursor-pointer mt-3 font-[500] text-base text-gray-500 ' onClick={() => handlecall(res)}>{res?.properties.Excerpt.rich_text[0].plain_text}</p>
                                        //   <div className='flex gap-4'>
                                        //     {res?.properties.Tags.multi_select.map((d, g) => {
                                        //       // console.log(d);
                                        //       return (
                                        //         <div key={g} className='cursor-pointer mt-4'  /* onClick={()=>handlecall(d.id)} */ >
                                        //           <strong className='hover:text-black text-gray-500 p-1 text-sm font-[700] rounded bg-slate-100 hover:bg-slate-200'>
                                        //             {d.name}
                                        //           </strong>
                                        //         </div>
                                        //       )
                                        //     })}
                                        //   </div>
                                        // </div>
                                    )
                                })}

                            </div>
                            <hr class="mt-12 border-gray-200" />
                            <nav className='flex justify-center py-3'>
                                <ul className='pagination flex justify-between w-full '>
                                    <li onClick={prevPage} className='page-item cursor-pointer flex  items-center justify-center bg-white text-sm font-bold text-gray-700 shadow-sm rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2  '>
                                        <svg class="h-5 w-5 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                                        previous
                                    </li>

                                    <li className='sm:flex gap-3  lg:visible hidden '>
                                        {num?.map((n, h) => (
                                            <div>

                                                <li className={`page-item ${currentpage === n ? 'bg-gray-200 text-gray-400 rounded-lg ' : 'bg-gray-100 rounded-lg '}`} key={h}>
                                                    <div className='page inline-flex h-10 w-10 items-center justify-center text-sm font-bold rounded-lg hover:bg-gray-100 hover:text-gray-900  text-gray-900 no-underline nav-link '
                                                        onClick={() => changeCPage(n)}
                                                    >{n}</div>
                                                </li>
                                            </div>
                                        )
                                        )}
                                    </li>
                                    <li onClick={nextPage} className='page-item cursor-pointer flex  items-center justify-center bg-white text-sm font-bold text-gray-700 shadow-sm rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2  '>
                                        Next
                                        <svg class="h-5 w-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                    </li>

                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
              </>
            ) : ''}
        
          </>
        )
      })}</>)
        :
        (<>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>isLoading...</div>
        </>)}
    </div>
  )
}

export default TagBlog;