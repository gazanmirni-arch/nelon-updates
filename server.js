const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {

  // Отдаём version.json
  if (req.url === '/version.json') {
    const filePath = path.join(__dirname, 'version.json');
    if (!fs.existsSync(filePath)) {
      res.writeHead(404); res.end('version.json not found'); return;
    }
    const data = fs.readFileSync(filePath);
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(data);

  // Отдаём NelonVisuals.jar
  } else if (req.url === '/NelonVisuals.jar') {
    const filePath = path.join(__dirname, 'NelonVisuals.jar');
    if (!fs.existsSync(filePath)) {
      res.writeHead(404); res.end('NelonVisuals.jar not found'); return;
    }
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      'Content-Type': 'application/java-archive',
      'Content-Length': stat.size,
      'Access-Control-Allow-Origin': '*',
    });
    fs.createReadStream(filePath).pipe(res);

  } else {
    res.writeHead(200); res.end('Nelon Update Server');
  }

}).listen(PORT, () => {
  console.log('Nelon update server running on port ' + PORT);
});
