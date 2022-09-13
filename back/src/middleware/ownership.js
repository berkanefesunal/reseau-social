import Post from "../models/post.js";
import Boom from "boom";
//Post
const verifyPostOwnership = async (req, res, next) => {
    try {
        let post = await Post.findOne({ _id: req.params.id });
        let userId = req.payload.user_id.toString();
        let userRole = req.payload.role;
        if (userRole !== "admin") {
            //eğer admin değilse sahiplik kontrolü
            if (post.user._id.toString() !== userId) {
                return res.status(401).send(Boom.unauthorized("You are not authorized to modify this post").output.payload);
            } else {
                next();
            }
        } else {
            next();
        }

    } catch (err) {
        return res.status(400).send(Boom.badRequest("Request is not valid").output.payload);
    }
};


// Comment.
const verifyCommentOwnership = async (req, res, next) => {
    try {
        let post = await Post.findOne({ _id: req.params.id });
        let comment = post.comments.find(comment => comment._id.toString() === req.params.commentId);
        let userId = req.payload.user_id.toString();
        let userRole = req.payload.role;

        if (userRole !== "admin") {

            if (comment.user._id.toString() !== userId) {
                return res.status(401).send(Boom.unauthorized("You are not authorized to modify this comment").output.payload);
            } else {
                next();
            }
        } else {
            next();
        }

    } catch (err) {
        return res.status(400).send(Boom.badRequest("Request is not valid").output.payload);
    }
};

export {
    verifyPostOwnership,
    verifyCommentOwnership
}