import { Page, Navbar } from "framework7-react";
import { observer } from "mobx-react";
import { ViewerAccount, ViewerAvatar } from "entities/viewer";
import { DepositBitcoinBlock } from "features/deposit-bitcoin";

export const ProfilePage = observer(() => {
  return (
    <Page>
      <Navbar title="My Profile" />
      <div className="flex items-center justify-between p-4">
        <div>Здравствуй!</div>
        <ViewerAvatar></ViewerAvatar>
      </div>

      <ViewerAccount></ViewerAccount>

      <DepositBitcoinBlock></DepositBitcoinBlock>
    </Page>
  );
});
