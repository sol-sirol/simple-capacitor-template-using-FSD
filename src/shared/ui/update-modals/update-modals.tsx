import {
  Block,
  BlockTitle,
  f7,
  Page,
  PageContent,
  Popup,
  Progressbar,
} from "framework7-react";
import { forwardRef, useEffect, useState } from "react";

import { CapacitorUpdater, DownloadEvent } from "@capgo/capacitor-updater";

export const UpdateModal = forwardRef(() => {
  const [opened, setOpened] = useState(false);
  const [toast, setToast] = useState<boolean>(false);
  const [toastDone, setToastDone] = useState<boolean>(false);
  const [done, setDone] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    if (toast) {
      f7.toast
        .create({
          text: "Мы начали обновлять приложение, не закрывайте его до окончания обновления!",
          position: "top",
          closeTimeout: 3000,
        })
        .open();
    }
  }, [toast]);

  useEffect(() => {
    if (toastDone) {
      f7.toast
        .create({
          text: "Обновление завершено, перезапустите приложение",
          position: "top",
          closeTimeout: 3000,
        })
        .open();
    }
  }, [toastDone]);

  const update = async () => {
    let currentVersion = (await CapacitorUpdater.current()).bundle.version;
    let latestVersion = (await CapacitorUpdater.getLatest()).version;
    currentVersion = currentVersion === "builtin" ? "1.0.0" : currentVersion;
    setPercent(0);

    CapacitorUpdater.addListener("download", (state: DownloadEvent) => {
      const [curMajor, curMiddle, curMinor] = currentVersion.split(".");
      const [ltsMajor, ltsMiddle, ltsMinor] = latestVersion.split(".");
      // setOpened(true);
      if (+ltsMajor - +curMajor > 0 || +ltsMiddle - +curMiddle > 0) {
        setOpened(true);
        setPercent(state.percent);
      } else {
        setToast(true);
        f7.progressbar.show(state.percent);
      }
    });
    CapacitorUpdater.addListener("updateAvailable", () => {
      const [curMajor, curMiddle, curMinor] = currentVersion.split(".");
      const [ltsMajor, ltsMiddle, ltsMinor] = latestVersion.split(".");
      setTimeout(() => {
        f7.progressbar.hide();
        if (+ltsMajor - +curMajor > 0 || +ltsMiddle - +curMiddle > 0) {
          setDone(true);
        } else {
          setToastDone(true);
        }
      }, 1000);
    });
    CapacitorUpdater.addListener("downloadFailed", () => {
      f7.progressbar.hide();
      setOpened(false);
    });
    CapacitorUpdater.addListener("updateFailed", () => {
      f7.progressbar.hide();
      setOpened(false);
    });
  };

  return (
    <>
      <Popup
        opened={opened}
        swipeToClose={false}
        style={{
          zIndex: 999999,
        }}
      >
        <Page pageContent={false}>
          <PageContent>
            {!done ? (
              <div className=" flex h-2/3 items-center justify-center flex-col mx-1">
                <svg
                  className="animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="100"
                  height="100"
                  x="0"
                  y="0"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <g fillRule="evenodd" clipRule="evenodd">
                      <circle
                        cx="256"
                        cy="256"
                        r="256"
                        fill="var(--f7-theme-color)"
                        opacity="1"
                        data-original="#ffa726"
                      ></circle>
                      <g fill="#fffffe">
                        <path
                          d="M327 376c44.8-25.5 72.6-73.3 72.6-124.7 0-63.8-42.3-120-103.2-137.8l-8.7 32.8c46.1 13.9 78.1 56.6 78.1 105.1 0 39.4-21.3 76-55.6 95.4-1.8 1-4.1.1-4.7-1.8l-7.9-23.6-33.6 71 78.2 6.4-16-17.7c-1.4-1.7-1.1-4.1.8-5.1zM201.9 165.4c1.8-1 4.1-.1 4.7 1.8l7.9 23.6 33.6-71.1-78.3-6.4 16 17.7c1.4 1.6 1 4-.8 5.1-44.7 25.5-72.5 73.3-72.5 124.7 0 63.8 42.3 120 103.2 137.8l8.7-32.7c-46.1-13.9-78.1-56.5-78.1-105.1.1-39.4 21.3-75.9 55.6-95.4z"
                          fill="#fffffe"
                          opacity="1"
                          data-original="#fffffe"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
                <BlockTitle medium style={{ textAlign: "center" }}>
                  Что-то новенькое!
                </BlockTitle>

                <Block style={{ width: "100%", textAlign: "center" }}>
                  {percent} %
                  <Progressbar className="margin-top-half" progress={percent} />
                </Block>
                <Block style={{ textAlign: "center" }}>
                  Идет установка обновления приложения. Пожалуйста, подождите.
                  После обновления приложение станет лучше.
                </Block>
                <div></div>
              </div>
            ) : (
              <div className=" flex h-2/3 items-center justify-center flex-col">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="100"
                  height="100"
                  x="0"
                  y="0"
                  viewBox="0 0 2.54 2.54"
                  fill-rule="evenodd"
                >
                  <g>
                    <circle
                      cx="1.27"
                      cy="1.27"
                      r="1.27"
                      fill="var(--f7-theme-color)"
                      opacity="1"
                    ></circle>
                    <path
                      fill="#ffffff"
                      d="M.873 1.89.41 1.391a.17.17 0 0 1 .008-.24.17.17 0 0 1 .24.009l.358.383.567-.53a.17.17 0 0 1 .016-.013l.266-.249a.17.17 0 0 1 .24.008.17.17 0 0 1-.008.24l-.815.76-.283.263-.125-.134z"
                      opacity="1"
                      data-original="#ffffff"
                    ></path>
                  </g>
                </svg>
                <Block style={{ textAlign: "center" }}>
                  Мы только что обновили приложение, просто перезапустите его. В
                  каждой версии добавляем новые фичи, улучшаем стабильность и
                  стремимся к недостижимому идеалу.
                </Block>
              </div>
            )}
          </PageContent>
        </Page>
      </Popup>
      {/* <p id="demo-determinate-container"></p>
      {percent >= 0 && (
        <Fab
          id={"update-progress-fab"}
          tooltip="Установка обновления"
          position="right-bottom"
          slot="fixed"
          style={{ zIndex: 10000000000000 }}
        >
          {percent.toString()}%
        </Fab>
      )} */}
    </>
  );
});
