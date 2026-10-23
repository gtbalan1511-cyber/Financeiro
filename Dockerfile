FROM node:22-alpine
WORKDIR /app
COPY --chown=node:node site ./site
COPY --chown=node:node server ./server
COPY --chown=node:node netlify/functions ./netlify/functions
USER node
ENV HOST=0.0.0.0 PORT=8080
EXPOSE 8080
CMD ["node", "server/index.cjs"]
