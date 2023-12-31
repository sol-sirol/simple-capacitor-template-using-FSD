import { Capacitor } from "@capacitor/core";
import { Network } from "@capacitor/network";
import { App as RootApp, View, f7, f7ready } from "framework7-react";
import { useEffect, useRef } from "react";
import {
  addHapticListeners,
  handleBackButton,
  handleKeyboard,
  toast,
} from "shared/lib/f7-helpers";
import { ErrorBoundary } from "shared/ui/error-boundary";
import { UpdateModal } from "shared/ui/update-modals";
import { routes } from "./routes";

declare global {
  interface Window {
    inDev: () => void;
  }
}

const f7params = {
  name: "NameApp",
  id: "ru.apptor.app",
  dialog: {
    buttonOk: "Oк",
    buttonCancel: "Отмена",
  },
  navbar: {
    //mdCenterTitle: true//центрирование тайтла в навбаре на андроид
  },
  // specify routes for app
  routes: routes,
};

const App = () => {
  let toastOffline: any = useRef(null);

  useEffect(() => {
    networkConnectionHandler();

    window.inDev = () => toast("Функция в разработке");

    //блур с активного элемента при переходе между экранами
    f7.views.main.router.on(
      "routeChange",
      (newRoute, previousRoute, router) => {
        //@ts-ignore
        window.document.activeElement.blur();
      }
    );

    if (Capacitor.isNativePlatform()) {
      //  window.screen.orientation.lock("portrait");
      handleBackButton();
      handleKeyboard();
      addHapticListeners();
    }
  }, []);

  const networkConnectionHandler = async () => {
    toastOffline.current = f7.toast.create({
      horizontalPosition: "center",
      text: "Проблемы с интернет соединением...",
    });

    if (Capacitor.isNativePlatform()) {
      const networkStatus = await Network.getStatus();
      changeShowToastOffline(networkStatus.connected);
      Network.addListener("networkStatusChange", (status) => {
        changeShowToastOffline(status.connected);
      });
    } else {
      changeShowToastOffline(window.navigator.onLine);
      window.addEventListener("online", () => {
        changeShowToastOffline(true);
      });
      window.addEventListener("offline", () => {
        changeShowToastOffline(false);
      });
    }
  };

  const changeShowToastOffline = (isOnline: boolean) => {
    if (isOnline) {
      toastOffline.current.close();
    } else {
      toastOffline.current.open();
    }
  };

  f7ready(() => {
    // Call F7 APIs here
  });

  return (
    //@ts-ignore
    <ErrorBoundary>
      <RootApp {...f7params}>
        {/* TODO: Зачем этот комментарий? "Your main view, should have "view-main" class" */}
        {/* Your main view, should have "view-main" class */}
        <View main className="safe-areas" url="/main" />
        <UpdateModal />
      </RootApp>
    </ErrorBoundary>
  );
};
export default App;
