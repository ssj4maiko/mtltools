#ng build --build-optimizer --aot
CURRENT_UID=$(id -u):$(id -g) docker compose run --rm --no-deps --entrypoint ng -w /home/node/app node-app build --build-optimizer --aot --configuration production 
rm -f -R ../../public/*.js
rm -f -R ../../public/*.css
rm -f -R ../../public/*.ico
cp -R dist/frontend/* ../../public/
