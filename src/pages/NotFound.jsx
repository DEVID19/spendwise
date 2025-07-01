import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen  flex items-center  justify-center bg-blue-50">
            <div  className="flex flex-col gap-4 items-center justify-center  bg-white shadow  p-6 rounded-md ">
                 <h1 className="text-2xl font-bold "> Oops ! page not found</h1>
                <Link  to="/" className="cursor-pointer text-blue-500 hover:text-blue-700  text-xl font-bold">Go to home</Link>
            </div>
      </div>
  )
};

export default NotFound;
