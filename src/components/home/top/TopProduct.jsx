import React, { memo, useState, useCallback, useMemo } from "react";
import { topProducts } from "../../assets/data/data";
import { Heading } from "../../common/Heading";
import { ProductItems } from "../product/ProductItems";

export const TopProduct = memo(() => {
  const [cartItems, setCartItems] = useState(topProducts);

  const allCategories = useMemo(() => {
    return ["all", ...new Set(cartItems.map((item) => item.category))];
  }, [cartItems]);

  const handleFilter = useCallback((category) => {
    const newItem = category === "all" ? topProducts : topProducts.filter((item) => item.category === category);
    setCartItems(newItem);
  }, []);

  return (
    <>
      <section className='topproduct'>
        <div className='container'>
          <div className='head'>
            <Heading title='Top Selling Products'
                     desc='Meet our newbies! The latest templates uploaded to the marketplace.'/>
            <div className='category'>
              {allCategories.map((category) => (
                <button className='button' key={category} onClick={() => handleFilter(category)}>
                  {category}
                </button>
              ))}
            </div>
          </div>
          <ProductItems cartItems={cartItems}/>
        </div>
      </section>
    </>
  );
});
