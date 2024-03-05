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