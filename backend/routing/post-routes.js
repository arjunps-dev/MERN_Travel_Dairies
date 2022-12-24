import { Router } from "express";
import { addPost, getAllPosts } from "../controllers/post-controllers";

const postRouter = Router();

postRouter.get("/", getAllPosts);
postRouter.post("/",addPost);
export default postRouter;