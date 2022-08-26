FROM node:16-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build 
COPY --from=builder /app/images ./build/images 

ENTRYPOINT ["node"]
CMD ["/app/build/main.js"] 
