FROM node:14.15.1-alpine as react_build 

# Build args
ARG ARG_REACT_APP_WEBOC_SITE

# Environment vars
ENV REACT_APP_WEBOC_SITE=$ARG_REACT_APP_WEBOC_SITE

#also say 
WORKDIR /app
#copy the react app to the container
COPY . /app/ 

# #prepare the contiainer for building react 
# RUN npm config set unsafe-perm true
RUN npm install
# RUN npm install -g npm@latest
# RUN npm install --silent
# RUN npm install react-scripts@3.4.3 -g --silent 
RUN npm run build 

#prepare nginx
FROM nginx:1.16.0-alpine

COPY --from=react_build /app/build /usr/share/nginx/html/app/tpm
#COPY --from=react_build /app/build /etc/nginx/html/
COPY ./certs/  /etc/nginx/ssl/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/
COPY dev.psw.gov.pk.conf /etc/nginx/sites-available/
RUN mkdir /etc/nginx/sites-enabled/
RUN ln -s /etc/nginx/sites-available/dev.psw.gov.pk.conf /etc/nginx/sites-enabled/


#fire up nginx
CMD ["nginx","-g","daemon off;"]