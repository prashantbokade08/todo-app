# ---- Stage 1: Build React App ----
    FROM node:18 AS build

    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    RUN npm run build
    
    # ---- Stage 2: Serve with Nginx ----
    FROM nginx:alpine
    
    # Copy built React app to Nginx HTML folder
    COPY --from=build /app/build /usr/share/nginx/html
    
    # Copy custom Nginx config (explained below)
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    

    EXPOSE 80
    
    CMD ["nginx", "-g", "daemon off;"]
    