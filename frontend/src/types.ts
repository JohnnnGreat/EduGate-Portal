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

export interface Register extends Login {}
