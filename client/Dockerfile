FROM node:14.15.4

RUN mkdir -p /client

WORKDIR /client

ADD . /client

COPY ./package.json ./package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g

ENV PATH /app/node_modules/.bin:$PATH


EXPOSE 3000

CMD ["npm", "start"]