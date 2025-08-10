# Unsplash Images Viewer

Веб-приложение для просмотра и поиска изображений с Unsplash API с пагинацией и красивым интерфейсом.

## Возможности

- Поиск изображений по ключевым словам
- Пагинация результатов
- Красивые карточки изображений с информацией об авторах
- Адаптивный дизайн
- Быстрая загрузка с состояниями загрузки
- Современный UI с Tailwind CSS

## Технологии

- Vue 3 (Composition API)
- Tailwind CSS
- Axios
- Vite для сборки

## Установка и запуск

1. Клонируйте репозиторий:

```bash
git clone https://github.com/1yuken/unsplash-images
cd unsplash-images
```

2. Установите зависимости:

```bash
npm install
```

3. Получите API ключ Unsplash:
   - Зарегистрируйтесь на [developer.unsplash.com](https://developer.unsplash.com)
   - Создайте новое приложение
   - Скопируйте Access Key

4. Создайте файл `.env` в корне проекта:

```env
VITE_UNSPLASH_ACCESS_KEY=ваш_ключ_доступа
```

5. Запустите приложение:

```bash
npm run dev
```

6. Откройте браузер и перейдите по адресу `http://localhost:5173`
