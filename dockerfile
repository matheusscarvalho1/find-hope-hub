FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . ./

RUN npm install -g serve

RUN npm run build


EXPOSE 3000

CMD ["serve", "--single", "dist", "-l", "3000"]

# docker build -t projeto-desenvolve-mt-app-by-matheus-carvalho .

# docker run -p 3000:3000 projeto-desenvolve-mt-app-by-matheus-carvalho