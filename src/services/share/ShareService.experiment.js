global.Mep = require('../../Mep');

const ShareService = require('./ShareService');


let share = new ShareService();

share.init({
    position: false,
    ip: '192.168.12.221'
});

share.on('packet', (packet) => {
    console.log(packet);
});

// should wait until init has been done before sending/receiving packets
setInterval(() => {
    share.send('asdasd_' + (new Date()).toDateString());
    console.log('sent');
}, 1000);
