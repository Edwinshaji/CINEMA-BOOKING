import React from 'react';
import './css/Home.css';
import Banner from '../../components/user/Banner/Banner';
import logo from '../../assets/logo.png'
import MovieAccordation from '../../components/user/MovieAccordation/MovieAccordation';


const Home = () => {

  return (
    <div className="home-container">
      <Banner />
      <MovieAccordation />
      {/* About Theatre */}
      <div className="about-section">
        <div className="about-text">
          <h2>About Our Theatre</h2>
          <p>Welcome to our theatre where entertainment meets excellence. We bring you the latest blockbusters and a premium movie experience with stunning visuals and comfortable seating. Whether you're a fan of thrilling action films, heartfelt dramas, or family-friendly comedies, we offer something for everyone!</p>

          <div className="about-cards">
            <div className="card">
              <h3>Our Mission</h3>
              <p>At our theatre, we aim to provide an exceptional cinema experience by combining the magic of movies with top-notch customer service. Our mission is to offer an escape from everyday life with a variety of films, unparalleled comfort, and a warm, inviting atmosphere. We strive to make every visit memorable for you and your loved ones.</p>
            </div>

            <div className="card">
              <h3>What We Offer</h3>
                <ul>
                  <li><i className="fas fa-volume-up"></i> <strong>Premium Sound & Visuals</strong> </li>
                  <li><i className="fas fa-couch"></i> <strong>Comfortable Seating</strong></li>
                  <li><i className="fas fa-film"></i> <strong>Wide Variety of Films</strong> </li>
                  <li><i className="fas fa-star"></i> <strong>Exclusive Screenings</strong></li>
                </ul>
            </div>
          </div>

          <a href="/movies" className="cta-button">Book Your Tickets Now</a>
        </div>
      </div>


    </div>
  );
};

export default Home;

