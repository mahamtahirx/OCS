# Use an official Node.js image
FROM node:23.11.0-slim

# Set the working directory in the container
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install React dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the React development server port
EXPOSE 5173

# Command to start React
CMD ["npm", "run", "dev"]
