import prisma from '../client';
import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response) => {
    const achievementTypes = await prisma.achievementType.findMany({
        select: {
            id: true,
            name: true,
        },
        orderBy: {
            order: 'asc'
        }
    })

    return res.send({
        status: "success",
        data: achievementTypes,
    });
};