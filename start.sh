
cd backend 
docker-compose up -d
echo "waiting for container..."
sleep 15
cd ..
cd  frontend 
npm run start
