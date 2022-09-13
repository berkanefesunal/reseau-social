import React from "react";
import style from "./style/all_posts.module.css";
import {
  deleteComment,
  deletePost,
  getAllPosts,
  getUserPosts,
  likePost,
  makeComment,
  editPost,
  editComment
} from "api/api";
import { FaRegUserCircle } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { UserContext } from "context/UserContext";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormControl,
  Textarea,
  Button,
} from "@chakra-ui/react";
import moment from "moment";
const AllPosts = ({ newPost, isProfile }) => {
  const { user } = React.useContext(UserContext);
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [commentValue, setCommentValue] = React.useState("");
  const [editingPost, setEditingPost] = React.useState(null);
  const [editPostContent, setEditPostContent] = React.useState("");
  const [editingComment, setEditingComment] = React.useState(null);
  const [editCommentContent, setEditCommentContent] = React.useState("");

  const getPostData = async () => {
    setLoading(true);
    try {
      const res = isProfile ? await getUserPosts(user._id) : await getAllPosts();
      if (res.status === 200) {
        setPosts(res.data.reverse());
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getPostData();
  }, [newPost]);

  const handleMention = async (postId, type) => {
    try {
      const res = await likePost(postId, type, user._id);
      if (res.status === 200) {
        getPostData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(posts);
  const handleComment = async (e, postId) => {
    e.preventDefault();
    let userData = {
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    };
    userData = JSON.stringify(userData);
    if (!commentValue) return;
    try {
      const data = {
        comment: commentValue,
        user: userData,
        postId,
      };
      const res = await makeComment(data);
      if (res.status === 200) {
        getPostData();
        console.log(res);
        setCommentValue("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      const res = await deleteComment(postId, commentId, user._id);
      if (res.status === 200) {
        getPostData();
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const res = await deletePost(postId);
      if (res.status === 200) {
        getPostData();
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditCommentButton = async (postId, commentId, content) => {
    setEditingComment(commentId);
    setEditCommentContent(content);
  };

  const handleEditComment = async (postId, commentId) => {
    try {
      const res = await editComment(postId, commentId, editCommentContent);
      if (res.status === 200) {
        getPostData();
        console.log(res);
      }
      setEditingComment(null);
      setEditCommentContent("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditPostButton = async (postId, content) => {
    setEditingPost(postId);
    setEditPostContent(content);
  };

  const handleEditPost = async (postId) => {
    try {
      const res = await editPost(postId, editPostContent);
      if (res.status === 200) {
        getPostData();
        console.log(res);
      }
      setEditingPost(null);
      setEditPostContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={style.all_posts}>
      <div className="container">
        <div className={style.all_posts_area}>
          <div className={style.all_posts_body}>
            {posts?.length > 0 ? (
              posts.map((post, index) => {
                return (
                  <div key={index} className={style.all_posts_body_item}>
                    <div className={style.all_posts_body_item_header}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-start align-items-center">
                          <FaRegUserCircle
                            className={style.all_posts_body_item_header_icon}
                          />
                          <span
                            className={style.all_posts_body_item_header_name}
                          >
                            {post.user.name} {post.user.surname.slice(0, 1)}
                          </span>
                        </div>
                        <div className="d-flex justify-content-end align-items-center">
                          {post.user._id === user._id || user.role === "admin" ? (
                            <Button
                              onClick={() => handleDeletePost(post._id)}
                              colorScheme="red"
                              size="sm"
                            >
                              Delete
                            </Button>
                          ) : (
                            ""
                          )}
                          {post.user._id === user._id || user.role === "admin" ? (
                            <Button
                              onClick={() => handleEditPostButton(post._id, post.content)}
                              colorScheme="telegram"
                              size="sm"
                            >
                              Edit
                            </Button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={style.all_posts_body_item_image}>
                      <img src={post.imageUrl} alt="" />
                    </div>
                    <div className={style.all_posts_body_item_like_dislike}>
                      <div className="d-flex justify-content-center align-items-center">
                        <div
                          onClick={() => handleMention(post._id, 1)}
                          className={`${style.like_ment} ${style.all_posts_mention}`}
                        >
                          <AiFillLike className={style.all_posts_like_icon} />
                          <span>{post.usersLiked.length}</span>
                        </div>
                        <div
                          onClick={() => handleMention(post._id, 0)}
                          className={`${style.dislike_ment} ${style.all_posts_mention}`}
                        >
                          <AiFillDislike
                            className={style.all_posts_like_icon}
                          />
                          <span>{post.usersDisliked.length}</span>
                        </div>
                      </div>
                    </div>
                    <div className={style.all_posts_body_item_content}>
                      {editingPost === post._id ? (
                        <>
                          <Textarea
                            value={editPostContent}
                            onChange={(e) => setEditPostContent(e.target.value)}
                            placeholder="Edit your post" />
                          <Button
                            onClick={() => handleEditPost(post._id)}
                            colorScheme="telegram"
                            size="sm"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => setEditingPost(null)}
                            colorScheme="red"
                            size="sm"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <p className={style.all_posts_body_item_content_text}>
                          {" "}
                          {post.content}{" "}
                        </p>
                      )}
                    </div>
                    <p className={style.all_posts_body_item_date}>
                      {moment(post.createdAt).format("MMMM Do YYYY")}
                    </p>
                    <div className={style.all_posts_body_item_comments}>
                      <span>Comments</span>
                      <div className={style.comment_area}>
                        {post.comments?.length > 0 && (
                          <div className={style.comment_area_body}>
                            {post.comments.map((comment, index) => {
                              return (
                                <div
                                  key={index}
                                  className={style.comment_area_body_item}
                                >
                                  <div className="d-flex justify-content-between algin-items-center">
                                    <div className="d-flex justify-content-start flex-column align-items-start">
                                      <div className={style.comment_area_user}>
                                        <div className="d-flex align-items-center justify-content-start">
                                          <FaRegUserCircle
                                            className={style.comment_icon}
                                          />
                                          <span className={style.user_email}>
                                            {comment.user.name} {comment.user.surname.slice(0, 1)}
                                          </span>
                                        </div>
                                      </div>
                                      <div className={style.comment_area_text}>
                                        {editingComment === comment._id ? (
                                          <>
                                            <Textarea
                                              value={editCommentContent}
                                              onChange={(e) =>
                                                setEditCommentContent(
                                                  e.target.value
                                                )
                                              }
                                              placeholder="Edit your comment"
                                            />
                                            <Button
                                              onClick={() =>
                                                handleEditComment(
                                                  post._id,
                                                  comment._id
                                                )
                                              }
                                              colorScheme="telegram"
                                              size="sm"
                                            >
                                              Save
                                            </Button>
                                            <Button
                                              onClick={() =>
                                                setEditingComment(null)
                                              }
                                              colorScheme="red"
                                              size="sm"
                                            >
                                              Cancel
                                            </Button>
                                          </>
                                        ) : (
                                          <p>{comment.content}</p>
                                        )}
                                      </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      {user._id === comment.user._id || user.role === "admin" ? (
                                        <Button
                                          onClick={() =>
                                            handleDeleteComment(
                                              post._id,
                                              comment._id
                                            )
                                          }
                                          colorScheme="red"
                                          size="sm"
                                        >
                                          Delete
                                        </Button>
                                      ) : null}
                                      {user._id === comment.user._id || user.role === "admin" ? (
                                        <Button
                                          onClick={() =>
                                            handleEditCommentButton(
                                              post._id,
                                              comment._id,
                                              comment.content
                                            )
                                          }
                                          colorScheme="telegram"
                                          size="sm"
                                        >
                                          Edit
                                        </Button>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <form onSubmitCapture={(e) => handleComment(e, post._id)}>
                        <FormControl marginY={3}>
                          <Textarea
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            background="#fff"
                            placeholder="Write a comment..."
                          />
                        </FormControl>
                        <Button
                          onSubmit={(e) => handleComment(e, post._id)}
                          type="submit"
                          colorScheme="whatsapp"
                        >
                          {" "}
                          Comment{" "}
                        </Button>
                      </form>
                    </div>
                  </div>
                );
              })
            ) : (
              <Alert
                status="warning"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  No Posts Found
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  Thanks for submitting your application. Our team will get back
                  to you soon.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllPosts;
