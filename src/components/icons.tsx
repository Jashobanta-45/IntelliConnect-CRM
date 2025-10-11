import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15.5 12.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M8.5 12.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M15.5 12.5a3.5 3.5 0 1 0 3.5 3.5" />
      <path d="M8.5 12.5a3.5 3.5 0 1 0 3.5 3.5" />
      <path d="M12 15.5a3.5 3.5 0 1 1-3.5-3.5" />
    </svg>
  ),
};
