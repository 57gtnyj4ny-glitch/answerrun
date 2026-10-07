# AnswerRun — запуск и распространение игры

Для iPhone самый быстрый путь — установить игру с GitHub Pages как веб-приложение на экран «Домой». Отдельная публикация в App Store не нужна. После первой загрузки игра кэшируется и может запускаться без сети. Также остаётся возможность собирать настольные и нативные приложения.

## Опубликовать ссылку и запустить на iPhone

1. Создать **публичный** репозиторий на GitHub.
2. Загрузить в него файлы этого проекта, включая папки `.github` и `icons` (проще всего через GitHub Desktop: добавить существующую папку как репозиторий, сделать commit и нажать **Publish repository**; при публикации выбрать Public).
3. Открыть **Settings → Pages** и выбрать **GitHub Actions** как источник публикации.
4. Во вкладке **Actions** запустить workflow **Publish iPhone-ready game** (или внести изменение в ветку `main`/`master`).
5. Когда workflow завершится, взять адрес сайта из шага Deploy или из **Settings → Pages**. Обычно он имеет вид `https://<имя-пользователя>.github.io/<имя-репозитория>/`.
6. На iPhone открыть эту ссылку именно в Safari → нажать **Поделиться** → **На экран Домой** → **Добавить**. Игра появится отдельной иконкой и откроется без панели браузера.

Для публикации публичной ссылки нужен публичный репозиторий. Если репозиторий закрытый, доступ к нему и игре будет ограничен его участниками. Изменения в `runner.html` автоматически попадут в игру после следующего успешного запуска Pages workflow.

Профиль, монеты, купленные образы и рекорды сейчас хранятся локально в браузере каждого игрока; общего онлайн-рейтинга без серверной части нет.

## Нативные приложения

- Windows: установщик `.exe`.
- macOS: образ `.dmg`.
- Linux: `.AppImage`.
- Android: тестовый установочный `.apk`.
- iPhone/iPad: нативная сборка создаётся через Capacitor и Xcode на Mac. Для установки на реальные устройства и публикации в App Store потребуются подпись приложения и Apple Developer account.

Для локальной сборки настольных и нативных приложений нужны Node.js 22 или новее и npm.

```sh
npm install
npm run desktop
npm run desktop:build -- --win nsis
npm run desktop:build -- --mac dmg
npm run desktop:build -- --linux AppImage
```

Для Android нужен Android Studio с установленным Android SDK и JDK 21:

```sh
npm run android:add
npx cap sync android
cd android
./gradlew assembleDebug
```

APK для проверки появится в `android/app/build/outputs/apk/debug/app-debug.apk`. Для публикации в Google Play нужен подписанный release AAB/APK и ключ подписи; debug APK предназначен для ручной установки и тестирования.

Для iOS нужен компьютер Mac с Xcode:

```sh
npm install
npm run ios:add
npx cap sync ios
npx cap open ios
```

Подпись приложения и публикация в App Store настраиваются в Xcode; для распространения через App Store потребуется Apple Developer account.

GitHub Actions также может собирать установщики. Запуск workflow **Build installable apps** создаёт тестовые артефакты для настольных систем и Android. При создании тега `v*` workflow приложит их к GitHub Release.

Для Android debug APK годится для тестовой установки, но публикация в Google Play требует подписанной release-сборки и аккаунта Google Play Console.
