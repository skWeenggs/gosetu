import React, { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../Constant/Images/Saide-menu-Gosetu-logo.png';
const Footer = () => {
    const item = sessionStorage.getItem("UserList")
    const [footer, setFooter] = useState([])
    const [databaseId, setDatabaseId] = useState(null);
    const [domain, setDomain] = useState('')
    const [array, setArray] = useState(item ? JSON.parse(item) : []);
    const [email,setEmail]=useState('')
    const navigate = useNavigate();
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };
    useEffect(() => {

        
        async function LoadData() {
            const res = await axios.get(`https://vercel-notion.vercel.app/users`);
            const uniqueData = res.data.results.filter(newData => !array.some(existingData => existingData.properties.ContentPageId.rich_text.plain_text === newData.properties.ContentPageId.rich_text.plain_text));
            sessionStorage.setItem("UsersList", JSON.stringify(uniqueData))
            setArray(uniqueData)
        }
        async function callonce() {
            const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/${databaseId}/${domain}`)
            setFooter(response.data)
            sessionStorage.setItem('footer', JSON.stringify(response.data))
        }
        if (array?.length < 1) {
            LoadData()
        }


        const head = sessionStorage.getItem("footer")
        setFooter(JSON.parse(head));
        const currentDomain = window.location.hostname;
        const matchingDomain = array?.find(mapping => mapping.properties.Domain.rich_text[0]?.plain_text === currentDomain);

        if (matchingDomain) {

            setDatabaseId(matchingDomain.properties.PagesPageId.rich_text[0]?.plain_text);
            setDomain(matchingDomain.properties.Domain.rich_text[0]?.plain_text)
        }

        if (databaseId !== null && !footer) {

            callonce()
        }
    }, [array, databaseId])

    const handlecall = (res) => {

        navigate(`/${res?.properties.Slug.rich_text[0].plain_text}`, { state: { myData: res }, replace: true })

    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(email);
    }
    return (
        <>
            <section className="newsletter py-12 sm:py-16 lg:py-20  bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className=" max-w-2xl mx-auto text-center">
                        <h2 className=" newsletter-headline text-2xl font-bold text-secondary-900 sm:text-3xl lg:text-4xl">Join ⚡️ WeEnggs</h2>
                        <p className=" max-w-md text-base font-medium text-secondary-500 mx-auto mt-4">Start your blogging journey with Weenggs!</p>
                    </div>
                
                    <div className="relative max-w-xl mx-auto mt-12 ">
                        <div className="absolute -inset-2 ">
                            <div className="h-full w-full rotate-180 opacity-30 blur-lg bg-conic-gradient mx-auto "></div></div>
                        <form onSubmit={handleSubmit}
                      
                            className=" relative gap-3 flex flex-col"
                            id="-wrapper-form"
                        >
                            <input
                                type="email"
                                name={email}
                                onChange={(e)=>setEmail(e.target.value)}    
                                id="cta-email"
                                placeholder="Enter your email address"
                                className=" block w-full bg-white text-base font-medium text-gray-900 rounded-lg border border-red-100 px-4 py-4 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-600 sm:py-5"
                                required
                                aria-label="Email"

                            />
                            <div className=" sm:absolute sm:flex sm:items-center sm:inset-y-0 sm:right-0 px-1 sm:mt-0 ">
                                <button
                                    type="submit"
                                    
                                    className="inline-flex w-full items-center justify-center bg-red-600 text-base font-bold text-white shadow-sm rounded-lg border border-transparent px-5 py-3 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 sm:w-auto"
                                >
                                    Subscribe to newsletter
                                </button>
                            </div>
                        </form>
                    </div>
                    <p className=" text-sm font-medium text-secondary-500 mt-6 text-center">No spam. Unsubscribe at any time.</p>
                </div>
            </section>

            <footer className="footer relative bg-white py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-y-8 lg:gap-y-12">
                        <div><a className="footer-logo flex items-center " href="https://gosetu.com/">
                            <img alt="gosetu" src={logo} className="h-8 w-auto mr-1" />
                        </a>
                        </div>
                        <ul className="footer-links flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
                            <li className="">
                                <NavLink
                                    onClick={()=>scrollToTop()}
                                    className="text-base nav-link font-medium text-gray-600 no-underline transition-all duration-200 hover:text-red-700 "
                                    to='/'
                                >
                                    Home
                                </NavLink>
                            </li>
                            {footer && footer?.users?.results.map((data) => {
                                return (
                                    <li className="footer-link">
                                        <NavLink   onClick={()=>scrollToTop()}
                                            className="text-base nav-link font-medium text-gray-600 no-underline transition-all duration-200 hover:text-red-700 "
                                            to={`/${data?.properties.Slug?.rich_text[0].plain_text}`} state={{ myData: data }} replace
                                        >
                                            {data.properties.Name.title[0].plain_text}
                                        </NavLink>
                                    </li>
                                )
                            })}
                        </ul>
                        <ul class="footer-social-links flex flex-wrap items-center justify-center gap-5">
                            <li>
                                <a
                                    target="_blank"
                                    href="#"
                                    class="inline-flex h-10 w-10 items-center justify-center text-secondary-600 transition-all duration-200 rounded-full hover:bg-red-50 hover:text-red-700 "
                                >
                                    <span class="sr-only">Twitter</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-6 w-6">
                                        <path
                                            d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                        ></path>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="#"
                                    class="inline-flex h-10 w-10 items-center justify-center text-gray-600 transition-all duration-200 rounded-full hover:bg-red-50 hover:text-red-700 "
                                >
                                    <span class="sr-only">RSS Feed</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-6 w-6">
                                        <path d="M19 20.001C19 11.729 12.271 5 4 5v2c7.168 0 13 5.832 13 13.001h2z"></path>
                                        <path d="M12 20.001h2C14 14.486 9.514 10 4 10v2c4.411 0 8 3.589 8 8.001z"></path>
                                        <circle cx="6" cy="18" r="2"></circle>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a
                                    rel="noopener"
                                    href="/"
                                    class="inline-flex h-10 w-10 items-center justify-center text-secondary-600 transition-all duration-200 rounded-full hover:bg-red-50 hover:text-red-700 umami--click---_feather-sitemap-xml"
                                >
                                    <span class="sr-only">Sitemap</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-6 w-6">
                                        <path d="M20 13.01h-7V10h1c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h1v3.01H4V18H3v4h4v-4H6v-2.99h5V18h-1v4h4v-4h-1v-2.99h5V18h-1v4h4v-4h-1v-4.99zM10 8V4h4l.002 4H10z"></path>
                                    </svg>
                                </a>
                            </li>
                        </ul>

                        {/* <p className="copyright-notice text-sm text-gray-600">© 2023 Normal Template. All Rights Reserved.</p> */}
                        </div></div></footer>
            {/* <a
                target="_blank"
                rel="noopener"
                href="#"
                className="watermark fixed inline-flex items-center justify-center bottom-0 right-0 pr-4 pb-4 umami--click--https-feather-so-?via=bhanu"
            >
                <button
                    type="button"
                    className="group z-20 flex items-center bg-gray-900 text-xs font-bold text-white shadow-lg backdrop-blur-lg bottom-2.5 rounded-lg px-2 py-1.5 hover:bg-gray-700"
                >
                    <span>Published with</span>&nbsp;
                    <svg
                        width="199"
                        height="246"
                        viewBox="0 0 199 246"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-auto text-white mx-1"
                    >
                        <path
                            d="M197.87 5.29357C196.554 3.03987 194.227 1.56117 191.634 1.29619C106.585 -7.15776 57.7491 27.2392 30.7118 60.9435C29.6504 61.7491 28.8032 62.8097 28.2623 64.0334C15.5962 80.3498 6.09422 98.8904 0.234747 118.695C0.081652 119.306 0.0102082 119.949 0 120.581C0 121.631 0.387848 146.024 26.3946 184.633H26.4048C21.7098 201.857 18.4642 219.448 16.6987 237.213C16.3517 241.7 19.7095 245.626 24.2105 245.973H24.8535C29.1197 245.983 32.6817 242.71 33.0185 238.457C34.8046 221.937 37.9175 205.6 42.3368 189.589L111.302 165.818L111.292 165.808C112.598 165.369 113.772 164.594 114.69 163.575C148.299 126.465 196.299 17.2783 198.321 12.6497H198.331C199.352 10.2635 199.189 7.54074 197.872 5.29718L197.87 5.29357ZM149.481 76.8401C139.816 78.4105 130.049 79.2569 120.26 79.3895H118.525C114.013 79.3589 110.339 82.9893 110.309 87.4866C110.278 91.9941 113.901 95.6753 118.413 95.7058H120.229C126.884 95.6447 133.538 95.247 140.152 94.5025C129.915 114.49 117.78 133.448 103.92 151.122L48.0714 170.375C62.8194 125.444 91.4884 69.0595 146.459 36.5207C150.338 34.2161 151.614 29.2191 149.317 25.3442C147.01 21.469 141.999 20.184 138.121 22.4887C78.8414 57.6197 48.3055 116.583 32.6287 163.89C24.331 150.99 18.8093 136.51 16.4212 121.366C19.9218 109.169 25.0659 97.5032 31.6899 86.6837C32.7003 90.3652 33.8945 94.332 35.2927 98.3908C36.4256 101.695 39.5283 103.908 43.0188 103.908C43.9169 103.908 44.8151 103.755 45.6622 103.459C49.9283 101.991 52.1942 97.3609 50.7347 93.0981C48.0709 85.2051 45.8866 77.1589 44.2026 69.0109C67.4117 40.8033 108.318 12.7209 178.608 16.6551C172.739 29.5552 161.941 52.705 149.48 76.8428L149.481 76.8401ZM132.753 237.842C132.753 240.014 131.896 242.084 130.355 243.614C128.824 245.143 126.752 246 124.588 246H53.7866C49.2753 246 45.6216 242.349 45.6216 237.842C45.6216 233.345 49.2753 229.684 53.7866 229.684H124.617C129.118 229.704 132.752 233.355 132.752 237.842L132.753 237.842ZM169.364 237.842C169.364 240.014 168.507 242.084 166.976 243.614C165.445 245.143 163.363 246 161.199 246H152.411C147.9 246 144.246 242.349 144.246 237.842C144.246 233.345 147.9 229.684 152.411 229.684H161.199C163.363 229.684 165.445 230.55 166.976 232.08C168.507 233.61 169.364 235.68 169.364 237.842V237.842Z"
                            fill="currentColor"
                        ></path>
                    </svg>
                    <span>feather</span>
                </button>
            </a> */}
        </>
    )
}

export default Footer