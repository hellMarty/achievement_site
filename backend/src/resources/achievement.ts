import { Request, Response } from 'express';
import prisma from '../client';

/**
 * Get all achievements
 * 
 * @param req - Request contains: none
 * @param res - Response
 * @returns - All Achievements (except deleted)
 */
export const getAll = async (req: Request, res: Response) => {
    const achievements = await prisma.achievement.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            achievementType: true,
            createdAt: true,
            achievedAt: true,
            achievedBy: true,
        },
        where: {
            deletedAt: null,
        },
    });

    return res.send({
        status: 'success',
        data: achievements,
    })
}

/**
 * Get Achievements by its type
 * 
 * @param req - Request contains: Achievement Type Id
 * @param res - Response
 * @returns - Achievements with certain Type
 */
export const getForType = async (req: Request, res: Response) => {
    const achievementTypeId = req.params.id;

    const achievements = await prisma.achievement.findMany({
        select: {
            id: true,
            title: true,
            description: true,
        },
        where: {
            deletedAt: null,
            achievementTypeId: achievementTypeId,
        }
    })
    return res.send({
        status: "success",
        data: achievements,
    })
}

/**
 * Create new achievement 
 * 
 * @param req - Request contains: Achievement Title, Description, and Achievement Type
 * @param res - Response
 * @returns - Created Achievement
 */
export const create = async (req: Request, res: Response) => {
    const { title, description, achievementTypeId } = req.body;

    const achievementType = await prisma.achievementType.findUnique({
        where: {
            id: achievementTypeId
        },
    });

    if (!achievementType) {
        return res.status(404).send({
            status: "error",
            data: {},
            message: "Achievement Type not found",
        })
    };

    const achievement = await prisma.achievement.create({
        data: {
            title: title,
            description: description,
            achievementTypeId: achievementTypeId
        }
    });

    return res.send({
        status: "success",
        data: achievement,
    });
};

/**
 * Gain achievement. Set achievedAt and achievedBy
 * 
 * @param req - Request contains: Achievement Id
 * @param res - Response
 * @returns - Obtained Achievement if found
 */
export const gain = async (req: Request, res: Response) => {
    const achievementId = req.params.achievementId;

    if (!findAchievement(achievementId)) {
        return res.status(404).send({
            status: 'error',
            data: {},
            message: 'Message not found',
        })
    }

    const achivement = await prisma.achievement.update({
        where: {
            id: achievementId,
        },
        data: {
            achievedAt: new Date(),
        },
    });

    return res.send({
        status: "success",
        data: achivement,
    })
}

/**
 * Remove Achievement, set DeletedAt for selected Achievement
 * 
 * @param req - Request contains: Achievement Id
 * @param res - Response
 * @returns - Removed achievement if found
 */
export const remove = async (req: Request, res: Response) => {
    const achievementId = req.params.achievementId;

    if (!findAchievement(achievementId)) {
        return res.status(404).send({
            status: 'error',
            data: {},
            message: 'Message not found',
        })
    }

    const removedAchievement = await prisma.achievement.update({
        where: {
            id: achievementId,
        },
        data: {
            deletedAt: new Date(),
        },
    });

    return res.send({
        stauts: 'success',
        data: removedAchievement,
    })
}

/**
 * Helper function that finds unique Achievement by it's ID
 * 
 * @param achievementId - Achievement ID
 * @returns - Achievement
 */
const findAchievement = async (achievementId: string) => {
    return await prisma.achievement.findUnique({
        where: {
            id: achievementId,
        },
    });
}