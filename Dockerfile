FROM node:current-alpine

LABEL org.opencontainers.image.title="JSON Server!" \
      org.opencontainers.image.description="Nodejs Web API application"

# Create directory in container image for app code
RUN mkdir -p /usr/src/app

# Copy app code (.) to /usr/src/app in container image
COPY . /usr/src/app

# Set working directory context
WORKDIR /usr/src/app

# Install dependencies from packages.json
RUN npm install

# Expose port
EXPOSE 3000

# Verfiy health
HEALTHCHECK CMD curl --fail http://127.0.0.1:3000/landing || exit 1

# Command for container to execute
ENTRYPOINT [ "node", "app.js" ]
