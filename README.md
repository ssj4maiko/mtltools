
# Install

This project uses **Docker** and **Docker-Compose**, so be sure to have them installed.
Tested on Windows under WSL2, so Linux should be work out of the Box.

On your Terminal, go to the folder where you want the project to sit
```
git clone https://github.com/ssj4maiko/mtltools.git
cp .env.example .env
```
Now fill in the Database values on the .env

Once done, we can start the project.
```
docker-compose up
```
In case of failure, `Ctrl+C` to stop the process, there should be some logs there to help find out the problem. The API and FRONT are supposed to be installed during the first time, if they don't due to some error, well, you gotta install manually, in these cases, you either will require PHP and/or Node installed on your machine

### API (PHP 7.4)
```
composer install
```
### FRONT (Node 17 / Angular 13)
```
cd resources/frontend
npm i
```

And just in case, I would suggest to ensure all files are owned by your current user, just replace <username> with yours, this is to avoid permission problems in the future, run this command at the root of the project:
```
sudo chown <username> -R ./
```

And then try again to run it, now with the `sh start.sh` command.


Add the following at the end of your `hosts` file:
```
127.0.0.1   mtltools.docker
127.0.0.1   api.mtltools.docker
```
Location of the Hosts file (*Must be admin to edit*):
* Windows: `C:\Windows\System32\drivers\etc\hosts`
* Linux:  `/etc/hosts`



## First time run

With the project up, we gotta prepare the Database:
```
sh shell-php.sh
php artisan migrate
```

And it should be good to go.

# URLs
FRONT: http://mtltools.docker:800/
API: http://api.mtltools.docker:800/
