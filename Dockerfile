FROM node:16.13.1-alpine3.15
WORKDIR /app/src/usr

COPY package*.json ./
RUN npm install && mv node_modules/ ../
COPY . .

CMD ["npm", "start"]