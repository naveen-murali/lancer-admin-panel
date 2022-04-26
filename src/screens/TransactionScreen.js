import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Badge } from 'react-bootstrap';

import {
    Meta,
    Message,
    ConfirmBox,
    Portal,
    Paginate,
    Price,
    GoBack,
} from '../components';

import { approveRefundAsyncTransaction, approveWithdrawAsyncTransaction, getAsyncTransactions, rejectAsyncTransaction } from '../features/Transaction/transactionAction';
import { getTransactions } from '../features/Transaction/transactionSlice';
import moment from 'moment';

const TransactionScreen = () => {
    const dispatch = useDispatch();

    const [confirmBox, setConfirmBox] = useState({
        show: false,
        dataHandler: {
            payload: '',
            action: ''
        },
        message: ''
    });

    const { status, type, pageNumber = 1 } = useParams();
    const {
        transactions,
        page,
        pages,
        error,
        loading
    } = useSelector(getTransactions);

    useEffect(() => {
        dispatch(getAsyncTransactions({ type, status, page: pageNumber }));
    }, [dispatch, pageNumber, status, type]);


    const confirmBoxConfirmAction = () => {
        setConfirmBox((prev) => ({ ...prev, show: false }));
        const { payload, action } = confirmBox.dataHandler;

        if (action === 'REJECT')
            return dispatch(rejectAsyncTransaction(payload));;

        if (action === 'WITHDRAW')
            return dispatch(approveWithdrawAsyncTransaction(payload));;

        if (action === 'REFUND')
            return dispatch(approveRefundAsyncTransaction(payload));
    };

    const confirmBoxCancelAction = () => {
        setConfirmBox((prev) => ({ ...prev, show: false }));
    };

    return (
        <>
            <GoBack fluid />
            <Container fluid>
                <div className="bg-white p-3 rounded-2 shadow">
                    <div className="col-12 conainer-fluid">
                        <Row className='gy-2'>
                            <Col lg={4} xs={12} className='d-flex align-items-center'>
                                <h3 className='letter-spacing-1 m-0' style={{ fontSize: '24px' }}>
                                    Transactions
                                    <sup
                                        className="letter-spacing-0"
                                        style={{
                                            fontSize: "16px",
                                            textTransform: "capitalize"
                                        }}>
                                        <Badge pill bg="info">
                                            {type}
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
                            : <Meta title={`Transactions [${type.toUpperCase()}] | Lancer`} />}

                    <Table bordered hover responsive
                        className='table-sm m-0 mt-3'>
                        <thead>
                            <tr className="table-active border">
                                <th>ID</th>
                                <th>TYPE</th>
                                <th>PRICE</th>
                                <th><span style={{ whiteSpace: 'nowrap' }}>CREATED AT</span></th>
                                <th><span style={{ whiteSpace: 'nowrap' }}>UPDATED AT</span></th>
                                <th>STATUS</th>
                                {status !== "completed" && <th></th>}
                            </tr>
                        </thead>
                        <tbody>
                            {error
                                ? <tr>
                                    <td colSpan={7} className='p-0 mt-0'>
                                        <Message variant='danger' className='my-1'>{error}</Message>
                                    </td>
                                </tr>
                                : !loading && !transactions.length
                                    ? <tr>
                                        <td colSpan={7} className='p-0 mt-0'>
                                            <Message variant='danger' className='my-1'>no transaction exists</Message>
                                        </td>
                                    </tr>
                                    : transactions?.map(transaction => (
                                        <tr key={transaction._id} style={{ verticalAlign: 'center !important' }}>
                                            <td>{transaction._id}</td>
                                            <td>
                                                <strong
                                                    className='letter-spacing-0'
                                                    style={{ whiteSpace: 'nowrap' }}>
                                                    {transaction.type.toUpperCase()}
                                                </strong>
                                            </td>
                                            <td>
                                                <span style={{ whiteSpace: 'nowrap' }}>
                                                    <Price price={transaction.price} />
                                                </span>
                                            </td>
                                            <td>
                                                <span style={{ whiteSpace: 'nowrap' }}>
                                                    {moment(transaction.createdAt).format("Do MMM, YYYY")}
                                                </span>
                                            </td>
                                            <td>
                                                <span style={{ whiteSpace: 'nowrap' }}>
                                                    {transaction.createdAt !== transaction.updatedAt
                                                        ? moment(transaction.createdAt).format("Do MMM, YYYY")
                                                        : "Nill"}
                                                </span>
                                            </td>
                                            <td className='text-center'>
                                                <Badge pill bg={
                                                    (transaction.status === "completed" && "success") ||
                                                    (transaction.status === "pending" && "warning") ||
                                                    (transaction.status === "rejected" && "danger")
                                                }>
                                                    {transaction.status}
                                                </Badge>
                                            </td>
                                            {transaction.status === 'pending'
                                                && <td className='text-center'>
                                                    <span className='mx-auto' style={{ display: 'inline-flex' }}>
                                                        <Button
                                                            variant="success"
                                                            className='border us-delete-btn rounded'
                                                            onClick={() => {
                                                                setConfirmBox(prev => ({
                                                                    ...prev,
                                                                    show: true,
                                                                    dataHandler: {
                                                                        payload: transaction._id,
                                                                        action: `${transaction.type.toUpperCase()}`
                                                                    },
                                                                    message: `Do you want to approve this ${transaction.type} request?`
                                                                }));
                                                            }}>
                                                            <i className='fas fa-check'></i>
                                                        </Button>
                                                        <Button
                                                            variant={transaction.isBlocked ? 'success' : 'danger'}
                                                            className='border us-delete-btn rounded'
                                                            onClick={() => {
                                                                setConfirmBox(prev => ({
                                                                    ...prev,
                                                                    show: true,
                                                                    dataHandler: {
                                                                        payload: transaction._id,
                                                                        action: `REJECT`
                                                                    },
                                                                    message: `Do you want to reject this ${transaction.type} request?`
                                                                }));
                                                            }}>
                                                            <i className="fa-solid fa-ban"></i>
                                                        </Button>
                                                    </span>
                                                </td>}
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
                                ? type
                                    ? `/transactions/${status}/${type}`
                                    : `/transactions/${status}`
                                : '/transactions'} />
                    </Col>

                    <Portal id='category-confirmBox'>
                        <ConfirmBox
                            show={confirmBox.show}
                            cancelAction={confirmBoxCancelAction}
                            confirmAction={confirmBoxConfirmAction}
                            message={confirmBox.message} />
                    </Portal>
                </div>
            </Container>
        </>
    );
};

export default TransactionScreen;