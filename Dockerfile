# Build stage
FROM docker.io/node:fermium AS builder

WORKDIR /usr/src/app

# Copy src to image
COPY . .

RUN yarn && yarn build

# Deploy Stage
FROM docker.io/node:fermium-alpine 

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/dist ./dist

RUN yarn db:generate

ENTRYPOINT ["yarn", "start:prod"]
