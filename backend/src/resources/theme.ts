import prisma from '../client';
import { Request, Response } from 'express';

const DEFAULT_THEME_ID="b2327c39-392e-4b91-8f52-f99776952e2e"


export const getActive = async (req: Request, res: Response) => {
    const theme = await prisma.theme.findFirst({
        select: {
            id: true,
            name: true,
            cssFile: true,
        },
        where: {
            active: true
        }
    })

    return res.send({
        status: "success",
        data: theme,
    });
};

export const getAll = async (req: Request, res: Response) => {
    const theme = await prisma.theme.findMany({
        select: {
            id: true,
            name: true,
            active: true,
            lastActive: true,
            cssFile: true,
        },
        where: {
            deletedAt: null,
        }
    });

    return res.send({
        status: "success",
        data: theme,
    });
};

export const setAsActive = async (req: Request, res: Response) => {
    const id = req.params.themeId; 

    await prisma.theme.updateMany({
        where: {
            active: true,
        },
        data: {
            active: false,
        }
    });

    const theme = await prisma.theme.update({
        where: {
            id: id,
        },
        data: {
            active: true,
            lastActive: new Date(),
        },
    });

    return res.send({
        status: "success",
        data: theme,
    });
}

export const create = async (req: Request, res: Response) => {
    const name = req.body.name;
    let active = req.body.active;
    
    if (active) { 
        active = false; 
    }

    const theme = await prisma.theme.create({
        data: {
            name: name,
            active: active,
        },
    });

    return res.send({
        status: "success",
        data: theme,
    });
}

export const remove = async (req: Request, res: Response) => {
    const themeId = req.params.themeId;

    if (themeId === DEFAULT_THEME_ID) {
        return res.status(400).send({
            status: 'error',
            data: {},
            message: 'Cannot delete default theme',
        });
    };

    const theme = await prisma.theme.findUnique({
        select: {
            name: true,
            active: true,
            deletedAt: true,
        },
        where: {
            id: themeId,
        },
    });

    if (!theme || theme.deletedAt) {
        return res.status(404).send({
            status: "error",
            data: theme,
            message: 'Theme not found!'
        });
    };

    if (theme.active) {
        return res.status(400).send({
            status: "error",
            data: theme,
            message: 'Cannot remove active theme!'
        });
    };

    const removedTheme = await prisma.theme.update({
        where: {
            id: themeId,
        },
        data: {
            deletedAt: new Date(),
        },
    });

    return res.send({
        status: 'success',
        data: removedTheme,
    });
}

export const replaceCssFile = async (req: Request, res: Response) => {
    const themeId = req.params.themeId;
    const cssFile = req.body.cssFile;

    const theme = await prisma.theme.findUnique({
        where: {
            id: themeId,
        },
    });

    if (!theme) {
        return res.status(404).send({
            status: 'error',
            data: {},
            message: 'Theme not found!',
        });
    };

    // TODO: uncomment once the default theme is set up! 
    /*
    if (theme.id === DEFAULT_THEME_ID) {
        return res.status(400).send({
            stauts: 'error',
            data: theme,
            message: 'Cannot update default theme!',
        });
    };
    */

    const updatedTheme = await prisma.theme.update({
        where: {
            id: themeId,
        },
        data: {
            cssFile: cssFile,
        },
    });

    return res.send({
        status: 'success',
        data: updatedTheme,
    });
};

export const updateCssFile = async (req: Request, res: Response) => {
    const themeId = req.params.themeId;
    const { component } = req.body
    
    
    console.log(component);

    const theme = await prisma.theme.update({
        where: {
            id: themeId,
        },
        data: {
            cssFile: component,
        },
    });

    return res.send({
        status: 'success',
        data: theme,
    });

}


export const getCssFile = async (req: Request, res: Response) => {
    const themeId = req.params.themeId;

    const theme = await prisma.theme.findUnique({
        where: {
            id: themeId,
        },
    });

    if (!theme) {
        return res.status(404).send({
            status: 'error',
            data: {},
            message: 'Theme not found!',
        });
    };

    return res.send({
        status: 'success',
        data: theme.cssFile,
    });
};