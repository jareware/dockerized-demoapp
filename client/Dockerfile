FROM node:0.10.35
# @see https://registry.hub.docker.com/_/node/

# Create workspace
RUN mkdir /demoapp
WORKDIR /demoapp

# Install gem deps
RUN apt-get update && apt-get install -y ruby-full
RUN gem install compass -v 1.0.3

# Install npm deps
COPY package.json /demoapp/
RUN npm install
RUN npm install -g bower

# Install bower deps
COPY bower.json /demoapp/
RUN bower --allow-root install

# Install our own sources
COPY contrib /demoapp/contrib
COPY app /demoapp/app

# Precompile static assets for prod
RUN mkdir static
RUN npm run build

# Configure container
ENTRYPOINT ["npm", "run"]
CMD ["start"]
VOLUME /demoapp/static
