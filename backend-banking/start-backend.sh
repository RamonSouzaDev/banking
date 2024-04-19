#!/bin/bash

# Copiar .env.example para .env no contêiner
docker exec -i backend-banking sh -c "cp .env.example .env"

# Executar comandos
docker exec -i backend-banking sh -c "composer dump-autoload"
docker exec -i backend-banking sh -c "php artisan config:clear"
docker exec -i backend-banking sh -c "php artisan cache:clear"
docker exec -i backend-banking sh -c "php artisan route:clear"

docker exec -i backend-banking sh -c "composer install --ignore-platform-reqs"

docker exec -i backend-banking sh -c "php artisan db:wipe"

docker exec -i backend-banking sh -c "php artisan key:generate"

docker exec -i backend-banking sh -c "php artisan migrate"

docker exec -i backend-banking sh -c "php artisan passport:install"

docker exec -i backend-banking sh -c "yes '' | php artisan passport:client --personal"

docker exec -i backend-banking sh -c "--provider="Laravel\Passport\PassportServiceProvider""

docker exec -i backend-banking sh -c "chmod -R 775 storage/app/public"

docker exec -i backend-banking sh -c "php artisan db:seed"