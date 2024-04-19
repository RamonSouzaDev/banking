#!/bin/bash

if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose não está instalado. Instale-o antes de continuar."
    exit 1
fi

docker-compose -f ./docker-compose.yml "$@"
