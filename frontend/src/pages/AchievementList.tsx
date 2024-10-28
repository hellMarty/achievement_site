import React, { useState } from "react";
import useSWR from "swr";
import AchievementCard from "../components/AchievementCard";
import { IAchievementProps, IAchievementTypeProps } from "../interface/AchievementInterface";
import fetcher from "../models/fetcher";
import "../styles/pages.css";


export default function AchievementList() {
    const achievements = useSWR(`${import.meta.env.VITE_APP}achievement`, fetcher);
    const achievementTypes = useSWR(`${import.meta.env.VITE_APP}achievementType`, fetcher);
    const [filter, setFilter] = useState("0");

    if (achievements.error) return <div>failed to load </div>
    if (!achievements.data) return <div>loading...</div>

    if (achievementTypes.error) return <div>Types Failed to Load</div>
    if (!achievementTypes.data) return <div>Loading Achievement Types...</div>

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
                </ul>
            </div>
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value={0} key={0}>-- Filter Achievements --</option>
                {achievementTypes.data.data.map((achievementType: IAchievementTypeProps, index: number) =>
                    <option value={achievementType.id} key={index}>{achievementType.name}</option>
                )}
            </select>
            {achievements.data.data
                .filter((achievement: IAchievementProps) => (filter === "0" || achievement.achievementType.id === filter) && achievement.achievedAt !== null)
                .map((achievement: IAchievementProps, index: number) => <AchievementCard key={index} {...achievement} refresh={achievements.mutate} />)}
        </div>
    )
};
