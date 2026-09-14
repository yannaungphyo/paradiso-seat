const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // ဖုန်းတစ်လုံးက ခုံရွေးလိုက်ရင် ကျန်တဲ့ဖုန်းတွေကိုပါ ပို့ပေးဖို့
  socket.on('seatSelected', (data) => {
    socket.broadcast.emit('seatUpdated', data);
  });

  // အားလုံး Reset လုပ်တဲ့အခါ
  socket.on('resetAllSeats', () => {
    socket.broadcast.emit('allSeatsReset');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
