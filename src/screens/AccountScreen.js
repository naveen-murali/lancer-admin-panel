import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GoBack, Meta, Price } from '../components';
import { getAsyncLancer, updateAsyncLancer } from '../features/Lancer/lancerAcion';
import { getLancer } from '../features/Lancer/lancerSlice';
import { showErrorAlert } from '../features/MainAlert/mainAlertSlice';

const AccountScreen = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        commission: 0,
        referralAmount: 0
    });

    const { loading, wallet, commission, referralAmount, updateSuccess, error } = useSelector(getLancer);

    const submitHandler = (e, data) => {
        e.preventDefault();
        if (!data)
            return dispatch(showErrorAlert("please provide valied credentials"));

        dispatch(updateAsyncLancer(data));
    };

    useEffect(() => {
        updateSuccess && setData({
            commission: 0,
            referralAmount: 0
        });
    }, [updateSuccess]);

    useEffect(() => {
        dispatch(getAsyncLancer());
    }, [dispatch]);

    return (
        <>
            {loading
                ? <Meta title='Loading... | Lancer' />
                : error
                    ? <Meta title='Error... | Lancer' />
                    : <Meta title={`Lancer Account | Lancer`} />}
            <GoBack fluid />
            <Container fluid className="px-sm-3">
                <Row className='justify-content-evenly gap-3'>
                    <Col lg={3} md={6} className="mb-3">
                        <div className='shadow rounded bg-white p-5 text-center d-flex align-items-center'>
                            <h3 className='m-0 p-0 d-flex'>
                                <span>
                                    <svg height="40" width="40" fill="#6610f2"><path d="M27 22.625Q28.042 22.625 28.833 21.833Q29.625 21.042 29.625 20Q29.625 18.917 28.833 18.146Q28.042 17.375 27 17.375Q25.958 17.375 25.167 18.146Q24.375 18.917 24.375 20Q24.375 21.042 25.167 21.833Q25.958 22.625 27 22.625ZM7.792 30.75Q7.792 30.75 7.792 31.479Q7.792 32.208 7.792 32.208Q7.792 32.208 7.792 32.208Q7.792 32.208 7.792 32.208V7.792Q7.792 7.792 7.792 7.792Q7.792 7.792 7.792 7.792Q7.792 7.792 7.792 8.542Q7.792 9.292 7.792 9.292Q7.792 9.292 7.792 10.958Q7.792 12.625 7.792 15.208V24.833Q7.792 27.417 7.792 29.083Q7.792 30.75 7.792 30.75ZM7.792 35Q6.667 35 5.833 34.167Q5 33.333 5 32.208V7.792Q5 6.667 5.833 5.833Q6.667 5 7.792 5H32.208Q33.333 5 34.167 5.833Q35 6.667 35 7.792V12.875H32.208V7.792Q32.208 7.792 32.208 7.792Q32.208 7.792 32.208 7.792H7.792Q7.792 7.792 7.792 7.792Q7.792 7.792 7.792 7.792V32.208Q7.792 32.208 7.792 32.208Q7.792 32.208 7.792 32.208H32.208Q32.208 32.208 32.208 32.208Q32.208 32.208 32.208 32.208V27.125H35V32.208Q35 33.333 34.167 34.167Q33.333 35 32.208 35ZM22.167 27.958Q20.75 27.958 19.875 27.083Q19 26.208 19 24.833V15.208Q19 13.792 19.875 12.917Q20.75 12.042 22.167 12.042H33.542Q34.958 12.042 35.833 12.917Q36.708 13.792 36.708 15.208V24.833Q36.708 26.208 35.833 27.083Q34.958 27.958 33.542 27.958ZM33.958 25.208Q33.958 25.208 33.958 25.208Q33.958 25.208 33.958 25.208V14.833Q33.958 14.833 33.958 14.833Q33.958 14.833 33.958 14.833H21.792Q21.792 14.833 21.792 14.833Q21.792 14.833 21.792 14.833V25.208Q21.792 25.208 21.792 25.208Q21.792 25.208 21.792 25.208Z" /></svg>
                                </span>
                                <span className='mx-3 letter-spacing-1 d-flex align-items-center justify-content-center' style={{ whiteSpace: "nowrap" }}>
                                    <Price price={wallet} />
                                </span>
                            </h3>
                        </div>
                    </Col>
                    <Col lg={3} md={6} className="mb-3">
                        <div className='shadow rounded bg-white p-5 text-center d-flex align-items-center'>
                            <h3 className='m-0 p-0 d-flex align-items-center'>
                                <span>
                                    <svg height="34" width="34" fill="#0d6efd" viewBox="0 0 384 512"><path d="M374.6 73.39c-12.5-12.5-32.75-12.5-45.25 0l-320 320c-12.5 12.5-12.5 32.75 0 45.25C15.63 444.9 23.81 448 32 448s16.38-3.125 22.62-9.375l320-320C387.1 106.1 387.1 85.89 374.6 73.39zM64 192c35.3 0 64-28.72 64-64S99.3 64.01 64 64.01S0 92.73 0 128S28.7 192 64 192zM320 320c-35.3 0-64 28.72-64 64s28.7 64 64 64s64-28.72 64-64S355.3 320 320 320z" /></svg>
                                </span>
                                <span className='mx-3 letter-spacing-1 d-flex align-items-center justify-content-center' style={{ whiteSpace: "nowrap" }}>
                                    {commission}
                                </span>
                            </h3>
                        </div>

                        <Col xs={12}
                            className='m-0 p-2 mt-3 d-flex align-items-center bg-white shadow rounded'>
                            <Form className="w-100" onSubmit={(e) => submitHandler(e, { commission: Number(data.commission) })}>
                                <Form.Group controlId="commission" >
                                    <Form.Label>Commission (&#x25;)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={data.commission || ""}
                                        name="commission"
                                        placeholder="Commission"
                                        className="bg-white rounded shadow border w-100"
                                        onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} />
                                </Form.Group>

                                <div className="w-100 text-end">
                                    <Button
                                        disabled={!data.commission ? true : false}
                                        type='submit'
                                        variant='dark'
                                        className='us-btn-outline mt-3 p-1 d-felx aligin-items-center'
                                        style={{ width: "6rem" }}>
                                        Update
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Col>
                    <Col lg={3} md={6} className="mb-3">
                        <div className='shadow rounded bg-white p-5 text-center d-flex align-items-center'>
                            <h3 className='m-0 p-0 d-flex align-items-center'>
                                <span>
                                    <svg height="32" width="32" fill='#ffc107' viewBox="0 0 512 512"><path d="M512 80C512 98.01 497.7 114.6 473.6 128C444.5 144.1 401.2 155.5 351.3 158.9C347.7 157.2 343.9 155.5 340.1 153.9C300.6 137.4 248.2 128 192 128C183.7 128 175.6 128.2 167.5 128.6L166.4 128C142.3 114.6 128 98.01 128 80C128 35.82 213.1 0 320 0C426 0 512 35.82 512 80V80zM160.7 161.1C170.9 160.4 181.3 160 192 160C254.2 160 309.4 172.3 344.5 191.4C369.3 204.9 384 221.7 384 240C384 243.1 383.3 247.9 381.9 251.7C377.3 264.9 364.1 277 346.9 287.3C346.9 287.3 346.9 287.3 346.9 287.3C346.8 287.3 346.6 287.4 346.5 287.5L346.5 287.5C346.2 287.7 345.9 287.8 345.6 288C310.6 307.4 254.8 320 192 320C132.4 320 79.06 308.7 43.84 290.9C41.97 289.9 40.15 288.1 38.39 288C14.28 274.6 0 258 0 240C0 205.2 53.43 175.5 128 164.6C138.5 163 149.4 161.8 160.7 161.1L160.7 161.1zM391.9 186.6C420.2 182.2 446.1 175.2 468.1 166.1C484.4 159.3 499.5 150.9 512 140.6V176C512 195.3 495.5 213.1 468.2 226.9C453.5 234.3 435.8 240.5 415.8 245.3C415.9 243.6 416 241.8 416 240C416 218.1 405.4 200.1 391.9 186.6V186.6zM384 336C384 354 369.7 370.6 345.6 384C343.8 384.1 342 385.9 340.2 386.9C304.9 404.7 251.6 416 192 416C129.2 416 73.42 403.4 38.39 384C14.28 370.6 .0003 354 .0003 336V300.6C12.45 310.9 27.62 319.3 43.93 326.1C83.44 342.6 135.8 352 192 352C248.2 352 300.6 342.6 340.1 326.1C347.9 322.9 355.4 319.2 362.5 315.2C368.6 311.8 374.3 308 379.7 304C381.2 302.9 382.6 301.7 384 300.6L384 336zM416 278.1C434.1 273.1 452.5 268.6 468.1 262.1C484.4 255.3 499.5 246.9 512 236.6V272C512 282.5 507 293 497.1 302.9C480.8 319.2 452.1 332.6 415.8 341.3C415.9 339.6 416 337.8 416 336V278.1zM192 448C248.2 448 300.6 438.6 340.1 422.1C356.4 415.3 371.5 406.9 384 396.6V432C384 476.2 298 512 192 512C85.96 512 .0003 476.2 .0003 432V396.6C12.45 406.9 27.62 415.3 43.93 422.1C83.44 438.6 135.8 448 192 448z" /></svg>
                                </span>
                                <span className='mx-3 letter-spacing-1 d-flex align-items-center justify-content-center' style={{ whiteSpace: "nowrap" }}>
                                    <Price price={referralAmount} />
                                </span>
                            </h3>
                        </div>

                        <Col xs={12}
                            className='m-0 p-2 mt-3 d-flex align-items-center bg-white shadow rounded'>
                            <Form className="w-100" onSubmit={(e) => submitHandler(e, { referralAmount: Number(data.referralAmount) })}>
                                <Form.Group controlId="referralAmount">
                                    <Form.Label>Referral Amount</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="referralAmount"
                                        value={data.referralAmount || ""}
                                        placeholder="Commission"
                                        className="bg-white rounded shadow border"
                                        onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} />
                                </Form.Group>
                                <div className="w-100 text-end">
                                    <Button
                                        disabled={!data.referralAmount ? true : false}
                                        type='submit'
                                        variant='dark'
                                        className='us-btn-outline mt-3 p-1 d-felx aligin-items-center'
                                        style={{ width: "6rem" }}>
                                        Update
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AccountScreen;