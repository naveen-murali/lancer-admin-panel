import React from 'react';

export const Price = ({ price }) => {
    return (
        <>
            <span style={{ whiteSpace: 'nowrap' }}>
                {`₹ ${new Intl.NumberFormat('en-IN', {
                    currency: 'INR'
                }).format(price)}`}
            </span>
        </>
    );
};

