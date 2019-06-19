git reset --hard origin/master
git pull
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
php artisan migrate
php artisan cache:clear
php artisan route:cache  
php artisan config:cache
php artisan view:clear
