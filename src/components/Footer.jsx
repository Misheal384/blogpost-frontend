import React from 'react'
import { Link } from 'react-router-dom'


const Foooter = () => {
  return (
    <footer >
      <ul className="footer__categories">
        <li><Link to="/posts/categories/Agriculture">Agriculture</Link></li>
        <li><Link to="/posts/categories/Technology">Technology</Link></li>
        <li><Link to="/posts/categories/Science">Science</Link></li>
        <li><Link to="/posts/categories/Health">Health</Link></li>
        </ul>

        <div className="footer__copyright">
          <small>All Rights Reserved &copy; Copyright, Misheal's Blog Hub</small>
        </div>
    </footer>
  )
}

export default Foooter