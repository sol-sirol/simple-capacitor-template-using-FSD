import { Link } from "framework7-react";
import { LinkProps } from "framework7-react/components/link";

export const NavBarLink = ({ children, ...props }: LinkProps) => {
  return (
    <Link
      {...props}
    >
      {children}
    </Link>
  );
};
