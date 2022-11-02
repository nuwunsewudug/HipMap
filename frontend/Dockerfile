# FROM node:16.15.0 as build-stage
# WORKDIR /var/jenkins_home/workspace/hipmapdpl/Frontend/hipmap

# COPY package*.json ./
# RUN npm install
# COPY ./build ./build
# RUN npm run build
# FROM nginx:stable-alpine as production-stage

# COPY --from=build-stage /var/jenkins_home/workspace/deploytest/testproject_react/build /usr/share/nginx/html
# #COPY --from=build-stage /var/jenkins_home/workspace/deploytest/testproject_react/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g","daemon off;"]

FROM node:16.15.0 as build-stage
WORKDIR /var/jenkins_home/workspace/hipmapdpl/Frontend/hipmap
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /var/jenkins_home/workspace/hipmapdpl/Frontend/hipmap/build /usr/share/nginx/html
# #COPY --from=build-stage /var/jenkins_home/workspace/deploytest/testproject_react/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]