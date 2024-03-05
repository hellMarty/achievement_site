import React from "react";

export interface IAchievementProps {
    title: string,
    description: string,
    option: string,
    createdAt: string,
}


export default function AchievementCard(achievementProps: IAchievementProps) {
    return (
        <div>
            <h1>Achievement!</h1>
            <h3>Title: {achievementProps.title}</h3>
            <div>Desc: {achievementProps.description}</div>
            <div>Opt: {achievementProps.option}</div>
            <div>Date: {achievementProps.createdAt}</div>
        </div>
    )
};

