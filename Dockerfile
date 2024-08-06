FROM node:lts

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --no-progress --frozen-lockfile
COPY . .

RUN yarn build
RUN yarn prisma generate

COPY --chown=node:node . .
USER node

EXPOSE $PORT

CMD ["yarn", "start"]
