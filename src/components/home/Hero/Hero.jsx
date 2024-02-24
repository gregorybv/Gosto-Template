import React, { memo, useCallback, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { products } from "../../assets/data/data"
import { SearchItems } from "./SearchItems"

export const Hero = memo(() => {
  const [value, setValue] = useState("")
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const onSearch = useCallback((key) => {
    setValue(key);
  }, []);

  return (
    <>
      <section className='hero'>
        <div className='container'>
          <h1>
            <label>
              Over <span>6,500</span> Curated Design
            </label>
            <br/>
            <label>
              Resources, <span>Graphic & Website </span> Templates
            </label>
          </h1>
          <p>High-quality Design Themes for personal or commercial use contains 6k+ items in 100 categories.</p>
          <div className='search'>
            <span>All Categories</span>
            <hr/>
            <input type='text' placeholder='Search Products...' onChange={handleChange} value={value}/>
            <button onClick={() => onSearch(value)}>
              <BiSearch className='serachIcon heIcon'/>
            </button>
          </div>
          <SearchItems products={products} value={value} onSearch={onSearch}/>
          <p>Examples: Mockup, PSD, Theme Design, Image…</p>
        </div>
      </section>
    </>
  )
});