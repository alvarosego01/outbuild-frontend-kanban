#!/bin/sh

echo "Running in NODE_ENV=$NODE_ENV mode"

if [ "$NODE_ENV" = "development" ]; then
  echo "Starting in development mode..."
  pnpm dev
elif [ "$NODE_ENV" = "test" ]; then
  echo "Running tests..."
  pnpm test

elif [ "$NODE_ENV" = "production" ]; then
  echo "Starting in production mode..."
  pnpm start
else
  echo "NODE_ENV is not set or unrecognized. Defaulting to development mode."
  pnpm dev
fi
