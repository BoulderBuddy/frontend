# stage build
FROM node:18-alpine as builder

WORKDIR /app

# copy everything to the container
COPY . .

# clean install all dependencies
RUN npm ci

# remove potential security issues
RUN npm audit fix

# build SvelteKit app
RUN npm run build


# stage run
FROM node:18-alpine as final

WORKDIR /app

# copy dependency list
COPY --from=builder /app/package*.json ./
#COPY --from=builder /app .

# clean install dependencies, no devDependencies, no prepare script
RUN npm ci --production --ignore-scripts

# remove potential security issues
RUN npm audit fix

# copy built SvelteKit app to /app
COPY --from=builder /app/build ./build

ENTRYPOINT []

CMD ["node", "./build"]
