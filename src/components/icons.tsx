import type { SVGProps } from 'react';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12.4,5.1c-1.4,0-2.6,0.6-3.5,1.5c-0.9,0.9-1.5,2.2-1.5,3.5c0,2.8,2.3,5.1,5.1,5.1c1.3,0,2.6-0.5,3.5-1.5" />
      <path d="M10,13.7c-1.1,0.1-2.1,0.7-2.7,1.6c-0.6,0.9-0.8,2.1-0.5,3.2" />
      <path d="M15,20.5c-1.8,1-4,1.4-6.1,0.9" />
      <path d="M18.8,12.8c0.7,1.2,1,2.6,0.8,4c-0.2,1.4-0.8,2.7-1.8,3.7" />
      <path d="M8.4,9.6c0.7-0.9,1.7-1.4,2.8-1.6" />
      <path d="M15.8,3.6C14.9,2.7,13.7,2,12.4,1.7" />
      <path d="M4.2,12.8c-0.5-2.2-0.2-4.5,0.9-6.5c1.1-2,2.8-3.4,4.9-4.1" />
    </svg>
  ),
};
