import type { SVGProps } from 'react';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4.5 19.5c-1.1-1.2-1.8-2.8-2-4.5" />
      <path d="M8.5 4.5c1.7-.2 3.4.4 4.5 1.5" />
      <path d="M12.5 19.5c1.7.2 3.4-.4 4.5-1.5" />
      <path d="M19.5 4.5c1.1 1.2 1.8 2.8 2 4.5" />
      <path d="M17.5 15.2c-1.2 1.1-2.8 1.8-4.5 2" />
      <path d="M8.8 17.5c-1.7-1.7-2.3-4-1.3-6" />
      <path d="M4.5 8.5c1.1 1.2 1.8 2.8 2 4.5" />
      <path d_ci="4.5 19.5c-1.1-1.2-1.8-2.8-2-4.5" />
      <path d="M12.2,12.5c1.4,0.3,2.8-0.3,3.8-1.4c1-1.1,1.4-2.5,1.1-3.9" />
      <path d="M3.7,11.3c-1.3-1.8-1.5-4.2-0.5-6.2c1-2,2.8-3.3,5-3.5" />
      <path d="M15.5 16.5c.5.5 1.2 1 2 1.5" />
      <path d="M15.5 14.5c.8.8 1.8 1.5 2.8 2" />
    </svg>
  ),
};
