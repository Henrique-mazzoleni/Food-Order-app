FROM node:16.14.2-alpine3.15
WORKDIR /app/src/usr

COPY pack*.json ./
RUN npm install && mv node_modules/ ../
COPY . .

CMD ["npm", "start"]