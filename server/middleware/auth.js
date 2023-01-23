import jwt from 'jsonwebtoken';

// AUTHORIZATION TO SOME ROUTES, LOGED IN USER
export const verifyToken = async (req, res, next) => {
  try {
    // we take the token from the frontend header in Authorization field
    let token = req.header('Authorization');
    if (!token) {
      return res.status(403).json('Access Denied');
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
