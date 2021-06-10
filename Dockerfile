FROM node:14.17.0 AS builder
WORKDIR /app/virtual_day_front
COPY . .
RUN npm install

#RUN npm run build

#EXPOSE 3000
#CMD [ "npm", "run-script", "build" ]