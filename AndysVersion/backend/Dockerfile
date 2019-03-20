FROM node:8-onbuild
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g nodemon

EXPOSE 4000
CMD [ "npm", "start" ]