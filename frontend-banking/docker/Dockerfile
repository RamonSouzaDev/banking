# Define the build stage
FROM node:20-alpine as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install chart.js


# Copy the rest of your app's source code
COPY . .

# Build your app
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "dev"]


