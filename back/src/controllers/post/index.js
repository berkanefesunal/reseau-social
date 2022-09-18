import Post from "../../models/post.js";
import mongoose from "mongoose";
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ "user._id": req.params.userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPost = async (req, res) => {
  const input = req.body;
  if(req.file) {
    const img = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    input.imageUrl = img;
  }
  input.user = JSON.parse(req.body.user);

  try {
    const post = await Post.create({
      ...input,
      usersLike: [],
      usersDisliked: [],
      comments: [],
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const likePost = async (req, res) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    if (req.body.likeData === 1) {
      if (!post.usersDisliked.includes(req.body.userId)) {
        if (!post.usersLiked.includes(req.body.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            { $push: { usersLiked: req.body.userId } }
          ).then((post) => {
            res.status(200).json(post);
          });
        } else if (post.usersLiked.includes(req.body.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: req.body.userId } }
          ).then((post) => {
            res.status(200).json(post);
          });
        }
      } else {
        Post.updateOne(
          { _id: req.params.id },
          {
            $pull: { usersDisliked: req.body.userId },
            $push: { usersLiked: req.body.userId },
          }
        ).then((post) => {
          res.status(200).json(post);
        });
      }
    } else if (req.body.likeData === 0) {
      if (!post.usersLiked.includes(req.body.userId)) {
        if (!post.usersDisliked.includes(req.body.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            { $push: { usersDisliked: req.body.userId } }
          ).then((post) => {
            res.status(200).json(post);
          });
        } else if (post.usersDisliked.includes(req.body.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            { $pull: { usersDisliked: req.body.userId } }
          ).then((post) => {
            res.status(200).json(post);
          });
        }
      } else {
        Post.updateOne(
          { _id: req.params.id },
          {
            $push: { usersDisliked: req.body.userId },
            $pull: { usersLiked: req.body.userId },
          }
        ).then((post) => {
          res.status(200).json(post);
        });
      }
    }
  });
};

const makeComment = async (req, res) => {
  const { user, content } = req.body;
  const postId = req.params.id;

  try {

    const post = await Post.findById(postId);

    if (post) {
      await Post.findByIdAndUpdate(postId, {
        $push: {
          comments: {
            user: JSON.parse(user),
            content,
            updatedAt: Date.now(),
            _id: new mongoose.Types.ObjectId(),
          },
        },
      });

      res.status(200).json({ message: "Success" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editPost = async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (post) {
      post.content = content;
      post.save();

      res.status(200).json({ message: "Success" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editComment = async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  const commentId = req.params.commentId;

  try {
    const post = await Post.findById(postId);

    if (post) {
      const comment = post.comments.find((comment) => comment._id == commentId);

      if (comment) {
        Post.updateOne(
          { _id: mongoose.Types.ObjectId(postId), "comments._id": mongoose.Types.ObjectId(commentId) },
          { $set: { "comments.$.content": content } }
        ).then((post) => {
          res.status(200).json({ message: "Success" });
        });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  const { commentId, id, userId } = req.params;
  try {
    const post = await Post.findById(id);

    if (post) {
      await Post.updateOne(
        { _id: id },
        {
          comments: post.comments.filter(
            (comment) => comment._id.toString() !== commentId
          ),
        }
      );

      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getPosts,
  getUserPosts,
  getPost,
  createPost,
  likePost,
  makeComment,
  editPost,
  editComment,
  deletePost,
  deleteComment,
};
