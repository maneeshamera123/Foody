import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useCart } from '../Components/ContextReducer';
import Badge from 'react-bootstrap/Badge';
import Cart from '../Screen/Cart';
import Modal from '../Model';

export default function Navbar() {
  let data = useCart();
  const [cartView, setCartView] = useState(false)
  const navigate = useNavigate();

  const LogoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate('/')
  }

  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-4 fs-italic text-white" to="/">Foody</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
              </li>
              {
                (localStorage.getItem("authToken")) ?
                  <li className="nav-item">
                    <Link className="nav-link active text-white" aria-current="page" to="/myorders" >My Orders</Link>
                  </li>
                  : " "
              }
            </ul>

            <div className='d-flex'>
              {
                (!localStorage.getItem("authToken")) ?
                  <div>
                    <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                    <Link className="btn bg-white text-success mx-1" to="/signup">SignUp</Link>
                  </div>
                  :
                  <div>
                    <div className="btn bg-white text-success mx-1" onClick={() => { setCartView(true) }}>My Cart {" "}
                      <Badge pill bg='success'>{data.length === 0 ? " " : data.length}</Badge>
                    </div>
                    {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

                    <div className="btn bg-white text-danger mx-1" to="/signup" onClick={LogoutHandler}>Logout</div>
                  </div>
              }
            </div>

          </div>
        </div>
      </nav>

    </div>
  );
}
