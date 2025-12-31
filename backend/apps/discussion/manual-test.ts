import { io } from 'socket.io-client';

const socket = io('http://localhost:3005', {
  auth: {
    token: 'YOUR_JWT_TOKEN',
  },
});

socket.on('connect', () => {
  console.log('Connected', socket.id);
  socket.emit('joinDiscussion', { discussionId: 1 });
});

socket.on('newMessage', (msg) => {
  console.log('New Message:', msg);
});

socket.on('userJoined', (data) => {
  console.log('User Joined:', data);
});

socket.on('disconnect', () => {
  console.log('Disconnected');
});
