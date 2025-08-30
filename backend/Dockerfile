FROM nodejs:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "run","start", "start:prod"]