import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user';

interface IPost extends Document {
    message: string;
    userId: IUser['_id'];
    username: IUser['username'];
    date: string;
}

const postSchema: Schema = new Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: Schema.Types.String,
        ref: 'User',
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const Post = mongoose.model<IPost>('Post', postSchema)

export { IPost, Post };