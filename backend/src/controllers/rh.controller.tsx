
import { type Request, type Response } from 'express';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await prisma.user.findMany({ where: { role: 'employee' } });
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getEmployee = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const employee = await prisma.user.findUnique({ where: { id } });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getApprovedRequests = async (req: Request, res: Response) => {
  try {
    const requests = await prisma.timeOff.findMany();
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getApprovedRequestsForEmployee = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const employeeRequests = await prisma.timeOff.findMany({ where: { userId: id } });
    res.json(employeeRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getAllRequests = async (req: Request, res: Response) => {
  try {
    const requests = await prisma.timeOffHistory.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    }
    );
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllRequestsForEmployee = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const employeeRequests = await prisma.timeOffHistory.findMany({ where: { userId: id } });
    res.json(employeeRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateCredits = async (req: Request, res: Response) => {
  console.log(req.body.timeOffCredit);
  const id = req.params.id;
  try {
    const employee = await prisma.user.update({
      where: { id },
      data: { timeOffCredit: req.body.timeOffCredit },
    });
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}



module.exports = {
    getEmployees,
    getEmployee,
    getApprovedRequests,
    getApprovedRequestsForEmployee,
    getAllRequests,
    getAllRequestsForEmployee,
    updateCredits
    };
