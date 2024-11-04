import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const events = sqliteTable("events", {
    id: text("id", { length: 255 })
        .notNull()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title", { length: 255 }),
    description: text("description", { length: 10000 }),
    date: int("date", { mode: "timestamp" }).notNull()
})
