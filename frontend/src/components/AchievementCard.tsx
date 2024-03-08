import React from "react";
import { Button } from "react-bootstrap";
import "../styles/components.css"
import { format } from "date-fns";
import { IAchievement } from "../interface/AchievementInterface";

export default function AchievementCard(achievementProps: IAchievement) {
    return (
        <div className="achievement-card">
            <div>
                <img className="achievement-card__image" src="../icons/image.svg" />
            </div>
            <div className="achievement-card__info">
                <h1>Achievement!</h1>
                <h3>Title: {achievementProps.title}</h3>
                <div>Desc: {achievementProps.description}</div>
                <div>Type: {achievementProps.achievementType.name}</div>
                <div className="achievement-card__footer">
                    <div className="achievement-card__date" >Date: {format(achievementProps.createdAt, "MM/dd/yyyy HH:mm")}</div>
                    <Button className="achievement-card__button" onClick={() => deleteMessage(achievementProps)}>
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    )
};

const deleteMessage = async (achievementProps: IAchievement) => {
    await fetch(`${import.meta.env.VITE_APP}achievement/${achievementProps.id}`, {
        method: 'DELETE'
    });
    achievementProps.refresh();    
};
