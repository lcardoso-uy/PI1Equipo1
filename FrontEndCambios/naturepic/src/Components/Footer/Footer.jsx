import React from 'react'
import "./Footer.css"
import NaturePicLogo from "../../../public/NaturePic-Logo 1.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-block">
          <img src={NaturePicLogo} alt="Isologotipo de la empresa" />
          <p>NaturePic</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer