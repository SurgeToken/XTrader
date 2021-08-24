FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN apt install -y git
RUN npm install --production
COPY . .
CMD ["npm", "start"]