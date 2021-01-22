FROM node:14.15.4

RUN mkdir -p /client

WORKDIR /client

ADD . /client

COPY ./package.json ./package.json
RUN npm install

ENV PATH /app/node_modules/.bin:$PATH


EXPOSE 3000

CMD ["npm", "start"]