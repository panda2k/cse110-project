import { Request, Router } from "express";
import { drizzleDb as db } from "../db/db";
import { messages, organizations, students } from "../db/schema";
import { asc, desc, eq, inArray, InferSelectModel, or } from "drizzle-orm";

export const messageRoutes = Router();

type Conversation = {
    otherParticipant: InferSelectModel<typeof students> | InferSelectModel<typeof organizations>;
    messages: InferSelectModel<typeof messages>[];
}

messageRoutes.get("/:userType/:id", async (req: Request<{ id: string, userType: "student" | "organization" }>, res) => {
    const authorId = parseInt(req.params.id);
    const items = (await db.select().from(messages)
        .where(or(
            eq(messages.organizationId, authorId),
            eq(messages.studentId, authorId)
        ))
        .orderBy(asc(messages.date)))
        .reduce((acc: Record<string, InferSelectModel<typeof messages>[]>, cur) => {
            const otherParticipantId = req.params.userType === "student" ? cur.organizationId : cur.studentId;
            if (!acc[otherParticipantId]) {
                acc[otherParticipantId] = [];
            }
            acc[otherParticipantId].push(cur);
            return acc;
        }, {});
    const otherParticipantIds = Object.keys(items).map(id => parseInt(id));
    const otherParticipants = (await
        db.select().from(req.params.userType === "organization" ? students : organizations).where(inArray(req.params.userType === "organization" ? students.id : organizations.id, otherParticipantIds))
    )
        .reduce((acc: Record<string, InferSelectModel<typeof students> | InferSelectModel<typeof organizations>>, cur) => {
            acc[cur.id] = cur;
            return acc;
        }, {});
    const conversations: Conversation[] = Object.entries(items)
        .map(([otherParticipantId, messages]) => ({ otherParticipant: otherParticipants[otherParticipantId] as Conversation["otherParticipant"], messages }))
        .sort((a, b) => +b.messages[0].date - +a.messages[0].date);
 
    res.json(conversations);
    return;
});

messageRoutes.post("", async (req: Request<{}, {}, { studentId: number, content: string, organizationId: number, author: "student" | "organization" }>, res) => {
    console.log(req.body)
    await db.insert(messages).values({
        studentId: req.body.studentId,
        organizationId: req.body.organizationId,
        author: req.body.author,
        content: req.body.content,
    });

    res.json({ message: "Message created!" });
    return;
});

