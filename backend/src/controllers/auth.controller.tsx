const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const comparePasswords = (password: string, hashedPassword: string) => {
  return password === hashedPassword;
}

const createAccessToken = (user: any) => {
  return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '1d',
  });
};



const login = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user || !comparePasswords(password, user.password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const accessToken = createAccessToken(user);
    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};





module.exports = {
  login,
  logout
};
