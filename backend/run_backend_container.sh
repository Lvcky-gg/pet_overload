#!/bin/bash

# Stop any previously running containers
docker-compose down

# Build and start the containers
docker-compose up -d --build
