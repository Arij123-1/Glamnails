FROM nginx:alpine

# Copy everything from html (includes CSS + HTML)
COPY app/html /usr/share/nginx/html

# Copy JS
COPY app/js /usr/share/nginx/html/js

# Copy images
COPY app/images /usr/share/nginx/html/images

# Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Permissions
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]