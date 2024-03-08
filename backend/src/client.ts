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
            }
        })
    })

    await prisma.user.create({
        data: {
            name: "Administrator",
        }
    })
}

main();