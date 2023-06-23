import './App.css';
import NavHeader from './Component/Pages/nav';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './Component/Pages/home';
import Home1 from './Component/Pages/Home1'
import Home2 from './Component/Pages/Home2'
import NotionPage from './Component/Constant/NotionPage';
import About from './Component/Pages/About';
import NotFound from './Component/Pages/notFound';
import Page from './Component/Pages/Page';
import PrivateComponent from './Component/Constant/PrivateComponent'
import Login from './Component/Pages/Authentication/Login';
import AdminComponent from './Component/Constant/AdminComponent';
import Dashboard from './Component/Admin/Dashboard';
import UserList from './Component/Admin/UserList';
import RegisterUser from './Component/Pages/RegisterUser';
import Blog from './Component/Pages/Blog';
import Helper from './Component/Pages/Helper';
import Header from './Component/Pages/header';
import Footer from './Component/Pages/Footer';
import ChatBoot from './Component/Constant/ChatBoot';
import Authors from './Component/Pages/Authors';
import Tags from './Component/Pages/Tags';
import ReactGA from 'react-ga';
import { useEffect } from 'react';
import AuthBlog from './Component/Pages/Authors/AuthBlog';
import TagBlog from './Component/Pages/Tags/TagBlog';
function App() {

    const TrackingId="G-WCKCQ6TJNF"
    ReactGA.initialize(TrackingId);
    ReactGA.pageview(window.location.pathname)

  return (
    <div className="">
      <Router>
        {/* <NavHeader /> */}
        <Header />
        <Routes >
          {/* <Route element={<PrivateComponent />}> */}
            <Route path='/' element={<Home2 />}></Route>
            <Route path=':abc' element={<NotionPage  /> }  />
            <Route path='/authors' element={<Authors />}/>
            <Route path='/authors/:fd' element={<AuthBlog />}/>
            <Route path='/tags/:fd' element={<TagBlog />}/>
            <Route path='/tags' element={<Tags />}/>
            {/* <Route path='/docs' element={<Helper />}/>
            <Route path='/about' element={<About  /> }  />         
            <Route path='/blog' element={<Blog  /> }  /> */}
          {/* </Route> */}
          <Route element={<AdminComponent />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/userlist' element={<UserList />} />
          </Route>
         {/* <Route path='/' element={<Home1 />}></Route> */}
         <Route path='/register' element={<RegisterUser />} />
         <Route path='/templates' element={<Page  /> }  />
         <Route path='/login' element={<Login />}></Route>
         <Route path='*' element={<NotFound />} />
        </Routes>
        {/* <ChatBoot /> */}
        <Footer />
      </Router>

    </div>
  );
}

export default App;
