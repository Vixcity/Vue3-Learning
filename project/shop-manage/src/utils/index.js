import jwt from 'jsonwebtoken';
const jwtKey = 'jindu'

export const getUserInfo = (token) => {
    return jwt.decode(token, jwtKey) // 服务器去编码 jwt.encode(userinfo.jwtKey) => token
}