# Backend Server
## General Architecture
The server runs from `src/index.ts` where the `express` app is defined
and configured. The server by default runs on port 3000, but you can change
it in `src/index.ts`. 

For the database, we are using [Turso](https://turso.tech) with 
[Drizzle](https://orm.drizzle.team) as the ORM. 

### Routing
The server routes are defined in `src/routes` where each file defines
a `Router()` and exports it. That router is then imported in `src/index.ts`
and assigned a prefix. For example, `app.use("/users", userRoutes);`
means that the app will route all urls that start with `/users` to 
the routes defined in the `userRoutes` router.

If you want to add a new route, create a new file in `src/routes`
and import it in `src/index.ts` and call `app.use("/prefix/here", router_here);`

### Database Schema
[Drizzle](https://orm.drizzle.team) is the ORM we are using and 
you can read the docs about how to query [here](https://orm.drizzle.team/docs/data-querying).
Besides querying, the important thing is the database schema which
defines the type and format of each table. The schema is defined in
`/src/db/schema.ts`. As you can see, there are already two barebones
tables defined for `events`. 

```
export const events = sqliteTable("events", {
    id: text("id", { length: 255 })
        .notNull()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title", { length: 255 }).notNull(),
    description: text("description", { length: 10000 }).notNull(),
    date: int("date", { mode: "timestamp" }).notNull()
})
```

First we declare `events` to be the variable we export as the table
reference, which we can later use to query the table with something
like `db.select().from(events).whatever else`. 

We then define all the columns of the table. We have an `id` column
which is the primary key and by default is assigned to the result
of the `$defaultFn` (a random UUID). It has a max length of 255.

A similar setup applies for the other fields where they have different
data types and settings related to that data type. If you want
to read the docs about schemas, read [here](https://orm.drizzle.team/docs/sql-schema-declaration).

#### Database Schema Migrations
If you make any changes to the schema, you'll need to apply them to the
remote database. To do this, run `npm run db:generate` and then
`npm run db:migrate`. The first command will generate a set of migration
scripts which will migrate the schema from the old version to your
newly defined version. Then the second command will apply the migrations.

## Database Configuration
First sign up for a Turso account [here](https://app.turso.tech/onboarding).
Then create a database (it can be called anything) and then click the
three dots next to it and click `Create Token`. 
Make sure the token is set to `Read & Write` and does 
not expire. This will then show the token and the database URL. 

The application uses [dotenv](https://www.npmjs.com/package/dotenv)
to load in environment variables from `.env`, which we will use to
store database credentials. Create a file called `.env`
in the top level (outside of `/src`) and follow this format:

```
DATABASE_URL="url_here"
DATABASE_AUTH_TOKEN="token_here"
```

Then save the file and now when you run the server, it should successfully
connect to the database.

## Running the Server
To run the server, run `npm run dev`. This will run the server and automatically
reload it whenever you change any files.

