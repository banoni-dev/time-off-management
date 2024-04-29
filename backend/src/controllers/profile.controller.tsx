
import { type Request, type Response } from 'express';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const updateProfile = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await prisma.user.update({
        where: { id },
        data: req.body,
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    };

const getProfile = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await prisma.user.findUnique({
        where: { id },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ id: user.id, email: user.email, username: user.username, role: user.role, firstName: user.firstName, lastName: user.lastName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



module.exports = {
    updateProfile,
    getProfile
};
