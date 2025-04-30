import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not authorized, token missing or malformed' });
    }

    const dToken = authHeader.split(' ')[1];

    const tokenDecode = jwt.verify(dToken, process.env.JWT_SECRET);
    req.body.docId = tokenDecode.id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authDoctor;
