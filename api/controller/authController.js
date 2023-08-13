const pool = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const { username, email, img, pwd } = req.body;

  // Check if other users with similar username or email exist

  pool.query(
    "SELECT * FROM users WHERE username = $1 OR email = $2",
    [username, email],
    (error, results) => {
      if (error) return res.status(500).json(error);
      if (results.rows.length)
        return res.status(409).json("User already exist");

      const salt = bcrypt.genSaltSync(10);
      const hashedPwd = bcrypt.hashSync(pwd, salt);

      pool.query(
        "INSERT INTO users (username, email, img, pwd) VALUES ($1, $2, $3, $4)",
        [username, email, img, hashedPwd],
        (error, results) => {
          if (error) return res.status(500).json(error);
          return res.status(200).json({message: "User has been created", result: results.rows});
        }
      );
    }
  );
};

const login = (req, res) => {
  const { email, pwd } = req.body;

  pool.query(
    "SELECT * FROM users WHERE users.email = $1",
    [email],
    (error, results) => {
      if (error) return res.status(500).json(error);
      if (!results.rows.length) return res.status(404).json("User not found");

      const data = results.rows[0];
      const pwdIsCorrect = bcrypt.compareSync(pwd, data.pwd);
      if (!pwdIsCorrect) return res.status(400).json("Wrong password");

      const accessToken = jwt.sign({ id: data.user_id }, process.env.AUTH_TOKEN, {
        expiresIn: "10s",
      });
      const refreshToken = jwt.sign({id: data.user_id }, process.env.AUTH_REFRESH, {
        expiresIn: "1h",
      });
      refreshTokens.push(refreshToken);

      res.status(200).json({message: "User has been logged in", result: results.rows, accessToken: accessToken, refreshToken: refreshToken });
    }
  );
};


let refreshTokens = [];

const refresh = (req, res) => {
  const refreshToken = req.body.token;
  
  if(!refreshToken) return res.status(401).json({message: "You are not authenticated"});
  if(!refreshTokens.includes(refreshToken)) return res.status(403).json({message: "Token is not valid"});
  
  jwt.verify(refreshToken, process.env.AUTH_REFRESH, (err, decodedUser) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    const newAccessToken = jwt.sign({id: decodedUser._id}, process.env.AUTH_TOKEN);
    const newRefreshToken = jwt.sign({id: decodedUser._id}, process.env.AUTH_REFRESH);
    refreshTokens.push(newRefreshToken);
    
    return res.status(200).json({refreshToken: newRefreshToken, accessToken: newAccessToken});
  });
};

const logout = (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !==refreshToken);
  return res.status(200).json({message: "You have logged out"});
};

const getUsers = (req, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json(results.rows);
  });
};

module.exports = {
  register,
  login,
  getUsers,
  logout,
  refresh
};
