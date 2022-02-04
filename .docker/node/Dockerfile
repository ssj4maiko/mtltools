FROM node

WORKDIR /home/node/app

#USER node
#RUN apt-get update
#RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
#RUN source ~/.bashrc
RUN npm i @angular/cli @angular-devkit/build-angular \
	&& cd /home/node/app \
	&& npm i

#COPY --chown=node:node . .

EXPOSE 4200

CMD [ "ng", "serve", "--host=0.0.0.0", "--port=4200", "--disableHostCheck=true"]