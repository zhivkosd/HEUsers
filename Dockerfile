FROM node:8.9-alpine
ENV DB_URL mongodb://url.mlab.com
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]