import React, { useCallback } from 'react'
import axios from 'axios'
import { useEffect, useMemo, useRef } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import moment from 'moment';


const Home = () => {

  const [data, setData] = useState(null);


  const [isLoading, setIsLoaading] = useState(true)
  // var url = window.location.href; 
  // var filename = url.substring(url.lastIndexOf("/") + 1); sessionStorage.setItem("fetch", (decodeURI(filename)));

  const location = useLocation()
  const navigate = useNavigate()
  const [logo, setLogo] = useState(null);
  const [tags, setTag] = useState([]);
  const [allResponses, setAllResponses] = useState([]);
  const [open, setOpen] = useState(false);
  const [databaseId, setDatabaseId] = useState(null);
  const [domain, setDomain] = useState(null)
  const [authordatabaseid, setAuthorDatabaseId] = useState('')
  const [array, setArray] = useState([])

  // const domainDatabaseMap = [
  //   { domain: 'domain123.netlify.app', databaseId: 'd8eac0833b3d41edbd89f6eed252ca9a' },
  //   { domain: 'localhost', databaseId: 'cc662110c0d4419a9e77261e07ef5738' },
  //   { domain: 'domain12345.netlify.app', databaseId: '7588674fea134ee9b66e54266bb38e95' },
  //   { domain: 'domain121.netlify.app', databaseId: 'a378753a1e4c44969fe5e4b5c9132b78' },
  //   { domain: 'domain122.netlify.app', databaseId: '8b7789d6519f4ade9f0310c3d34646de' },

  //   // add more domain-database mappings as needed
  // ];

  /////Pagination//////
  const [currentpage, setCurrentPage] = useState(1)
  const recordsperpage = 3;
  // sessionStorage.setItem("page",recordsperpage)
  const lastIndex = currentpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = allResponses?.users?.results.slice(firstIndex, lastIndex);
  const npage = Math.ceil(allResponses?.users?.results?.length / recordsperpage)
  const num = []
  for (let i = 1; i <= npage; i++) {
    num.push(i)
  }
  // console.log(num);
  // const num=[...Array(npage +1).keys()].slice(1);
  // console.log("data records", records, npage, recordsperpage, currentpage);

  // console.log(numbers);

  // console.log("records",records);


  // const [data1, setData1] = useState(null);
  const [list, setList] = useState([]);


  useMemo(() => {
    const uniqueIds = new Set();

    data?.users?.results?.forEach((res) => {
      res?.properties?.Tags?.multi_select.forEach((d) => {
        uniqueIds.add(d.name);
      });
    });
    setList(Array.from(uniqueIds));
  }, [data]);

  // console.log("ulist",list);
  const datacount = JSON.parse(sessionStorage.getItem("filter"))
  const [name, setName] = useState('')
  const [count, setCount] = useState('' || datacount?.users?.results.length)


  // useEffect(()=>{
  //   sessionStorage.setItem("name","all")
  // })
  useEffect(() => {
    sessionStorage.setItem("name", "all")
  }, [name])



  // const LoadData=async()=>{
  //   ////Load Master Page User-List/////
  //   // const res=await axios.get('https://notion-api.splitbee.io/v1/table/82c796b9a232481ca43002087faa0a81');
  //   const res=await axios.get(`https://vercel-notion.vercel.app/users`);

  //   const uniqueData = res.data.results.filter(newData => !array.some(existingData => existingData.properties.ContentPageId.rich_text.plain_text === newData.properties.ContentPageId.rich_text.plain_text));
  //   // const uniqueData = res.data.filter(newData => !array.some(existingData => existingData.ContentPageId === newData.ContentPageId));


  //   setArray(uniqueData)
  // }


  const Datafilter = async (filter) => {
    // console.log(filter);
    setName(filter)
    setCurrentPage(1);
    setCount('')


    // const response = await axios.get(`http://localhost:4000/fetchuserdatafilter/7588674fea134ee9b66e54266bb38e95/?q=${filter}`)
    // const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdatafilter/${databaseId}/${domain}/?q=${filter}`)
    // const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdatafilter/${databaseId}/${domain}/?q=${filter}`)
    // const response = await axios.get(`http://localhost:5000/fetchuserdatafilter/${databaseId}/${domain}/?q=${filter}`)
    // console.log("data filter",response);
    const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdatafilter/${databaseId}/${domain}/?q=${filter}`)
    setAllResponses(response.data)
    setCount(response.data?.users?.results.length)
    sessionStorage.setItem("filter", JSON.stringify(response.data))

  }

  const hadlequery = async (filter) => {
    setName(filter)
    setCurrentPage(1);
    setCount('')
    // const response = await axios.get(`http://localhost:4000/fetchuserdata/7588674fea134ee9b66e54266bb38e95`)
    // const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/${databaseId}/${domain}`)
    // const response = await axios.get(`http://localhost:5000/fetchuserdata/${databaseId}/${domain}`)
    const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/${databaseId}/${domain}`)

    // console.log("data filter",response.data);
    setAllResponses(response.data, { replace: true })
    setCount(response.data?.users?.results.length)
    sessionStorage.setItem("filter", JSON.stringify(response.data))
  }

  // const call = async () => {
  //   // const response1= await axios.get(`https://notion-api.splitbee.io/v1/table/d8eac0833b3d41edbd89f6eed252ca9a`)   
  //   // const response = await axios.get(`http://localhost:4000/fetchpage1/7588674fea134ee9b66e54266bb38e95`)
  //   // const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/7588674fea134ee9b66e54266bb38e95`)
  //   // const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/${databaseId}/${domain}`)
  //     const response= await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/${databaseId}/${domain}`)   

  //   // const response = await axios.get(`http://localhost:5000/fetchuserdata/${databaseId}/${domain}`)
  //   // console.log("res", response)

  //   sessionStorage.setItem("data", JSON.stringify(response.data))
  //   head(response.data.users.results[0].properties.Authors.relation[0].id)
  //   setData(response.data)
  //   setAllResponses(response.data)
  //   setCount(response.data?.users?.results.length)
  //   sessionStorage.setItem("filter", JSON.stringify(response.data))
  //   // setData1(response1.data)


  //   // const uniqueIds1 = new Set(); 
  //   //  response.data.users.results[0].properties.Tags.relation.map(async(d)=> {
  //   //    try{
  //   //      const response= await axios.get(`https://notion-api.splitbee.io/v1/page/${d.id}`)   
  //   //      console.log("tag",response.data[d.id].value);
  //   //      uniqueIds1.add(response.data[d.id].value);

  //   //     }catch(e){
  //   //       console.log(e);
  //   //     }
  //   //     console.log("newTag",tags);
  //   //     // sessionStorage.setItem("tag", JSON.stringify(response.data[d.id].value))
  //   //   })
  //   //   setTag(Array.from(uniqueIds1))
  //   //   console.log(tags);

  //   // (response.data.users.results[0].properties.Tags.relation.map((d,i)=>tag(d.id)))
  //   // tag(response.data.users.results[0].properties.Tags.relation[0].id)


  //   // sessionStorage.setItem("time",new Date(response.headers).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
  //   setIsLoaading(false)
  // }

  const head = async (id) => {

    // const response = await axios.get(`https://notion-api.splitbee.io/v1/page/${id}`)
    console.log("id", id);
    // const response= await axios.get(`https://vercel-notion.vercel.app/fetchpagelogo/${authordatabaseid}/${domain}`)   
    const response = await axios.get(`https://vercel-notion.vercel.app/fetchdata/${id}`)
    // const response= await axios.get(`http://localhost:5000/fetchdata/${id}`)   
    // console.log(response.data.recordMap.block);
    // sessionStorage.setItem("logo", JSON.stringify(response.data[authordatabaseid].value))
    sessionStorage.setItem("logo", JSON.stringify(response.data.recordMap.block[id].value))
    // sessionStorage.setItem("logo", JSON.stringify(response.data))
    // setLogo(response.data[authordatabaseid].value);
    // setLogo(response.data.users)
    setLogo(response.data.recordMap.block[id].value)

  }


  useEffect(() => {


    async function LoadData() {
      ////Load Master Page User-List/////
      // const res=await axios.get('https://notion-api.splitbee.io/v1/table/82c796b9a232481ca43002087faa0a81');
      const res = await axios.get(`https://vercel-notion.vercel.app/users`);

      const uniqueData = res.data.results.filter(newData => !array.some(existingData => existingData.properties.ContentPageId.rich_text.plain_text === newData.properties.ContentPageId.rich_text.plain_text));

      setArray(uniqueData)
    }

    const currentDomain = window.location.hostname;
    const matchingDomain = array && array.find(mapping => mapping.properties.Domain.rich_text[0].plain_text === currentDomain);

    if (matchingDomain) {
      setDatabaseId(matchingDomain.properties.ContentPageId.rich_text[0].plain_text);
      setDomain(matchingDomain.properties.Domain.rich_text[0].plain_text)
      setAuthorDatabaseId(matchingDomain.properties.AuthorPageId.rich_text[0].plain_text)
    }

    console.log("1");

    if (array?.length < 1) {
      LoadData()
    }

  }, [array])



  useEffect(() => {
    const data = sessionStorage.getItem("data")
    const logo1 = sessionStorage.getItem("logo")
    const allfilter = sessionStorage.getItem("filter")
    const name1 = sessionStorage.getItem("name")
    setAllResponses(JSON.parse(allfilter))
    setData(JSON.parse(data));
    setLogo(JSON.parse(logo1));
    setName(name1)

    console.log("2");

    async function call() {
      // const response1= await axios.get(`https://notion-api.splitbee.io/v1/table/d8eac0833b3d41edbd89f6eed252ca9a`)   
      // const response = await axios.get(`http://localhost:4000/fetchpage1/7588674fea134ee9b66e54266bb38e95`)
      // const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/7588674fea134ee9b66e54266bb38e95`)
      // const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/${databaseId}/${domain}`)
      const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/${databaseId}/${domain}`)

      // const response = await axios.get(`http://localhost:5000/fetchuserdata/${databaseId}/${domain}`)
      // console.log("res", response)

      sessionStorage.setItem("data", JSON.stringify(response.data))
      head(response.data.users.results[0].properties.Authors.relation[0].id)
      setData(response.data)
      setAllResponses(response.data)
      setCount(response.data?.users?.results.length)
      sessionStorage.setItem("filter", JSON.stringify(response.data))

      setIsLoaading(false)
    }



    // const matchingDomain = domainDatabaseMap.find(mapping => mapping.domain === currentDomain);
    // if (matchingDomain) {

    //    setDatabaseId(matchingDomain.databaseId);
    //    setDomain(matchingDomain.domain)

    //  }

    // const matchingDomain = array.find(mapping => mapping.Domain === currentDomain);


    ///////text therew json/////
    // const loged=JSON.parse(sessionStorage.getItem('user'))
    // console.log(loged?.listUsersResponse?.results[0].person.email);


    // Users.Users.map((data)=>{
    //   return(
    //     <div key="data.id">
    //       { data.email === loged?.listUsersResponse?.results[0].person.email &&
    //       setId(data['notion-Home-id'])

    //       }
    //     </div>
    //   )
    // });
    if (!allfilter && databaseId !== null && domain !== null) {
      // hadlequery()

    }

    //  console.log(logo);
    if (!data && !allfilter && !logo1 && databaseId !== null && domain !== null) {
      call()

      // hadlequery()

    }
    else {
      setIsLoaading(false)
    }
  }, [array, databaseId])



  const handlecall = (res) => {
    // console.log(res?.properties.Slug.rich_text[0].plain_text);
    navigate(`/${res?.properties.Slug.rich_text[0].plain_text}`, { state: { myData: res, domain: domain } })
  }
  // console.log("log1",logo);

  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    // document.addEventListener("mousedown", handler);
    // document.onmouseleave("mousedown",handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const handleResize = () => {
    if (window.innerWidth > 500) {
      setOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })
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

  // const [checked,setChecked]=useState([]);
  // useEffect(() => {
  const featuredata = data && data?.users?.results?.filter((res) => res.properties.Featured.checkbox === true);
  console.log(featuredata);
  // setChecked(featuredata)
  // },[checked])
  // console.log(checked);
  return (

    <>
      <div className=''>
        {/* {data.users?.url} */}
        <div className='overflow-hidden bg-[#fafafa] px-[2%] lg:px-[2%] 2xl:px-[9%] '>
          {/* <div className='sm:py-16 lg:py-20 py-12'>
            <p className='my-5 text-center text-gray-900 text-4xl font-bold'>Resources & insights </p>
            <p className='text-center text-lg text-gray-500 font-[500]'>Subscribe to learn about new product features, the latest in <br /> technology, solutions, and updates.</p>
          </div>
           */}
          <section class="hero-section bg-secondary-50 py-12 sm:py-16 lg:py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="max-w-2xl mx-auto text-center">
                <h1 class="whitespace-pre-wrap text-3xl font-bold tracking-tight text-secondary-900 mt-3 sm:text-4xl lg:text-5xl">Resources &amp; insights</h1>
                <h2 class="whitespace-pre-wrap text-base font-medium text-secondary-500 mt-6 sm:text-lg lg:text-xl">Subscribe to learn about new product features, the latest in technology, solutions, and updates.</h2>
              </div>
            </div>
          </section>



          {/* <div className=' w-[50%]'>
              <img src={data.users?.results[0].cover.file.url} height='50px' width={'500px'} alt=''/>
              <div>
                {data.users?.results[0].properties.Authors.relation[0].id} / {data.users?.results[0].properties['Publish Date'].date.start}
              </div>
              <h2>{data.users?.results[0].properties.Name.title[0].plain_text}</h2>
              <p>{data.users?.results[0].properties.Excerpt.rich_text[0].plain_text}</p> 
              <div>
                {data.users?.results[0].properties.Tags.relation.map((d,i)=>{
                  console.log(d);
                  return(
                    <div key={i}>
                     {d.id} 
                    </div>
                  )
                })}
              </div>
           </div> */}

          <div className='w-full m-auto '>

            {data && !isLoading ? (
              <div className='py-5'>
                <div className='text-2xl text-gray-900 font-[700]' > Featured posts</div>

                {/* {data && data.users?.results.map((res, i) => { */}
                {featuredata.map((res, i) => {

                  return (
                    <div className=''>

                      {res.properties.Featured.checkbox && i >= 1 ?

                        <>



                          <div key={i} className='lg:w-full xl:w-[55%] group md:w-full mt-8  sm:flex gap-8 md:float-right md:p-5 ' >
                            <div class="h-auto w-full flex-shrink-0 overflow-hidden bg-secondary-200 rounded-lg sm:w-72 lg:w-96 xl:w-72 ">
                              <img src={res?.cover?.file?.url || res?.cover?.external.url} alt='' className='sm:w-96 lg:w-96 xl:h-52 group-hover:opacity-75 transition-all truncate shadow-md flex  object-cover rounded-md   cursor-pointer h-full  w-full' onClick={() => handlecall(res)} />
                            </div>
                            <div >
                              <span className='cursor-pointer '> {logo && logo?.format?.page_icon} {logo?.users?.icon?.emoji}  <span className='font-[600] text-sm'> {logo && logo?.properties.title[0]}{logo?.users?.title[0]?.plain_text}</span> </span>  <span className='font-[500] text-sm text-slate-400'> / {moment(res.properties['Publish Date'].date.start).format('MMMM DD, YYYY')}</span>
                              <p onClick={() => handlecall(res)} className='cursor-pointer tracking-tight font-[700] text-xl  py-1 '>{res?.properties?.Name.title[0].plain_text}</p>
                              <p className='cursor-pointer font-[500] text-base text-gray-500 mt-3' onClick={() => handlecall(res)}>{res?.properties.Excerpt.rich_text[0].plain_text}</p>
                              <div className='flex gap-4 flex-wrap'>
                                {res?.properties?.Tags?.multi_select?.map((d, a) => {
                                  // console.log("data tag", d);
                                  // setList((prev)=>[...new Set([...prev, d.id])])
                                  // const result =await someAsyncFunction(d.id);
                                  // setTag(result);
                                  return (
                                    <>
                                      <div key={a} className='cursor-pointer mt-4' >
                                        <strong className='hover:text-black text-gray-500 p-1 text-sm font-[700] py-[0/.5] rounded bg-slate-100 hover:bg-slate-200 '> {d.name}</strong>
                                      </div>

                                    </>
                                  )
                                })}

                              </div>
                            </div>
                          </div>
                        </>
                        : (res.properties.Featured.checkbox ? (
                          <div className='lg:w-full xl:w-[45%]  group xl:flex md:flex-col  mt-8 md:float-left  md:p-5 mb-10' >

                            <img src={res?.cover?.file?.url || res?.cover?.external?.url} onClick={() => handlecall(res)} width={'100%'} className=" flex-shrink-0 xl:h-96 xl:w-full   group-hover:opacity-75 object-cover  rounded-md cursor-pointer" alt='' />

                            <div className='py-2' >
                              <span className='cursor-pointer '> {logo && logo?.format.page_icon} <span className='font-[600] text-sm'> {logo && logo?.properties.title[0]}</span> </span>  <span className='font-[500] text-sm text-slate-400'> / {moment(res.properties['Publish Date'].date.start).format('MMMM DD, YYYY')}</span>
                            </div>
                            <h3 className='cursor-pointer py-1 font-[700] text-xl' onClick={() => handlecall(res)}>{res?.properties.Name.title[0].plain_text}</h3>
                            <p className='cursor-pointer mt-3 font-[500] text-base text-gray-500 line-clamp-2 ' onClick={() => handlecall(res)}>{res?.properties.Excerpt.rich_text[0].plain_text}</p>
                            <div className='flex gap-4'>
                              {res?.properties.Tags.multi_select.map((d, b) => {
                                // console.log(d);
                                return (
                                  <div key={b} className='cursor-pointer mt-4'  /* onClick={()=>handlecall(d.id)} */ >
                                    <strong className='hover:text-black text-gray-500 p-1 text-sm font-[700] py-[0/.5] rounded bg-slate-100 hover:bg-slate-200'> {d.name}</strong>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                          : (<></>))

                      }
                    </div>
                  )
                })

                }
              </div>
            ) :
              <div className="text-center text-gray-500 mt-10"> data Loading... </div>
            }

          </div>

        </div>
        <div className='w-full px-[2%] lg:px-[2%] 2xl:px-[9%] md:flex m-auto pt-3 '>
          <div className='font-bold text-2xl mb-3'> All Posts</div>
        </div>
        <div className='w-full px-[2%] lg:px-[2%] 2xl:px-[9%] lg:flex m-auto py-1 gap-10'>
          <div className='md:p-1 md-[35%] lg:w-[25%]'>
            {/* <div className='font-bold text-2xl mb-3'> All Posts</div> */}
            <p className='font-[700] text-[13px] text-gray-500  hidden lg:block '>TAGS</p>
            <br />
            <div className='lg:hidden flex w-full bg-gray-100  justify-between mr-3 sm:mt-2 p-2' onClick={() => { setOpen(!open) }} >
              View Tag
              {/* <svg onClick={()=>{setOpen(!open)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg> */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 ">
                <path fill="currentColor" d="M12 16.59l-5.29-5.29a1 1 0 0 1 1.41-1.41L12 13.77l4.88-4.88a1 1 0 0 1 1.41 1.41L12 16.59z" />
              </svg>

            </div>

            {open ? (
              <div >
                <button className={`${"all" === name && name ? 'bg-gray-100' : 'text-gray-500'}  font-[700] text-sm hover:text-black  space-y-0.5  p-2 flex w-[100%] outline-2 border-2 hover:bg-slate-200 active'`} onClick={() => hadlequery('all')}>
                  All Tags

                  {"all" === name && name ? (<span className="inline-block  text-xs ml-auto rounded-full py-0.5 px-3 active1 bg-white"> {/* allResponses?.users?.results.length */ count}</span>) : ''}
                </button>
                {list.map((d, c) => {
                  //  console.log(d);

                  return (
                    //  <button className='space-y-0.5 flex-col p-2 flex w-[100%] outline-2 border-2 hover:bg-slate-400 ' key={i}>
                    //   {d}
                    //  </button>

                    <ul className={`nav hover:bg-slate-200 flex-col p-2 flex w-[100%] outline-2 border-2   cursor-pointer ${d === name && name ? 'bg-gray-100' : 'text-gray-500'}`} key={c} onClick={() => Datafilter(d)}>
                      <li className="active space-y-0.5  flex border-b-3  active:border-b-[3px]  font-[700] text-sm hover:text-black ">{d}
                        <>
                          {d === name ? (<span className="inline-block text-xs ml-auto rounded-full py-0.5 px-3  active1 bg-white"> {/* allResponses?.users?.results.length */ count}</span>) : ''}
                        </>
                      </li>
                    </ul>
                  )
                })}

              </div>
            ) : (

              <div className='hidden lg:block'>

                <button className={` font-[700] text-sm  space-y-0.5  p-2 flex w-[100%] hover:text-black  hover:bg-slate-200 active ${"all" === name && name ? 'bg-gray-100 ' : 'text-gray-500 '}`} onClick={() => hadlequery('all')}>
                  All Tags

                  {"all" === name && name ? (<span className="inline-block  text-xs ml-auto rounded-full py-0.5 px-3 active1 bg-white"> {/* allResponses?.users?.results.length */ count}</span>) : ''}
                </button>
                {list.map((d, e) => {
                  //  console.log(d);
                  return (
                    //  <button className='space-y-0.5 flex-col p-2 flex w-[100%] outline-2 border-2 hover:bg-slate-400 ' key={i}>
                    //   {d}
                    //  </button>

                    <ul className={`nav space-y-0.5 hover:bg-slate-200 rounded flex-col p-2 flex w-[100%] hover:text-black  cursor-pointer ${d === name && name ? 'bg-gray-100 text-black ' : 'text-gray-500 '}`} key={e} onClick={() => Datafilter(d)}>

                      <li className={" flex border-b-3 active:border-b-[3px] font-sans font-[700] text-sm  hover:text-black "} >{d}
                        <>
                          {d === name ? (<span className="inline-block text-xs ml-auto rounded-full py-0.5 px-3 active1 active:bg-slate-200 bg-white" > {/* allResponses?.users?.results.length */ count}</span>) : ''}

                        </>
                      </li>
                    </ul>
                  )
                })}

              </div>
            )}

          </div>
          <div className='w-[100%]'>
            {/* <div className='md:w-[100%] grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 sm:my-5 my-5 ' > */}
            <div className='articles-grid grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-y-12 xl:grid-cols-3 my-5' >

              {records?.map((res, f) => {
                return (
                  <div class="normal-article group relative">
                    <div class="article-cover aspect-w-16 aspect-h-8 block  bg-gray-200 rounded-lg ">
                      {/* <span class="sr-only">{res?.properties.Excerpt.rich_text[0].plain_text}</span> */}
                      <img
                        alt=""
                        src={res?.cover?.file?.url || res?.cover?.external?.url} onClick={() => handlecall(res)}
                        class="h-full w-full object-cover rounded transition-all duration-100 group-hover:opacity-75"
                      />
                    </div>
                    <div class="mt-6">
                      <div class="flex flex-wrap items-center space-x-2">
                        <div class="article-author flex items-center">
                          <div class="flex-shrink-0">

                            <span class="sr-only">{logo && logo?.properties?.title[0]}</span>

                            <span

                              class="h-5 w-5 mr-2 rounded-full"
                            >
                              {logo && logo?.format?.page_icon}
                            </span>

                          </div>
                          <div>
                            <p class="text-sm font-semibold text-gray-900">{logo && logo?.properties?.title[0]}</p>
                          </div>
                        </div>
                        <p class="article-publish-date-separator text-sm font-medium text-gray-500">/</p>
                        <p class="article-publish-date text-sm font-medium text-gray-500"><time datetime="2022-01-20">{moment(res.properties['Publish Date'].date.start).format('MMMM DD, YYYY')}</time></p>
                      </div>
                      <div class="block mt-4 " >
                        <h3 class="article-title text-xl font-bold tracking-tight text-gray-900">{res?.properties.Name.title[0].plain_text}</h3>
                        <p class="article-excerpt text-base font-medium text-gray-500 line-clamp-3 mt-3">{res?.properties.Excerpt.rich_text[0].plain_text}</p>
                      </div>
                      <div class="article-tags-list flex flex-wrap  gap-4 ">

                        {res?.properties.Tags.multi_select.map((d, g) => {
                          // console.log(d);
                          return (
                            <div key={g} className='cursor-pointer mt-4'  /* onClick={()=>handlecall(d.id)} */ >
                              <strong className='hover:text-black text-gray-500 p-1 text-sm font-[700] rounded bg-slate-100 hover:bg-slate-200'>
                                {d.name}
                              </strong>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

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
            <hr />
            <div>
              <nav className='flex justify-center py-3'>
                <ul className='pagination flex justify-between w-full '>
                  <li onClick={prevPage} className='page-item cursor-pointer flex  items-center justify-center bg-white text-sm font-bold text-gray-700 shadow-sm rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2  '>
                    <svg class="h-5 w-5 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                    previous
                  </li>

                  <li className='sm:flex gap-3  lg:visible hidden '>
                    {num?.map((n, h) => (
                      <div>

                        <li className={`page-item ${currentpage === n ? 'bg-gray-300 text-gray-400' : 'bg-gray-100'}`} key={h}>
                          <NavLink to='#' className='page inline-flex h-10 w-10 items-center justify-center text-sm font-bold rounded-lg hover:bg-gray-100 hover:text-gray-900  text-gray-900 no-underline nav-link '
                            onClick={() => changeCPage(n)}
                          >{n}</NavLink>
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
      </div>
    </>
  )


}

export default Home;