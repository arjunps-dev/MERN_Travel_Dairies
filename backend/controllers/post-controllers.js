import Post from "../models/Post";

//get all posts

export const getAllPosts = async (req, res) => {
  let posts;
  try {
    posts = await Post.find();
  } catch (err) {
    return console.log(err);
  }
  if (!posts) {
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }
  return res.status(200).json({ posts });
};

//add post

export const addPost = async (req, res) => {
  const { title, description, location, date, image, user } = req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !location &&
    location.trim() === "" &&
    !date &&
    !image &&
    image.trim() === "" &&
    !user &&
    user.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }
  let post;
  try {
    post = new Post({
      title,
      description,
      location,
      date: new Date(`${date}`),
      image,
      user,
    });
   post = await post.save();
  } catch (err) {
    return console.log(err);
  }
    if (!post) {
        return res.status(500).json({ message: "Unexpected Error Occurred" });
    }
    return res.status(201).json({ post });
};
