import moment from 'moment';
import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom';
import { Rating, Skeleton } from '@mui/material';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Col, Container, Row, Badge, ListGroup, Dropdown } from 'react-bootstrap';

import { FullWidthTabs, GoBack, Message, Meta } from '../components';
import { getAsyncServiceDetails, getAsyncServiceReviews } from '../features/Services/servicesAction';
import { getServiceDetails, getServiceReviews, removeServiceDetails } from '../features/Services/servicesSlices';

const ServiceDetailsScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { loading, error, service } = useSelector(getServiceDetails);
    const { loading: reviewsLoading, error: reviewsError, reviews } = useSelector(getServiceReviews);

    useEffect(() => {
        dispatch(getAsyncServiceDetails(id));
        dispatch(getAsyncServiceReviews(id));

        return () => dispatch(removeServiceDetails());
    }, [dispatch, id]);

    if (loading || !service)
        return <Loading />;

    return (
        <>
            {error
                ? <Meta title='Error | Lancer' />
                : <Meta title={`${service?.title} | Lancer`} />
            }
            <GoBack fluid />
            <Container fluid className="px-sm-3">
                <Row className="justify-content-evenly gap-3 display-flex">
                    <Col xl={6} md={12} style={{ height: "fit-content" }}>
                        <Col xs={12}
                            className="bg-white p-3 rounded-2 shadow">
                            <h3 className='p-0 m-0 mb-2 letter-spacing-1'>
                                {service.title}
                            </h3>

                            <p className='p-0 m-0 mb-2 d-flex' style={{ whiteSpace: 'nowrap' }}>
                                <Rating value={service.rating} />
                                <span className="mx-2">
                                    ({service.totalReview})
                                </span>
                                <span className='p-0 m-0 text-end'>
                                    {service.isBlocked
                                        ? <Badge pill bg="danger">Blocked</Badge>
                                        : <Badge pill bg="success">Available</Badge>}
                                </span>
                            </p>

                            <p className='p-0 m-0 mb-3'>
                                <strong className='bold'>Description :</strong><br />
                                {service.description}
                            </p>

                            <FullWidthTabs servicePackage={service.packages} />

                            <Col xs={12} className="d-flex justify-content-end mt-3">
                                <div className="m-0 p-0"
                                    style={{
                                        height: "fit-content",
                                        width: "fit-content"
                                    }}>
                                    <LinkContainer to={`/users/${service.user}`} style={{ cursor: "pointer" }}>
                                        <span className='d-flex align-items-center'>
                                            {(service.sellerInfo.image)
                                                ? <Avatar src={service.sellerInfo.image.url} imgProps={{ referrerPolicy: "no-referrer" }} className='m-0' />
                                                : <Avatar className='shadow m-0'>{service.sellerInfo.name.substring(0, 1).toUpperCase()}</Avatar>}
                                            <strong className='d-flex flex-column px-2'
                                                style={{
                                                    marginRight: '0.5rem'
                                                }}>
                                                {service.sellerInfo.name}
                                            </strong>
                                        </span>
                                    </LinkContainer>
                                </div>
                            </Col>
                            <p className='m-0 text-end' style={{ fontSize: '14px' }}>(Created At: {moment(service.createdAt).format("Do MMM, YYYY")})</p>
                        </Col>


                        <Col xs={12}
                            className="bg-white d-xl-none d-block mt-3 p-3 rounded-2 shadow"
                            style={{ height: "fit-content" }}>
                            <Carousel>
                                {service.images.map(img =>
                                    <Carousel.Item key={img.public_id}>
                                        <img
                                            className="d-block w-100"
                                            src={img.url}
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        </Col>

                        <Col md={12} className="mt-4">
                            <Row className='justify-content-lg-start justify-content-center'>
                                <Col lg={6} md={8}>
                                    <h6 className='letter-spacing-1 p-0' style={{ fontSize: '20px' }}>
                                        Reviews
                                    </h6>
                                    {reviewsLoading
                                        ? <>
                                            {[...new Array(3)].map((_, index) =>
                                                <div key={index} className='bg-white p-2 shadow mb-2'>
                                                    <Skeleton variant="rectangular" className='w-100' height={100} />
                                                </div>
                                            )}
                                        </>
                                        : reviewsError
                                            ? <Message variant='danger'>{reviewsError}</Message>
                                            : reviews.length === 0
                                                ? <Message>No Reviews</Message>
                                                : reviews?.map(review => (
                                                    <ListGroup key={review.user._id} variant='flush'>
                                                        <ListGroup.Item
                                                            className='shadow rounded-2 border-0 mt-2'
                                                            key={review.user}>
                                                            <LinkContainer to={`/users/${review.user._id}`} style={{ cursor: "pointer" }}>
                                                                <span className='d-flex align-items-center'>
                                                                    {(review.user.image)
                                                                        ? <Avatar src={review.user.image.url} imgProps={{ referrerPolicy: "no-referrer" }} className='m-0' />
                                                                        : <Avatar className='shadow m-0'>{review.user.name.substring(0, 1).toUpperCase()}</Avatar>}
                                                                    <strong className='d-flex flex-column px-2'
                                                                        style={{
                                                                            marginRight: '0.5rem'
                                                                        }}>
                                                                        {review.user.name}
                                                                        <p className='m-0' style={{ fontSize: '12px' }}>{moment(review.createdAt).format("Do MMM, YYYY")}</p>
                                                                    </strong>
                                                                </span>
                                                            </LinkContainer>
                                                            <Rating value={review.rating} className='py-1 m-0' />
                                                            <Dropdown.Divider className='m-0 p-0' />
                                                            <p className='my-1'>{review.description}</p>
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                ))}
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                    <Col xl={5} md={12}
                        className="bg-white d-xl-block d-none p-3 rounded-2 shadow"
                        style={{ height: "fit-content" }}>
                        <Carousel>
                            {service.images.map(img =>
                                <Carousel.Item key={img.public_id}>
                                    <img
                                        className="d-block w-100"
                                        src={img.url}
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                            )}
                        </Carousel>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

const Loading = () => {
    return (
        <>
            <Meta title='Loading... | Lancer' />

            <Skeleton width={50} />
            <Container fluid className="px-sm-3">
                <Row className="justify-content-evenly gap-3 display-flex">
                    <Col xl={6} md={12} style={{ height: "fit-content" }}>
                        <Col xs={12}
                            className="bg-white p-3 rounded-2 shadow">
                            <Skeleton width="75%" height={40} />
                            <Skeleton width="40%" />
                            <Skeleton variant="rectangular" className='w-100' height={100} />
                            <Skeleton width="65%" />
                            <Skeleton width="85%" />
                            <Skeleton variant="rectangular" width="50%" height={150} />
                        </Col>

                        <Col xs={12}
                            className="bg-white d-xl-none d-block mt-3 p-3 rounded-2 shadow"
                            style={{ height: "fit-content" }}>
                            <Skeleton variant="rectangular" className='w-100' height={300} />
                        </Col>

                        <Col md={12} className="mt-4">
                            <Row className='justify-content-lg-start justify-content-center'>
                                <Col lg={6} md={8}>
                                    <h6 className='letter-spacing-1 p-0' style={{ fontSize: '20px' }}>
                                        Reviews
                                    </h6>
                                    {[...new Array(3)].map((_, index) =>
                                        <div key={index} className='bg-white p-2 shadow mb-2'>
                                            <Skeleton variant="rectangular" className='w-100' height={100} />
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                    <Col xl={5} md={12}
                        className="bg-white d-xl-block d-none p-3 rounded-2 shadow"
                        style={{ height: "fit-content" }}>
                        <Skeleton variant="rectangular" className='w-100' height={300} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ServiceDetailsScreen;