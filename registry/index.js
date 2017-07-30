const http = require('http')
const bunny = require('sign-bunny')
http.createServer((req, res) => {
  console.log(process.env)
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end(bunny('Foo'))
}).listen(process.env.PORT || 3000)