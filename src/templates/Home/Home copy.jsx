import React, { useEffect, useMemo, useRef, useState } from 'react';
import { navigate, useLocation } from '@reach/router';
import { parse, stringify } from 'query-string';
import { Link } from 'gatsby';
import './Home.css';
import { data } from '../../data';
import { controls } from './data';
import Controls from './Controls';

export function reduceControls(params) {
  const newSet = {};
  Object.keys(params).map((parentKey) => {
    const activeParams = Object.keys(params[parentKey]).reduce(
      (controls, key) => {
        if (params[parentKey][key]) {
          controls.push(key);
        }
        return controls;
      },
      [],
    );
    if (activeParams.length > 0) {
      console.log({ activeParams });
      newSet[parentKey] = activeParams;
    }
  });
  return newSet;
}

function isShownByFlair(product, filters) {
  const flairFilters = filters.filter((filter) => filter.group === 'flair');
  if (!flairFilters.length) return true;
  return flairFilters.some((filter) => filter.fnc(product));
}

function isShownByProductType(product, filters) {
  const productTypeFilters = filters.filter(
    (filter) => filter.group === 'productType',
  );
  if (!productTypeFilters.length) return true;
  return productTypeFilters.every((filter) => filter.fnc(product));
}

export function applyFilters(products, filters) {
  return products.filter((product) => {
    const showByFlair = isShownByFlair(product, filters);
    const showByProductType = isShownByProductType(product, filters);
    return showByFlair && showByProductType;
  });
}

// markup
const IndexPage = () => {
  const location = useLocation();
  const params = useMemo(() => parse(location.search), [location.search]);

  const [filters, setFilters] = useState([]);
  /* Object.keys(params).forEach((key) => {
    toggleFilter(params[key], key, (item) => item[key] === params[key]);
  }); */

  function filterExists(name, group) {
    return (
      filters.find((f) => f.name === name && f.group === group) !== undefined
    );
  }

  function addFilter(name, group, fnc) {
    setFilters((currentFilters) => [...currentFilters, { name, group, fnc }]);
  }

  function removeFilter(name, group) {
    setFilters((currentFilters) =>
      currentFilters.filter((f) => !(f.name === name && f.group === group)),
    );
  }

  function toggleFilter(name, group, fnc) {
    if (filterExists(name, group)) {
      removeFilter.apply(null, arguments);
    } else {
      addFilter.apply(null, arguments);
    }
  }

  const [controls, setControls] = useState({
    flair: { bestSeller: false, new: false },
    productType: { haircare: false, skincare: false },
  });

  function handleCheckbox(event) {
    setControls((prevState) => {
      const parentKey = event.target.getAttribute('data-parent-id');
      const currentKey = event.target.getAttribute('data-current-id');
      return {
        ...prevState,
        [parentKey]: {
          ...prevState[parentKey],
          [currentKey]: !prevState[parentKey][currentKey],
        },
      };
    });
  }
  useEffect(() => {
    Object.keys(params).forEach((key) => {
      toggleFilter(params[key], key, (item) => item[key] === params[key]);
    });
  }, [params]);

  useEffect(() => {
    const reducedControls = reduceControls(controls);
    navigate('?' + stringify(reducedControls));
  }, [controls]);

  let shownData = applyFilters(data, filters);

  return (
    <main>
      <div
        style={{
          background: 'lightgray',
          height: '30px',
          padding: '8px 5px 0',
        }}
      >
        <Link to="/">All</Link>
        {' - '}
        <Link to="?productType=haircare">Haircare</Link>
        {' - '}
        <Link to="?productType=skincare">Skincare</Link>
        {' - '}
        <Link to="?productType=haircare&flair=bestSeller">Hair Best</Link>
        {' - '}
        <Link to="?productType=haircare&flair=new">Hair New</Link>
        {' - '}
        <Link to="?productType=skincare&flair=bestSeller">Skin Best</Link>
        {' - '}
        <Link to="?productType=skincare&flair=new">Skin New</Link>
      </div>
      <div>
        <button
          active={filterExists('bestSeller', 'flair')}
          className={
            filterExists('bestSeller', 'flair') ? 'red-bg' : 'white-bg'
          }
          onClick={() =>
            toggleFilter(
              'bestSeller',
              'flair',
              (item) => item.flair === 'bestSeller',
            )
          }
        >
          Best seller
        </button>
        <button
          className={filterExists('new', 'flair') ? 'red-bg' : 'white-bg'}
          onClick={() =>
            toggleFilter('new', 'flair', (item) => item.flair === 'new')
          }
        >
          New
        </button>
        <button
          className={
            filterExists('haircare', 'productType') ? 'red-bg' : 'white-bg'
          }
          onClick={() =>
            toggleFilter(
              'haircare',
              'productType',
              (item) => item.productType === 'haircare',
            )
          }
        >
          Haircare
        </button>
        <button
          className={
            filterExists('skincare', 'productType') ? 'red-bg' : 'white-bg'
          }
          onClick={() =>
            toggleFilter(
              'skincare',
              'productType',
              (item) => item.productType === 'skincare',
            )
          }
        >
          Skincare
        </button>
      </div>
      {/* <Controls config={controls} /> */}
      <div>
        <label htmlFor="flairBestSeller">Best Seller</label>
        <input
          type="checkbox"
          id="flairBestSeller"
          name="flairBestSeller"
          data-parent-id="flair"
          data-current-id="bestSeller"
          onChange={handleCheckbox}
          checked={filterExists('bestSeller', 'flair')}
          test={console.log(controls.flair.bestSeller)}
        />
        <label htmlFor="flairNew">New</label>
        <input
          type="checkbox"
          id="flairNew"
          name="flairNew"
          data-parent-id="flair"
          data-current-id="new"
          onChange={handleCheckbox}
          checked={controls.flair.new}
        />
      </div>
      <div>
        <label htmlFor="productTypeHaircare">Haircare</label>
        <input
          type="checkbox"
          id="productTypeHaircare"
          name="productTypeHaircare"
          data-parent-id="productType"
          data-current-id="haircare"
          onChange={handleCheckbox}
          checked={controls.productType.haircare}
        />
        <label htmlFor="productTypeSkincare">Skincare</label>
        <input
          type="checkbox"
          id="productTypeSkincare"
          name="productTypeSkincare"
          data-parent-id="productType"
          data-current-id="skincare"
          onChange={handleCheckbox}
          checked={controls.productType.skincare}
        />
      </div>

      <div style={{ padding: '10px 5px 0' }}>
        {shownData.map((card) => (
          <div
            key={card.id}
            style={{ backgroundColor: card?.flair && 'lightblue' }}
          >
            {card.title} - {card.productType} | {card?.flair}
          </div>
        ))}
      </div>
    </main>
  );
};

export default IndexPage;
