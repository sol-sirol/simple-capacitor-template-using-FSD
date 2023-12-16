import { HomePage } from "pages/home";
import { MainPage } from "pages/main/ui/main-page";
import { ProfilePage } from "pages/profile";

export const routes = [
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/main",
    component: MainPage,
  },
  {
    path: "/profile",
    component: ProfilePage,
  },
];
