import io from 'socket.io-client';
import config from '../configs/network';

let socket;

export const initiateSocket = (room) => {
    socket = io(config.SERVER);
    if (socket && room) {
        console.log(`business-admin:${room}`);
        socket.emit('join-room-admin', room);
    }
}

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if(socket) socket.disconnect();
}

export const subscribeToCheckBill= (cb) => {
    if (!socket) return true;
    socket.on('onCheckBill', ({
        groupId,
        billing
    }) => {
        console.log('event received! check bill');
        return cb(null, {
            groupId,
            billing
        });
    });
}

export const subscribeToPlacedOrder = (cb) => {
    if (!socket) return true;
    socket.on('place-order', (orders) => {
        console.log('event received! place order');
        return cb(null, orders);
    });
}

export const subscribeToCancelOrder = (cb) => {
    if (!socket) return true;
    socket.on('cancel-order', (orderId) => {
        console.log('event received! cancel order');
        return cb(null, orderId);
    });
}