FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache git
RUN npm install
COPY . .
CMD ["npm", "start"]