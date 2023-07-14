import { Request, Response, Router } from 'express';
import { addPost, editPost, deletePost, getAllPosts, getOnePost, getAllUserPosts } from '../controllers/postController';
import { verifyUser } from '../services/auth';
import { Post } from '../models/post';

const router = Router();

router.get('/', getAllPosts);

router.get('/:id', getOnePost, verifyUser, (req: Request, res: Response) => {
    const userId = req.body.userId;
    res.json({ message: 'Protected route accessed!', userId});
});

router.get('/posts', getAllUserPosts, verifyUser, async (req: Request, res: Response) => {
    const userId = req.body.userId;
    const posts = await Post.find({ userId });
    res.json(posts);
});

router.post('/', addPost, verifyUser, (req: Request, res: Response) => {
    const userId = req.body.userId;
    res.json({ message: 'Protected route accessed!', userId});
});
router.put('/:id', editPost, verifyUser, (req: Request, res: Response) => {
    const userId = req.body.userId;
    res.json({ message: 'Protected route accessed!', userId});
});
router.delete('/:id', deletePost, verifyUser, (req: Request, res: Response) => {
    const userId = req.body.userId;
    res.json({ message: 'Protected route accessed!', userId});
});

export default router;