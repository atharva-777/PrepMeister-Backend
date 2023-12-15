import user from "../models/userModel";

class UserController{

}

const fetchAllUsers = async () => {
    const users = await user.find();
    return users;
};

export { fetchAllUsers };
export default UserController;