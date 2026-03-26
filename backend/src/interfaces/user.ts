
import { Document, Types } from 'mongoose';

// User interface
export default interface IUser extends Document {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'admin' | 'user'; // 👈 changed from string to specific values
    reports: Types.ObjectId[];
    createResetPasswordToken: string;
    passwordChangedAt?: Date;
    passwordResetToken?: string;
    passwordResetTokenExpires?: Date;
}

// Report interface — export as named export, not default (fixes the double export default error)
export interface IReport extends Document {
    userId: Types.ObjectId;
    reportType: string;
    description: string;
    status: string;
    createdAt: Date;
}