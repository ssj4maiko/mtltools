FROM node:17

WORKDIR /home/node/app

RUN npm install --global @angular/cli@13 @angular-devkit/build-angular

EXPOSE 4200

CMD [ "npm", "install" ]

#CMD [ "ng", "serve", "--host=0.0.0.0", "--port=4200", "--disableHostCheck=true"]