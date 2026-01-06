FROM node:22-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . ./

RUN pnpm run build

RUN npm add -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]

# docker build -t find-hope-hub .

# docker run -p 3000:3000 find-hope-hub