export interface Event {
    /* NOTE COMMENTS INDICATE PREVIOUS INTERFACE AND CORRESPONDING DATA*/

    /*eventID?: string;
    eventName: string;
    eventTime: string; //"HHMMSS HHMMSS" Hour, Minute, Seconds 
    eventDate: string; //"YYYYMMDD YYYYMMDD" Year, Month, Day 
    eventLocation: string;
    description: string;
    image?: string | null;*/ 

    orgName: string;
    eventID?: string;
    eventName: string;
    eventStartTime: string; //HH:MM
    eventEndTime: string;  //HH:MM
    eventDate: string;//YYYY-MM-DD
    eventLocation: string;
    description: string;
    image?: string | null;
    url?: string;
    orgID?: string;
}
const Event1: Event = {
    /*eventID: "1",
    eventName: "Meet-Up At the Beach",
    eventTime: "170000 200000",
    eventDate: "20241210 20241210",
    eventLocation: "The Beach",
    description: "Take you and your friends out to the beach! Free Food!",
    image: null,*/

    eventID: "1",
    eventName: "Meet-Up At the Beach",
    eventStartTime: "17:00",
    eventEndTime: "20:00",
    eventDate: "2024-12-10",
    eventLocation: "The Beach",
    description: "Take you and your friends out to the beach! Free Food!",
    image: null,
    orgName: "The Temp Org", 
    url: "random.com",
    orgID: "S123",
};

const Event2: Event = {
    /*eventID: "2",
    eventName: "Floral Social",
    eventTime: "080000 120000",
    eventDate: "20241214 20241214",
    eventLocation: "Gardens",
    description: "Take you and your friends out to the garden! Free Food!",
    image: null,*/

    eventID: "2",
    eventName: "Floral Social",
    eventStartTime: "08:00",
    eventEndTime: "12:00",
    eventDate: "2024-12-14",
    eventLocation: "Gardens",
    description: "Take you and your friends out to the garden! Free Food!",
    image: null,
    orgName: "The Temp Org", 
    url: "random.com",
    orgID: "S123",
};

const Event3: Event = {
    /*eventID: "3",
    eventName: "Career Networking",
    eventTime: "130000 150000",
    eventDate: "20241207 20241207",
    eventLocation: "The Hall",
    description: "Sign up with our registration link: something.register.com",
    image: null,*/

    eventID: "3",
    eventName: "Career Networking",
    eventStartTime: "13:00",
    eventEndTime: "15:00",
    eventDate: "2024-12-07",
    eventLocation: "The Hall",
    description: "Sign up with our registration link: something.register.com",
    image: null,
    orgName: "The Temp Org", 
    url: "random.com",
    orgID: "S123",
};

const Event4: Event = {
    /*eventID: "4",
    eventName: "Artist Market",
    eventTime: "090000 200000",
    eventDate: "20241212 20241212",
    eventLocation: "Library Walk",
    description: "Come by to purchase, browse, and explore art made by local artists!",
    image: null,*/

    eventID: "4",
    eventName: "Artist Market",
    eventStartTime: "09:00",
    eventEndTime: "20:00",
    eventDate: "2024-12-12",
    eventLocation: "Library Walk",
    description: "Come by to purchase, browse, and explore art made by local artists!",
    image: null,
    orgName: "The Temp Org", 
    url: "random.com",
    orgID: "S123",

};

const Event5: Event = {
    /*eventID: "5",
    eventName: "Music Concert",
    eventTime: "210000 230000",
    eventDate: "20241201 20241201",
    eventLocation: "Theatre",
    description: "They are now on tour and come see them live!",
    image: null,*/

    eventID: "5",
    eventName: "Music Concert",
    eventStartTime: "21:00",
    eventEndTime: "23:00",
    eventDate: "2024-12-01",
    eventLocation: "Theatre",
    description: "They are now on tour and come see them live!",
    image: null,
    orgName: "The Temp Org", 
    url: "random.com",
    orgID: "S123",
};



export const testEventsList = [Event1, Event2, Event3, Event4, Event5 ];