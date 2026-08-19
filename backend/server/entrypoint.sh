#!/bin/sh
set -e

echo "Waiting for database at $DB_HOST:$DB_PORT ..."
until nc -z "$DB_HOST" "$DB_PORT"; do sleep 1; done
echo "Database is up. Running migrations..."

npx sequelize-cli db:migrate

echo "Starting gRPC server..."
exec node index.js
