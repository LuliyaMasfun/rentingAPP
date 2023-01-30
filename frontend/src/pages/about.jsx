import React from "react";
import Navbar from "@/components/Navbar";
import "../app/globals.css"

const About = () => {

    return (
        <main className="min-h-screen flex-grow"  >
            <Navbar />

            <h1 className="text-2xl flex justify-center text-fuchsia-900">This the About page</h1>
        </main>
    )
}

export default About;
