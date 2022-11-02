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


#RUN yarn build


LABEL maintainer="ciromota"

ADD https://www.tenable.com/downloads/api/v2/pages/nessus/files/Nessus-10.4.0-es8.x86_64.rpm /tmp/nessus.rpm

RUN dnf upgrade -y \
	&& rpm -i /tmp/*.rpm \
	&& rm -rf /var/cache/dnf/* \
	&& rm -f /tmp/*.rpm

EXPOSE 8834

ENTRYPOINT [ "/opt/nessus/sbin/nessusd" ]

# Run the web service on container startup.
CMD ["yarn", "start"]
