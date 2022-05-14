import React from 'react';

export const Price = ({ price, ...rest }) => {
    return (
        <>
            <span {...rest} style={{ whiteSpace: 'nowrap' }}>
                {`₹ ${new Intl.NumberFormat('en-IN', {
                    currency: 'INR'
                }).format(price)}`}
            </span>
        </>
    );
};

