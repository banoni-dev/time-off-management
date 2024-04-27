const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();





const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const user = await prisma.user.delete({
        where: { id },
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    }


const createUser = async (req: Request, res: Response) => {
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

const approveRequest = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const request = await prisma.timeOffHistory.update({
        where: { id },
        data: { status: "approved" },
        });
        res.json(request);
        // TO-COMPLETE: the missing fields in the request object
        await prisma.timeOff.create({
        data: { userId: request.userId, startDate: request.startDate, endDate: request.endDate },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    };

const rejectRequest = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const request = await prisma.timeOffHistory.update({
        where: { id },
        data: { status: "rejected" },
        });
        res.json(request);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    };

const getHRs = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
        where: { role: "hr" },
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    }




module.exports = {
    createUser,
    approveRequest, 
    rejectRequest,
    deleteUser,
    getHRs
};
