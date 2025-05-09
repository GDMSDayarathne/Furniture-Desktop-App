import React from 'react';
import './Services.css';
import officeImage from '../Assets/Services.png'; 

const Services = () => {
  return (
    <div className="our-services">
      <div className="services-content">
        <div className="services-text">
          <div className="services-header">
            <div className="heading-line-wrap">
              <h2 className="title1">Our Services</h2>
            </div>
          </div>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua...
          </p>
          <p className="description2">
            <ol style={{ listStyleType: 'circle' }}>
              <li>Interior Design</li>
              <li>Furniture Design</li>
              <li>Space Planning</li>
              <li>Lighting Design</li>
              <li>Color Consultation</li>
              <li>3D Visualization</li>
              <li>Project Management</li>
              <li>Custom Furniture Solutions</li>
            </ol>  
          </p>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. 
          </p><br />
          <button className="explore-btn">Explore More.</button>
        </div>
        <div className="services-image">
          <img src={officeImage} alt="Office" />
        </div>
      </div>
    </div>
  );
};

export default Services;
