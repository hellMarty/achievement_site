import React from "react";
import useSWR from "swr";
import fetcher from "../models/fetcher";


export default function Home() {
    const { data, error } = useSWR(`${import.meta.env.VITE_APP}`, fetcher)
    
    if (error) return <div>failed to load </div>
    if (!data) return <div>loading...</div>

    console.log("backend", data)

    return (
        <div>
            <h1>
                Welcom to the Achievement Page
            </h1>
            <h3>
                Where all your dreams come true!
            </h3>
        </div>
    )
};