import React, { useState } from "react";
import useSWR from "swr";
import fetcher from "../models/fetcher";
import AchievementCard from "../components/AchievementCard";
import "../styles/pages.css";
import { IAchievement, IAchievementType } from "../interface/AchievementInterface";


export default function AchievementList() {
    const achievements = useSWR(`${import.meta.env.VITE_APP}achievement`, fetcher);
    const achievementTypes = useSWR(`${import.meta.env.VITE_APP}achievementType`, fetcher);
    const [ filter, setFilter ] = useState("0");

    if (achievements.error) return <div>failed to load </div>
    if (!achievements.data) return <div>loading...</div>

    if (achievementTypes.error) return <div>sada</div>
    if (!achievementTypes.data) return <div>asda</div>


    return (
        <div className="achievement-list">
            <div>
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
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value={0} key={0}>-- Filter Achievements --</option>
                {achievementTypes.data.data.map((achievementType: IAchievementType) => 
                    <option value={achievementType.id}>{achievementType.name}</option>
                )}
            </select>
            {achievements.data.data
                .filter((achievement: IAchievement) => filter === "0" || achievement.achievementType.id === filter)
                .map((achievement: IAchievement, index: number) => <AchievementCard key={index} {...achievement} refresh={achievements.mutate} />)}
        </div>
    )
};
