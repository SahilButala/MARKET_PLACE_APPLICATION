



Services 

`Database` : PostgresSql --> ORM --> Drizzle

Commands : To do Database and server handaling

    "test": "echo \"Error: no test specified\" && exit 1",
    "dev" : "tsx watch src/server.ts",
    "build" : "tsc",
    "start" : "node dist/server.js",
    "db:generate" : "npx drizzle-kit generate",
    "db:migrate" : "npx drizzle-kit migrate",
    "db:push" : "npx drizzle-kit push",
    "typecheck" : "tsc --noEmit"


Services Used
•
Clerk -Authentication Provider.
•
OneMinute Logs - Application Monitoring Tools.
•
Neon - Postgresql Database Provider.
•
ImageKit - Cloud Provider for storing files.
•
Stripe - Payment Gateway and Identiy Verification




--- Authentication 

when user sign in we passing token and role through params
http://localhost:3000/api/v1/signup/?token=%22bdabdjadba%22?role=%22freelancer%22

note : we save all information (account) of client and freelancer in same table , beacuase freelancer or client can create account with same email address