import React, { useState } from 'react';

function Controls({ config }) {
  const [state, setState] = useState(
    config.reduce((currentState, control) => {
      //
      currentState[control.key] = control.children.reduce(
        (childState, child) => {
          //
          childState[child.key] = false;
          return childState;
        },
        {},
      );
      return currentState;
    }, {}),
  );

  console.log(state);

  function handleStateChange(parentKey, childKey, value) {
    //
    console.log('state change');
  }

  console.log(config);
  return (
    <div>
      {config.map((control) => {
        console.log(control);
        if (control.type === 'checkbox') {
          return (
            <CheckboxGroup
              parent={control}
              handleStateChange={handleStateChange}
            />
          );
        }
      })}
    </div>
  );
}

export function CheckboxGroup({ parent, handleStateChange }) {
  return (
    <>
      <div>
        <div role="group" aria-labelledby={parent.key}>
          <div id={parent.key}>{parent.title}:</div>
          <div>
            {parent.children.map((child) => (
              <div key={child.key}>
                <label htmlFor={child.key}>
                  <span class="visuallyhidden">{child.title}</span>
                </label>
                <input
                  type="checkbox"
                  id={child.key}
                  name={child.key}
                  onChange={handleStateChange}
                  data-parent-key={parent.key}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Controls;
