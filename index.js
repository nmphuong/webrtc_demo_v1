const io = require('socket.io')(3000);
const arrUserInfo = [];
io.on('connection', socket => {
    socket.on('Nguoi_dung_dang_ki', user => {
        const isExist = arrUserInfo.some(e => e.ten === user.ten);
        socket.peerId = user.peerId;
        if(isExist){
            return socket.emit('Dang_ki_that_bai');
        }

        arrUserInfo.push(user);
        socket.emit('Danh_sach_online', arrUserInfo);
        socket.broadcast.emit('Co_nguoi_dung_moi', user);
    });

    socket.on('disconnect', () => {
        const index = arrUserInfo.findIndex(user => user.peerId === socket.peerId);
        arrUserInfo.splice(index, 1);
        io.emit('ngat_ket_noi', socket.peerId);
    });
});