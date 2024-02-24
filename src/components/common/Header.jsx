import React, { memo, useCallback, useMemo, useState, useEffect } from "react";
import logo from "../assets/images/logo.svg";
import cartImg from "../assets/images/cart.png";
import { BiSearch } from "react-icons/bi";
import { BsBagCheck } from "react-icons/bs";
import { RiUser3Line } from "react-icons/ri";
import { AiOutlineHeart, AiOutlineMenu, AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { navlist } from "../assets/data/data";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DELETE } from "../../controller/action";

export const Header = memo(() => {
  const [mobile, setMobile] = useState(false);
  const [cartList, setCartList] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (header) {
        header.classList.toggle("active", window.scrollY > 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getData = useSelector((state) => state.cartReducer.carts);
  const dispatch = useDispatch();

  const handleDelete = useCallback((id) => {
    dispatch(DELETE(id));
  }, [dispatch]);

  const totalMemoized = useMemo(() => {
    return getData.reduce((acc, item) => acc + parseFloat(item.price) * item.qty, 0);
  }, [getData]);

  const handleCloses = useCallback(() => {
    setCartList(false);
  }, []);

  return (
    <>
      <header className='header'>
        <div className='container'>
          <nav>
            <div className='toggle'>
              <button onClick={() => setMobile(!mobile)}>{mobile ?
                <AiOutlineClose className='close heIcon'/> :
                <AiOutlineMenu className='open heIcon'/>}</button>
            </div>
            <div className='left'>
              <Link to='/'>
                <img src={logo} alt='logo'/>
              </Link>
            </div>
            <div className='center'>
              <ul className={mobile ? "mobile-nav" : "menu"}>
                {navlist.map((nav, i) => (
                  <li key={i}>
                    <Link to={nav.path}>{nav.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className='right'>
            <div className='right_search'>
              <input type='text' placeholder='Search Products...'/>
              <BiSearch className='searchIcon heIcon'/>
            </div>
            <div className='right_user'>
              <RiUser3Line className='userIcon heIcon'/>
              <AiOutlineHeart className='userIcon heIcon'/>
            </div>
            <div className='right_card'>
              <button className='button' onClick={() => setCartList(!cartList)}>
                <BsBagCheck className='shop heIcon'/>
                MY CART<span> ({getData.length})</span>
              </button>
              <div className={cartList ? "showCart" : "hideCart"}>
                {getData.length ? (
                  <section className='details'>
                    <div className='details_title'>
                      <h3>Photo</h3>
                      <p>Product Name</p>
                    </div>
                    {getData.map((e) => (
                      <div key={e.id} className='details_content'>
                        <div className='details_content_img'>
                          <Link to={`/cart/${e.id}`} onClick={handleCloses}>
                            <img src={e.cover} alt=''/>
                          </Link>
                        </div>
                        <div className='details_content_detail'>
                          <div className='details_content_detail_price'>
                            <p>{e.title.slice(0, 20)}...</p>
                            <p>Price : ${e.price}</p>
                            <p>Quantity : {e.qty}</p>
                          </div>
                        </div>
                        <div className='details_content_detail_icon'>
                          <i onClick={() => handleDelete(e.id)}>
                            <AiOutlineDelete/>
                          </i>
                        </div>
                      </div>
                    ))}
                    <div className='details_total'>
                      <h4>Total : ${totalMemoized}</h4>
                    </div>
                  </section>
                ) : (
                  <div className='empty'>
                    <p>Your cart is empty</p>
                    <img src={cartImg} alt=''/>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
});

const mapStateToProps = (state) => {
  return {
    amount: state.amount,
  };
};

connect(mapStateToProps)(Header);
