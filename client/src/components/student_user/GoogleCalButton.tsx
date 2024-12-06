import { Event } from "./EventsCardList";
import GCB from '../..//assets/GCB.png';

function GoogleCalendarInt(event: Event) {
    const getPSV = (x: string) => {
        return x.replaceAll(" ", "+");
    }

    const getTimeDate = (stime: string, etime: string, date: string) => {
        // parse times
        const splitstart = stime.split(":");
        const splitend = etime.split(":");
        // reformat times
        const newstime = splitstart[0] + splitstart[1] + "00";
        const newetime = splitend[0] + splitend[1] + "00";
        // parse date
        const dates = date.split("-");
        // reformat dates
        const newdates = dates[0] + dates[1] + dates[2];

        return "dates=" + newdates + "T" + newstime + "/" + newdates + "T" + newetime + "&";
    }

    const genLink = (flyer: Event) => {
        //link base
        const link = "https://calendar.google.com/calendar/u/0/r/eventedit?";
        const tz = "ctz=America/Los_Angeles"
        const name = "text=" + getPSV(flyer.eventName) + "&";
        const loc = "location=" + getPSV(flyer.eventLocation) + "&";
        const desc = "details=" + getPSV(flyer.description) + "&";
        const td = getTimeDate(flyer.eventStartTime, flyer.eventEndTime, flyer.eventDate);
        return link + name + desc + td + loc + tz;
    }

    return (
        <div>
            <a href={genLink(event)} target="_blank">
                <button><img src={GCB}></img> </button>
            </a>
        </div>

    );
};

export default GoogleCalendarInt;
