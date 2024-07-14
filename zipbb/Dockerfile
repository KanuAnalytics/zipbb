# Use an official Python runtime as a parent image
FROM python:alpine

# Set the working directory
WORKDIR /app/zipbb

# Copy the necessary files to the container
COPY . .

# Install the package
RUN pip install .

# Set the environment variable to ensure the installed package is available
ENV PATH="/root/.local/bin:${PATH}"

# Command to keep the container running
CMD ["tail", "-f", "/dev/null"]
