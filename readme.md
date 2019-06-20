
# MTL Tools
For suggestions, questions and help: https://discord.gg/6nwbeAA

## Warning
It's important to have in mind what you have in mind before you decide you want to download or fork this project. You can pretty much use it in 2 ways:
- As a glossary to not only instantly translate the keywords, but also make annotations and keep track of the story and its elements.
- For MTL reading, so using the above idea, you also want to let a Machine Translation (MTL) Service to translate it for you.

*Why this is important:* The first can be done anywhere, be it local or online, but Translation Services will usually require the text to be available online, so you have 2 choices:
* Install the system on a server/host that is online (The requirements were made to use cheap everywhere options);
* Or install it locally, but use a service of Dynamic DNS (DDNS) to put your machine online, be careful with this though, as naming your personal computer/network on the internet can be dangerous in the long time.

You will need **both** Backend and Frontend Requirements.

## Backend Requirements:
* PHP 7.2
* Composer
* MySQL
* Git (Don't "Download the zip" above unless you know what you are doing)
* A Linux Terminal (Linux, or something like Git Bash on Windows)

### Installation:
Windows users may find some help in this script: https://gist.github.com/hootlex/da59b91c628a6688ceb1
Otherwise, set up a Linux machine either on a Raspberry, on a Virtual Machine or on Docker if it works well on Windows that is.

`git clone <link>` to download the whole project to your directory
open the `.env.example`, modify the variables as needed
	- APP_URL to the IP/URL address that you will use to access the service
	- DB_ with the data for the mysql server
Then **save it as `.env`**

Open your MySQL Database and create a Database with the name you set in the .env file

Now run:
`composer install`
`php artisan key:generate`
And to set up the database
`php artisan migrate`

### Instructions
And this should be all for the backend.
*If you are running locally,* you can use `php artisan serve` and have it run locally.
*If you are running in another computer on the same network* (Like a Raspberry Pi), you may want to edit the `run_home.sh` file and set the IP of the machine. The `--host=192.168.1.9 --port=4000` arguments tell that it should allow anyone in the network to access it through `http://192.168.1.9:4000`.
*If running on a host,* it would be easier to place the `mtltools/public` as the root for your website, otherwise you may need to set up an annoying .htaccess (In case of Apache), and that's a mess. You may be able to setup a subdomain and set the public folder directly.
You may also end up having to set permissions and stuff that may be particular with each host (Mine are in the `updateHost.sh` file). So be ready to ask for support in case things don't work.

--------------

In regards to the frontend part.

## Frontend Requirements:
* A Linux Terminal (Linux, or something like Git Bash on Windows)
* NodeJS
* NPM
* Angular 8 package installed
* A Browser (Firefox recommended)

### Installation:
`cd resources/frontend`
`npm install`

### Instructions
Edit `environment/` files
If you are running locally, set up `environment.ts` with the respective addresses.
If you plan to compile it to run on your own host, set up `environment.prd.ts` with the respective addresses.

#### If you intend to edit the code and see it on the fly:
*If you are running locally,* you can use `ng serve` and have it run locally.
*If you are running in another computer on the same network* (Like a Raspberry Pi), you may want to run something like `ng serve --host 0.0.0.0`, so it will be available on something like `http://192.168.1.9:4200`.

#### If you just want to make make it run anywhere and that's all:
`sh build2php.sh`
This will compile the code and replace the front part so that it access the hosts that you placed on the `environment` files.
*If running on a host,* update the files in the `mtltools/public` folder and `mtltools/resources/views` folder that have been updated, and it should be good to go.
