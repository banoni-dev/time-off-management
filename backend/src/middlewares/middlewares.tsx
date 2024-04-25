const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



const isAdmin = async(req: any, res: any, next: Function) => {
    const user = req.user;
    console.log("re.user", req.user);
  
    if (!user) {
      return res.status(401).json({ message: "Unauthorized, you are not an admin" });
    }
    const {userId} = user;
    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    }); 
    if (currentUser.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Requires admin access" });
    }
    next();
}


const verifyAccessToken = (token: string) => {
  try {
    // Verify the access token using the secret key
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  const user = verifyAccessToken(token);

  if (!user) {
    return res.status(401).json({ message: 'Invalid access token' });
  }

  req.user = user;

  next();
};

module.exports = { isAdmin, authMiddleware };