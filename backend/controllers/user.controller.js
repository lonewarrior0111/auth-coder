import User from "../models/User.js";

export const getUserController = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: `user not found!`,
      });
    }
    user.password = undefined;
    return res.status(200).send({
      success: true,
      message: `user found!`,
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `internal server error!`,
    });
  }
};
