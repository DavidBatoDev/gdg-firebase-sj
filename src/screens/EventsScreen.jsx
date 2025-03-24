
import { useEffect, useState } from "react";
import { WarpBackground } from "@/components/magicui/warp-background";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getAllRSVPs, registerUserToEvent, unregisterUserFromEvent } from "@/services/EventServices";
import { signOutService } from "@/services/AuthService";

export default function EventsScreen() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    // const MockEvents = [
    //     {
    //         uuid: '1',
    //         eventName: 'GDG Event',
    //         description: 'An interactive event RSVP platform for GDG events built using Firebase FireStore.',
    //         date: '2022-12-12',
    //         time: '12:00 PM',
    //         location: 'Online',
    //         registeredPeople: []
    //     },
    //     {
    //         uuid: '2',
    //         eventName: 'GDG Event',
    //         description: 'An interactive event RSVP platform for GDG events built using Firebase FireStore.',
    //         date: '2022-12-12',
    //         time: '12:00 PM',
    //         location: 'Online',
    //     },
    //     {
    //         uuid: '3',
    //         eventName: 'GDG Event',
    //         description: 'An interactive event RSVP platform for GDG events built using Firebase FireStore.',
    //         date: '2022-12-12',
    //         time: '12:00 PM',
    //         location: 'Online',
    //     }
    // ]

    // FIREBASE AUTHENTICATION: On Auth State Changed (Check if user is logged in and is admin)
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                navigate('/login');
            }
            // get the user from the database
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();
            if (userData.isAdmin) {
                navigate('/login');
            }
            setCurrentUser(userData);
        });
    }, [navigate])

    // FIREBASE FIRESTORE: Fetch all events with real-time updates
    useEffect(() => {
        const unsubscribe = getAllRSVPs((response) => {
            console.log(response);
            setEvents(response.data);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);


    // FIREBASE FIRESTORE: Register user to event
    const handleRSVP = async (eventUID) => {
        await registerUserToEvent(eventUID, currentUser.uuid );
    }

    // FIREBASE FIRESTORE: Unregister user from event
    const handleUnRSVP = async (eventUID) => {
        await unregisterUserFromEvent(eventUID, currentUser.uuid);
    }
        

    // FIREBASE AUTHENTHICATION: Logout
    const handleLogout = async () => {
        await signOutService();
        navigate('/login');
    }

    return (
        <div className="relative w-screen">
            <WarpBackground className={"absolute min-h-screen w-full z-[-10]"} />
            {/* navbar */}
            <div className="h-full z-10 bg-purple">
                <div className="flex justify-between items-center p-4">
                    <div className="text-white text-lg font-bold">Events</div>
                    <div className="flex items-center space-x-4">
                        <button onClick={handleLogout} className="text-white">Logout</button>
                    </div>
                </div>
            </div>

            {/* Events */}
            <div className="px-10 py-5">
                <div>
                    <BoxReveal boxColor="#5046e6" duration={0.5}>
                        <p className="text-[3.5rem] font-semibold">
                            GDG Events<span className="text-[#5046e6]">.</span>
                        </p>
                    </BoxReveal>

                    <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                        <h2 className="mt-[.5rem] text-[1rem]">
                            RSVP for upcoming events with other <span className="text-[#5046e6]">Developers</span> and <span className="text-[#5046e6]">Design Engineers</span>
                        </h2>
                    </BoxReveal>
                </div>

                {/* Events */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-4 mt-10">
                    {events.map((event) => (
                        <div key={event.uuid} className="relative w-[300px] h-[300px] bg-white rounded-lg shadow-md p-4 cursor-pointer hover:scale-105 transition-transform">
                            <BorderBeam duration={8} size={300} />
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-bold">{event.eventName}</h3>
                                <p className="h-20 text-truncate">{event.description}</p>
                                <p className="h-6">
                                    <span className="font-semibold text-truncate">Date:</span> {event.date}
                                </p>
                                <p className="h-6 text-truncate">
                                    <span className="font-semibold">Time:</span> {event.time}
                                </p>
                                <p className="h-6 text-truncate">
                                    <span className="font-semibold">Location:</span> {event.location}
                                </p>
                                {
                                    event.registeredPeople.some(person => person.uuid === currentUser?.uuid) ? (
                                        <button onClick={() => handleUnRSVP(event.uuid)} className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4">
                                            UnRSVP
                                        </button>
                                    ) : (
                                        <button onClick={() => handleRSVP(event.uuid)} className="bg-purple text-white px-4 py-2 rounded-lg mt-4">
                                            RSVP
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
}
