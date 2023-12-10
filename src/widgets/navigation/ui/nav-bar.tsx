import { Toolbar } from "framework7-react";
import { NavBarLink } from "./nav-bar-link";

export const NavBar = () => {
  return (
    <Toolbar
      bottom
      tabbar
      style={{zIndex: 10000}}
    >
      <NavBarLink tabLink="#tab-home" tabLinkActive>
        home
      </NavBarLink>
      <NavBarLink tabLink="#tab-profile">
        profile
      </NavBarLink>
    </Toolbar>
  );
};
