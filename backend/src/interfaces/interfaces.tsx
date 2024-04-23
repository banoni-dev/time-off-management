declare function cuid(): string;

// Types for primitive properties
type String = string;
type DateTime = Date; // Adjust this type if you have a specific library for date/time

// Nested types
interface User {
  id: String;
  username?: String;
  password: String;
  email: String;
  firstName: String;
  lastName: String;
  role: String;
  timeOffs: timeOff[];
  timeOffHistory: timeOffHistory[];
  timeOffCredit: timeOffCredit[];
}

interface timeOff {
  id: String;
  userId: String;
  startDate: DateTime;
  endDate: DateTime;
  status: String;
  reason: String;
  user: User; // Reference to the User model
}

interface timeOffHistory {
  id: String;
  userId: String;
  startDate: DateTime;
  endDate: DateTime;
  status: String;
  reason: String;
  user: User; // Reference to the User model
}

interface timeOffCredit {
  id: String;
  userId: String;
  credit: number;
  user: User; // Reference to the User model
}

// Export types for usage AS A MODEL
export type { User, timeOff, timeOffHistory, timeOffCredit };