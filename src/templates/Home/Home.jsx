import React from 'react';
import { Link } from 'gatsby';
import './Home.css';
import { data } from '../../data';
import useQueryParams from '../../hooks/useQueryParams';

// markup
const IndexPage = () => {
  const [queryParams, setQueryParams] = useQueryParams();

  const toggleParam = (param, value) => {
    if (queryParams[param]?.includes(value)) {
      console.log(queryParams);
      setQueryParams({
        [param]: [],
      });
    } else {
      setQueryParams({ [param]: [value] });
    }
  };

  const { productType, flair } = queryParams;

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
          className={flair === 'bestSeller' ? 'red-bg' : 'white-bg'}
          onClick={() => toggleParam('flair', 'bestSeller')}
        >
          Best seller
        </button>
        <button
          className={flair === 'new' ? 'red-bg' : 'white-bg'}
          onClick={() => toggleParam('flair', 'new')}
        >
          New
        </button>
        <button
          className={productType === 'haircare' ? 'red-bg' : 'white-bg'}
          onClick={() => toggleParam('productType', 'haircare')}
        >
          Haircare
        </button>
        <button
          className={productType === 'skincare' ? 'red-bg' : 'white-bg'}
          onClick={() => toggleParam('productType', 'skincare')}
        >
          Skincare
        </button>
      </div>
      <div>
        <label htmlFor="flairBestSeller">Best Seller</label>
        <input
          type="checkbox"
          id="flairBestSeller"
          name="flair"
          value="bestseller"
          data-parent-id="flair"
          data-current-id="bestSeller"
          onChange={() => toggleParam('flair', 'bestSeller')}
          checked={flair === 'bestSeller'}
        />
        <label htmlFor="flairNew">New</label>
        <input
          type="checkbox"
          id="flairNew"
          name="flair"
          value="new"
          data-parent-id="flair"
          data-current-id="new"
          onChange={() => toggleParam('flair', 'new')}
          checked={flair === 'new'}
        />
      </div>
      <div>
        <label htmlFor="productTypeHaircare">Haircare</label>
        <input
          type="checkbox"
          id="productTypeHaircare"
          name="productType"
          value="haircare"
          data-parent-id="productType"
          data-current-id="haircare"
          onChange={() => toggleParam('productType', 'haircare')}
          checked={productType === 'haircare'}
        />
        <label htmlFor="productTypeSkincare">Skincare</label>
        <input
          type="checkbox"
          id="productTypeSkincare"
          name="productType"
          value="skincare"
          data-parent-id="productType"
          data-current-id="skincare"
          onChange={() => toggleParam('productType', 'skincare')}
          checked={productType === 'skincare'}
        />
      </div>

      <div style={{ padding: '10px 5px 0' }}>
        {data
          .filter((card) =>
            [
              flair ? flair === card.flair : true,
              productType ? productType === card.productType : true,
            ].reduce((acc, res) => acc && res, true),
          )
          .map((card) => (
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
