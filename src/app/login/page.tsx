"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login success");
      router.push("/profile");
      localStorage.setItem('userEmail', user.email);
      setLoading(false);
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {loading && (
                    <div className="loading"><p>please wait...</p>
                    </div>
                  )}
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl text-black font-bold mb-4">{loading ? "Processing" : "Login"}</h2>
        <hr />
        <div className="mb-4 form-control">
          <input
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
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
            onChange={(e) => setUser({ ...user, password: e.target.value })}
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
          onClick={onLogin}
          className="bg-white text-black hover:text-white border border-black py-2 px-4 rounded-md hover:bg-gray-600"
        >
          Login 
        </button>
        <Link className="bg-white text-black hover:text-white border border-black py-2 px-4 rounded-md hover:bg-gray-600" href="/signup">New user</Link>
        </div>
      </div>
    </div>
  );
}
