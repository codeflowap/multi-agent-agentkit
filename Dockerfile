# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy files
COPY package.json ./
COPY tsconfig.json ./
COPY . .

# Install dependencies
RUN npm install

# Start the service
CMD ["npm", "run", "start"]