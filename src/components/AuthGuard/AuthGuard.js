import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAdminInfo } from '../../features/Admin/adminSlice';
import { getSideNav } from '../../features/SideNav/sideNav';
import { Footer } from '../Footer/Footer';

export const AuthGuard = ({ childern }) => {
    const { adminInfo } = useSelector(getAdminInfo);
    const { width, small } = useSelector(getSideNav);

    if (!adminInfo)
        return <Navigate to="/login" />;
    else
        return (
            <>
                <main className="px-md-3"
                    style={{ width: small ? "100vw" : `${window.innerWidth - width}px` }}>
                    <section className='sectionMain py-3 m-0'>
                        {childern}
                    </section>

                    {adminInfo && <Footer />}
                </main>
            </>
        );

};
