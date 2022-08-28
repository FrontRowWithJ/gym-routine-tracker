import { IconProp } from "../misc/util";
const LegIcon = ({ startColor, stopColor }: IconProp) => {
  return (
    <svg
      width="752pt"
      height="752pt"
      version="1.1"
      viewBox="0 0 752 752"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="leg-bg">
          <stop offset="0%" stopColor={startColor}></stop>
          <stop offset="100%" stopColor={stopColor}></stop>
        </linearGradient>
      </defs>
      <g fill="url('#leg-bg')">
        <path d="m393.65 300.73v-0.054687c-0.003907-0.019531-0.003907-0.042969 0-0.0625-2.5391-7.75-6.9688-14.746-12.895-20.352-2.043-1.8125-5.168-1.625-6.9805 0.41797-1.8164 2.043-1.6289 5.168 0.41406 6.9844 0.074219 0.066406 7.1875 6.5938 10 15.836 17.926 65.57-18.5 108.66-18.879 109.07-0.53516 0.62109-0.91406 1.3633-1.1016 2.1641-8.5391 37.922-9.5547 93.422-9.5938 95.762h0.003907c-0.023438 1.4258 0.56641 2.7891 1.6289 3.7461 7.6758 6.8555 13.414 15.609 16.648 25.379 2.2227 6.5742 1.1172 13.816-2.9688 19.426-4.0938 5.7617-10.738 9.1719-17.809 9.1289h-2.3125c-1.6836 0.003906-3.3164-0.57422-4.6211-1.6367-2.8945-2.3438-6.4688-3.6875-10.188-3.8281-3.7227-0.14062-7.3867 0.92578-10.449 3.043l-1.6094 1.1211v-0.003906c-1.2227 0.85547-2.6758 1.3086-4.1641 1.3047h-82.301c-1.5352 0-2.7773-1.2422-2.7773-2.7734-0.003906-1.3125 0.91016-2.4453 2.1914-2.7227 34.223-6.4102 56.125-22.375 68.531-34.629 7.7266-7.6836 11.148-18.695 9.1406-29.406-21.055-114.58-11.766-223.46-11.664-224.6 0.03125-0.34375 0.03125-0.69141 0-1.0352-5.918-48.199 28.352-53.148 29.793-53.324 0.46094-0.054688 0.91406-0.17969 1.3398-0.36328l37.359-15.723c30.758-13.039 63.824-19.75 97.23-19.73h3.1016c2.6406-0.11328 4.7227-2.2891 4.7227-4.9336 0-2.6445-2.082-4.8203-4.7227-4.9336h-3.1016c-34.727-0.039062-69.105 6.918-101.09 20.457l-36.777 15.531c-10.891 2.0586-20.676 7.9688-27.566 16.648-9.0664 11.555-12.488 27.398-10.176 47.098-0.68359 8.418-8.7031 114.9 11.82 226.67l0.003907 0.003906c1.4219 7.5-0.96094 15.215-6.3633 20.605-11.422 11.293-31.688 26-63.414 31.957h-0.003906c-6.3789 1.2617-10.762 7.1562-10.137 13.629 0.62109 6.4727 6.0508 11.418 12.555 11.441h82.258-0.003907c3.5039 0.007812 6.9258-1.0664 9.7969-3.0742l1.6094-1.1211v0.003906c2.6758-1.8438 6.2422-1.707 8.7695 0.33203 3.0625 2.4922 6.8906 3.8555 10.84 3.8594h2.3125c10.246 0.042969 19.875-4.9102 25.797-13.273 5.9766-8.1875 7.5859-18.773 4.3203-28.371-3.5195-10.641-9.5977-20.258-17.695-28.008 0.27734-10.629 1.8516-57.645 9.0547-90.414 5.8906-7.2812 38.203-51.227 20.117-117.25z" />
        <path d="m520.61 281.43c-1.8359 1.1602-3.7695 2.1562-5.7812 2.9766-31.902 12.977-71 15.012-98.184 14.402-1.3398-0.078126-2.6562 0.39062-3.6406 1.3008-0.98828 0.91016-1.5586 2.1797-1.5898 3.5234-0.027343 1.3398 0.48828 2.6367 1.4375 3.5898 0.94531 0.94922 2.2383 1.4766 3.5781 1.4531 2.7695 0.0625 5.6523 0.09375 8.6484 0.10156 27.379 0 63.305-2.9414 93.477-15.234h0.003906c2.5508-1.0391 5.0039-2.3047 7.332-3.7812 1.1289-0.6875 1.9336-1.8008 2.2305-3.0898 0.30078-1.2891 0.070312-2.6406-0.63672-3.7578-0.71094-1.1172-1.8359-1.9023-3.1289-2.1797-1.293-0.27734-2.6406-0.023438-3.7461 0.70312z" />
        <path d="m333.55 327.11c-1.3008-0.17188-2.6211 0.18359-3.6602 0.98438-1.043 0.80078-1.7227 1.9844-1.8906 3.2891-5.6328 44.02 17.574 68.492 18.555 69.512v-0.003906c1.9102 1.9023 4.9922 1.9219 6.9258 0.042969s2.0039-4.957 0.16016-6.9219c-0.21094-0.21094-20.887-22.023-15.855-61.379l0.003907-0.003906c0.34766-2.6914-1.5469-5.1602-4.2383-5.5195z" />
        <path d="m480.64 231.15c-2.6406 0.11328-4.7227 2.2891-4.7227 4.9336 0 2.6445 2.082 4.8203 4.7227 4.9375 5.3359 0.015624 10.664 0.32422 15.965 0.92187 0.18359 0.011719 0.36719 0.011719 0.54688 0 2.6016-0.027343 4.7344-2.0664 4.8789-4.6641 0.14062-2.5977-1.75-4.8594-4.332-5.1758-5.6562-0.61719-11.34-0.92578-17.027-0.92578z" />
        <path d="m385.75 257.37c-2.1016 1.7305-2.4023 4.8398-0.67188 6.9414 1.7344 2.1016 4.8398 2.4023 6.9453 0.66797 0.25-0.19531 24.742-20.043 63.434-23.457 2.543-0.41406 4.3438-2.7188 4.125-5.2891-0.21875-2.5742-2.3789-4.543-4.957-4.5234-41.734 3.6992-67.781 24.762-68.875 25.66z" />
      </g>
    </svg>
  );
};

export default LegIcon;
