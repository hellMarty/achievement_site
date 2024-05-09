import { Request, Response } from 'express';
import prisma from '../client';

const DEFAULT_THEME_ID = "b2327c39-392e-4b91-8f52-f99776952e2e"

/**
 * Get Active Theme
 * 
 * @param req - Request contains: none
 * @param res - Response
 * @returns - Active Theme (Default theme is active by Default)
 */
export const getActive = async (req: Request, res: Response) => {
    const theme = await prisma.theme.findFirst({
        select: {
            id: true,
            name: true,
            jsonCSS: true,
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

/**
 * Get All Themes
 * 
 * @param req - Request contains: none
 * @param res - Response
 * @returns - All Themes
 */
export const getAll = async (req: Request, res: Response) => {
    const theme = await prisma.theme.findMany({
        select: {
            id: true,
            name: true,
            active: true,
            lastActive: true,
            jsonCSS: true,
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

/**
 * Set desired Theme as Active, set all others as Inactive
 * 
 * @param req - Request contains: Theme Id
 * @param res - Response
 * @returns - Returns Activated Theme
 */
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

/**
 * Create new theme
 * 
 * @param req - Request contains: Theme Name, Active (Future plans, currently set as False)
 * @param res - Response
 * @returns - Created Theme
 */
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

/**
 * Remove Theme, set DeletedAt for the Theme. 
 * 
 * @param req - Request contains: ThemeId
 * @param res - Response
 * @returns - Deleted Theme
 */
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

/**
 * Update CSS file in the theme. CSS is stored in the form of JSON
 * 
 * @param req - Request contains: Theme Id, CSS in JSON
 * @param res - Response
 * @returns - Updated Theme
 */
export const updateJsonCSS = async (req: Request, res: Response) => {
    const themeId = req.params.themeId;
    const { jsonCSS } = req.body

    const theme = await prisma.theme.update({
        where: {
            id: themeId,
        },
        data: {
            jsonCSS: jsonCSS,
        },
    });

    // TODO: uncomment once the default theme is set up! Add some admin control (only one with rights can update it)
    /*
    if (theme.id === DEFAULT_THEME_ID) {
        return res.status(400).send({
            stauts: 'error',
            data: theme,
            message: 'Cannot update default theme!',
        });
    };
    */

    return res.send({
        status: 'success',
        data: theme,
    });
}

/**
 * Returns the CSS in Json for desired Theme
 * 
 * @param req - Request contains: Theme Id
 * @param res - Response
 * @returns - CSS in form of Json
 */
export const getJsonCSS = async (req: Request, res: Response) => {
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
        data: theme.jsonCSS,
    });
};
