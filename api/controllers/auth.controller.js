import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
  // console.log(req.body)
  const { username, email, password } = req.body

  if (!username || !email || !password || username === '' || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'))
  }

  const hashedPassword = bcryptjs.hashSync(password, 10)

  const newUser = new User({
    username,
    email,
    password: hashedPassword
  })

  try {
    await newUser.save()
    res.json({ message: 'Signup successfull' })
  } catch (error) {
   next(error)
  }

}

export const signin = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'))
  }

  try {
    const validUser = await User.findOne({ email })
    if (!validUser) {
      return next(errorHandler(404, 'User not found'))
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'))
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET) // can add expires in: otherwise it'll just be valid for a session

    // remove password and then send user back, have to change password name
    const { password: pass, ...rest } = validUser._doc


    res.status(200).cookie('access_token', token, {
      httpOnly: true // makes cookies secure
    }).json(rest) // sending back user for redux state
  } catch (error) {
    next(error)
  }
}

// export const google = async (req, res, next) => {
//   const { email, name, googlePhotoUrl } = req.body

//   try {
//     const user = await User.findOne({email})

//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       const { password, ...rest } = user._doc;
//       res
//         .status(200)
//         .cookie('access_token', token, {
//           httpOnly: true,
//         })
//         .json(rest);
//     } else {                    //    converts number to letter and numbers, 36 = numbers from 0-9 and letters from a-z. .slice(-8) gets the last letters and numbers
//       const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)  // now its 16
//       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)

//       const newUser = newUser({
//         username: name.toLowerCase().split('').join('') + Math.random().toString(9).slice(-4),
//         //  Lexi Sanders -> lexisanders3948                     only random numbers      gets the last 4
//         email,
//         password: hashedPassword,
//         profilePicture: googlePhotoUrl
//       })

//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
//       const { password, ...rest } = newUser._doc;
//       res
//         .status(200)
//         .cookie('access_token', token, {
//           httpOnly: true,
//         })
//         .json(rest);
//     }

//   } catch (error) {
//     next(error)
//   }
// }

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
