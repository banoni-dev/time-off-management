// import prisma client using require
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const login = async (req: Request, res: Response) => {
  res.send("Hello from the admin controller!");
};

const create = async (req: Request, res: Response) => {
  try {
    const createdAdmin = await prisma.user.create({
      data: req.body,
    });
    console.log("Admin user created:", createdAdmin);
    res.status(200).json(createdAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  login,
  create,
};
