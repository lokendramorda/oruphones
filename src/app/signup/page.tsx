"use client";
import Link from "next/link";
import React, {useState, useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            
            
            router.push("/login");
            setLoading(false);
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            alert("Enter Valid Credentials");
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
           
        } else {
           
        }
    }, [user]);


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {loading && (
                    <div className="loading"><p>please wait...</p>
                    </div>
                  )}
    <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-2xl text-black font-bold mb-4">{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <div className="mb-4 form-control">
        <input 
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
          
            />
                      <label>
                <span style={{ transitionDelay: "0ms" }}>U</span>
                <span style={{ transitionDelay: "50ms" }}>s</span>
                <span style={{ transitionDelay: "100ms" }}>e</span>
                <span style={{ transitionDelay: "150ms" }}>r</span>
                <span style={{ transitionDelay: "200ms" }}>n</span>
                <span style={{ transitionDelay: "250ms" }}>a</span>
                <span style={{ transitionDelay: "300ms" }}>m</span>
                <span style={{ transitionDelay: "350ms" }}>e</span>
              </label>
            </div>
            <div className="mb-4 form-control">
            <input
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
           
            />
            <label>
                <span style={{ transitionDelay: "0ms" }}>E</span>
                <span style={{ transitionDelay: "50ms" }}>m</span>
                <span style={{ transitionDelay: "100ms" }}>a</span>
                <span style={{ transitionDelay: "150ms" }}>i</span>
                <span style={{ transitionDelay: "200ms" }}>l</span>
              </label>
        
            </div>
            <div className="mb-4 form-control">
            <input 
       
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
          
            />
       <label>
                <span style={{ transitionDelay: "0ms" }}>P</span>
                <span style={{ transitionDelay: "50ms" }}>a</span>
                <span style={{ transitionDelay: "100ms" }}>s</span>
                <span style={{ transitionDelay: "150ms" }}>s</span>
                <span style={{ transitionDelay: "200ms" }}>w</span>
                <span style={{ transitionDelay: "250ms" }}>o</span>
                <span style={{ transitionDelay: "300ms" }}>r</span>
                <span style={{ transitionDelay: "350ms" }}>d</span>
              </label>
        
            </div>
            <div className="flex justify-between items-center">
            <button
            onClick={onSignup}
            className="mr-auto  bg-white text-black hover:text-white border border-black py-2 px-4 rounded-md hover:bg-gray-600"
            >
                Signup
            </button>
           
            <Link className="ml-auto bg-white text-black hover:text-white border border-black py-2 px-4 rounded-md hover:bg-gray-600" href="/login"> Login </Link>
            </div>
        </div>
        </div>
    )

}