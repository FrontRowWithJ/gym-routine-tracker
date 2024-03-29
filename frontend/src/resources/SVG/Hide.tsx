import { SVGProp } from "./SVGTypes";

export const Hide = ({ fill, onClick, className }: SVGProp) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="256.000000pt"
      height="256.000000pt"
      viewBox="0 0 256.000000 256.000000"
      preserveAspectRatio="xMidYMid meet"
      {...{ onClick, className }}
    >
      <g
        transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
        fill={fill}
        stroke="none"
      >
        <path
          d="M2224 1119 c-217 -223 -529 -399 -788 -445 -329 -58 -719 89 -1052
398 -112 103 -112 102 -129 88 -25 -20 -17 -52 22 -92 l36 -37 -73 -83 c-41
-46 -82 -92 -92 -104 -21 -24 -15 -50 13 -59 26 -9 36 -1 124 98 42 48 81 87
85 87 3 0 43 -28 86 -62 44 -35 90 -70 102 -78 l23 -15 -66 -100 c-74 -114
-84 -140 -62 -162 22 -23 48 -8 81 45 51 81 99 157 106 165 5 6 199 -80 249
-111 3 -1 -12 -55 -33 -120 -40 -130 -42 -144 -22 -161 32 -26 53 4 93 130
l37 121 31 -5 c16 -2 78 -12 138 -22 l107 -18 0 -127 c0 -114 2 -129 20 -145
19 -17 21 -17 40 0 18 16 20 31 20 145 l0 128 83 11 c45 7 108 19 141 27 32 9
62 12 66 7 4 -4 24 -63 45 -131 l39 -123 30 3 c43 4 43 25 2 155 -20 60 -36
116 -35 124 0 8 50 39 112 69 62 30 115 56 118 58 5 2 56 -72 133 -195 26 -43
51 -54 74 -31 20 20 15 34 -58 150 -38 62 -70 115 -70 119 0 8 193 159 203
159 2 0 43 -45 92 -100 85 -97 108 -113 133 -88 23 23 11 44 -78 141 -49 53
-90 100 -90 103 0 4 16 24 35 46 28 30 33 42 26 57 -25 46 -36 44 -97 -20z"
        />
      </g>
    </svg>
  );
};
