const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



const create = async (req: Request, res: Response) => {
  try {
    // encrypt the password
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await prisma.user.create({
        data: req.body,
        });
    console.log("User created successfully", user);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  create,
};
