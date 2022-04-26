import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableViews from 'react-swipeable-views';
import { Price } from '../Price/Price';
import { Col } from 'react-bootstrap';

const styles = {
  tabs: {
    background: '#1a203811',
    color: "#fff"
  },
  slide: {
    width: '100%',
    padding: 16,
  },
};

export const FullWidthTabs = ({ servicePackage }) => {
  const [index, setIndex] = useState(0);

  const packages = Object.keys(servicePackage);

  const handleChange = (_, value) => {
    setIndex(value);
  };

  const handleChangeIndex = index => {
    setIndex(index);
  };

  return (
    <div>
      <Box sx={{ bgcolor: 'background.paper' }}
        className="shadow rounded col-md-6 col-lg-6">
        <Tabs value={index}
          centered
          className="shadow rounded"
          style={styles.tabs}
          onChange={handleChange}>
          {packages.map(name =>
            <Tab key={name} label={name} />)}
        </Tabs>
        <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
          {packages.map(name =>
            <div key={name} className="row m-0"
              style={Object.assign({}, styles.slide)}>
              <Col className="m-0 p-0 mb-2" xs={1}></Col>
              <Col className="m-0 p-0 mb-2" xs={5}>Price</Col>
              <Col className="m-0 p-0 mb-2" xs={5}>- <Price price={servicePackage[name].price} /></Col>
              <Col className="m-0 p-0 mb-2" xs={1}></Col>
              
              <Col className="m-0 p-0 mb-2" xs={1}></Col>
              <Col className="m-0 p-0 mb-2" xs={5}>Revision</Col>
              <Col className="m-0 p-0 mb-2" xs={5}>- {servicePackage[name].revision}</Col>
              <Col className="m-0 p-0 mb-2" xs={1}></Col>
              
              <Col className="m-0 p-0" xs={1}></Col>
              <Col className="m-0 p-0" xs={5}>Delivery Time</Col>
              <Col className="m-0 p-0" xs={5}>- {servicePackage[name].deliveryTime} Days</Col>
              <Col className="m-0 p-0" xs={1}></Col>
            </div>)}
        </SwipeableViews>
      </Box>
    </div>
  );
};
