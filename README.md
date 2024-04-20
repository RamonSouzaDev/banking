<h1 align="center">Hello 👋, I'm Ramon Mendes</h1>
<h3 align="center">A back-end developer passionate about technology</h3>

- 🔭 I am currently working on [Back-end project development](https://github.com/RamonSouzaDev/To-Do-List-)

- 🌱 I'm currently learning **Software Architecture and Engineering**

- 📫 How to reach me **dwmom@hotmail.com**


   I ended up getting excited and developing, even after the delivery date.
  
<h3 align="left">Let's network:</h3>
<p align="left">
<a href="https://linkedin.com/in/https://www.linkedin.com/in/ramon-mendes-b44456164/" target="blank"><img align="center" src=" https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="https://www.linkedin.com /in/ramon-mendes-b44456164/" height="30" width="40" /></a>
</p>
<h3 align="left">Languages ​​and tools:</h3>
 <a href="https://hadoop.apache.org/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/apache_hadoop/apache_hadoop-icon. svg" alt="hadoop" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target= "_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://laravel.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com /devicons/devicon/master/icons/laravel/laravel-plain-wordmark.svg" alt="laravel" width="40" height="40"/> </a> <a href="https://www .linux.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" alt= "linux" width="40" height="40"/> </a> <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src= "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> <a href="https://www.php.net" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/php /php-original.svg" alt="php" width="40" height="40"/> </a> </p>


<h1 align="center">Welcome to BNB </h1>

## Banking

![logo-bnb(1)(1)](https://github.com/RamonSouzaDev/banking/assets/47437727/b377fd53-4563-4805-a434-8be360ba80b6)


- **Installing Project**

# Environment setup video on Youtube

Click here: 




1. Clone the repository:
git clone git@github.com:RamonSouzaDev/banking.git

2. Enter the project folder
cd "banking"

**Running via docker** <p align="left"> <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https:/ /raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a>

3. Run the commands to upload the backend environment
cd "backend-banking"
in the terminal run the command : docker compose up --build

5. Run the commands to upload the frontend environment
cd "backend-frontend"
in the terminal run the command : docker compose up --build

6. Open a third tab in your terminal and run the command
Execute this command inside folder "backend-banking" to generate librarys and generete composer to laravel
./start-backend.sh

**Unit Tests** 💡

1. Enter the backend container and run the command ./vendor/bin/phpunit --coverage-html coverage

![WhatsApp Image 2024-04-20 at 09 33 30](https://github.com/RamonSouzaDev/banking/assets/47437727/aa316382-8b93-4fdc-a250-d2225a456ae2)


**Seeders**
Run the commands below to generate data

1. php artisan db:seed --class=UserSeeder
2. php artisan db:seed --class=TransactionsTableSeeder
3. php artisan db seed --class=CheckDepositsTableSeeder
4. php artisan db seed --class=AccountBalanceSeeder

- **URL** 🏁🏁🏁
http://localhost:8080/

- **Routes**

Note: Remember to add the Bearer Token of the logged in user in the request, if you are using Postman. 👍


## Methods 🔥🔥🔥

### Authentication
| Method | Route            | Description                   |
|--------|------------------|-------------------------------|
| `POST` | /api/login       | Route to login                |
| `POST` | /api/register    | Route to register a user      |
| `POST` | /api/logout      | Route to logout               |

### Transactions
| Method | Route                                 | Description                          |
|--------|---------------------------------------|--------------------------------------|
| `POST` | /api/deposit                          | Route to make a deposit              |
| `POST` | /api/purchase                         | Route to make a purchase             |
| `GET`  | /api/transactions                     | Route to list all transactions       |
| `GET`  | /api/checks                           | Route to list all checks             |
| `GET`  | /api/incomes                          | Route to list all incomes            |
| `GET`  | /api/expenses                         | Route to list all expenses by month  |

### Check Administration
| Method | Route                                     | Description                      |
|--------|-------------------------------------------|----------------------------------|
| `GET`  | /api/admin/check-deposits/pending         | Route to list pending deposits   |
| `POST` | /api/check-deposit/approve/{checkDeposit} | Route to approve a check deposit |
| `POST` | /api/check-deposit/deny/{checkDeposit}    | Route to deny a check deposit    |

### Balance and Reports
| Method | Route                 | Description                  |
|--------|-----------------------|------------------------------|
| `GET`  | /api/balance          | Route to get current balance |

### User Management
| Method | Route                                 | Description                                 |
|--------|---------------------------------------|---------------------------------------------|
| `GET`  | /api/users                            | Route to list all users                     |
| `GET`  | /api/users/{user}                     | Route to display details of a specific user |
| `PUT`  | /api/users/{user}                     | Route to update a user                      |
| `DELETE`| /api/users/{user}                    | Route to delete a user                      |
| `GET`  | /api/user                             | Route to get logged-in user information     |
| `GET`  | /api/user-details/{userId}/{checkId}  | Route to get user check details             |

### Legacy Authentication
| Method | Route          | Description             |
|--------|----------------|-------------------------|
| `POST` | /login         | Legacy route to login   |
| `GET`  | /logout        | Legacy route to logout  |
