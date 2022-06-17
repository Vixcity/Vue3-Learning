import jwt from 'jsonwebtoken';
const jwtKey = 'jindu'

export const getUserInfo = (token) => {
    return jwt.decode(token, jwtKey) // 服务器去编码 jwt.encode(userinfo.jwtKey) => token
}

export const checkLogin = () => {
    // 通过token 检查是否登录
    // getUserInfo 如果没有 token 那么返回 null
    return !!getUserInfo(window.sessionStorage.getItem('token'))
}