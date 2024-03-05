import prisma from '../client';
import { Request, Response } from 'express';

export const get = async (req: Request, res: Response) => {
    return res.send({
        status: "success",
        data: "Message from backend",
    });
};

export const create = async (req: Request, res: Response) => {
    const { title, description, option } = req.body;

    const achievement = await prisma.achievement.create({
        data: {
            title: title,
            description: description,
            option: option
        }
    });

    console.log(title, description, option);

    return res.send({
        status: "success",
        data: achievement,
    });
};

export const getAll = async (req: Request, res: Response) => {
    const achievements = await prisma.achievement.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            option: true,
            createdAt: true,
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

export const remove = async (req: Request, res: Response) => {
    const achievementId = req.params.id;
    
    const achievement = await prisma.achievement.findUnique({
        where: {
            id: achievementId,
        },
    });

    if (!achievement) {
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