# Fullstack TypeScript Template (Production Ready)

Современный и безопасный шаблон репозитория для быстрого старта fullstack-приложений. Инфраструктура полностью контейнеризирована, а архитектура типов подготовлена к бесшовному переходу на TypeScript 7.1+.

## Стек технологий

### Фронтенд (Frontend)
- **React 19** + **Vite 8**
- **TypeScript 6.0.3** (Мост к TS 7.1+) с флагами strict, verbatimModuleSyntax и erasableSyntaxOnly
- **React Router 7**
- **ESLint 10** + **typescript-eslint 8** (Строгая проверка типов на этапе линтинга)

### Бэкенд (Backend)
- **Node.js 20 (Alpine)** + **Express 4**
- **PostgreSQL 14** + нативный драйвер pg
- **Zod** (Валидация входящих запросов и схем данных)
- **JWT & Bcrypt** (Безопасная аутентификация)
- **Morgan** (Логирование HTTP-запросов)

### Инфраструктура (DevOps & Security)
- **Multi-stage Docker-сборка** отдельно для сред development и production
- **Безопасность (Non-root):** Запуск процессов бэкенда от имени USER node, а фронтенда на продакшене — через nginxinc/nginx-unprivileged
- **Автоматический патчинг уязвимостей:** Системные пакеты Alpine Linux обновляются командой apk upgrade в процессе сборки образов

## Структура проекта

```text
.
├── backend/                # Express API сервер
│   ├── src/                # Исходный код на TS
│   ├── tsconfig.json       # Конфигурация компилятора под TS 7.1+
│   └── Dockerfile          # Четырехэтапная сборка сервера
├── frontend/               # Клиентское React приложение
│   ├── src/                # Компоненты и контексты
│   ├── tsconfig.app.json   # Строгие настройки типов для Vite
│   └── Dockerfile          # Сборка статики и раздача через Nginx
├── database/               # Скрипты инициализации структуры PostgreSQL
├── docker-compose.yml      # Базовая конфигурация сервисов и сетей
├── docker-compose.dev.yml  # Переопределение для локальной разработки (с Hot Reload)
└── docker-compose.prod.yml # Переопределение для продакшена (минимальный вес, Nginx)
```

## Быстрый старт

### 1. Подготовка окружения
Клонируйте репозиторий и создайте файл .env в корневом каталоге проекта на основе следующих переменных:
```env
PORT=3001
DB_HOST=db
DB_PORT=5432
DB_USER=user
DB_PASSWORD=password
DB_NAME=mydb
JWT_SECRET=your_very_secret_key_here
VITE_API_URL=http://localhost:3001
```

### 2. Запуск в режиме разработки (Development)
В этом режиме папки проекта монтируются внутрь контейнеров через volumes. Изменения в коде фронтенда и бэкенда мгновенно отображаются в браузере (Hot Reload).

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```
- **Фронтенд:** http://localhost:5173
- **Бэкенд API:** http://localhost:3001
- **PostgreSQL:** Доступен локально на хосте через порт 5432

### 3. Запуск в режиме продакшена (Production)
В этом режиме код фронтенда компилируется в оптимизированную статику и раздается через легковесный защищенный веб-сервер Nginx. Исходный код не копируется в финальные контейнеры, а процессы работают без прав суперпользователя.

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```
- **Фронтенд (Nginx):** http://localhost (порт 80)
- **Бэкенд API:** http://localhost:3001 (изолирован внутри сети, порт 3001 проброшен для API-запросов)
- **PostgreSQL:** Закрыт от внешнего мира и доступен только бэкенду внутри Docker-сети

Для остановки контейнеров с очисткой данных базы используйте:
```bash
docker compose down -v
```

## Особенности кодовой базы (Готовность к TS 7.1)

В проекте жестко активированы флаги "verbatimModuleSyntax": true и "erasableSyntaxOnly": true. При написании кода соблюдайте новые правила экосистемы TypeScript:

1. **Импорт типов:** Все интерфейсы, типы и контракты должны импортироваться строго с указанием ключевого слова type:
   ```typescript
   // Правильно:
   import type { Request, Response } from 'express';
   import { type ReactNode, useState } from 'react';
   ```
2. **Конструкторы классов:** Сокращенный синтаксис инъекции зависимостей в конструкторах (через private/public в аргументах) запрещен. Свойства объявляются в теле класса:
   ```typescript
   // Правильно:
   export class AuthService {
     private userRepository: IUserRepository;
     constructor(userRepository: IUserRepository) {
       this.userRepository = userRepository;
     }
   }
   ```
3. **Неиспользуемые аргументы:** Если в параметрах функций (например, мидлварах Express) переменная должна быть объявлена, но не используется в теле, её имя должно начинаться с подчеркивания (_req, _next).