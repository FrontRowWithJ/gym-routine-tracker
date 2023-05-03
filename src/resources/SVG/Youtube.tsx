export const Youtube = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      className="youtube-icon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="400"
      height="400"
      viewBox="0 0 400 400"
      {...{ onClick }}
    >
      <path
        d="M71.484 53.519 C 38.910 57.212,12.684 79.349,2.994 111.328 L 0.391 119.922 0.391 200.391 L 0.391 280.859 2.994 289.453 C 12.846 321.966,38.937 343.645,72.656 347.334 C 86.973 348.901,313.808 348.901,328.125 347.334 C 361.662 343.665,388.156 321.761,397.589 289.903 L 400.000 281.758 400.000 200.391 L 400.000 119.023 397.589 110.879 C 388.156 79.021,361.662 57.116,328.125 53.447 C 314.584 51.965,84.619 52.030,71.484 53.519 M332.771 72.967 L 345.372 75.622 355.221 82.320 L 365.070 89.019 371.741 99.002 L 378.413 108.984 381.004 121.819 L 383.594 134.653 383.594 200.391 L 383.594 266.128 381.004 278.963 L 378.413 291.797 371.741 301.779 L 365.070 311.762 355.221 318.461 L 345.372 325.159 332.771 327.814 L 320.169 330.469 200.391 330.469 L 80.612 330.469 68.011 327.814 L 55.409 325.159 45.560 318.461 L 35.712 311.762 29.040 301.779 L 22.368 291.797 19.778 278.963 L 17.188 266.128 17.188 200.391 L 17.188 134.653 19.778 121.819 L 22.368 108.984 29.040 99.002 L 35.712 89.019 45.573 82.312 L 55.434 75.605 67.365 73.032 L 79.297 70.460 199.733 70.386 L 320.169 70.313 332.771 72.967 M150.867 130.778 C 146.797 133.034,146.932 130.513,146.903 204.709 C 146.872 280.956,146.543 275.920,151.731 278.603 C 155.872 280.744,157.497 279.912,216.016 245.674 C 282.300 206.893,279.847 208.711,276.564 200.784 C 275.418 198.018,277.992 199.603,210.938 160.369 C 151.567 125.630,156.113 127.870,150.867 130.778 M208.030 179.297 C 231.491 193.047,250.444 204.527,250.148 204.809 C 249.852 205.090,232.031 215.589,210.547 228.139 C 189.063 240.688,169.814 251.968,167.773 253.205 L 164.063 255.454 164.063 204.615 C 164.063 176.654,164.357 153.893,164.718 154.036 C 165.078 154.180,184.569 165.547,208.030 179.297 "
        stroke="none"
        fill="white"
      ></path>
    </svg>
  );
};