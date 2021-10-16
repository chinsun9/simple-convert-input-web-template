import React from 'react';

// icon from https://loading.io/
function LoadingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g transform="translate(50,50)">
        <g transform="rotate(0)">
          <circle cx="0" cy="0" r="12" fill="#1d3f72" fillOpacity="1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="0s"
              values="0.01 0.01;1 1"
              keyTimes="0;1"
              dur="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity"
              keyTimes="0;1"
              dur="1s"
              repeatCount="indefinite"
              values="1;0"
              begin="0s"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
}

export default LoadingIcon;
