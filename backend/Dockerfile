FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD npm run migration:run:prod && npm run start:prod