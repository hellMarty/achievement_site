import { Request, Response } from 'express';
import prisma from '../client';

/**
 * Get all achievement types
 * 
 * @param req - Request contains: none 
 * @param res - Response
 * @returns - All Achievement Types
 */
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