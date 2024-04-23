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


