import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        
        const token = req.cookies.AccessToken || req.headers?.authorization?.split(" ")[1];
        if (!token) {
            return res.status(404).json({
                message: 'Token not found',
                error: true,
                success:false
            })
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
        if (!decode) {
            return res.status(404).json({
                message: 'Not a valid token',
                error: true,
                success:false
            })
        }

        req.userId = decode.id;
        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error:true
        })
    }
}

export default auth;