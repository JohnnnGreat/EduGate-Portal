import { ChangeEvent } from "react";

export interface AdmissionResponse {
   message: string;
   // add other response data types if any
}

export interface User {
   firstName: string;
   lastName: string;
   email: string;
   phoneNumber: string;
   dateOfBirth: Date;
   gender: "Male" | "Female" | "Other";
   address?: string;
   profilePicture?: string;
   studentStatus?: "Pending" | "Admitted" | "Graduated" | "Suspended";
   dateRegistered: Date;
   lastLogin: Date;
   data?: {
      message: string;
   };
   message?: string;
}

export interface Users {
   users: User[];
}

export interface Login {
   email: string;
   password: string;
}

export interface LoginResponse {
   message: string;
   accessToken: string;
   refreshToken: string;
   user: User;
}

export interface ProfileInformation extends User {
   admissionNumber: string;
}
export interface Program {
   department: string;
   faculty: string;
   modeOfEntry: string;
}
export interface AdmissionInformation extends User {
   data: {
      program: Program;
      status: string;
   };
}

export interface File {
   event: ChangeEvent<HTMLInputElement>;
   type: "birthCertificate" | "oLevelResults";
}
export interface Register extends Login {}

interface Room {
   roomNumber: string;
   isOccupied: boolean;
   bedsAvailable: number;
   bedCapacity: number;
   occupants: Occupant[]; // Assuming occupants are objects, you can define an interface for this if needed.
}

interface Occupant {
   studentId?: string; // Optional if no occupants exist
   dateAllocated?: string; // Optional if no occupants exist
}

interface ContactInfo {
   email: string;
   phone: string;
}

interface Availability {
   bedsAvailable: number;
   status: "Available" | "Unavailable"; // Can use a union type for fixed values
}

export interface Hostel {
   _id: string;
   name: string;
   pricePerSemester: number;
   genderRestriction: "Male Only" | "Female Only" | "Mixed Gender"; // Restrict to valid options
   rooms: Room[];
   totalRooms: number;
   description: string;
   facilities: string[]; // Array of facility descriptions
   address: string;
   contactInfo: ContactInfo;
   availability: Availability;
}

export interface Booking {
   _id: string;
   hostelId: Hostel;
   roomNumber: string;
   studentId: User;
   dateBooking: Date;
}
