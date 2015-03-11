FROM node:0.10.35
# @see https://registry.hub.docker.com/_/node/

# Create workspace
RUN mkdir /demoapp
WORKDIR /demoapp

# Install npm deps
COPY package.json /demoapp/
RUN npm install

# Install our own sources
COPY src /demoapp/src
COPY test /demoapp/test
COPY static /demoapp/static
COPY contrib /demoapp/contrib

# Configure container
EXPOSE 3000
EXPOSE 35729
ENTRYPOINT ["npm", "run"]
CMD ["start"]
