import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { getAdminInfo } from '../features/Admin/adminSlice';
import { setLancer } from '../features/Lancer/lancerSlice';
import { showErrorAlert } from '../features/MainAlert/mainAlertSlice';

export const useSocket = (setUpSocket = () => { }) => {
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();

    const { adminInfo } = useSelector(getAdminInfo);
    useEffect(() => {
        if (adminInfo) {
            const socket = io("http://localhost:3000", {
                extraHeaders: {
                    authorization: `Bearer ${adminInfo.token}`
                }
            });

            socket.on("connect_error", (data) =>
                dispatch(showErrorAlert(data.message)));

            socket.on("lancer", (data) =>
                dispatch(setLancer(data)));

            setUpSocket(socket);
            setSocket(socket);
            return () => socket.close();
        }

        // eslint-disable-next-line
    }, [dispatch, adminInfo]);

    return socket;
};