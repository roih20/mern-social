import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodeData;

        if(token && isCustomAuth){
            decodeData = jwt.verify(token, process.env.SECRET_WORD)
            
            req.username = decodeData?.username;
            req.name = decodeData?.name;
           

        }else {
            decodeData = jwt.decode(token)
            req.username = decodeData?.sub
        }

        next();
    } catch (error) {
        console.log(error);
    }
}


export default auth;