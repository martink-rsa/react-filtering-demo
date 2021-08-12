import React from 'react';
import { Link } from 'gatsby';
import './Home.css';
import { controls } from './data';
import { data } from '../../data';
import useQueryParams from '../../hooks/useQueryParams';

// markup
const IndexPage = () => {
  const [queryParams, setQueryParams] = useQueryParams();

  // This code needs a major refactor. The if checks can be
  //    reduced to something more simpler. It has been hackwork
  //    to get a basic concept going
  // A challenge with the query params:
  // Controls need to function like checkboxes and radio buttons
  // None-selected and all-selected should both show all items
  // Single value is a key-pair value,
  // More than one is array
  const toggleParam = (param, value, allowMultipleValues) => {
    if (queryParams[param]?.includes(value)) {
      // The user might land on a filtered page with just one
      //    key so an array might not exist yet.
      if (Array.isArray(queryParams[param])) {
        setQueryParams({
          [param]: queryParams[param].filter((item) => item !== value),
        });
      } else {
        setQueryParams({ [param]: undefined });
      }
    } else {
      if (queryParams[param]) {
        if (allowMultipleValues) {
          if (Array.isArray(queryParams[param])) {
            // Turn single key/pair into array
            // { variant: hair } => { variant: [hair, skin] }
            setQueryParams({ [param]: [...queryParams[param], value] });
          } else {
            setQueryParams({ [param]: [queryParams[param], value] });
          }
        } else {
          setQueryParams({ [param]: value });
        }
      } else {
        setQueryParams({ [param]: value });
      }
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
        {controls.map(({ children, key, allowMultipleValues }) => (
          <div>
            {children.map(({ title, value }) => (
              <>
                <test test={console.log(queryParams)} />
                <test test={console.log(queryParams[key])} />
                <label htmlFor={`input-${key}-${value}`}>{title}</label>
                <input
                  type="checkbox"
                  id={`input-${key}-${value}`}
                  name={`input-${key}-${value}`}
                  onChange={() => toggleParam(key, value, allowMultipleValues)}
                  checked={
                    queryParams[key] === value ||
                    queryParams[key]?.includes(value)
                      ? true
                      : false
                  }
                />
              </>
            ))}
          </div>
        ))}
      </div>

      <div style={{ padding: '10px 5px 0' }}>
        {data
          .filter((card) =>
            [
              flair ? flair === card.flair || flair.includes(card.flair) : true,
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
