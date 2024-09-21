const express = require('express');
const bodyParser = require('body-parser');
// const multipart = require('connect-multiparty')
const authRoutes = require('./routes/auth');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// 使用 CORS
// app.use(cors());

// 解析 JSON 请求体
// app.use(express.json());
app.use(bodyParser.json())
// 解析 URL 编码的请求体
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(multipart())
app.use('/api/auth', authRoutes);
// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器正在运行，地址：http://localhost:${PORT}`);
});
