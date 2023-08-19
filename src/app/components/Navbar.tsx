"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import pfp from '../../profile-icon-9.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import oru from "../../oru.png"




export default function Home() {

  const[userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {

      const storeduserEmail = localStorage.getItem("userEmail");
      setUserEmail(storeduserEmail || "");
    }
  }, []);

  const router = useRouter();

  const[link, setLink] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLink(window.location.pathname)
    }, 5) 
  }, []);

  const [navbar, setNavbar] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [displayedProfile, setDisplayedProfile] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [clickedLink, setClickedLink] = useState('');


  useEffect(() => {
   
      async function fetchUserDetails() {
        try {
          const response = await axios.get(
            `/api/users/profile?userEmail=${userEmail}`
          );
          const userDetails = response.data.userDetail;
          setName(userDetails.name);
          const profile = userDetails.userProfile;
          setDisplayedProfile(profile)
        } catch (error) {
          console.error("Error:", error);
        }
      }

      fetchUserDetails();
    
  }, [userEmail]);

  useEffect(() => {
    
      async function fetchUserDetails() {
        try {
          const response = await axios.get(
            `/api/users/login?userEmail=${userEmail}`
          );
          const user = response.data.user;
          setUsername(user.username);
          console.log("name:", user.username)
        } catch (error) {
          console.error("Error:", error);
        }
      }

      fetchUserDetails();
    
  }, [userEmail]);


 const handleToggle=()=>{
    setSidebar(prev=>!prev)
  }  

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      localStorage.removeItem('userEmail');
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };




  return (
    <>
     
      <div className=" overflow-y-auto h-full z-30 relative">
      <div className={`sm:w-full md:w-full  ${sidebar?'sm:block md:block':'sm:hidden md:hidden'} lg:block   lg:h-screen lg:mt-0 md:mt-0 sm:mt-[73px] md:mt-20 lg:w-1/5 left-0 top-0 z-20  fixed bg-white p-4 pt-8 text-black flex flex-col items-start fixed  overflow-y-auto shadow `}>
        <h2 className="text-2xl shadow flex justify-center h-[6%] items-center rounded-lg p-4 lg:w-[90%] md:w-[40%] sm:w-[90%] border border-gray-300 font-semibold ml-4 mb-8">Dashboard</h2>
        <div>
        <ul className="space-y-4  items-center justify-center w-full">
          
          <li className='flex flex-row items-center ' >
            <ArrowForwardIosIcon style={{ fontSize: '12px' }} className='text-gray-500 mr-3'/>
            <Link style={{ color: "#1D267D" }}
              href="/profile"
              className={`text-md flex items-center text-[19px] lg:w-[80%] sm:w-[50%] md:w-[38%] justify-center ${link === '/profile' ? 'border border-blue-900' : ''} hover:border-blue-900 hover:border items-center text-blue-900 font-serif px-4 py-2 rounded-lg transition-colors`}
            >
              My Profile
            </Link>
          </li>
          <li className='flex flex-row items-center ' >
          <ArrowForwardIosIcon style={{ fontSize: '12px' }} className='text-gray-500 mr-3'/>
            <Link style={{ color: "#1D267D" }}
              href="/connections"
              className={`text-md flex items-center text-[19px] lg:w-[80%] sm:w-[50%] md:w-[38%]  justify-center ${link === '/connections' ? 'border border-blue-900' : ''} hover:border-blue-900 hover:border items-center text-blue-900 font-serif px-4 py-2 rounded-lg transition-colors`}
            >
              
              My Connections
            </Link>
          </li>
          
        
          
        </ul>
        </div>
         <div className="h-[65%] flex items-center flex justify-center mt-5 font-sans " >
           <button onClick={logout}   className="text-center  mt-auto" style={{ color: "#1D267D", fontWeight:"500" }}>Log Out</button>
         </div>
      </div>
    </div>

    
    <div className="  flex-row sticky border border-gray-300 top-0  z-20 bg-white" >
     
      <nav className="w-full ">
        
        <div className="justify-between items-center flex  px-4 mx-auto   ">
            
            <div>
              <ul onClick={handleToggle} className='flex items-center flex cursor-pointer'>
                <li className='text-black w-1/3 mr-3'>
                <hr className='h-[3px] w-[80%] rounded-full bg-black mb-1'/>
                <hr className='h-[3px] bg-yellow-400 rounded-full mb-1'/>
                <hr className='h-[3px] w-[60%] rounded-full bg-black mb-1'/>
              </li>

            <li className=' sm:block md:block lg:hidden mr-auto'>
              <Image src={oru} alt="oru" width={100} height={100}/>
            </li>
            </ul>
            </div>

          <div>
              <ul className="flex items-center space-y-3 flex space-x-6 space-y-0">
                <li className="text-black flex items-center  ">
                  <p>
                  <NotificationsNoneRoundedIcon style={{color:"#1D267D"}}/>
                  </p>
                </li>
              
                
                <li className='mb-2 flex items-center ml-auto lg:hidden md:hidden sm:block '>
              
                {displayedProfile !== null && displayedProfile ? (<div className=' items-center flex justify-center relative border w-[40px] h-[40px] rounded-full bg-white mr-4 overflow-hidden shadow-xl mb-3 '><img  src={displayedProfile} alt='pfp'/></div>)
                     : <Image className=' mr-3' width={40} src={pfp} alt='pfp'/>}
                
                </li>
                <li className="text-black sm:hidden lg:block md:block">
                  
                   <div className='mb-2 flex items-center p-2 rounded-lg  border border-gray-200'style={{color:"#1D267D"}}>
                   
                     
                     {displayedProfile !== null && displayedProfile ? (<div className=' items-center flex justify-center relative border w-[40px] h-[40px] rounded-md bg-white mr-4 overflow-hidden shadow-xl '><img  src={displayedProfile} alt='pfp'/></div>)
                     : <Image className=' mr-3' width={40} src={pfp} alt='pfp'/>}
                   
                    <div>
                         <p style={{fontSize:"11px"}}>Welcome back,</p>
                         <p className='text-[18px]'style={{fontWeight:"500"}}>{name || username}</p>
                    </div>
                    <div className='ml-9'>
                       <KeyboardArrowDownIcon/>
                      </div>
                   </div>
                  
                </li>
              </ul>
          </div>
        </div>
      </nav>
    </div>
    </>
  );
}