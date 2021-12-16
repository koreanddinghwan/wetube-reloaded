const Join = (req, res) => res.send("Join here");
const EditUser = (req, res) => res.send("Edit user");
const DeleteUser = (req, res) => res.send("Delete user");
const Login = (req, res) => res.send("Login");
const Logout = (req, res) => res.send("Logout");

const See = (req, res) => res.send("See");

export { EditUser, DeleteUser, Join, Login, See, Logout };
