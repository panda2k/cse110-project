export enum UserType {
    STUDENT = "student",
    ORGANIZATION = "organization"
};

export type Conversation = {
    otherParticipant: {
        id: number;
        username: string;
    },
    messages: Array<{
        content: string,
        date: Date,
        organizationId: number,
        studentId: number,
        author: UserType,
        id: string
    }>
};

