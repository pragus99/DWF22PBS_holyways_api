# DWF22PBS_holyways_api

# Usage

```
Pastikan server database sudah berjalan.

npm start 

//creating database
npx sequelize db:create

//creating table
npx sequelize db:migrate

//populate table with sample data if you want it
npx sequelize db:seed:all
```

#### Endpoint Route:

| Name              | Endpoint Route                        |
| ----------------- | ------------------------------------- |
| results user      | http://localhost:9000/api/v1/users    |
| delete user       | http://localhost:9000/api/v1/user/:id |
