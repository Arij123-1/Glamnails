FROM nginx:alpine

# 1. Copy everything from your GlamNails folder to the container
COPY . /usr/share/nginx/html/

# 2. Overwrite the default Nginx config with yours
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 3. Fix permissions so Alpine/Nginx can access the files
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]