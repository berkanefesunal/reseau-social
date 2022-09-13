import axios from "axios";

// AUTH API'S

axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);

    const allowedOrigins = [process.env.REACT_APP_ENDPOINT];

    const token = localStorage.getItem("access-token");
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const userLogin = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_ENDPOINT}/auth/login`,
    data
  );
  return response;
};

export const userRegister = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_ENDPOINT}/auth/register`,
    data
  );
  return response;
};

export const userLogout = async () => {
  const token = localStorage.getItem("refresh-token");
  const response = await axios.post(
    `${process.env.REACT_APP_ENDPOINT}/auth/logout`,
    {
      refresh_token: token,
    }
  );
  return response;
};
export const userInfo = async () => {
  const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/auth/me`);

  return response;
};

// POST API'S

export const createPost = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_ENDPOINT}/post/new_post`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const getAllPosts = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_ENDPOINT}/post/posts`
  );
  return response;
};

export const getUserPosts = async (userId) => {
  // let userId = localStorage.getItem("userId");
  const response = await axios.get(
    `${process.env.REACT_APP_ENDPOINT}/post/posts/${userId}`
  );
  return response;
};

export const likePost = async (postId, status, id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_ENDPOINT}/post/${postId}/like`,
    {
      likeData: status,
      userId: id,
    }
  );
  return response;
};

export const deletePost = async (postId) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_ENDPOINT}/post/${postId}`
  );
  return response;
}

export const editPost = async (postId, content) => {
  const response = await axios.put(
    `${process.env.REACT_APP_ENDPOINT}/post/${postId}`,
    {
      content: content,
    }
  );
  return response;
};

export const editComment = async (postId, commentId, content) => {
  const response = await axios.put(
    `${process.env.REACT_APP_ENDPOINT}/post/${postId}/comment/${commentId}`,
    {
      content: content,
    }
  );
  return response;
};

export const makeComment = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_ENDPOINT}/post/${data.postId}/comment`,
    {
      content: data.comment,
      user: data.user,
    }
  );
  return response;
};

export const deleteComment = async (postId, commentId, userId) => {

  const response = await axios.delete(
    `${process.env.REACT_APP_ENDPOINT}/post/${postId}/comment/${commentId}/user/${userId}`
  );
  return response;
};
