import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { Keyboard } from "@capacitor/keyboard";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { SplashScreen } from "@capacitor/splash-screen";
import { f7, f7ready } from "framework7-react";

export const alert = (text: string) => {
  f7ready(() => {
    f7.dialog.alert(text);
  });
};

export const confirm = (
  text = "",
  title = "",
  callbackOk = () => {},
  callbackCancel = () => {}
) => {
  f7ready(() => {
    f7.dialog.confirm(text, title, callbackOk, callbackCancel);
  });
};

export const prompt = (
  text = "",
  title = "",
  callbackOk = () => {},
  callbackCancel = () => {},
  defaultValue = ""
) => {
  f7ready(() => {
    f7.dialog.prompt(text, title, callbackOk, callbackCancel, defaultValue);
  });
};

export const preloader = {
  show: () => {
    f7ready(() => f7.preloader.show());
  },
  hide: () => {
    f7ready(() => f7.preloader.hide());
  },
};

export const toast = (text = "", subtitle = "") => {
  f7ready(() => {
    f7.notification
      .create({
        title: f7.name,
        titleRightText: "",
        subtitle: subtitle,
        text: text,
        closeTimeout: 3000,
      })
      .open();
  });
};

export const LoadScreen = (url: string, props?: any) => {
  let current_view: string = "main";
  if (f7.views.current.name) current_view = f7.views.current.name;
  //@ts-ignore
  f7ready(() => f7.view[current_view]?.router.navigate(url, { ...props }));
};

export const goBack = (props?: any) => {
  let current_view = "main";
  if (f7.views.current.name) current_view = f7.views.current.name;
  //@ts-ignore
  f7ready(() => f7.views[current_view].router.back({ ...props }));
};

//показ сплешскрина на 2 секунды
export const handleSplashscreen = () => {
  f7ready(() => {
    SplashScreen.hide();
  });
};

//слушатель с обработкой правильного поведения при нажатии на системную кнопку назад
export const handleBackButton = () => {
  f7ready(() => {
    document.addEventListener("backbutton", (e) => {
      if (f7.$(".actions-modal.modal-in").length) {
        f7.actions.close(".actions-modal.modal-in");
        e.preventDefault();
        return;
      }
      if (f7.$(".dialog.modal-in").length) {
        f7.dialog.close(".dialog.modal-in");
        e.preventDefault();
        return;
      }
      if (f7.$(".sheet-modal.modal-in").length) {
        f7.sheet.close(".sheet-modal.modal-in");
        e.preventDefault();
        return;
      }
      if (f7.$(".popover.modal-in").length) {
        f7.popover.close(".popover.modal-in");
        e.preventDefault();
        return;
      }
      if (f7.$(".popup.modal-in").length) {
        if (f7.$(".popup.modal-in>.view").length) {
          const currentView = f7.views.get(".popup.modal-in>.view");
          if (
            currentView &&
            currentView.router &&
            currentView.router.history.length > 1
          ) {
            currentView.router.back();
            e.preventDefault();
            return;
          }
        }
        f7.popup.close(".popup.modal-in");
        e.preventDefault();
        return;
      }
      if (f7.$(".login-screen.modal-in").length) {
        f7.loginScreen.close(".login-screen.modal-in");
        e.preventDefault();
        return;
      }

      if (f7.$(".page-current .searchbar-enabled").length) {
        f7.searchbar.disable(".page-current .searchbar-enabled");
        e.preventDefault();
        return;
      }

      if (f7.$(".page-current .card-expandable.card-opened").length) {
        f7.card.close(".page-current .card-expandable.card-opened");
        e.preventDefault();
        return;
      }

      const currentView = f7.views.current;
      if (
        currentView &&
        currentView.router &&
        currentView.router.history.length > 1
      ) {
        currentView.router.back();
        e.preventDefault();
        return;
      }

      if (f7.$(".panel.panel-in").length) {
        f7.panel.close(".panel.panel-in");
        e.preventDefault();
        return;
      }

      confirm("Закрыть приложение?", "", () => {
        //cordova
        //window.navigator.app.exitApp();
        App.exitApp();
      });
      return;
    });
  });
};

export const handleKeyboard = () => {
  if (Capacitor.isNativePlatform()) {
    Keyboard.setAccessoryBarVisible({ isVisible: false });

    Keyboard.addListener("keyboardDidHide", () => {
      f7.$(".toolbar.tabbar").show();
      f7.$(".fab").show();
    });

    Keyboard.addListener("keyboardWillShow", () => {
      f7.$(".toolbar.tabbar").hide();
      f7.$(".fab").hide();
      f7.input.scrollIntoView(".input-focused", 200, true, true);
    });
  }
};

export const addHapticListeners = () => {
  f7ready(() => {
    f7.on("ptrRefresh", () => {
      Haptics.impact({
        style: ImpactStyle.Heavy,
      });
    });
    f7.on("toggleChange", () => {
      Haptics.impact({
        style: ImpactStyle.Heavy,
      });
    });
  });
};