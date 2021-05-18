FROM node:13.12.0-alpine
ENV PORT 3000
WORKDIR /
# install app dependencies
COPY ./package.json ./
RUN npm install --silent
# add app
COPY . ./
# start app
EXPOSE 3000
CMD "yarn" "dev"