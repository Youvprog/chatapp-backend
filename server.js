const express = require('express');
const http = require('http');
const { Server } = require('socket.io')


const app = express();
const server = http.createServer(app);
const io = new Server(server)



io.on('connection', socket => {
    const id = socket.handshake.query.id
    console.log('connected with id', id)
    socket.join(id)
    socket.on('send-message', (message, contacts, id) => {
        contacts.forEach(contact => {
            socket.broadcast.to(contact.id)
                            .emit('receive-message', message, id, contacts )
            console.log('message sent to', contact)
        });
        
    })
})


// ------------- training purpose --------------
// io.on('connection', (socket) => {
//     console.log(`socket with id ${socket.id} is connected`)
//     socket.on('message-sent', (message, room) => {
//         if (!room) {
//             socket.broadcast.emit('receive-msg', message)
//             console.log('message set public', room)
//         } else {
//             socket.to(room).emit('receive-msg', message)
//             console.log('message set private', room)
//         }
//     })
//     socket.on('join-room', (room, callback) => {
//         socket.join(room)
//         callback(`Joined ${room}`)
//     })
//})



server.listen(3000, () => {
    console.log("server running on port 3000")
})
