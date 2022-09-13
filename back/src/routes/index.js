import { Router } from "express";
import auth from "./auth.js";
import post from "./post.js";

const router = Router();

router.get("/", (req, res) => {
  res.end("hey");
});
router.use("/auth", auth);
router.use("/post", post);
export default router;
