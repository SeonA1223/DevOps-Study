FROM node:14.15.4

RUN mkdir -p /server

WORKDIR /server

ADD . /server

COPY ./package.json ./package.json
RUN npm install

EXPOSE 3001

CMD ["npm", "start"]