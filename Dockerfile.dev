FROM node:8-alpine

# For legacy version
MAINTAINER "clark.duxin@gmail.com"
LABEL maintainer="clark.duxin@gmail.com"

# Create app directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Bundle app source
COPY . /usr/app/

# Install app dependencies
RUN yarn

EXPOSE 3000
CMD [ "yarn", "dev" ]
