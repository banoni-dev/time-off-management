const jwt = require("jsonwebtoken");
import type { User } from "../interfaces/interfaces";


const isAdmin =(req: any, res: any, next: Function) => {
    const user: User | undefined = req.user;
  
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (user.role !== "admin") {
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

  // Check for authorization header and Bearer prefix
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Extract token from the header
  const token = authHeader.split(' ')[1];

  // Verify the access token using your verification function
  const user = verifyAccessToken(token);

  // Check if token is valid and user is found
  if (!user) {
    return res.status(401).json({ message: 'Invalid access token' });
  }

  // Attach the verified user to the request object (optional)
  req.user = user;

  // Continue with the request if token is valid
  next();
};

module.exports = { isAdmin, authMiddleware };