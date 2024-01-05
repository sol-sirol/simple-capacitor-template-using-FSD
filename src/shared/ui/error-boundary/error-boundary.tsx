import { BlockTitle, Button } from "framework7-react";
import React from "react";

import styles from "./style.module.scss";

interface State {
  hasError: boolean;
}
interface Props {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<Props> {
  state: State = { hasError: false };

  componentDidMount() {
    window.onerror = () => {
      this.setState({ hasError: true });
    };
  }

  static getDerivedStateFromError(error: any) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    console.log(error, errorInfo);
  }

  onClick = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return (
        <div className={styles.container}>
          <BlockTitle className={styles.title} style={{ color: "#19232D" }}>
            Что-то пошло не так...
            <br />
            Пожалуйста, попробуйте перезапустить приложение
          </BlockTitle>
          <Button
            fill
            className={`margin-top ${styles.button}`}
            large
            style={{ background: "var(--f7-theme-color)", color: "#fff" }}
            onClick={this.onClick}
          >
            Рестарт
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
