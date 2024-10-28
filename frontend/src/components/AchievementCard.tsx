import { format } from "date-fns";
import React from "react";
import { IAchievementProps } from "../interface/AchievementInterface";
import "../styles/components.css";

export default function AchievementCard(achievementProps: IAchievementProps) {
    return (
        <div className="achievement-card">
            <div>
                <img className="achievement-card__image" src="../icons/image.svg" />
            </div>
            <div className="achievement-card__info">
                <div>
                    <div className="achievement-card__title">{achievementProps.title}</div>
                    <div className="achievement-card__desc">{achievementProps.description}</div>
                    <div className="achievement-card__type">Type: {achievementProps.achievementType.name}</div>
                </div>
                <div className="achievement-card__footer">
                    <div className="achievement-card__date" >Date: {format(achievementProps.createdAt, "MM/dd/yyyy HH:mm")}</div>
                    <div>
                        {achievementProps.achievedAt === null ?
                            <button className="achievement-card__button" onClick={() => gainAchievement(achievementProps)}>
                                GAIN
                            </button>
                            :
                            null}
                        <button className="achievement-card__button" onClick={() => deleteAchievement(achievementProps)}>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

const deleteAchievement = async (achievementProps: IAchievementProps) => {
    await fetch(`${import.meta.env.VITE_APP}achievement/${achievementProps.id}`, {
        method: 'DELETE'
    });

    achievementProps.refresh();
};

const gainAchievement = async (achievementProps: IAchievementProps) => {
    await fetch(`${import.meta.env.VITE_APP}achievement/${achievementProps.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: "Administrator"
        }),
    });

    achievementProps.refresh();
}