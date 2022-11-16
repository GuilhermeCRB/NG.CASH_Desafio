FROM node

WORKDIR /usr/src

EXPOSE 4000

COPY . .

RUN npm i && npm run build

CMD ["npm", "start"]