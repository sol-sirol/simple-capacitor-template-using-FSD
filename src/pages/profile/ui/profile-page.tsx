import { Page, Navbar, Block } from "framework7-react";
import { observer } from "mobx-react";
import { profilePageStore } from "../model/store";
import { useEffect } from "react";
import { BitcoinIcon } from "shared/ui/icons";

export const ProfilePage = observer(() => {
  const { points, getPoints } = profilePageStore;

  useEffect(() => {
    const interval = setInterval(() => {
      getPoints(10)
    }, 1500)

    return () => {clearInterval(interval)}
  }, [])

  return (
    <Page name="profile">
      <Navbar title="My Profile" />
      <Block>Количество очков: {points}</Block>
      <BitcoinIcon></BitcoinIcon>
      
    </Page>
  );
});
