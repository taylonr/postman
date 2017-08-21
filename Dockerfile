FROM node:8.4.0

# Set /app as workdir
RUN mkdir /app
ADD . /app
WORKDIR /app

COPY package.json .
RUN npm install --quiet

COPY . .