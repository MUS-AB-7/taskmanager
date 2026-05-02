# Use Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of code
COPY . .

# Expose port (VERY IMPORTANT)
EXPOSE 8080

# Start server
CMD ["npm", "start"]