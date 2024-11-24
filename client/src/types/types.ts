export type Conversation = {
    otherParticipant: {
        id: string;
        name: string;
    },
    messages: Array<{
        recipientId: string,
        content: string,
        date: Date,
        authorId: string,
        id: string
    }>
}
