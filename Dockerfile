FROM node:alpine AS builder
WORKDIR /app
COPY package.json ./
RUN apk add --no-cache git
RUN npm install --production
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
