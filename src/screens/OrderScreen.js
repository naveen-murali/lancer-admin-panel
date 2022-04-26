import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Container, Table, Row, Col, Badge } from 'react-bootstrap';

import {
    Meta,
    Message,
    Paginate,
    Price,
    GoBack,
} from '../components';
import { getOrders } from '../features/Orders/ordersSlice';
import { getAsyncOrders } from '../features/Orders/orderAction';

const OrderScreen = () => {
    const dispatch = useDispatch();

    const { status, pageNumber = 1 } = useParams();
    const { orders, page, pages, error, loading } = useSelector(getOrders);

    useEffect(() => {
        dispatch(getAsyncOrders({ status, page: pageNumber }));
    }, [dispatch, status, pageNumber]);

    return (
        <>
            <GoBack fluid />
            <Container fluid>
                <div className="bg-white p-3 rounded-2 shadow">
                    <div className="col-12 conainer-fluid">
                        <Row className='gy-2'>
                            <Col lg={4} xs={12} className='d-flex align-items-center'>
                                <h3 className='letter-spacing-1 m-0' style={{ fontSize: '24px' }}>
                                    Orders
                                    <sup
                                        className="letter-spacing-0"
                                        style={{
                                            fontSize: "16px",
                                            textTransform: "capitalize"
                                        }}>
                                        <Badge pill bg={
                                            (status === "completed" && "success") ||
                                            (status === "ongoing" && "warning") ||
                                            (status === "cancelled" && "danger")
                                        }>
                                            {status}
                                        </Badge>
                                    </sup>
                                </h3>
                            </Col>
                        </Row>
                    </div>

                    {loading
                        ? <Meta title='Loading... | Lancer' />
                        : error
                            ? <Meta title='Error | Lancer' />
                            : <Meta title={`${status.toUpperCase()} orders | Lancer`} />}

                    <Table bordered hover responsive
                        className='table-sm m-0 mt-3'>
                        <thead>
                            <tr className="table-active border">
                                <th>ID</th>
                                <th>SERVICE</th>
                                <th>PACKAGE</th>
                                <th>PRICE</th>
                                <th><span style={{ whiteSpace: 'nowrap' }}>CREATED AT</span></th>
                                <th><span style={{ whiteSpace: 'nowrap' }}>UPDATED AT</span></th>
                                <th><span style={{ whiteSpace: 'nowrap' }}>PAIED AT</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {error
                                ? <tr>
                                    <td colSpan={7} className='p-0 mt-0'>
                                        <Message variant='danger' className='my-1'>{error}</Message>
                                    </td>
                                </tr>
                                : !loading && !orders.length
                                    ? <tr>
                                        <td colSpan={7} className='p-0 mt-0'>
                                            <Message variant='danger' className='my-1'>no orders exists</Message>
                                        </td>
                                    </tr>
                                    : orders?.map(order => (
                                        <tr key={order._id} style={{ verticalAlign: 'center !important' }}>
                                            <td>{order._id}</td>
                                            <td>
                                                <Link to={`/services/${order.service}`}>
                                                    {order.service}
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to={`/services/${order.service}`}>
                                                    <span
                                                        style={{ textTransform: "capitalize" }}
                                                        className='letter-spacing-0'>
                                                        {order.package}
                                                    </span>
                                                </Link>
                                            </td>
                                            <td>
                                                <span style={{ whiteSpace: 'nowrap' }}>
                                                    <Price price={order.price} />
                                                </span>
                                            </td>
                                            <td>
                                                <span style={{ whiteSpace: 'nowrap' }}>
                                                    {moment(order.createdAt).format("Do MMM, YYYY")}
                                                </span>
                                            </td>
                                            <td>
                                                <span style={{ whiteSpace: 'nowrap' }}>
                                                    {moment(order.createdAt).format("Do MMM, YYYY")}
                                                </span>
                                            </td>
                                            <td>
                                                <span style={{ whiteSpace: 'nowrap' }}>
                                                    {moment(order.paymentDetails.createdAt).format("Do MMM, YYYY")}
                                                </span>
                                            </td>
                                        </tr>))}
                        </tbody>
                    </Table>
                    <Col
                        xs={12}
                        style={{ height: 'fit-content !important' }}
                        className='d-flex justify-content-end mt-3'>
                        <Paginate
                            page={page}
                            pages={pages}
                            path={status
                                ? `/orders/${status}`
                                : '/orders'} />
                    </Col>
                </div>
            </Container>
        </>
    );
};

export default OrderScreen;