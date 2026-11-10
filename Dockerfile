FROM node:18-alpine
WORKDIR /app

ARG NEXT_PUBLIC_API_URL=https://example.com/api
ARG BACKEND_URL=http://be:8080
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV BACKEND_URL=$BACKEND_URL
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
