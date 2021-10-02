FROM node:16.7.0-alpine3.14 AS builder
WORKDIR /app
COPY package.json ./
RUN apk add --no-cache git
RUN yarn install --production
COPY . .
RUN npm run prebuild
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=builder /app/build .
