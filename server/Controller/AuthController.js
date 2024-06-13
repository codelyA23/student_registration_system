// const jwt = require("jsonwebtoken");
// const crypto = require("crypto")
// const config = require("../DatabaseConfig/config.js");

// const User = require("../model/UserModel.js");
// const bcrypt = require("bcrypt");
// const twoMinutesInMilliseconds = 40 * 60 * 1000;

//   const generateAccessToken = (user) => {
//     return jwt.sign({ id: user.id, role: user.role }, config.secret, {
//       algorithm: 'HS256',
//       expiresIn: '40m',
//     });
//   };
  
//   const generateRefreshToken = () => {
//     return jwt.sign({}, config.secret, {
//       algorithm: 'HS256',
//       expiresIn: '40m',
//     });
//   };

  
//   const setRefreshTokenCookie = (res, refreshToken) => {
//     res.cookie('refreshToken', refreshToken, {
//       httpOnly: true,
//       sameSite: 'strict',
//       secure: true,
//       expires: new Date(Date.now() + twoMinutesInMilliseconds),
//     });
//   };
  
  

//   const Login = async (req, res) => {
//     try {
//       const userEmail = req.body.userEmail;

//       if (!userEmail) {
//         console.error("Email address is missing");
//         return res.status(400).json({ msg: "Email address is missing" });
//       }

//       const user = await User.findOne({
//         where: {
//           userEmail: userEmail
//         }
//       });

//       if (!user) {
//         console.error("User not found");
//         return res.status(404).json({ msg: "User not found" });
//       }

//       if (!user.Active) {
//         console.error("User account is disabled");
//         return res.status(401).json({
//           msg: "Your account is disabled. Please contact your administrator."
//         });
//       }

//       const compareUserPassword = await bcrypt.compare(
//         req.body.userPassword,
//         user.userPassword
//       );

//       if (!compareUserPassword) {
//         console.error("Wrong Password");
//         return res.status(400).json({ msg: "Wrong Password" });
//       }

//       const token = generateAccessToken(user);
//       const refreshToken = generateRefreshToken();

//       setRefreshTokenCookie(res, refreshToken);

//       console.log("Login successful");
//       res.status(200).json({
//         accessToken: token
//       });
//     } catch (error) {
//       console.error("Internal Server Error:", error);
//       res.status(500).json({ msg: "Internal Server Error" });
//     }
//   };


 
// const Me = async (req, res) => {
//   const token = req.header('Authorization');

//   if (!token) {
//     const refreshToken = req.cookies.refreshToken;

//     if (!refreshToken) {
//       return res.status(401).json({ msg: 'Unauthorized: No token provided' });
//     }

//     jwt.verify(refreshToken, config.secret, async (err, user) => {
//       if (err) {
//         return res.status(403).json({ msg: 'Unauthorized: Invalid refresh token' });
//       }

//       // If the refresh token is valid, generate a new access token
//       const newAccessToken = generateAccessToken(user);

//       try {
//         const refreshedUser = await User.findOne({
//           attributes: ['userName', 'userEmail', 'userPhone', 'id', 'role'],
//           where: {
//             id: user.id,
//           },
//         });

//         if (!refreshedUser) {
//           return res.status(404).json({ msg: 'User not found' });
//         }

//         res.status(200).json({
//           refreshedUser,
//           newAccessToken
//         });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ msg: 'Internal Server Error' });
//       }
//     });
//   } else if (!token.startsWith('Bearer ')) {
//     return res.status(401).json({ msg: 'Invalid token format' });
//   } else {
//     const actualToken = token.slice(7);

//     try {
//       const decoded = jwt.verify(actualToken, config.secret);

//       if (decoded && decoded.id) {
//         const user = await User.findOne({
//           attributes: ['userName', 'userEmail', 'userPhone', 'id', 'role'],
//           where: {
//             id: decoded.id,
//           },
//         });

//         if (!user) {
//           return res.status(404).json({ msg: 'User not found' });
//         }

//         res.status(200).json(user);
//       } else {
//         res.status(401).json({ msg: 'No valid credential' });
//       }
//     } catch (error) {
//       if (error.name === 'TokenExpiredError') {
//         res.status(401).json({ msg: 'Please login again' });
//       } else if (error.name === 'JsonWebTokenError') {
//         res.status(401).json({ msg: 'Unauthorized: Invalid token format' });
//       } else {
//         console.error(error);

//         // Send a generic internal server error message to the client
//         res.status(500).json({ msg: 'Internal Server Error' });
//       }
//     }
//   }
// };



// const logOut = (req, res) => {
//   req.session.destroy((err) => {
//     if (err) return res.status(400).json({ msg: "Can't log out" });
//     res.status(200).json({ msg: "You have logged out" });
//   });
// };

// module.exports = {
//   Login,
//   Me,
//   logOut,
// };

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/UserModel.js");
const config = require("../DatabaseConfig/config.js");
const twoMinutesInMilliseconds = 40 * 60 * 1000;

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.user_id, role: user.role }, config.secret, {
    algorithm: 'HS256',
    expiresIn: '40m',
  });
};

const generateRefreshToken = () => {
  return jwt.sign({}, config.secret, {
    algorithm: 'HS256',
    expiresIn: '40m',
  });
};

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    expires: new Date(Date.now() + twoMinutesInMilliseconds),
  });
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!user.Active) {
      return res.status(401).json({
        msg: "Your account is disabled. Please contact your administrator."
      });
    }

    const compareUserPassword = await bcrypt.compare(password, user.password);

    if (!compareUserPassword) {
      return res.status(400).json({ msg: "Wrong Password" });
    }

    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken();

    setRefreshTokenCookie(res, refreshToken);

    res.status(200).json({ accessToken: token });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const Me = async (req, res) => {
  const token = req.header('Authorization');

  if (!token) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ msg: 'Unauthorized: No token provided' });
    }

    jwt.verify(refreshToken, config.secret, async (err, user) => {
      if (err) {
        return res.status(403).json({ msg: 'Unauthorized: Invalid refresh token' });
      }

      const newAccessToken = generateAccessToken(user);

      try {
        const refreshedUser = await User.findOne({
          attributes: ['username', 'email', 'user_id', 'role'],
          where: { user_id: user.id },
        });

        if (!refreshedUser) {
          return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ refreshedUser, newAccessToken });
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
      }
    });
  } else if (!token.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Invalid token format' });
  } else {
    const actualToken = token.slice(7);

    try {
      const decoded = jwt.verify(actualToken, config.secret);

      if (decoded && decoded.id) {
        const user = await User.findOne({
          attributes: ['username', 'email', 'user_id', 'role'],
          where: { user_id: decoded.id },
        });

        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json(user);
      } else {
        res.status(401).json({ msg: 'No valid credential' });
      }
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        res.status(401).json({ msg: 'Please login again' });
      } else if (error.name === 'JsonWebTokenError') {
        res.status(401).json({ msg: 'Unauthorized: Invalid token format' });
      } else {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
      }
    }
  }
};

const logOut = (req, res) => {
  res.clearCookie('refreshToken');
  res.status(200).json({ msg: "You have logged out" });
};

module.exports = {
  Login,
  Me,
  logOut,
};
