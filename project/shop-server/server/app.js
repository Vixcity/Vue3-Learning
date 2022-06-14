let express = require('express')
let app = express()
const jwt = require('jsonwebtoken')
let request = require('request')
const menus = require('./menus')
app.get('/', (req, res) => {
    res.send('hello')
})

app.post('/login', (req, res) => {
    let data = ''
    req.on('data', (chunk) => {
        data += chunk
    })

    req.on('end', () => {
        data = decodeURI(data)
        data = JSON.parse(data);
        if (!data.username || !data.password) {
            return res.send({ code: 403, message: '必须传递用户名密码' })
        }  else if(data.username !== 'admin' || data.password !== '123456') {
            return res.send({ code: 403, message: '用户名或密码不正确' })
        }
        let msg = 'jindu'
        let token = jwt.sign(data, msg)

        res.send({ code: 200, message: '登录成功', token: token })
    })

})
app.get('/admin', (req, res) => {
    res.send({ code: 401, message: '无权访问'})
})


app.get('/menus/build', (req, res) => {
    res.json(menus)
})

app.listen(3000, () => {
    console.log('app start port 3000...')
})

