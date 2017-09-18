FROM node:8.4.0

# Set /app as workdir
RUN mkdir /app
ADD . /app
WORKDIR /app

# COPY package.json .
# COPY package-lock.json .

RUN npm install -g nodemon
#RUN npm install --quiet

COPY . .