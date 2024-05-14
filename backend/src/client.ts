import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default prisma

// Setting up the database -- Achievement Types
async function main() {
    const achievementTypes = ["Environment", "Sustainability", "Development", "Other"]
    achievementTypes.forEach(async (achievementType, index) => {
        await prisma.achievementType.findFirst({
            where: {
                name: achievementType,
            }
        }).then(async data => {
            if (!data) {
                await prisma.achievementType.create({
                    data: {
                        order: index + 1,
                        name: achievementType,
                    },
                });
            };
        });
    });

    const admin = await prisma.user.findFirst({
        where: {
            name: "Administrator",
        },
    });
    
    if (!admin) {
        console.log("create Administrator")
        await prisma.user.create({
            data: {
                name: "Administrator",
            },
        });
    };
    
    const defaultTheme = await prisma.theme.findFirst({
        where: {
            name: "Default Theme"
        },
    });

    if (!defaultTheme) {
        console.log("create Default Theme")
        await prisma.theme.create({
            data: {
                name: "Default Theme",
                active: true,
            },
        });
    };
}

main();