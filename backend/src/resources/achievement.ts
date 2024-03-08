import prisma from '../client';
import { Request, Response } from 'express';

/**
 *  Get all achievements (except deleted) 
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
 *  Get achievements by its type (for now not used)
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
    res.send({
        status: "success",
        data: achievements,
    })
}

/**
 *  Create new achievement 
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
 *  Gain achievement. Set achievedAt and achievedBy
 */
export const gain = async (req: Request, res: Response) => {
    const achievementId = req.params.achievementId;

    if (!findAchievement(achievementId)) {
        return res.send(404).send({
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
 *  Remove achievement
 */
export const remove = async (req: Request, res: Response) => {
    const achievementId = req.params.achievementId;

    if (!findAchievement(achievementId)) {
        return res.send(404).send({
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
 

const findAchievement = async (achievementId: string) => {
    return await prisma.achievement.findUnique({
        where: {
            id: achievementId,
        },
    });
}