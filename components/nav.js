import React, { useState } from 'react';
import Image from 'next/image';

const Navigation = ({ menu }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div id='nav-logo'>
            <Image src={'/logo/logo-lightbg-horizontal-notag.svg'} className='img-fluid' width={200} height={100} />
          </div>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
          onClick={handleToggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse${isNavOpen ? ' show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {menu?.menuItems?.nodes.map((menuItem, index) => (
              <li className="nav-item" key={index}>
                <a className="nav-link" href={menuItem.uri}>
                  {menuItem.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;