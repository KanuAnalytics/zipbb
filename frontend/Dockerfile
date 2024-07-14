# Use an official Node runtime as a parent image
FROM node:alpine

# Install Python and pip
RUN apk add --no-cache python3 py3-pip

# Set the working directory
WORKDIR /app/frontend

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy zipbb directory and install the zipbb package
COPY ../zipbb /app/zipbb
RUN pip install /app/zipbb

# Set the environment variable to ensure the installed package is available
ENV PATH="/root/.local/bin:${PATH}"

# Expose port 3000
EXPOSE 3000

# Command to run the frontend
CMD ["npm", "start"]
