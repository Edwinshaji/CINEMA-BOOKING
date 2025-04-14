import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const userSignup = async (req, res) => {
    let { name, email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);

    try {
        // checking if name was entered
        if (!name) {
            return res.status(400).json({ status: false, message: "Name is Required!" })
        }
        // checking the password is good
        if (!password || password.length < 6) {
            return res.status(400).json({ status: false, message: "Password should be at least 6 characters long" })
        }
        // checking is a user already exists
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ status: false, message: "User already exists with this email" });
        }

        //if user doesnt exist create a new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save()

        return res.status(201).json({ status: true, message: "Created a new user", user: newUser })

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error })
    }

}

export const userLogin = async (req, res) => {
    let { email, password } = req.body;

    try {
        // finding user with the email
        let user = await User.findOne({ email: email })

        if (user) {
            // if user exist compare the password submitted with the password in the databse 
            if (await bcrypt.compare(password, user.password)) {
                // if user enter credentials is true create a cookie for the user
                jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
                    if (err) {
                        throw err
                    }
                    return res.cookie('token', token).json(user)
                })
            } else {
                return res.status(400).json({ status: false, message: "Incorrect Password" })
            }
        } else {
            return res.status(400).json({ status: false, message: "User doesn't exist" })
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server Error" })
    }
}

export const getProfile = () => {
    const { token } = req.cookies

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err
            return res.json(user)
        })
    } else {
        return res.json(null)
    }
}

export const editProfile = async (req, res) => {

    // fetching the data passed from front into variable
    let { name } = req.body;
    let id = req.params.id;

    try {
        // checking if name is empty
        if (!name) {
            return res.status(400).json({ status: false, message: "Name is required!" })
        }
        // updating the name
        await User.findByIdAndUpdate(id, name);
        return res.status(200).json({ status: true, message: "Name upadated successfuly" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server Error" })
    }

}

export const changePassword = async (req, res) => {

    // fetching the data passed from front into variable
    let id = req.params.id;
    let { oldPassword, newPassword } = req.body;

    try {
        // comparing the old password user enter with the current password in the databse
        let user = await User.findById(id);
        if (await bcrypt.compare(oldPassword, user.password)) {
            // updating the password
            await User.findByIdAndUpdate(id, bcrypt.hash(newPassword, 10))
            return res.status(200).json({ status: true, message: "Password updated successfuly" })
        } else {
            return res.status(400).json({ status: false, message: "Old password is incorrect" })
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server Error" })
    }

}
