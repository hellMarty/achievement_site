import React from "react";
import useSWR from "swr";
import fetcher from "../models/fetcher";
import AchievementCard, { IAchievementProps } from "./AchievementCard";


export default function AchievementList() {
    const { data, error } = useSWR(`${import.meta.env.VITE_APP}achievements`, fetcher);

    if (error) return <div>failed to load </div>
    if (!data) return <div>loading...</div>

    return (
        <div>
            <h1>
                List of Achievements
            </h1>
            <h3>TODOs:</h3>
            <ul>
                <li>Connect to the database</li>
                <li>Show list of achievements</li>
                <li>Show only several achievements</li> 
                <li>Filtering of the achievements</li> 
            </ul> 
            {data.data.map((achievement: IAchievementProps, index: string) => <AchievementCard key={index} {...achievement} />)}
        </div>
    )
};
