var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
    res.render('chat')
})


module.exports = function (io) {
    //Socket.IO
    var Users=[]
    io.on('connection', function (socket) {
        var user = {};
        console.log('User has connected to Index');
        //EVENT JOIN A ROOM
        socket.on('joinRoom', function (msg) {
            user = msg;
            Users.push(msg);
            socket.join(msg.room)
            socket.emit('message', `<div style="color:red">Welcome to ${msg.room} Room</div>`);
            socket.broadcast
                .to(msg.room)
                .emit('message', `<div style="color:blue">${msg.name} has joined the Room</div>`)
            io
                .to(msg.room)
                .emit('roomUser',{Arr:Users})
        });

        // EVENT SENT RECEIVED MESSAGE
        socket.on('sendMessage', function(msg) {
            socket.to(user.room).emit('message', msg);
          });

        //EVENT LEAVE A ROOM 
        socket.on('leaveRoom', function (msg) {
            var indexLeave = Users.findIndex((item) => item.name === msg.name);
            Users.splice(indexLeave, 1);
            io.to(msg.room).emit('roomUser', {Arr: Users});
            socket.broadcast.to(msg.room).emit('message', `<div style="color:green">${msg.name} has left the Room</div>`);
            socket.leave(msg.room);
        })

        //End ON Events
    });
    return router;
};