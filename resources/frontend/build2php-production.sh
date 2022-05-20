#ng build --build-optimizer --aot
CURRENT_UID=$(id -u):$(id -g) docker compose exec -w /home/node/app node-app ng build --build-optimizer --aot --configuration production 
rm -f -R ../../public/*.js
rm -f -R ../../public/*.css
rm -f -R ../../public/*.ico
cp -R dist/frontend/* ../../public/
cp dist/frontend/index.html ../views/index.blade.php
