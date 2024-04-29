
import { type Request, type Response } from 'express';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// TO-COMPLETE: all the function below need to get the employee id and pass it to the prisma query


const getApprovedRequests = async (req: Request, res: Response) => {
  try {
    const requests = await prisma.timeOff.findMany(
      {
        where: { userId: req.params.id },
      }
    );
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getRequests = async (req: Request, res: Response) => {
  try {
    const requests = await prisma.timeOffHistory.findMany(
      {
        where: { userId: req.params.id },
      }
    );
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const createRequest = async (req: Request, res: Response) => {
  console.log(req.body);
    try {
        const request = await prisma.timeOffHistory.create({
        data: req.body,
        });
        await prisma.user.update({
        where: { id: req.body.userId },
        data: { timeOffHistory: { connect: { id: request.id } } },
        });
        res.json(request);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};





module.exports = {
    getApprovedRequests,
    getRequests,
    createRequest
};
