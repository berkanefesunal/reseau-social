import Comment from "../../models/comment.js";
import commentValidation from "./commentValidation.js";

const createComment = async (req, res) => {
  const input = req.body;
  const { error } = commentValidation.validate(input);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const comment = await Comment.create(input);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createComment, deleteComment };
