"use client"
import axios from "axios";
import React, { useState } from "react";
import Navbar from "@/components/Navbar"
import CustomFooter from "@/components/CustomFooter"
import { useSearchParams } from "next/navigation";

export default function Login() {
    const searchQuery = useSearchParams()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const Data = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/public/login", {
                email: email, password: password
            }, {
                withCredentials: true
            })
            if (Data.data == "success") {
                alert("Login success")
                if (searchQuery.get('prev')) {
                    window.location.href = `/${searchQuery.get('prev')}`
                } else {
                    window.location.href = "/"
                }

            } else {
                alert("login failed")
            }
        } catch (err) {
            alert("login failed")
        }

    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-white md:p-8 sm:p-4 p-4 border rounded-lg shadow-lg md:w-96 sm:w-80 w-full">
                    <h2 className="text-2xl font-bold text-center mb-4">LOGIN</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300"
                                placeholder="user@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300"
                                placeholder="********"
                            />
                        </div>
                        <p className="text-red-400 text-xs mb-2 cursor-pointer" onClick={(e) => setShowPassword(!showPassword)}>show password</p>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            submit
                        </button>
                    </form>
                    <p className="text-sm text-gray-600 text-center mt-4">
                        Tidak punya akun?{' '}
                        <a
                            href="/register"
                            className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
                        >
                            Klik Register
                        </a>
                    </p>
                </div>
            </div>
            <CustomFooter />
        </>

    );
};

