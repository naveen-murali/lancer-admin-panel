import React, { memo } from 'react';
import { Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const IconCard = memo(({ title, value, icon, path }) => {
    return (
            <h5 className='m-0 p-0 d-flex align-items-center justify-content-between'>
                <div className='d-flex'>
                    <span className="arrowCard p-3">{icon}</span>
                    <div className='d-flex flex-column justify-content-center'>
                        <span className='letter-spacing-1 text-secondary d-flex align-items-center'
                            style={{
                                whiteSpace: "nowrap",
                                textTransform: "capitalize"
                            }}>
                            {title}
                        </span>
                        <span className='letter-spacing-1 d-flex align-items-center'
                            style={{
                                whiteSpace: "nowrap",
                                fontSize: "20px"
                            }}>
                            {value}
                        </span>
                    </div>
                </div>
                {path
                    ? <LinkContainer to={path}>
                        <span className='d-flex align-items-center p-3 arrowCard'>
                            <svg height="24" width="24" fill="#1a2038"><path d="M17.5 16.5 16.075 15.1 18.175 13H3V11H18.175L16.1 8.9L17.525 7.5L22 12Z" /></svg>
                        </span>
                    </LinkContainer>
                    : <span className='d-flex align-items-center p-3 arrowCard'>
                        <svg height="24" width="24" fill="#1a2038"><path d="M17.5 16.5 16.075 15.1 18.175 13H3V11H18.175L16.1 8.9L17.525 7.5L22 12Z" /></svg>
                    </span>
                }
            </h5>
    );
});