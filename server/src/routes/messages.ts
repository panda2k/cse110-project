import { Request, Router } from "express";
import { db } from "../db/db";
import { messages, users } from "../db/schema";
import { desc, eq, inArray, InferSelectModel, or } from "drizzle-orm";

export const messageRoutes = Router();

type Conversation = {
    otherParticipant: InferSelectModel<typeof users>;
    messages: InferSelectModel<typeof messages>[];
}

messageRoutes.get("", async (req, res) => {
    const authorId = "";
    const items = (await db.select().from(messages)
        .where(or(
            eq(messages.authorId, authorId),
            eq(messages.recipientId, authorId)
        ))
        .orderBy(desc(messages.date)))
        .reduce((acc: Record<string, InferSelectModel<typeof messages>[]>, cur) => {
            const otherParticipantId = cur.recipientId === authorId ? cur.authorId : cur.recipientId;
            if (!acc[otherParticipantId]) {
                acc[otherParticipantId] = [];
            }
            acc[otherParticipantId].push(cur);
            return acc;
        }, {});
    const otherParticipantIds = Object.keys(items);
    const otherParticipants = (await db.select().from(users)
        .where(inArray(users.id, otherParticipantIds)))
        .reduce((acc: Record<string, InferSelectModel<typeof users>>, cur) => {
            acc[cur.id] = cur;
            return acc;
        }, {});
    const conversations: Conversation[] = Object.entries(items)
        .map(([otherParticipantId, messages]) => ({ otherParticipant: otherParticipants[otherParticipantId], messages }))
        .sort((a, b) => +b.messages[0].date - +a.messages[0].date);

    res.json(conversations);
    return;
});

messageRoutes.post("", async (req: Request<{}, {}, { recipientId: string, content: string }>, res) => {
    const authorId = "";
    await db.insert(messages).values({
        authorId,
        recipientId: req.body.recipientId,
        content: req.body.content,
    });

    res.status(200).send();
    return;
});

