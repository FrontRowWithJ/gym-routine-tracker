import { IconProp } from "../misc/util";

const ShoulderIcon = ({ startColor, stopColor }: IconProp) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="752pt"
      height="752pt"
      viewBox="0 0 752 752"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="shoulder-bg">
          <stop offset="0%" stopColor={startColor}></stop>
          <stop offset="100%" stopColor={stopColor}></stop>
        </linearGradient>
      </defs>
      <g
        transform="translate(120,631.777777778) scale(0.100000,-0.100000)"
        fill="url('#shoulder-bg')"
        stroke="none"
      >
        <path
          d="M2034 4946 c-18 -14 -19 -31 -22 -315 l-3 -301 26 -26 c20 -20 32
-24 53 -19 44 11 52 24 52 87 l0 59 53 -39 c182 -133 391 -224 752 -326 257
-72 442 -134 519 -173 237 -120 398 -325 467 -595 18 -69 22 -117 24 -289 3
-190 5 -212 29 -288 29 -92 48 -171 73 -311 14 -79 17 -165 18 -520 1 -506 1
-505 91 -782 53 -164 91 -317 99 -402 10 -91 23 -125 51 -132 37 -9 74 4 84
30 20 54 -26 289 -105 534 -92 285 -89 264 -86 697 2 296 -1 410 -13 514 -17
144 -55 325 -86 417 -17 48 -20 84 -20 224 0 323 -62 534 -217 738 -165 216
-370 324 -878 462 -99 27 -225 65 -280 85 -209 75 -420 192 -526 292 l-49 46
0 157 c0 139 -2 159 -18 173 -23 21 -62 22 -88 3z"
        />
        <path
          d="M827 3872 c-21 -23 -22 -75 -2 -92 8 -7 47 -18 87 -26 95 -18 199
-68 273 -132 33 -29 69 -52 80 -52 37 0 65 28 65 64 0 71 -178 196 -336 236
-98 25 -146 26 -167 2z"
        />
        <path
          d="M1931 3875 c-140 -26 -259 -75 -358 -148 -73 -54 -86 -85 -56 -125
30 -41 60 -39 123 9 119 90 297 149 446 149 42 0 58 5 74 22 25 28 26 62 0 88
-24 24 -112 26 -229 5z"
        />
        <path
          d="M1406 2878 c-14 -19 -16 -68 -16 -331 l0 -308 25 -24 c28 -29 51 -31
83 -9 22 15 22 16 22 338 0 300 -1 324 -18 339 -27 25 -78 22 -96 -5z"
        />
        <path
          d="M3313 2572 c-12 -2 -26 -9 -32 -16 -6 -6 -15 -71 -21 -143 -19 -243
-74 -388 -190 -503 -150 -150 -339 -197 -754 -187 -225 5 -329 22 -401 67 -18
11 -44 20 -57 20 -49 0 -79 -68 -47 -106 22 -26 105 -63 191 -85 67 -17 126
-22 305 -26 343 -9 522 17 693 99 118 56 229 168 289 289 54 109 88 248 101
411 13 162 0 192 -77 180z"
        />
        <path
          d="M2436 2034 c-9 -8 -16 -31 -16 -49 0 -45 29 -65 95 -65 81 0 119 51
79 108 -13 19 -24 22 -79 22 -44 0 -68 -5 -79 -16z"
        />
        <path
          d="M1357 1963 c-131 -163 -265 -228 -495 -240 -106 -5 -114 -7 -133 -31
-23 -29 -19 -68 9 -90 23 -19 232 -10 322 13 198 51 410 213 410 314 0 59 -75
82 -113 34z"
        />
        <path
          d="M1410 1555 c-44 -53 -64 -304 -36 -463 9 -51 16 -147 16 -216 0 -143
11 -169 70 -169 50 0 60 22 60 127 l0 91 162 0 c235 0 308 22 308 91 0 27 -32
56 -62 56 -13 0 -70 -5 -128 -12 -68 -9 -136 -10 -193 -6 -83 7 -89 9 -98 34
-21 55 -23 235 -4 336 23 121 15 146 -44 146 -21 0 -44 -6 -51 -15z"
        />
        <path
          d="M3100 1542 c-19 -16 -22 -28 -23 -97 0 -44 1 -123 3 -175 4 -90 3
-98 -25 -149 -34 -61 -99 -122 -168 -157 -56 -29 -76 -62 -59 -99 7 -14 23
-30 37 -37 21 -9 34 -6 87 20 34 17 64 29 67 27 9 -9 -82 -359 -125 -481 -57
-160 -62 -189 -39 -214 20 -23 63 -26 88 -7 40 30 141 354 202 653 21 99 39
180 40 182 1 1 20 -26 42 -60 l41 -63 6 -130 c9 -200 58 -478 93 -533 12 -19
21 -23 56 -20 62 4 66 27 33 179 -35 166 -45 238 -52 409 l-6 145 -49 72 c-83
121 -126 224 -138 329 -6 50 -8 111 -5 136 5 38 3 49 -15 67 -26 26 -61 27
-91 3z"
        />
      </g>
    </svg>
  );
};

export default ShoulderIcon;
