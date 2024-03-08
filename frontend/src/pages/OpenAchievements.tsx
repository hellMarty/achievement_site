import React, { useState } from "react";
import useSWR from "swr";
import fetcher from "../models/fetcher";
import AchievementCard from "../components/AchievementCard";
import "../styles/pages.css";
import { IAchievement, IAchievementType } from "../interface/AchievementInterface";


/* DUPLICATION: This page is moreover same as AchievementList.tsx, 
 * for now is kept as it is since it might grow and differentiate in the future.
 */
export default function OpenAchievements() {
    const achievements = useSWR(`${import.meta.env.VITE_APP}achievement`, fetcher);
    const achievementTypes = useSWR(`${import.meta.env.VITE_APP}achievementType`, fetcher);
    const [ filter, setFilter ] = useState("0");

    if (achievements.error) return <div>failed to load </div>
    if (!achievements.data) return <div>loading...</div>

    if (achievementTypes.error) return <div>failed to load</div>
    if (!achievementTypes.data) return <div>loading...</div>

    return (
        <div className="achievement-list">
            <div>
                <h1>    
                    Open Achievements
                </h1>
                <h3>TODOs:</h3>
                <ul>
                    <li>Styling achievemets</li>
                    <li>Show only several achievements</li>
                </ul>
            </div>
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value={0} key={0}>-- Filter Achievements --</option>
                {achievementTypes.data.data.map((achievementType: IAchievementType, index: number) => 
                    <option value={achievementType.id} key={index}>{achievementType.name}</option>
                )}
            </select>
            {achievements.data.data
                .filter((achievement: IAchievement) => (filter === "0" || achievement.achievementType.id === filter) && achievement.achievedAt === null )
                .map((achievement: IAchievement, index: number) => <AchievementCard key={index} {...achievement} refresh={achievements.mutate} />)}
        </div>
    )
};


