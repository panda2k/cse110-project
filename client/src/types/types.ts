export type Conversation = {
    otherParticipantId: string,
    messages: Array<{
        recipientId: string,
        content: string,
        date: Date,
        authorId: string,
        id: string
    }>
}
