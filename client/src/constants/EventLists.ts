export type Post = {
	id: number; 
	title: string;
	description: string;
	date?: string;
	time?: string;
	image?: string;
};

{/* export const fetchEvents = async (): Promise<Post[]> => {
    try {
        const response = await fetch("http://localhost:3000/events");

        // Log response status and headers to confirm fetch success
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (!response.ok) { // Check for HTTP errors
            throw new Error(`Failed to fetch events: ${response.statusText}`); // Corrected string interpolation
        }

        const data = await response.json(); // Parse response directly as JSON
        console.log("Fetched events:", data); // Log parsed JSON data
        return data;
    } catch (error) {
        console.error("Error fetching events:", error);
        return []; // Return an empty array if there's an error
    }
};
*/}
export const Events: Post [] = [
    {
    id: 1,
    title: "Grad School Event",
    description: "Lorem ipsum odor amet, consectetuer adipiscing elit. Et metus facilisi aliquet morbi ad vivamus per. Parturient cubilia habitant praesent nascetur penatibus; suscipit habitasse. Nibh conubia pretium laoreet suscipit eleifend scelerisque. Vehicula proin mauris auctor dictum finibus dictum. Nisl faucibus justo dictum netus sed curabitur. Tempus elit eros pellentesque condimentum erat.",
	date: "November 05",
	time: "10:00AM - 07:00 PM",
	image: "https://grad.ucsd.edu/admissions/prospective-events/DESTINATION-Agenda.png"
},

{
    id: 2,
    title: "Park and Market Event",
    description: "JLorem ipsum odor amet, consectetuer adipiscing elit. Lectus fusce felis maximus turpis risus aliquet rhoncus metus parturient. Taciti porta est maximus est et vehicula.",
	date: "November 05",
	time: "10:00AM - 07:00 PM",
	image: "https://parkandmarket.ucsd.edu/wp-content/uploads/2024/10/Intersections_Yacoub_Jasso_promo_1000x600_v2_2.jpg"
},
{
    id: 3,
    title: "OPALS Internship",
	description:"Lorem ipsum odor amet, consectetuer adipiscing elit. Porttitor dis facilisis efficitur tempus consectetur. Ultricies cubilia ullamcorper dapibus nec inceptos himenaeos. Convallis quisque mauris bibendum sagittis nostra magna accumsan nisl.",
	date: "November 05",
	time: "10:00AM - 07:00 PM",
	image: "https://iem.ucsd.edu/_images/brochure/spring25_opals.jpg"

},
{
    id: 4,
    title: "Recruiter Speaker Event",
    description:"Lorem ipsum odor amet, consectetuer adipiscing elit. Porttitor dis facilisis efficitur tempus consectetur. Ultricies cubilia ullamcorper dapibus nec inceptos himenaeos. Convallis quisque mauris bibendum sagittis nostra magna accumsan nisl.",
	date: "November 05",
	time: "10:00AM - 07:00 PM",
	image: "https://ues.ucsd.edu/images/Events_24-25/Recruiter%20Event.png" 

},

{
	id: 5,
	title: "Meow",
	description:"Lorem ipsum odor amet, consectetuer adipiscing elit. Porttitor dis facilisis efficitur tempus consectetur. Ultricies cubilia ullamcorper dapibus nec inceptos himenaeos. Convallis quisque mauris bibendum sagittis nostra magna accumsan nisl.",
	date: "November 05",
	time: "10:00AM - 07:00 PM",
	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqbsT37L4vZY7trxj7JNfkHjYSToiGjjCUlQ&s"

},
{
	id: 6,
	title: "Social Event",
	description:"Lorem ipsum odor amet, consectetuer adipiscing elit. Porttitor dis facilisis efficitur tempus consectetur. Ultricies cubilia ullamcorper dapibus nec inceptos himenaeos. Convallis quisque mauris bibendum sagittis nostra magna accumsan nisl.",
	date: "November 05",
	time: "10:00AM - 07:00 PM",
	image: "https://pda.ucsd.edu/events/major-event/Brewing-bonds.jpeg"

},
{
	id: 7,
	title: "Meow",
	description:"Lorem ipsum odor amet, consectetuer adipiscing elit. Porttitor dis facilisis efficitur tempus consectetur. Ultricies cubilia ullamcorper dapibus nec inceptos himenaeos. Convallis quisque mauris bibendum sagittis nostra magna accumsan nisl.",
	date: "November 05",
	time: "10:00AM - 07:00 PM",
	image: "https://d3fd4e4oyqldw5.cloudfront.net/5e8cb604df82fe3367f557ef/670db3b0cdfd2d1ec674823c/scaled_1024.jpg"

},
{
	id: 8,
	title: "Movie Time!",
	description:"Lorem ipsum odor amet, consectetuer adipiscing elit. Porttitor dis facilisis efficitur tempus consectetur. Ultricies cubilia ullamcorper dapibus nec inceptos himenaeos. Convallis quisque mauris bibendum sagittis nostra magna accumsan nisl.",
	date: "November 05",
	time: "10:00AM - 07:00 PM",
	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMsleY9aWGkHRKr8Bv2bCYTARs4oT0TJgDJA&s"

},
{
	id: 9,
	title: "Meow",
	description:"Lorem ipsum odor amet, consectetuer adipiscing elit. Porttitor dis facilisis efficitur tempus consectetur. Ultricies cubilia ullamcorper dapibus nec inceptos himenaeos. Convallis quisque mauris bibendum sagittis nostra magna accumsan nisl.",
	date: "November 05",
	time: "10:00AM - 07:00 PM",
	image: "https://parkandmarket.ucsd.edu/wp-content/uploads/2024/07/UCSD_PM_Comedy_Night_promo_1000x600_v3a.jpg"

},

]