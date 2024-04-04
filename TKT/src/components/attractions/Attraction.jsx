import React from "react";

const Attraction = ({ attraction }) => {
  return (
    <div className="attraction__container">
      <img src={attraction.imageAttraction} alt="" />
      <div className="attraction__details">
        <div className="attraction__header">
          <h2>{attraction.nomAttraction}</h2>
          <div className="attraction__requirements">
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="1215.000000pt"
              height="1280.000000pt"
              viewBox="0 0 1215.000000 1280.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <metadata>
                Created by potrace 1.15, written by Peter Selinger 2001-2017
              </metadata>
              <g
                transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path
                  d="M5850 12794 c-131 -12 -327 -38 -420 -55 -1386 -263 -2483 -1351
-2755 -2732 -50 -254 -59 -361 -59 -677 0 -307 9 -411 55 -650 224 -1162 1026
-2134 2119 -2568 467 -185 936 -263 1450 -241 1575 69 2915 1214 3230 2759 56
277 64 367 64 705 0 323 -7 406 -55 655 -157 810 -595 1536 -1241 2051 -507
405 -1102 653 -1758 735 -119 15 -535 26 -630 18z"
                />
                <path
                  d="M3335 4893 c-1042 -41 -2003 -543 -2634 -1376 -327 -432 -556 -955
-646 -1477 -48 -278 -48 -273 -52 -1177 l-4 -863 6076 0 6076 0 -4 863 c-4
916 -4 910 -56 1199 -147 805 -590 1547 -1236 2067 -352 283 -748 492 -1175
620 -384 115 -681 151 -1261 151 l-296 0 -21 -58 c-30 -81 -113 -216 -182
-296 -288 -333 -782 -533 -1475 -596 -155 -14 -585 -14 -740 0 -793 72 -1333
327 -1584 748 -28 48 -61 113 -73 144 l-21 58 -311 -2 c-171 -1 -342 -3 -381
-5z"
                />
              </g>
            </svg>
            <p>{attraction.tailleMinRequise}</p>
          </div>
        </div>
        <p className="attraction__description">{attraction.descAttraction}</p>
        <button className="attraction__more-info">En savoir plus</button>
      </div>
    </div>
  );
};

export default Attraction;
