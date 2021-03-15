#!bin/sh
echo "PORT=5000\nDATABASE_URL=\"postgresql://postgres:password@localhost:5445/mayascalendar\"" > .env
docker rm mayas-postgres
docker run -p 5445:5432 -d -e POSTGRES_PASSWORD=password --name mayas-postgres postgres
yarn install
yarn db:generate && yarn db:migration:create && yarn db:seed
yarn start