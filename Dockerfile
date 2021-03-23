 FROM node:15.11.0
 ENV NODE_ENV=production
 RUN apk add --no-cache python g++ make
 WORKDIR /app
 COPY ["package.json", "package-lock.json*", "./"]
 RUN npm install --production
 COPY . .
 CMD [ "node", "./server/app.js"]