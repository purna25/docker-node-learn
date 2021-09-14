docker image ls
docker image rm <id>
docker build .
docker build -t node-app-image .

docker ps
docker volume ls
docker volume rm <id>

docker rm <id> -f
docker rm <id> -fv

docker run -p 3000:3000 -d --name node-app node-app-image
docker run -v $(pwd):/app -p 3000:3000 -d --name node-app node-app-image

docker run -v $(pwd):/app -v /app/node_modules -p 3000:3000 -d --name node-app node-app-image

docker run -v $(pwd):/app:ro -v /app/node_modules -p 3000:3000 -d --name node-app node-app-image

docker run -v $(pwd):/app:ro -v /app/node_modules --env PORT=4000 -p 3000:4000 -d --name node-app node-app-image

docker run -v $(pwd):/app:ro -v /app/node_modules --env-file ./.env -p 3000:4000 -d --name node-app node-app-image

docker-compose up
docker-compose up -d
docker-compose up -d --build
docker-compose down
docker-compose down -v


docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d 

docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v

docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v


docker exec -it docker-nodejs_mongo_1 mongo -u "purna" -p "mypassword"

docker inspect <id>

docker logs docker-nodejs_node-app_1 -f
docker inspect docker-nodejs_default

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d mongo

docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build -V


docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=2