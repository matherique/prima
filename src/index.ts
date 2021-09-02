import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

async function main() {
  await prisma.post.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.user.deleteMany()

  await prisma.user.create({
    data: {
      name: "matheus",
      email: "matherique2@gmail.com",
      posts: {
        create: [
          { title: "random example", content: "hello world !!!"},
          { title: "random example 2", content: "hello world 2!!!"}
        ],
      },
      profile: {
        create: { bio: "i dont know" },
      }
    }
  })

  const users = await prisma.user.findMany({
    include: {
      posts: true, profile: true
    }
  })


}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
