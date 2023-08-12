FROM node:lts-bookworm as base
WORKDIR /app
COPY package*.json ./

FROM base as main
RUN npm ci --omit=dev
COPY . .
EXPOSE 4000
CMD ["npm", "start"]

FROM base as dev
RUN npm ci
COPY . .
EXPOSE 4000
# CMD ["npm", "run", "start:dev"]