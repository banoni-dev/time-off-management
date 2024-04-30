
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
        include: {
            timeOffs: true,
            timeOffHistory: true,
        },
        });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ id: user.id, email: user.email, username: user.username, role: user.role, firstName: user.firstName, lastName: user.lastName , timeOffCredit: user.timeOffCredit , timeOffHistory: user.timeOffHistory , timeOffs: user.timeOffs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getStats = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                timeOffs: true,
                timeOffHistory: true,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Transform timeOffs and timeOffHistory data into chartdata format
        const chartdata = user.timeOffs.map((timeOff) => ({
            date: timeOff.startDate.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
            "All the Timeoffs": 1, // Assuming each timeOff counts as 1
            "Approved Timeoffs": timeOff.status === 'approved' ? 1 : 0,
        }));
        console.log("--",user);
        // Combine chartdata from timeOffs and timeOffHistory
        user.timeOffHistory.forEach((timeOff) => {
            const index = chartdata.findIndex((data) => data.date === timeOff.startDate.toLocaleString('en-US', { month: 'short', year: 'numeric' }));
            if (index !== -1) {
                chartdata[index]["All the Timeoffs"] += 1; // Assuming each timeOff counts as 1
                if (timeOff.status === 'approved') {
                    chartdata[index]["Approved Timeoffs"] += 1;
                }
            }
        });

        res.json({ chartdata });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



const getAllStats = async (req: Request, res: Response) => {
    try {
        // Retrieve all users
        const users = await prisma.user.findMany({
            include: {
                timeOffs: true,
                timeOffHistory: true,
            },
        });

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        // Initialize chartdata object
        const chartdata = {};

        // Process timeOffs and timeOffHistory data for all users
        users.forEach(user => {
            user.timeOffs.forEach(timeOff => {
                const dateKey = timeOff.startDate.toLocaleString('en-US', { month: 'short', year: 'numeric' });
                if (!chartdata[dateKey]) {
                    chartdata[dateKey] = {
                        "All the Timeoffs": 0,
                        "Approved Timeoffs": 0,
                    };
                }
                chartdata[dateKey]["All the Timeoffs"] += 1;
                if (timeOff.status === 'approved') {
                    chartdata[dateKey]["Approved Timeoffs"] += 1;
                }
            });

            user.timeOffHistory.forEach(timeOff => {
                const dateKey = timeOff.startDate.toLocaleString('en-US', { month: 'short', year: 'numeric' });
                if (!chartdata[dateKey]) {
                    chartdata[dateKey] = {
                        "All the Timeoffs": 0,
                        "Approved Timeoffs": 0,
                    };
                }
                chartdata[dateKey]["All the Timeoffs"] += 1;
                if (timeOff.status === 'approved') {
                    chartdata[dateKey]["Approved Timeoffs"] += 1;
                }
            });
        });

        res.json({ chartdata });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = {
    updateProfile,
    getProfile,
    getStats,
    getAllStats
};
