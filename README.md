# Инструкция по старту проекта

- Удалить все содержимое папок entities, features
- Удалить папку pages/profile
- Удалить иконку shared/ui/icons/bitcoin-icon.tsx
- Удалить import ProfilePage и соответствующий роут в файле app/routes.ts
- Удалить шрифты shared/assets/fonts/\* (Добавить используемые в номом проекте шрифты)
- Удалить из директории shared/lib/hooks хуки, которые не будут использоваться в проекте
- Подключить шрифты в файле app/styles/\_fonts.scss
- Пройтись по всем файлам app/styles/\*.scss, чтобы удалить комментарии и произвести настройки стилей вашего проекта
- В файле capacitor.config измените свойства appId и appName для вашего проекта
- В файле app/App измените свойства name и id в объекте f7params для вашего проекта
- В файле README измените "Вопросы для обсуждения / на что обратить внимание (TODO)" на "На что обратить внимание (specificities)"
<!-- - Произвести настройки tailwind (по необходимости) -->

### Обратите внимание

- В сборке используется [twMerge](https://www.npmjs.com/package/tailwind-merge)

## Сборка

Для запуска проекта используйте команду

```bash
npm start
```

Добавить платформы

```bash
npm cap add android
npm cap add ios
```

Сборка проекта

```bash
npm run build
```

Синхронизация

```bash
npm cap sync
```

Открыть редактор платформы

```bash
npm cap open android
npm cap open ios
```

## Иконки

Для иконок используется плагин [@capacitor/assets](https://capacitorjs.com/docs/guides/splash-screens-and-icons)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
To learn Capacitor, check out the [Capacitor documentation](https://capacitorjs.com/docs/).
To learn Feature-Sliced Design (FSD), check out the [FSD documentation](https://feature-sliced.design/ru/docs).

### Вопросы для обсуждения / на что обратить внимание (TODO)

- Зачем этот комментарий? "Your main view, should have "view-main" class"
- Обсудить реализацию табов (возможно текущая схема не оптимальна (возможно стоит перенести табы в апп?))
- Убрать не корректные примеры из стилей
- Актуален ли фикс анимации прелоадера от Артема
- Нужен ли файл shared/lib/constants ? (Стоит обсудить)
- Одобрим ли twMerge ? (Стоит обсудить)
- Разобраться и с index.html
- Разобраться с настройками tailwind
