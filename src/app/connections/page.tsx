'use client'
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../globals.css"

export default function ConnectionsPage() {
  interface Person {
    _id: string;
    name: string;
    isconnected : Boolean;
    work: string;
    company: String;
    proflie: string
  }
  
  const router = useRouter();
  const [data, setData] = useState([]);
  const [personId, setPersonId] = useState(null);
  const [connectedPeople, setConnectedPeople] = useState<Person[]>([]);
  const [notconnectedPeople, setNotconnectedPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPeople() {
      setLoading(true);
      try {
        const response = await axios.get("/api/users/connections");
        setData(response.data.people);
        const connected = response.data.people.filter((item:any) => item.isconnected);
        const notConnected = response.data.people.filter((item:any) => !item.isconnected);
        setConnectedPeople(connected);
        setNotconnectedPeople(notConnected);
        setLoading(false);
        
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchPeople();
  }, []);


  

  


  const handleConnection = async (itemId:any) => {
    setLoading(true);
        await setPersonId(itemId);
    try {
      await axios.put(`/api/users/connections?itemId=${itemId}&action=disconnect`);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleConnect = async (itemId:any) => {
    setLoading(true);
    await setPersonId(itemId);
try {
  await axios.put(`/api/users/connections?itemId=${itemId}&action=connect`);
  window.location.reload();
} catch (error) {
  console.error("Error:", error);
}
};

  return (
    
    <div className="flex bg-gray-100 items-center justify-center min-h-[1200px] py-4">
      <div className="lg:w-[80%] md:w-full sm:w-full  ml-auto  mb-auto bg-gray-100 items-top items-center flex flex-col">
        <div className="flex w-[99%]  mt-3 rounded-lg flex-col items-center" style={{ backgroundColor: "#1D267D" }}>
          <p className="flex mr-auto p-3 h-[80px] text-[20px]">My Connections </p>
        </div>
        {loading && (
                    <div className="loading">
                      <svg className="animate-spin" fill="none" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/></svg>
                      <p>Loading please wait...</p>
                    </div>
                  )}
        <div className="flex flex-wrap sm:justify-center lg:justify-start md:justify-start mb-9">
          {connectedPeople && connectedPeople.length > 0 && connectedPeople.map((item) => (
              <div key={item._id} className="p-4 lg:w-[27%] md:w-[39%] sm:w-[70%] border border-gray-300 shadow-lg text-black rounded-lg flex items-start mb-5 mt-5 ml-4 mr-9">
                <div className="flex text-black flex-col w-[80%] h-full">
                  <p className="mb-2 text-[14px]">{item.name}</p>
                  <p className="text-gray-500 text-[13px]">{item.work}</p>
                  <p className="text-gray-500 text-[13px]">@{item.company}</p>

                  <button onClick={(e)=>handleConnection(item._id)} className=" w-[85%] rounded-lg text-[12px] flex justify-center  mt-auto" style={{backgroundColor:"#9F91CC"}}>Remove Connection</button>
                </div>
                <div className="border border-white rounded-full shadow-lg w-1/2 overflow-hidden ">
                  <img
                    src={item.proflie}
                    alt="pfp"
                    
                  />
                </div>
              </div>
            ))}
        </div>
        <div className="flex mr-auto p-3 text-black mt-6 text-[25px]">People you can also connect </div>
        <div className="flex flex-wrap sm:justify-center lg:justify-start md:justify-start mb-9 ">
          {notconnectedPeople && notconnectedPeople.length > 0 && notconnectedPeople.map((item) => (
              <div key={item._id} className="p-4 lg:w-[27%] md:w-[39%] sm:w-[70%] border border-gray-300 shadow-lg text-black rounded-lg flex items-start mb-5 mt-5 ml-4 mr-9">
                <div className="flex text-black flex-col w-[80%] h-full">
                  <p className="mb-2 text-[14px]">{item.name}</p>
                  <p className="text-gray-500 text-[13px]">{item.work}</p>
                  <p className="text-gray-500 text-[13px]">@{item.company}</p>

                  <button onClick={(e)=>handleConnect(item._id)} className=" w-[85%] rounded-lg text-[12px] flex justify-center  mt-auto" style={{backgroundColor:"#9F91CC"}}>Connect</button>
                </div>
                <div className="border border-white rounded-full shadow-lg w-1/2 overflow-hidden ">
                  <img
                    src={item.proflie}
                    alt="pfp"
                    
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
