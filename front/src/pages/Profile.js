import React from "react";
import { AllPosts, Header, NewPost } from "components";

const Profile = () => {
  const [newPost, setNewPost] = React.useState(false);
  return (
    <>
      <Header />
      <main
        // style={{
        //   background: `url("https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80")`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   backgroundRepeat: "no-repeat",
        //   height: "100%",
        // }}
      >
        <NewPost setNewPost={setNewPost} newPost={newPost} />
        {/* <AllPosts newPost={newPost} isProfile={true} /> */}
      </main>
    </>
  );
};

export default Profile;
