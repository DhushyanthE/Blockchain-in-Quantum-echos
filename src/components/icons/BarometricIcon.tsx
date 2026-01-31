
import { SVGProps } from "react";

export function BarometricIcon(props: SVGProps<SVGSVGElement>) {
  return (
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
      <path d="M12 22V2" />
      <path d="M17 7 12 2 7 7" />
      <path d="M22 12H2" />
      <path d="m17 12 5 5-5 5" />
    </svg>
  );
}

export default BarometricIcon;
