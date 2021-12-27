import React from 'react';
import Header from '../components/Header';
// import Nav from '../components/Navigation';
// import { Route, Link } from 'react-router';
import Location from '../components/Location';
import ScrollTop from '../components/ScrollTop';
import Middletitle from '../components/Middletitle';
import Footer from '../components/Footer';
import Bottomarea from '../components/Bottomarea';
import TopTiltle from '../components/TopTiltle';

const Homepage = () => {
  return (
    <>
      <ScrollTop />
      <TopTiltle />
      <Header></Header>
      <Middletitle />
      <Location />
      <Bottomarea />
    </>
  );
};

export default Homepage;
