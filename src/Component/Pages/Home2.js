import React, { useState } from 'react'
import axios, { all } from 'axios'
import { useEffect, useMemo, useRef } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../../App.css'
import moment from 'moment';
import ReactGA from 'react-ga'

const Home2 = () => {
    const [data, setData] = useState(null);


    const [isLoading, setIsLoaading] = useState(true)
    // var url = window.location.href; 
    // var filename = url.substring(url.lastIndexOf("/") + 1); sessionStorage.setItem("fetch", (decodeURI(filename)));
    const [authors, setAuthors] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const [logo, setLogo] = useState(null);
    const [tags, setTag] = useState([]);
    const [allResponses, setAllResponses] = useState([]);
    const [open, setOpen] = useState(false);
    const [databaseId, setDatabaseId] = useState(null);
    const [domain, setDomain] = useState(null)
    const [authordatabaseid, setAuthorDatabaseId] = useState('')
    const [tagdatabaseid, setTagDatabaseId] = useState('')
    const [array, setArray] = useState([])
    const [currentpage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [uniqueData, setUniqueData] = useState([]);
    const [uniqueTag, setUniqueTag] = useState([]);
    // const [newArray,setNewArray] =useState([]);
    // sessionStorage.setItem("page",recordsperpage)

    // const recordsperpage = 3;
    // const lastIndex = currentpage * recordsperpage;
    // const firstIndex = lastIndex - recordsperpage;
    // const records = allResponses?.users?.results.slice(firstIndex, lastIndex);
    // const npage = Math.ceil(allResponses?.users?.results?.length / recordsperpage)
    // const num = []
    // for (let i = 1; i <= npage; i++) {
    //     num.push(i)
    // }

    const [list, setList] = useState([]);


    // useMemo(() => {
    //     const uniqueIds = new Set();

    //     data?.users?.results?.forEach((res) => {
    //         res?.properties?.Tags?.multi_select.forEach((d) => {
    //             uniqueIds.add(d.name);
    //         });
    //     });
    //     setList(Array.from(uniqueIds));
    // }, [data]);

    const datacount = JSON.parse(sessionStorage.getItem("getallrecords"))
    const [name, setName] = useState('')
    const [count, setCount] = useState('' || datacount?.length)
    useEffect(() => {
        ///non-intraction event
        ReactGA.pageview(window.location.pathname)
    })

    // useEffect(()=>{
    //   sessionStorage.setItem("name","all")
    // })
    useEffect(() => {
        sessionStorage.setItem("name", "all")
    }, [name])


    const Datafilter = async (filter) => {
       
        setName(filter?.properties?.title?.[0][0])
        setCurrentPage(1);
        setCount('')


        // const response = await axios.get(`http://localhost:4000/fetchuserdatafilter/7588674fea134ee9b66e54266bb38e95/?q=${filter}`)
        // const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdatafilter/${databaseId}/${domain}/?q=${filter}`)
        // const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdatafilter/${databaseId}/${domain}/?q=${filter}`)
        // const response = await axios.get(`http://localhost:5000/fetchuserdatafilter/${databaseId}/${domain}/?q=${filter}`)
        // console.log("data filter",response);
        // const response = await axios.get(`http://localhost:5000/fetchuserdatafilter/${databaseId}/${domain}/?q=${filter?.properties?.title?.[0][0]}`)
        const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdatafilter/${databaseId}/${domain}/?q=${filter?.id}`)
        setAllResponses(response.data)
        setCount(response.data?.users?.results.length)
        sessionStorage.setItem("filter", JSON.stringify(response.data))

    }
    const sortFilter=async(sort)=>{
        console.log(sort);
        setName(sort.name)
        setCurrentPage(1);
        setCount('')
        const response = await axios.get(`https://vercel-notion.vercel.app/pagesfilter/${databaseId}/${domain}/?q=${sort?.id}`)
        setAllRecords(response.data)
        setCount(response.data?.length)
        sessionStorage.setItem("sorting", JSON.stringify(response.data))
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

    const head = async (id) => {

        // const response = await axios.get(`https://notion-api.splitbee.io/v1/page/${id}`)

        // const response= await axios.get(`https://vercel-notion.vercel.app/fetchpagelogo/${authordatabaseid}/${domain}`)   
        const response = await axios.get(`https://vercel-notion.vercel.app/fetchdata/${id}`)

        return response.data.recordMap.block[id].value;
        // const response= await axios.get(`http://localhost:5000/fetchdata/${id}`)   
        // console.log(response.data.recordMap.block);
        // sessionStorage.setItem("logo", JSON.stringify(response.data[authordatabaseid].value))
        // sessionStorage.setItem("logo", JSON.stringify(response.data.recordMap.block[id].value))
        // sessionStorage.setItem("logo", JSON.stringify(response.data))
        // setLogo(response.data[authordatabaseid].value);
        // setLogo(response.data.users)
        // setLogo(response.data.recordMap.block[id].value)

    }
    const tag = async (id) => {

        const response = await axios.get(`https://vercel-notion.vercel.app/fetchdata/${id}`)

        return response.data.recordMap.block[id].value;
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
        const matchingDomain = array && array.find(mapping => mapping.properties.Domain.rich_text[0]?.plain_text === currentDomain);

        if (matchingDomain) {
            setDatabaseId(matchingDomain.properties.ContentPageId.rich_text[0].plain_text);
            setDomain(matchingDomain.properties.Domain.rich_text[0].plain_text)
            setAuthorDatabaseId(matchingDomain.properties.AuthorPageId.rich_text[0].plain_text)
            setTagDatabaseId(matchingDomain.properties.TagPageId.rich_text[0].plain_text)
        }

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


        async function call() {
            // const response1= await axios.get(`https://notion-api.splitbee.io/v1/table/d8eac0833b3d41edbd89f6eed252ca9a`)   
            // const response = await axios.get(`http://localhost:4000/fetchpage1/7588674fea134ee9b66e54266bb38e95`)
            // const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/7588674fea134ee9b66e54266bb38e95`)
            // const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/${databaseId}/${domain}`)
            const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/${databaseId}/${domain}`)



            // const response = await axios.get(`http://localhost:5000/fetchuserdata/${databaseId}/${domain}`)
         

            sessionStorage.setItem("data", JSON.stringify(response.data))

            // head(response.data.users.results[0].properties.Authors.relation[0].id)

            setData(response.data)
            setAllResponses(response.data)
            setCount(response.data?.users?.results.length)
            sessionStorage.setItem("filter", JSON.stringify(response.data))

            setIsLoaading(false)
        }
        if (!allfilter && databaseId !== null && domain !== null) {
            // hadlequery()

        }

        //  console.log(logo);
        if (!data && !allfilter && !logo1 && databaseId !== null && domain !== null) {
            // call()

            // hadlequery()

        }
        else {
            setIsLoaading(false)
        }
    }, [array, databaseId])



    const handlecall = (res) => {
        // ReactGA.event({
        //     category: "Button",
        //     /** The type of interaction (e.g. 'play') */
        //     action: "test action on click page",
        //     /** Useful for categorizing events (e.g. 'Fall Campaign') */
        //     label: "test label",
        //     /** A numeric value associated with the event (e.g. 42) */
        //     value: res,

        // })

        // console.log(res?.properties.Slug.rich_text[0].plain_text);
        navigate(`/${res?.PageData?.properties.Slug.rich_text[0].plain_text}`, { state: { myData: res, domain: domain } })
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
    const auth = sessionStorage.getItem("Authors")

    // console.log(authors);

    useEffect(() => {
        async function logo(data) {

            const newArray = [];
            const newTags = [];
            for (const user of data?.users?.results) {

                // Check if the user has the 'Authors' relation property
                if (user.properties.Authors && user.properties.Authors.relation.length > 0) {
                    // Fetch relation data for each author
                    for (const author of user.properties.Authors.relation) {
                        const relationId = author.id;
                        //   console.log(relationId);
                        // Simulate fetching the relation data (replace with your actual API call)
                        const relationData = await head(relationId);

                        // Process the fetched relation data
                        newArray.push(relationData);
                        // if (isIterable(relationData)) {
                        //     setNewArray(prevArray => [...prevArray, ...relationData]);
                        //   } else {
                        //     setNewArray(prevArray => [...prevArray, relationData]);
                        //   }
                    }
                }

                if (user.properties.Tags && user.properties.Tags.relation.length > 0) {

                    // Fetch relation data for each author
                    for (const tags of user.properties.Tags.relation) {
                        const relationId = tags.id;
                        //   console.log(relationId);
                        // Simulate fetching the relation data (replace with your actual API call)
                        const relationData = await tag(relationId);

                        // Process the fetched relation data
                        newTags.push(relationData);
                    }
                }

            }
            sessionStorage.setItem("sAuther", JSON.stringify(newArray))
            sessionStorage.setItem("sTags", JSON.stringify(newTags))
            setAuthors(newArray)
            setTag(newTags)
        }
       
        if (authors !== null) {
            // logo(data)
        }
    }, [data])

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
    // console.log(featuredata);
    // console.log(data);

    // useEffect(() => {

    //     const uniqueDataIds = {};
    //     const filteredData = authors?.filter((item) => {
    //         const itemId = item.id;
    //         if (!uniqueDataIds[itemId]) {
    //             uniqueDataIds[itemId] = true;
    //             return true;
    //         }
    //         return false;
    //     });
    //     const uniqueTagsIds = {};
    //     const filteredTagData = tags?.filter((item) => {
    //         const itemId = item.id;
    //         if (!uniqueTagsIds[itemId]) {
    //             uniqueTagsIds[itemId] = true;
    //             return true;
    //         }
    //         return false;
    //     });
    //     setUniqueData(filteredData);
    //     setUniqueTag(filteredTagData);
    //     setList(filteredTagData)
    //     sessionStorage.setItem("Authors", JSON.stringify(filteredData));
    //     sessionStorage.setItem("Tags", JSON.stringify(filteredTagData));

    // }, [authors, tags]);


    const [alldata, setAllData] = useState([]);
    const [allrecords, setAllRecords] = useState([])
    const [tagsArray, setTagsArray] = useState([]);

    const recordsperpage = 3;
    const lastIndex = currentpage * recordsperpage;
    const firstIndex = lastIndex - recordsperpage;
    const records = allrecords && allrecords?.slice(firstIndex, lastIndex);
    const npage = Math.ceil(allrecords?.length / recordsperpage)
    const num = []
    for (let i = 1; i <= npage; i++) {
        num.push(i)
    }

    
    
    useEffect(() => {
        
        setAllData(JSON.parse(sessionStorage.getItem("getall")))
        setAllRecords(JSON.parse(sessionStorage.getItem("getallrecords")))



        async function getAll() {
            const response = await axios.get(`https://vercel-notion.vercel.app/pages/${databaseId}/${domain}`)
            // console.log("getall",response);
            setAllData(response.data);
            setAllRecords(response.data);
            setCount(response.data.length)
            sessionStorage.setItem("getall", JSON.stringify(response.data))
            sessionStorage.setItem("getallrecords", JSON.stringify(response.data))
        }
        if (!alldata && databaseId != null && domain != null) {
            getAll()
        }




    }, [databaseId, domain])
  
  

    useEffect(() => {
    // Assuming you have fetched and set the `alldata` in the component's state using some API call or other means
    // You can replace this with your actual data source and retrieval logic

    // const uniqueTagsArray = alldata && alldata
    // .map((item) => (item.tags || []))
    // .reduce((accumulator, tags) => accumulator.concat(tags), [])
    // .filter((tag, index, self) => self.findIndex((t) => t.id === tag.id) === index);


    const uniqueTagsArray = alldata && alldata?.flatMap((m) => m.tags || []) // Extract tags array from each item and flatten the array
        .filter((tag, index, self) => self.findIndex((t) => t.id === tag.id) === index); // Filter unique tags based on their id

    setTagsArray(uniqueTagsArray);
    }, [alldata]);
  
      
    const halndleallfetch=async(sort)=>{
        setName(sort)
        setCurrentPage(1);
        setCount('')
        const response = await axios.get(`https://vercel-notion.vercel.app/pages/${databaseId}/${domain}`)
        setAllResponses(response.data, { replace: true })
        setCount(response.data?.length)
        sessionStorage.setItem("sorting",JSON.stringify(response.data))
    }
    const alldatafeature = alldata && alldata.filter((res)=>res.PageData.properties.Featured.checkbox === true)
    console.log(alldatafeature);
    return (
        <main class="main-wrapper flex-1">
            <section class="hero-section bg-gray-50 py-12 sm:py-16 lg:py-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="max-w-2xl mx-auto text-center">
                        <h1 class="whitespace-pre-wrap text-3xl font-bold tracking-tight text-gray-900 mt-3 sm:text-4xl lg:text-5xl">Resources &amp; insights</h1>
                        <h2 class="whitespace-pre-wrap text-base font-medium text-gray-500 mt-6 sm:text-lg lg:text-xl">Subscribe to learn about new product features, the latest in technology, solutions, and updates.</h2>
                    </div>
                </div>
            </section>
            <section class="normal-featured-articles-list bg-gray-50 pb-12 sm:pb-16 lg:pb-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-xl font-bold text-gray-900 sm:text-2xl">Featured posts</h2>
                    <div class="featured-articles-wrapper grid grid-cols-1 gap-8 mt-8 xl:grid-cols-2">
                        <div class="normal-main-featured-article group relative">

                            {!isLoading && alldatafeature?(<> { alldatafeature.map((all, i) => {

                                return (
                                    <>
                                        {all.PageData.properties.Featured.checkbox && i === 0 ? (
                                            <>

                                                <p class="article-cover aspect-w-16 aspect-h-8 block overflow-hidden bg-gray-200 rounded-lg">
                                                    {/* <span class="sr-only">{logo && logo?.properties.title[0]}</span> */}
                                                    <img
                                                        onClick={() => handlecall(all)}
                                                        alt={all?.AuthorsId?.alt?.rich_text[0]?.plain_text}
                                                        src={all?.PageData?.cover?.external?.url}
                                                        class="cursor-pointer h-full w-full object-fill transition-all duration-100 group-hover:opacity-75 "
                                                    />
                                                </p>
                                                <div className='mt-6'>
                                                    <div class="flex flex-wrap items-center space-x-2">
                                                        <div class="article-author flex items-center">
                                                            <div class="flex-shrink-0">
                                                                <p>

                                                                    {/* <span class="sr-only"> {logo && logo?.properties.title[0]}</span> */}

                                                                    <span className='text-sm font-medium text-gray-500 mr-1'> by </span>
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p class="text-sm font-semibold text-gray-900">
                                                                    <p>
                                                                        {all.author.name}
                                                                        {/* {uniqeAuthor && uniqeAuthor.map((admin,i)=>{
                                                                           
                                                                           console.log("author-----",admin.author.id === all?.PageData.properties.Authors.relation[0].id );
                                                                        return(
                                                                            <>
                                                                            {admin.author.id === all?.PageData.properties.Authors.relation[0].id ?(<> {admin.author.name}</>):''}

                                                                            </>
                                                                        )
                                                                       }) } */}
                                                                    </p>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <p class="article-publish-date-separator text-sm font-medium text-gray-500">/</p>
                                                        <p class="article-publish-date text-sm font-medium text-gray-500"><time datetime="2022-01-20">{moment(all?.PageData?.properties['Publish Date']?.date.start).format('MMMM DD, YYYY')}</time> / <span>0 COMMENTS</span></p>
                                                    </div>
                                                    <p class="block mt-3 cursor-pointer" onClick={() => handlecall(all)}>
                                                            <h3 class="article-title text-xl font-bold tracking-tight text-gray-900">{all?.PageData?.properties.Name.title[0].plain_text}</h3>
                                                            <p class="article-excerpt text-base font-medium text-gray-500 line-clamp mt-3">{all?.PageData?.properties.Excerpt.rich_text[0].plain_text}</p>
                                                    </p>
                                                    <div class="article-tags-list flex flex-wrap sm:mt-2 mt-4">
                                                            {all.tags.map((tag) => {
                                                                return (
                                                                    <strong className='article-tag inline-flex items-center bg-gray-100 text-xs font-bold text-gray-600 transition-all duration-200 mr-2 mb-2 rounded-full px-2.5 py-0.5 hover:bg-gray-200 hover:text-gray-900 '>
                                                                        {tag.name}
                                                                    </strong>
                                                                )
                                                            })}
                                                    </div>
                                                </div>
                                            </>
                                        ) : ''}
                                    </>
                                )
                            })
                            }</>):
                            (<>
                            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>isLoading...</div>
                            </>)}
                        </div>
                        <div class="space-y-8">
                            {/* <div class="normal-featured-article featured-article group relative sm:flex sm:items-start"> */}
                            {alldatafeature && alldatafeature.map((all, i) => {

                                return (
                                    <>
                                        {all.PageData.properties.Featured.checkbox && i > 0 ?
                                            (
                                                <div class="normal-featured-article featured-article group relative sm:flex sm:items-start">
                                                    <div class="h-auto w-full flex-shrink-0 overflow-hidden bg-gray-200 rounded-lg sm:w-72 lg:w-96 xl:w-72">
                                                        <p class="article-cover aspect-w-16 aspect-h-8 block umami--click---migrating-to-linear-101" href="/migrating-to-linear-101">
                                                            <span class="sr-only">{logo && logo?.properties.title[0]}</span>
                                                            <img
                                                                onClick={() => handlecall(all)}
                                                                alt={all?.AuthorsId?.alt?.rich_text[0]?.plain_text}
                                                                src={all?.PageData?.cover?.file?.url || all?.PageData?.cover?.external?.url}
                                                                class="cursor-pointer h-full w-full object-fill transition-all duration-100 group-hover:opacity-75"
                                                            />
                                                        </p>
                                                    </div>
                                                    <div class="mt-6 sm:mt-0 sm:ml-6">
                                                        <div class="flex flex-wrap items-center space-x-2">
                                                            <div class="article-author flex items-center">
                                                                <div class="flex-shrink-0">
                                                                    <p>
                                                                        {/* <span class="sr-only">{logo && logo?.properties.title[0]}</span> */}
                                                                        <span
                                                                        // class="h-5 w-5 mr-2 rounded-full"
                                                                        >
                                                                            {/* {logo && logo?.format?.page_icon} */}
                                                                        </span>
                                                                        <span class='text-sm font-medium text-gray-500 mr-1'> by </span>
                                                                    </p>
                                                                </div>
                                                                <p class='text-sm font-semibold text-gray-900'>
                                                                    {all.author.name}

                                                                    {/* {uniqeAuthor && uniqeAuthor.map((admin,i)=>{
                                                                           
                                                                           console.log("author-----",admin.author.id === all?.PageData.properties.Authors.relation[0].id );
                                                                        return(
                                                                            <>
                                                                            {admin.author.id === all?.PageData.properties.Authors.relation[0].id ?(<> {admin.author.name}</>):''}

                                                                            </>
                                                                        )
                                                                       }) } */}

                                                                </p>
                                                            </div>
                                                            <p class="article-publish-date-separator text-sm font-medium text-gray-500">/</p>
                                                            <p class="article-publish-date text-sm font-medium text-gray-500"><time datetime="2022-01-19">{moment(all?.PageData?.properties['Publish Date']?.date.start).format('MMMM DD, YYYY')}</time> / <span>0 COMMENTS</span></p>
                                                        </div>
                                                        <p class="block mt-3 cursor-pointer" onClick={() => handlecall(all)}>
                                                            <h3 class="article-title text-xl font-bold tracking-tight text-gray-900">{all?.PageData?.properties.Name.title[0].plain_text}</h3>
                                                            <p class="article-excerpt text-base font-medium text-gray-500 line-clamp mt-3">{all?.PageData?.properties.Excerpt.rich_text[0].plain_text}</p>
                                                        </p>
                                                        <div class="article-tags-list flex flex-wrap sm:mt-2 mt-4">
                                                            {all?.tags?.map((tag) => {
                                                                return (
                                                                    <strong className='article-tag inline-flex items-center bg-gray-100 text-xs font-bold text-gray-600 transition-all duration-200 mr-2 mb-2 rounded-full px-2.5 py-0.5 hover:bg-gray-200 hover:text-gray-900 '>
                                                                        {tag.name}
                                                                    </strong>
                                                                )
                                                            })}
                                                            {/* {list && list.map((t,i)=>{
                                                                return(
                                                                    <>
                                                                        
                                                                        {
                                                                            res.properties.Tags.relation.find((a) => a.id === t.id) && (
                                                                                <strong className='article-tag inline-flex items-center bg-gray-100 text-xs font-bold text-gray-600 transition-all duration-200 mr-2 mb-2 rounded-full px-2.5 py-0.5 hover:bg-gray-200 hover:text-gray-900 '> 
                                                                                {t.properties.title[0]}
                                                                                </strong>
                                                                            )
                                                                        }
                                                                    </>
                                                                )
                                                            })} */}
                                                        </div>

                                                        {/* <div className="article-tags-list flex flex-wrap sm:mt-2 mt-4">
                                                            {res?.properties.Tags.multi_select.map((d, i) => {
                                                               
                                                                return (
                                                                <strong className='article-tag inline-flex items-center bg-gray-100 text-xs font-bold text-gray-600 transition-all duration-200 mr-2 mb-2 rounded-full px-2.5 py-0.5 hover:bg-gray-200 hover:text-gray-900 '> {d.name}</strong>        
                                                                )
                                                            })}
                                                        </div> */}
                                                    </div>
                                                </div>
                                            )
                                            :
                                            ''}
                                    </>
                                )
                            })}
                        </div>
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
                                <div className={`${"all" === name && name ? 'group flex w-full items-center text-sm font-medium rounded-lg px-3 py-2 bg-gray-100 text-gray-900' : 'text-gray-500'}  font-[700] text-sm hover:text-black  space-y-0.5 px-3 py-2 flex w-[100%] outline-2  hover:bg-gray-100 '`} onClick={() => halndleallfetch('all')}>
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

                                            <div className={`${"all" === name && name ? 'bg-gray-100 rounded-lg ' : 'text-gray-500'} w-full font-[700] text-sm hover:text-gray-900  space-y-0.5 px-3 py-2 flex  outline-2  hover:bg-gray-100 '`} onClick={() => halndleallfetch('all')}>
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
                                                    alt={records[f]?.AuthorsId?.alt?.rich_text[0]?.plain_text}
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
                                                    <p class="article-publish-date text-sm font-medium text-gray-500 "><time datetime="2022-01-20">{moment(res.PageData?.properties['Publish Date']?.date?.start).format('MMMM DD, YYYY')}</time> </p>
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
            </section>


        </main>
    )
}

export default Home2;