"use client"
import React from "react";
import Sidebar from "@/components/Sidebar";

export default  function News() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-64"></div>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Welcome to Admin Panel</h1>
        <p className="mt-2">Ini adalah halaman dashboard utama.</p>
      </div>
    </div>
  );
}

