FROM node:14

WORKDIR /frontend

ADD package.json .

# ADD package-lock.json .

RUN npm install

COPY . .

RUN ["npm" ,"run", "build"]

# ENTRYPOINT [ "npm" ,"install","-g", "serve","&&" ,"serve","-s","build"]

