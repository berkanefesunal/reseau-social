import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import React from "react";
import style from "./style/new_post.module.css";
import { useToast } from "@chakra-ui/react";
import { createPost } from "api/api";
import { UserContext } from "context/UserContext";
const NewPost = ({setNewPost,newPost}) => {
  const { user } = React.useContext(UserContext);
  const [image, setImage] = React.useState(null);
  const [imageFile, setImageFile] = React.useState(null);
  const [content, setContent] = React.useState("");
  const toast = useToast();
  const imgFilehandler = (e) => {
    if (e.target.files.length !== 0) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   /* if (!imageFile) {
      return toast({
        status: "error",
        title: "Error",
        description: "Please select an image",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
    */

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("content", content);
    formData.append("user", JSON.stringify(user));
    try {
      const res = await createPost(formData);
      console.log(res);
      if (res.status === 200) {
        toast({
          status: "success",
          title: "Success",
          description: "Post created successfully",
          duration: 9000,
          isClosable: true,
          position: "top",
        });

        setImage(null);
        setImageFile(null);
        setContent("");
        setNewPost(!newPost);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={style.new_post}>
      <div className="container">
        <div className={style.new_post_area}>
          <div className={style.new_post_body}>
            <div className={style.new_post_body_title}>
              <h1>New Post</h1>
            </div>
            <div className={style.new_post_body_form}>
              <form onSubmitCapture={handleSubmit}>
                <FormControl marginY={5}>
                  <FormLabel htmlFor="title">Description</FormLabel>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    id="title"
                    name="title"
                    placeholder="Write something..."
                  />
                </FormControl>
                {image && (
                  <div className={style.uploaded_img}>
                    <img src={image} alt="upload" className="img-fluid" />
                  </div>
                )}
                <div className="d-flex justify-content-between algin-items-center">
                  <input
                    onChange={imgFilehandler}
                    type="file"
                    name="file"
                    id="file"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                  <button
                    onSubmit={handleSubmit}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Share Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewPost;
