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
      <path d="M12 2a10 10 0 0 0-10 10c0 3.54 1.84 6.64 4.5 8.35" />
      <path d="M12 2v20" />
      <path d="M12 12a5 5 0 0 1 5-5h0a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5h-5" />
      <path d="M6.5 8.5c0-2.5 2-4.5 4.5-4.5" />
      <path d="M16.5 15.5c-2 0-3.5 1.5-3.5 3.5" />
    </svg>
  ),
};
