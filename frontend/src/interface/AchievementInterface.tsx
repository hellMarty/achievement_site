export interface IAchievement {
    id: string,
    title: string,
    description: string,
    achievementType: IAchievementType,
    createdAt: string,
    refresh: () => void,
}

export interface IAchievementType {
    id: string,
    name: string,
}