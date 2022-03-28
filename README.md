# What is this?

This is an interface to **backup and partially translate keywords for Japanese Webnovels**.

Right now, it has support for Syosetu and Kakuyomu, meaning, by inserting the novel IDs, **you can import all chapters of a novel** so, even if the authors delete the source, you will still have them **for yourself**. Although it has no interface right now, you can go straight to the Database and insert chapters manually, so if you want to push a book you bought, you can copy paste them straight to the Database, this also means *there is no reason to restrict solely to Japanese novels, any language works really*.

The main functionality however is the **translation of keywords**, meaning that you can make a dictionary based on categories and entries on the fly while reading, thus these keywords are replaced automatically from there on.

The main purpose for this is to use alongside any Machine Translation (MTL) tool, such as Google Translator, DeepL and so on, by translating certain words, **you can keep consistency in the translation, and you can also use it as a dictionary, by giving descriptions and reminders for each keyword**, this is useful to note things to remember for the future on your reading.

For this functionality, however, you need to have the project online, on a place where these MTL tools can reach, thus the interface uses Angular AOT compilation, meaning, instead of requiring a Node server alongside a PHP server for the API, you really just need a cheap PHP server, and there are scripts to compile and move all the new files to their places, so you just need to copy them to your server.

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
