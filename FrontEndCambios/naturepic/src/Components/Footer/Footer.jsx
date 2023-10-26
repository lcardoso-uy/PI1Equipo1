import React from 'react'
import "./Footer.css"
import logo from "../../../public/logo.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-block">
          <img src={logo} alt="Isologotipo de la empresa" />
          <span>2023</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer