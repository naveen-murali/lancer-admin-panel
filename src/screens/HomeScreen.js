import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, IconCard, Icons, DoughnutChart, Price } from '../components';
import { getLancer } from '../features/Lancer/lancerSlice';
import { getTotalCount, setTotalCount } from '../features/TotalCounts/totalCountsSlice';
import { getAsyncCounts } from '../features/TotalCounts/totalCountAction';

const HomeScreen = ({ socket }) => {
    const dispatch = useDispatch();
    const { wallet } = useSelector(getLancer);
    const {
        totalUsers,
        totalOrders,
        totalService,
        totalChat,
    } = useSelector(getTotalCount);

    useEffect(() => {
        dispatch(getAsyncCounts());
    }, [dispatch]);

    useEffect(() => {
        if (socket)
            socket.on("new_count", (data) => {
                dispatch(setTotalCount(data));
            });

        return () => {
            if (socket)
                socket.removeListener("new_count");
        };
    }, [dispatch, socket]);

    return (
        <>
            <Container fluid>
                <Row className='gap-2 gy-3 p-md-3 p-0 m-0 justify-content-evenly align-items-center'>
                    <Col xl={7} lg={6} className="h-100">
                        <Row className='gap-3 h-100 justify-content-evenly align-items-center'>
                            <Col className="bg-white p-3 rounded-2 shadow"
                                style={{ minWidth: "12rem !important" }}>
                                <IconCard
                                    title="total users"
                                    value={totalUsers}
                                    path="/users"
                                    icon={Icons.totalUser} />
                            </Col>

                            <Col className="bg-white p-3 rounded-2 shadow"
                                style={{ minWidth: "fit-content !important" }}>
                                <IconCard
                                    title="total orders"
                                    value={totalOrders}
                                    path="/orders/completed"
                                    icon={Icons.totalOrders} />
                            </Col>
                            <Col className="bg-white p-3 rounded-2 shadow"
                                style={{ minWidth: "fit-content !important" }}>
                                <IconCard
                                    title="total services"
                                    value={totalService}
                                    path="/services"
                                    icon={Icons.totalService} />
                            </Col>
                            <Col className="bg-white p-3 rounded-2 shadow"
                                style={{ minWidth: "fit-content !important" }}>
                                <IconCard
                                    title="chats"
                                    value={totalChat}
                                    icon={Icons.chat} />
                            </Col>
                            <Col className="bg-white p-3 rounded-2 shadow"
                                style={{ minWidth: "fit-content !important" }}>
                                <IconCard
                                    title="wallet"
                                    value={<Price price={wallet} />}
                                    icon={Icons.wallet} />
                            </Col>
                        </Row>
                    </Col>

                    <Col xl={3} lg={5}
                        style={{ height: "fit-content" }}
                        className="bg-white p-3 rounded-2 shadow">
                        <DoughnutChart />
                    </Col>


                    <Col lg={11}
                        className="bg-white p-3 rounded-2 shadow d-none d-md-block">
                        <BarChart />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default HomeScreen;

