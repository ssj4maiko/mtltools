ng build --aot # --configuration production 
rm -f -R ../../public/*.js
rm -f -R ../../public/*.css
rm -f -R ../../public/*.ico
cp -R dist/frontend/* ../../public/
cp dist/frontend/index.html ../views/index.blade.php
