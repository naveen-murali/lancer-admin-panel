import moment from 'moment';
import React, { useEffect } from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { Avatar, Skeleton } from '@mui/material';
import { Badge, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { GoBack, Message, Meta, Paginate, Price } from '../components';
import { getAsyncUserDetails, getAsyncUserOrders } from '../features/Users/usersActions';
import { getUserDetails, getUserOrders, resetUserDetailsAndOrders } from '../features/Users/usersSlice';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

const UserDetailsScreen = () => {
    const dispatch = useDispatch();
    const { id, pageNumber } = useParams();
    const { user, loading, error } = useSelector(getUserDetails);
    const { orders, loading: orderLoading, error: orderError, page = 1, pages } = useSelector(getUserOrders);

    useEffect(() => {
        dispatch(getAsyncUserDetails(id));
        dispatch(getAsyncUserOrders({ id, }));

        return () => dispatch(resetUserDetailsAndOrders());
    }, [dispatch, id]);

    useEffect(() => {
        pageNumber && dispatch(getAsyncUserOrders({
            id,
            searchContent: {
                page: pageNumber
            }
        }));

        // eslint-disable-next-line
    }, [pageNumber, dispatch]);

    if (!user || loading)
        return <h1>Loading...</h1>;

    return (
        <>
            {error
                ? <Meta title='Error | Lancer' />
                : <Meta title={`${user.name} | Lancer`} />
            }
            <GoBack fluid />
            <Container fluid className="mt-2">
                <Row className='gy-2 justify-content-center px-md-5'>
                    <Col xl={3} md={6} xs={12} className="p-0">
                        <Col md={11} xs={12} className='d-flex flex-column align-items-center bg-white p-3 rounded-2 shadow'>

                            {
                                loading
                                    ?
                                    <InfoLoading />
                                    : (
                                        <>
                                            <h4 className='align-self-start letter-spacing-1 m-0 mb-2' style={{ fontSize: '24px' }}>
                                                User Details
                                            </h4>
                                            {(user && user.image)
                                                ? <Avatar sx={{ height: '70px', width: '70px' }} src={user.image.url} imgProps={{ referrerPolicy: "no-referrer" }} className='m-0' />
                                                : <Avatar sx={{ height: '70px', width: '70px' }} className='shadow m-0'>{user.name.substring(0, 1).toUpperCase()}</Avatar>}

                                            <Col xs={12} className='d-flex flex-column mt-3 justify-content-center' >
                                                <p className='p-0 m-0 text-center'>
                                                    {user.name}
                                                </p>
                                                <p className='p-0 m-0 text-center mt-1'>
                                                    <a href={`mainto:${user.email}`}>
                                                        {user.email}
                                                        {user.isEmailVarified &&
                                                            <sup
                                                                style={{
                                                                    cursor: "pointer"
                                                                }}
                                                                className='text-info mx-1'
                                                                title="Email Verified">
                                                                <svg height="20" width="20" fill="#0dcaf0"><path d="M7.167 18.75 5.583 16.083 2.562 15.417 2.875 12.333 0.833 10 2.875 7.667 2.562 4.583 5.583 3.917 7.167 1.25 10 2.458 12.833 1.25 14.417 3.917 17.438 4.583 17.146 7.667 19.167 10 17.146 12.333 17.438 15.417 14.417 16.083 12.833 18.75 10 17.542ZM10 10ZM9.146 13 13.875 8.271 12.646 7.021 9.146 10.542 7.354 8.771 6.125 10ZM7.896 16.521 10 15.604 12.146 16.521 13.292 14.562 15.542 14 15.354 11.729 16.875 10 15.354 8.229 15.542 5.938 13.292 5.438 12.104 3.479 10 4.396 7.854 3.479 6.708 5.438 4.458 5.938 4.667 8.229 3.125 10 4.667 11.729 4.458 14.062 6.708 14.562Z" /></svg>
                                                            </sup>}
                                                    </a>
                                                </p>
                                                <p className='p-0 m-0 text-center mt-1'>
                                                    {user.phone}
                                                    {user.isPhoneVerified &&
                                                        <sup
                                                            style={{
                                                                cursor: "pointer"
                                                            }}
                                                            className='text-info mx-1'
                                                            title="Phone Verified">
                                                            <svg height="20" width="20" fill="#0dcaf0"><path d="M7.167 18.75 5.583 16.083 2.562 15.417 2.875 12.333 0.833 10 2.875 7.667 2.562 4.583 5.583 3.917 7.167 1.25 10 2.458 12.833 1.25 14.417 3.917 17.438 4.583 17.146 7.667 19.167 10 17.146 12.333 17.438 15.417 14.417 16.083 12.833 18.75 10 17.542ZM10 10ZM9.146 13 13.875 8.271 12.646 7.021 9.146 10.542 7.354 8.771 6.125 10ZM7.896 16.521 10 15.604 12.146 16.521 13.292 14.562 15.542 14 15.354 11.729 16.875 10 15.354 8.229 15.542 5.938 13.292 5.438 12.104 3.479 10 4.396 7.854 3.479 6.708 5.438 4.458 5.938 4.667 8.229 3.125 10 4.667 11.729 4.458 14.062 6.708 14.562Z" /></svg>
                                                        </sup>}
                                                </p>
                                                <hr />
                                                <p className='p-0 m-0 mb-3'>
                                                    <strong className='bold'>Registered: </strong><br />
                                                    {" "}{timeAgo.format(new Date(user.createdAt))}
                                                </p>
                                                <p className='p-0 m-0 mb-3'>
                                                    <strong className='bold'>Wallet: </strong><br />
                                                    <Price price={user.wallet} />
                                                </p>
                                                <p className='p-0 m-0 mb-3'>
                                                    <strong className='bold'>Withdrawed Amount: </strong><br />
                                                    <Price price={user.withdrawedWallet} />
                                                </p>
                                                <p className='p-0 m-0 mb-3'>
                                                    <strong className='bold'>Roles: </strong><br />
                                                    {/* {user.role.map(role => <Badge key={role} pill bg="warning" className="mx-1 shadow">{role.toUpperCase()}</Badge>)} */}
                                                </p>
                                                <p className='p-0 m-0 mb-3'>
                                                    <strong className='bold'>Save List: </strong><br />
                                                    {user.saveListCount}
                                                </p>

                                                <p className='p-0 m-0 text-end'>
                                                    {user.isBlocked
                                                        ? <Badge pill bg="danger">Blocked</Badge>
                                                        : <Badge pill bg="success">Unblocked</Badge>}
                                                </p>
                                            </Col>
                                        </>)
                            }
                        </Col>
                    </Col>

                    <Col lg={9} className='gy-2 p-3 bg-white shadow rounded-2' style={{ height: "fit-content" }}>
                        <Col xs={12} className='d-flex m-0 align-items-center justify-content-between'>
                            <h4 className='letter-spacing-1 m-0' style={{ fontSize: '24px' }}>
                                Orders
                            </h4>
                        </Col>

                        <Col xs={12}>
                            <Table bordered hover responsive
                                className='table-sm m-0'>
                                <thead>
                                    <tr className="table-active border">
                                        <th>#</th>
                                        <th>PACKAGE</th>
                                        <th>PRICE</th>
                                        <th>STATUS</th>
                                        <th><span style={{ whiteSpace: 'nowrap' }}>CREATED AT</span></th>
                                        <th><span style={{ whiteSpace: 'nowrap' }}>UPDATED AT</span></th>
                                        <th><span style={{ whiteSpace: 'nowrap' }}>PAIED AT</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderLoading
                                        ? <TableLoading />
                                        : orderError
                                            ? <tr>
                                                <td colSpan={7} className='p-0 mt-0'>
                                                    <Message variant='danger' className='my-1'>{orderError}</Message>
                                                </td>
                                            </tr>
                                            : (!orders || !orders.length)
                                                ? <tr>
                                                    <td colSpan={7}>
                                                        <Message variant='danger' className='m-0'>No orders yet</Message>
                                                    </td>
                                                </tr>
                                                : orders.map((order, index) => (
                                                    <tr key={order._id + index}
                                                        style={{
                                                            verticalAlign: 'center !important'
                                                        }}>
                                                        <td>#{index + 1}</td>
                                                        <td>
                                                            <Link to={`/services/${order.service}`}>
                                                                <span style={{ whiteSpace: 'nowrap' }}>{order.package}</span>
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <span style={{ whiteSpace: 'nowrap' }}>
                                                                <Price price={order.price} />
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span style={{ whiteSpace: 'nowrap' }}>
                                                                {order.status}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <span style={{ whiteSpace: 'nowrap' }}>
                                                                {moment(order.createdAt).format("Do MMM, YYYY")}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span style={{ whiteSpace: 'nowrap' }}>
                                                                {moment(order.updatedAt).format("Do MMM, YYYY")}
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
                        </Col>

                        <Col
                            xs={12}
                            style={{ height: 'fit-content !important' }}
                            className='d-flex justify-content-end mt-3'>
                            <Paginate
                                page={page}
                                pages={pages}
                                path={`/users/${id}/orders/page`} />
                        </Col>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

const InfoLoading = () => {
    return (
        <>
            <Skeleton animation="wave" width="100%" variant="circular" height={70} />
            <Skeleton animation="wave" width="100%" variant="text" />
            <Skeleton animation="wave" width="100%" variant="text" />
            <Skeleton animation="wave" width="100%" variant="text" />
            <Skeleton animation="wave" width="100%" variant="rectangular" height={118} />
        </>
    );
};

const TableLoading = () => {
    return (
        <>
            <tr>
                <td className='p-1 py-0' colSpan={7}><Skeleton width="100%" height={50} animation="wave" /></td>
            </tr>
            <tr>
                <td className='p-1 py-0' colSpan={7}><Skeleton width="100%" height={50} animation="wave" /></td>
            </tr>
            <tr>
                <td className='p-1 py-0' colSpan={7}><Skeleton width="100%" height={50} animation="wave" /></td>
            </tr>
            <tr>
                <td className='p-1 py-0' colSpan={7}><Skeleton width="100%" height={50} animation="wave" /></td>
            </tr>
        </>
    );
};

export default UserDetailsScreen;