import { format } from "date-fns";
import React from "react";
import { Button } from "react-bootstrap";
import { IAchievement } from "../interface/AchievementInterface";
import "../styles/components.css";

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
                    <div>
                        {achievementProps.achievedAt === null ? 
                        <Button className="achievement-card__button" onClick={() => gainAchievement(achievementProps)}>
                            GAIN
                        </Button> 
                        :
                        null}
                        <Button className="achievement-card__button" onClick={() => deleteMessage(achievementProps)}>
                            Remove
                        </Button>
                    </div>
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

const gainAchievement = async (achievementProps: IAchievement) => {
    await fetch(`${import.meta.env.VITE_APP}achievement/${achievementProps.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: "Administrator"
        }),
    });

    achievementProps.refresh();
}