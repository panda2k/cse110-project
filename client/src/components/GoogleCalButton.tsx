import { Event, testEventsList } from "./TestEvents";
import GCB from '../assets/GCB.png';

function GoogleCalendarInt() {
    const getPSV = (x: string) => {
        return x.replaceAll(" ", "+");
    }

    const getTimeDate = (time: string, date: string) => {
        const times = time.split(" ");
        const dates = date.split(" ");
       // console.log(dates[0] + "T" + times[0] + "/" + dates[1] + "T" + times[1] + "&");
        return "dates=" + dates[0] + "T" + times[0] + "/" + dates[1] + "T" + times[1] + "&";
    }

    const genLink = (flyer: Event) => {
        //link base
        const link = "https://calendar.google.com/calendar/u/0/r/eventedit?"; 
        const tz = "ctz=America/Los_Angeles"
        const name = "text=" + getPSV(flyer.eventName) + "&";
        const loc = "location=" + getPSV(flyer.eventLocation) + "&";
        const desc = "details=" + getPSV(flyer.description) + "&";
        const td = getTimeDate(flyer.eventTime, flyer.eventDate);
        return link + name + desc + td + loc + tz;
    }

    return (
        <div>
       {testEventsList.map((event) => (
         <div>
            <p>{event.eventName}</p>
           <a href={genLink(event)} target="_blank">
            <button><img src={GCB}></img> </button>
            </a>
         </div>
       ))}
     </div>

    );
};

export default GoogleCalendarInt;