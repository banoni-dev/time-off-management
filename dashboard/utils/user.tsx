const jwt = require('jsonwebtoken');
export const getUserIdFromToken = (accessToken: string) => {
    try {
      // Decode the JWT to get the payload
      const decoded = jwt.decode(accessToken, { complete: true });
      
      // Extract the user ID from the payload
      const userId = decoded.payload.userId;
      
      return userId;
    } catch (error) {
      console.error('Error decoding access token:', error);
      return null;
    }
  }
  
export const formatDateToISO = (date: string) => {
    const dateObject = new Date(date);
    return dateObject.toISOString();
}