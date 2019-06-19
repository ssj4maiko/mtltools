git reset --hard origin/master
git pull
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
