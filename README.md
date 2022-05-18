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

Use `sh shell-php.sh` (from the root) to run things on PHP

```
composer install
```
### FRONT (Node 17 / Angular 13)

Use `sh shell-node.sh` (from the root) to run things on Node
```
npm i
```

## Running the project

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

### For Production (Running on a personal webserver)

If you intend to later upload it to your own personal server, you may wish to fill up the `resources/frontend/src/environments/environment.prod.ts` file with the URLs you plan on using.

On the server side, as per usual, you must configure it to access the `public` folder.

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

# How to install it in a cheap PHP server

The PHP server should either have SSH, or you will have to FTP everything yourself. The difference is that with SSH, you can install the dependencies from the server itself, otherwise, you will have to first install it in your machine, then FTP the `vendor` folder along with the rest.

In both cases however, you do not need the `resources/frontend` in your server, so you can either delete it from there, or just not upload it.

I'm writing this under the idea that the people who may be interested in this project may not be tech savvy. You will have to build the frontend on your own machine, and then upload it to the server yourself, so you have to install everything locally.

--------

Follow the install instructions to run it on your "local environment"/your PC, although Docker is optional, it is recommended, otherwise, you will have to install all dependencies on your own machine, meanwhile Docker will get things almost completely ready with the instructions above, by just installing Docker. The instructions here rely on Docker for the most part, so if you are not using it, it's understood you understand enough to know how to deal with things yourself.

Although the instructions rely on Linux, everything is tested using WSL2 on Windows, so if you are a Windows user, using WSL2 is always the best method to do Linux on Windows.

After checking that you are able to access it through the URLs above:

```bash
sh build-front.sh
```

This script will compile (relies on Docker) the project and then move the relevant files to the PHP folder.

Now you have to upload the `public/` folder to your server, along with the `resources/views/index.blade.php` folder. You can just delete the `public/` folder from the server, and upload it again with the update server.

And you should now have the frontend working in your server, relying on the URLs you set up in `resources/frontend/src/environments/environment.prod.ts`.