const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
	// Формат ІПН - 10 цифр
	const IDcheck = new RegExp(/^\d{10}$/);
	// Якщо відповідає формату, повертаємо (рандомізовану) суму запобітків
    if(IDcheck.test(msg)) { io.emit('chat message', 'Заробітня плата: '+Math.round(20000*Math.random())) }
	// Якщо ні, повертаємо помилку
	else { io.emit('chat message', 'Помилка при введенні ІПН'); }
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
