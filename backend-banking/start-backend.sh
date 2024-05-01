#!/bin/bash

# Copiar .env.example para .env no contêiner
docker exec -i backend-api_app sh -c "cp .env.example .env"

CREATE_DB_COMMAND="CREATE DATABASE IF NOT EXISTS banking;"

# Execute the command in the MySQL container
docker exec -i backend-banking-db-1 mysql -uroot -proot -e "$CREATE_DB_COMMAND"

echo "Database creation checked/completed."

# Executar comandos

docker exec -i backend-api_app sh -c "composer dump-autoload"
docker exec -i backend-api_app sh -c "php artisan config:clear"
docker exec -i backend-api_app sh -c "php artisan cache:clear"
docker exec -i backend-api_app sh -c "php artisan route:clear"

docker exec -i backend-api_app sh -c "composer install --ignore-platform-reqs"

docker exec -i backend-api_app sh -c "php artisan db:wipe"

docker exec -i backend-api_app sh -c "php artisan key:generate"

docker exec -i backend-api_app sh -c "php artisan migrate"

docker exec -i backend-api_app sh -c "php artisan passport:install"

docker exec -i backend-api_app sh -c "yes '' | php artisan passport:client --personal"

docker exec -i backend-api_app sh -c "--provider="Laravel\Passport\PassportServiceProvider""

docker exec -i backend-api_app sh -c "chmod -R 775 storage/app/public"

docker exec -i backend-api_app sh -c "php artisan db:seed"