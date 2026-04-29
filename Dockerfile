FROM nginx:alpine

# 1. Copy everything from your GlamNails folder to the container
COPY app/html /usr/share/nginx/html
COPY app/css /usr/share/nginx/html/css
COPY app/js /usr/share/nginx/html/js
COPY app/images /usr/share/nginx/html/images

# 2. Overwrite the default Nginx config with yours
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 3. Fix permissions so Alpine/Nginx can access the files
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]