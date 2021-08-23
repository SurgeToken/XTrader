FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN apk --no-cache add git 
RUN npm install --production
COPY . .
CMD ["npm", "start"]