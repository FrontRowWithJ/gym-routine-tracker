import { SVGProp } from "./SVGTypes";

export const BackButton = ({ fill }: SVGProp) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="512.000000pt"
      height="512.000000pt"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        stroke="none"
        fill={fill}
      >
        <path
          d="M3129 4036 c-26 -7 -64 -26 -85 -43 -78 -63 -1302 -1299 -1320 -1333
-25 -47 -25 -153 0 -200 23 -46 1308 -1334 1362 -1366 189 -112 405 93 307
291 -8 17 -272 288 -586 602 l-572 573 572 572 c616 619 598 597 596 704 -3
141 -135 237 -274 200z"
        />
      </g>
    </svg>
  );
};
