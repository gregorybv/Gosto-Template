import React, { memo, useState, useCallback, useMemo } from "react";
import { FiShoppingBag, FiSearch } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { ADD } from "../../../controller/action";

export const ProductItems = memo(({ cartItems }) => {
  const dispatch = useDispatch();

  const [openImage, setOpenImage] = useState(false);
  const [img, setImg] = useState("");

  const addToCart = useCallback((e) => {
    dispatch(ADD(e));
  }, [dispatch]);

  const onOpenImage = useCallback((src) => {
    setImg(src);
    setOpenImage(true);
  }, []);

  const onCloseImage = useCallback(() => {
    setOpenImage(false);
  }, []);

  const imageSrc = useMemo(() => img, [img]);

  return (
    <>
      <div className='product_items'>
        {cartItems.map((items) => (
          <div className='box' key={items.id}>
            <div className='img'>
              <img src={items.cover} alt=''/>
              <div className='overlay'>
                <button className='button' onClick={() => addToCart(items)}>
                  <FiShoppingBag/>
                </button>
                <button className='button'>
                  <AiOutlineHeart/>
                </button>
                <button className='button' onClick={() => onOpenImage(items.cover)}>
                  <FiSearch/>
                </button>
              </div>
            </div>
            <div className='details'>
              <h3>{items.title}</h3>
              <p>{items.author}</p>
              <h4>${items.price}</h4>
            </div>
          </div>
        ))}
      </div>

      {openImage && (
        <div className='modelOpen'>
          <div className='onClickImage'>
            <img src={imageSrc} alt=''/>
            <button className='button' onClick={onCloseImage}>
              <AiOutlineClose/>
            </button>
          </div>
        </div>
      )}
    </>
  );
});
