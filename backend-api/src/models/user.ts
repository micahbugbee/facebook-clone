import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    age: string;
    city: string;
    state: string;
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
});

const User = mongoose.model<IUser>('User', userSchema)

export { IUser, User };