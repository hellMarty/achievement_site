import React from "react";
import useSWR from "swr";
import fetcher from "../models/fetcher";
import AchievementCard, { IAchievementProps } from "../components/AchievementCard";
import "../styles/pages.css"


export default function AchievementList() {
    const { data, error, mutate } = useSWR(`${import.meta.env.VITE_APP}achievement`, fetcher);

    if (error) return <div>failed to load </div>
    if (!data) return <div>loading...</div>

    return (
        <div className="achievement-list">
            <div className="achievement-list__header">
                <h1>
                    List of Achievements
                </h1>
                <h3>TODOs:</h3>
                <ul>
                    <li>Styling achievemets</li>
                    <li>Show only several achievements</li>
                    <li>Filtering of the achievements</li>
                </ul>
            </div>
            <div className="achievement-list">
                {data.data.map((achievement: IAchievementProps, index: string) => <AchievementCard key={index} {...achievement} refresh={mutate} />)}
            </div>
        </div>
    )
};
