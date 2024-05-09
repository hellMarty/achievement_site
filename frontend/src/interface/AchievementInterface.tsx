export interface IAchievementProps {
    id: string,
    title: string,
    description: string,
    achievementType: IAchievementTypeProps,
    createdAt: string,
    achievedAt: string,
    achievedBy: string,
    refresh: () => void,
}

export interface IAchievementTypeProps {
    id: string,
    name: string,
}