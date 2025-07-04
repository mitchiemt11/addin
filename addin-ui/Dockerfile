FROM node:24
WORKDIR /addin-ui
COPY . .
RUN npm install && npm run build
RUN npm install -g serve
CMD ["serve", "-s", "dist"]
EXPOSE 5173
