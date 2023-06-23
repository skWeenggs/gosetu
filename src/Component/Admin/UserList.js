import React,{useState,useEffect,useMemo} from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from 'axios';
import 'ag-grid-enterprise';
import { FiEdit, FiTrash2 } from "react-icons/fi";
const UserList = () => {
    const [userQuery,setQuery]=useState([]);
    const [update,setUpdate]=useState();
    const [showModal, setShowModal] = useState(false);

    const [email,setEmail]=useState('');
    const [domain,setDomainName]=useState('');
    const [template,setTemplateName]=useState('');
    const [contentPageId,setContentPageId]=useState('');
    const [pagesPageId,setPagePageId]=useState('');
    const [authorPageId,setAuthorPageId]=useState('');
    const [notionToken,setNotionToken]=useState('');
   

    const fetchUser=async()=>{
        const response=await axios.get(`https://vercel-notion.vercel.app/fetchuserquery`)
        console.log(response.data);
        setQuery(response.data.users.results)
    }

    useEffect(()=>{
        fetchUser()
    },[])
    const handleClickOpen=(list)=>{
      console.log(list);
        setUpdate(list)
        setShowModal(true)
      
      }
    const handleDelete=async(id)=>{
        console.log(id);
        const confirm = window.confirm(
          `Are you sure you want to delete User "${id}"?`
        );
      if (confirm && id) {
       await axios.delete(`https://vercel-notion.vercel.app/deleterecord/${id}`,  
       { headers:{
        authorization:`bearer ${JSON.parse(sessionStorage.getItem('token'))}`
       }})
        .then((res)=>{
          console.log(res);
          if(res.status === 200){
            alert("record deleted success")
            fetchUser();
          }
       })
       .catch((err)=>{
         alert(err)
       })
      }
    }
    const columnDefs = [
        { headerName: 'Email', field: 'email',filter:true, sortable:true ,minWidth:200, enableRowGroup: true },
        { headerName: 'Domain Name', field: 'domainName',sortable:true },
        { headerName: 'Template Name', field: 'templateName'},
        { headerName: 'Content Page Id', field: 'contentPageId',filter:true },
        { headerName: 'Pages Page Id', field: 'pagesPageId',filter:true },
        { headerName: 'Author Page Id', field: 'authorPageId',filter:true },
        { headerName: 'Notion Token', field: 'notionToken' ,filter:true},
        { headerName: 'Action', field:'', headerClass: 'center-header',
          cellRendererFramework: (params) => (
            <div className='d-flex justify-center gap-2  mt-3'>
              <button
          
                onClick={() => {
                  handleClickOpen(params.data)
                }}
              >
              <FiEdit className="text-green-600 w-4 h-4" />
              </button>
    
              <button
               
                onClick={() => {
               
                  handleDelete(params.data.id);
                  
                }}
              >
                 <FiTrash2 className="text-red-600 w-4 h-4" />
              </button>
            </div>
          ),
        },
      ];
    
      // console.log(userQuery);
      const rowData = userQuery.map((list, ind) => ({
        id:list.id,
        email: list.properties.Email.email,
        domainName: list.properties.Domain?.rich_text[0]?.plain_text,
        templateName: list.properties.Template?.rich_text[0]?.plain_text,
        contentPageId: list.properties.ContentPageId?.rich_text[0]?.plain_text,
        pagesPageId: list.properties.PagesPageId?.rich_text[0]?.plain_text,
        authorPageId: list.properties.AuthorPageId?.rich_text[0]?.plain_text,
        notionToken:list.properties.NotionToken?.rich_text[0]?.plain_text,
      }));
    
      // console.log(rowData);

      const gridOptions = {
        pagination: true,
        paginationPageSize: 5,
        defaultColDef: {
          sortable: true,
          filter: true,
        },
      };

      const autoGroupColumnDef = useMemo(() => {
        return {
          minWidth: 200,
        };
      }, []);

      const defaultColDef = useMemo(() => {
        return {
          flex: 1,
          // sortable: true,
          resizable: true,
          minWidth: 100,
        //   enableRowGroup: true,
        //   enablePivot: true,
        //   enableValue: true,
        };
      }, []);
      const handleSubmit=async(e)=>{
        e.preventDefault()
        const data={
         email:email ? email : update.email,
         domain:domain ? domain : update.domainName,
         contentPageId : contentPageId ? contentPageId : update.contentPageId,
         pagesPageId: pagesPageId ? pagesPageId : update.pagesPageId,
         authorPageId: authorPageId ? authorPageId : update.authorPageId,
         notionToken:notionToken ? notionToken : update.notionToken,
         temp:template ? template : update.templateName,
        }

        console.log(data);

        await axios.patch(`https://vercel-notion.vercel.app/updateuser/${update.id}`,data)
        .then((response)=>{
          alert("Update record successfully")
          console.log(response);
          setShowModal(false)
          e.target.reset();
          fetchUser()
        })
        .catch((err)=>{
            console.log(err);
          })

      }
    return (
    <>
      {showModal ? (
        <>

          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="sm:text-3xl font-semibold">
                                Edit Registration Form 
                            </h3>
                            {/* <button
                                className="p-1 ml-auto bg-transparent border-0 text-black  opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                            >
                                <span className=" text-black hover:text-red-400 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button> */}
                        </div>
                        {/*body*/}
                        <div className="relative p-6 ">
                        <form className="w-full contents text-sm" onSubmit={handleSubmit}  >
                          <div className="text-start  mb-2 ">
                              <div className="text-start pb-2">
                              <label className="flex text-start text-sm  text-gray-500  md:text-start mb-1 md:mb-0 pr-4  " >
                                  Your Email 
                              </label>
                              </div>
                              <div className="">
                              <input className=" appearance-none border border-gray-200 rounded w-full  text-sm p-2.5 leading-8 focus:outline-1px focus:bg-white focus:outline-gray-200 focus:border-2" id="email" type="text" name={email} defaultValue={update.email} required  onChange={(e)=>{setEmail(e.target.value)}} />
                              <div style={{color:'red'}} id="email-error" className="error"></div>
                              </div>
                          </div>
                          <div classNAme=" text-start   mb-2 ">
                              <div className="text-start pb-2">
                              <label className="flex text-start text-gray-500 text-sm  md:text-start mb-1 md:mb-0 pr-4" >
                                  Domain Name 
                              </label>
                              </div>
                              <div >
                              <input className=" appearance-none border border-gray-200 rounded w-full md:text-md  text-sm p-2.5 leading-8   focus:outline-1px focus:bg-white focus:outline-gray-200 focus:border-2 "  id="domain" type="text"  defaultValue={update.domainName} required onChange={(e)=>{setDomainName(e.target.value)}} />
                              <div style={{color:'red'}} id="name-error" className="error"></div>
                              </div>
                          </div>
                         
                          <div className="text-start  md:items-center mb-2 ">
                              <div className="text-start pb-2">
                              <label className="text-start flex text-sm  text-gray-500   md:text-right mb-1 md:mb-0 pr-4" >
                              Content Page Id
                              </label>
                              </div>
                              <div className="">
                              <input className=" appearance-none border border-gray-200 rounded block text-sm   w-full p-2.5  leading-8 focus:outline-1px focus:bg-white focus:outline-gray-200 focus:border-2" id="notionpageid" type="text" defaultValue={update.contentPageId} required onChange={(e)=>{setContentPageId(e.target.value)}}/>
                              </div>
                          </div>
                          <div className="text-start  md:items-center mb-2 ">
                              <div className="text-start pb-2">
                              <label className="text-start flex text-sm  text-gray-500   md:text-right mb-1 md:mb-0 pr-4" >
                              Pages Page Id
                              </label>
                              </div>
                              <div className="">
                              <input className=" appearance-none border border-gray-200 rounded block text-sm   w-full p-2.5  leading-8 focus:outline-1px focus:bg-white focus:outline-gray-200 focus:border-2" id="notionpageid" type="text" defaultValue={update.pagesPageId} required onChange={(e)=>{setPagePageId(e.target.value)}}/>
                              </div>
                          </div>
                          <div className="text-start  md:items-center mb-2 ">
                              <div className="text-start pb-2">
                              <label className="text-start flex text-sm  text-gray-500   md:text-right mb-1 md:mb-0 pr-4" >
                              Authors Page Id
                              </label>
                              </div>
                              <div className="">
                              <input className=" appearance-none border border-gray-200 rounded block text-sm   w-full p-2.5  leading-8 focus:outline-1px focus:bg-white focus:outline-gray-200 focus:border-2" id="notionpageid" type="text" defaultValue={update.authorPageId} required onChange={(e)=>{setAuthorPageId(e.target.value)}}/>
                              </div>
                          </div>
                          <div className="text-start  md:items-center mb-2 ">
                              <div className="text-start pb-2">
                              <label className="text-start flex text-sm  text-gray-500   md:text-right mb-1 md:mb-0 pr-4" >
                               Notion Token
                              </label>
                              </div>
                              <div className="">
                              <input className=" appearance-none border border-gray-200 rounded block text-sm   w-full p-2.5  leading-8 focus:outline-1px focus:bg-white focus:outline-gray-200 focus:border-2" id="notiontoken" type="text" defaultValue={update.notionToken} />
                              </div>
                          </div>
                          <div className="text-start  md:items-center mb-2 ">
                              <div className="text-start pb-2">
                              <label className="text-start flex text-sm  text-gray-500   md:text-right mb-1 md:mb-0 pr-4" >
                              Template Name
                              </label>
                              </div>
                              <div className="">
                              <input className=" appearance-none border border-gray-200 rounded block text-sm   w-full p-2.5  leading-8 focus:outline-1px focus:bg-white focus:outline-gray-200 focus:border-2" id="template" type="text" defaultValue={update.templateName} required onChange={(e)=>{setTemplateName(e.target.value)}}/>
                              </div>
                          </div>
                          <div className="text-start flex flex-col  md:items-center mb-2 ">
              
                          <div className='error  fit-content text-sm ' style={{color:'red'}} id="m-error"></div>
                          </div>
                        
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit"
                               
                            >
                                Save Changes
                            </button>
                        </div>
                      </form>
                        </div>
                        {/*footer*/}
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    <div className="py-5 align-middle inline-block min-w-full sm:px-6 lg:px-8">
       <h1 className='sm:my-3 sm:text-2xl' >Registered Users List</h1>
    <div className='ag-theme-alpine'  style={{ height: "100%", width: "100%" }}>
      <AgGridReact 
      domLayout="autoHeight" 
      columnDefs={columnDefs}
       rowData={rowData}
       defaultColDef={defaultColDef}
       gridOptions={gridOptions}
       autoGroupColumnDef={autoGroupColumnDef}
       suppressDragLeaveHidesColumns={true}
       suppressMakeColumnVisibleAfterUnGroup={true}
       suppressRowGroupHidesColumns={true}
       rowGroupPanelShow={'always'}
    >
       
      </AgGridReact>
    </div>

    </div>
    </>
  )
}

export default UserList;