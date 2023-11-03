FROM node:18

WORKDIR /usr/src/app/client

COPY . .

RUN npm i
RUN npm run build

WORKDIR /usr/src/app/backend
RUN npm i

EXPOSE 3005

CMD ["npm", "run", "serve"]