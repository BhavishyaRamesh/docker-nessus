FROM node:17-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

ENV PORT 8080
ENV HOST 0.0.0.0

COPY package*.json ./
COPY yarn.lock ./

# Install dependencies.
RUN yarn install

# Copy local code to the container image.
COPY . .


RUN yarn build


# Run the web service on container startup.
CMD ["yarn", "start"]