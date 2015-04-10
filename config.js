module.exports = {
    memory_mongo: {
        url: "mongodb://127.0.0.1:27017/memory"
    },
    qiniu:{
        'ACCESS_KEY': 'AestgCdKPJJe6nIQpsPel7Ob3irbmErgqMGWSh0D',
        'SECRET_KEY': '1EMlBa93y4RrJU97m-10ol1PLbut5XrdhFcq47Wh',
        'Uptoken_Url': '/uptoken',
        'Domain': 'http://7xii35.com1.z0.glb.clouddn.com'
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        db: 5,
    },
    express: {
        port: 3006,
        env: 'development',
        // env: 'production',
        access_path: '/logs/access.log',
        error_path: '/logs/error.log'
    },
    appName: 'station',
};
