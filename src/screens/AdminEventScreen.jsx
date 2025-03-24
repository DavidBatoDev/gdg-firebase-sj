
import React, { useState, useEffect } from "react";
import { WarpBackground } from "@/components/magicui/warp-background";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { 
    getRSVPById, 
    createRSVP, 
    getAllRSVPs, 
    updateRSVP, 
    deleteRSVP
} from "@/services/EventServices";
import { signOutService } from "@/services/AuthService";
import Loading from "@/components/loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";


// Mock Data
// const events = [
//     {
//         uuid: '1',
//         eventName: 'GDG Event',
//         description: 'An interactive event RSVP platform for GDG events built using Firebase FireStore.',
//         date: '2022-12-12',
//         time: '12:00 PM',
//         location: 'Online',
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

export default function AdminEventScreen() {
    const navigate = useNavigate(); // for navigation
    const [modalOpen, setModalOpen] = useState(false); // to check if modal is open
    const [isEdit, setIsEdit] = useState(false); // to check if modal is for edit or create
    const [events, setEvents] = useState([]); // all events array like in mock data
    const [loading, setLoading] = useState(false); // to know if loading is active

    // FIREBASE AUTHENTICATION: On Auth State Changed (Check if user is logged in and is admin)
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                navigate('/login');
            }
            // get the user from the database
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();
            if (!userData.isAdmin) {
                navigate('/login');
            }
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


    // event data for form fields
    const [eventData, setEventData] = useState({
        uuid: '',
        eventName: '',
        description: '',
        date: '',
        time: '',
        location: '',
    });

    // for form fields change 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({
            ...eventData,
            [name]: value,
        });
    }


    // for closing the modal
    const handleClose = () => {
        setModalOpen(false);
        setIsEdit(false);
        setLoading(false);
    }

    // FIREBASE FIRESTORE: Read Event By ID
    const handleEditModal = async (uuid) => {
        setLoading(true);
        setIsEdit(true);
        const response = await getRSVPById(uuid);
        console.log(response);
        setEventData(response.data);
        setModalOpen(true);
        setLoading(false);
    }

    // FIREBASE FIRESTORE: Create Event
    const handleCreateEvent = async () => {
        const data = {
            ...eventData,
            adminId: '1',
            registeredPeople: [],
        }
        await createRSVP(data);
        setModalOpen(false);
    }

    // FIREBASE FIRESTORE: Edit Event
    const handleEditEvent = async (uuid) => {
        const data = {
            ...eventData,
        }
        await updateRSVP(uuid, data);
        setModalOpen(false);
    }

    // FIREBASE FIRESTORE: Delete Event
    const handleDeleteEvent = async (uuid) => {
        deleteRSVP(uuid);
        handleClose()
    }

    // FIREBASE AUTHENTHICATION: Logout
    const handleLogout = async () => {
        await signOutService();
        navigate('/login');
    }

    const handleCreateEventModal = () => {
        setEventData({
            eventName: '',
            description: '',
            date: '',
            time: '',
            location: '',
        });
        setModalOpen(true);
    }

    return (
        <div className="relative w-screen">
            {loading && <Loading />}
            <WarpBackground className={"absolute min-h-screen w-full z-[-10]"} />
            {/* navbar */}
            <div className="h-full z-10 bg-destructive">
                <div className="flex justify-between items-center p-4">
                    <div className="text-white text-lg font-bold">Events</div>
                    <div className="flex items-center space-x-4">
                        <button onClick={handleLogout} className="text-white">Logout</button>
                    </div>
                </div>
            </div>

            {/* Events */}
            <div className="px-10 py-5">
                <div className="flex justify-between items-center">
                    <div>
                        <BoxReveal boxColor="#5046e6" duration={0.5}>
                            <p className="text-[3.5rem] font-semibold">
                                Manage Events<span className="text-destructive">.</span>
                            </p>
                        </BoxReveal>

                        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                            <h2 className="mt-[.5rem] text-[1rem]">
                                Manage upcoming events
                            </h2>
                        </BoxReveal>
                    </div>

                    <div>
                        <button onClick={handleCreateEventModal} className="bg-destructive text-white px-4 py-2 rounded-lg mt-4">
                            Create Event
                        </button>
                    </div>
                </div>

                {/* Events */}
                <div className="flex flex-wrap items-center space-x-4 mt-10">
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
                                
                                <div className="flex gap-1">
                                    <button onClick={() => handleEditModal(event.uuid)} className="bg-green-400 flex-1 text-white px-4 py-2 rounded-lg mt-4">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteEvent(event.uuid)} className="bg-destructive flex-1 text-white px-4 py-2 rounded-lg mt-4">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <Modal open={modalOpen} onClose={handleClose} aria-labelledby="create-event-modal">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white border-2 border-black shadow-2xl p-4 rounded-lg">
                    <Typography variant="h6" fontWeight="bold">
                        {isEdit ? 'Edit Event' : 'Create Event'}
                    </Typography>

                    <TextField
                        fullWidth
                        label="Event Name"
                        name="eventName"
                        value={eventData.eventName}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        margin="normal"
                        multiline
                        rows={3}
                    />
                    <TextField
                        fullWidth
                        type="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        type="time"
                        name="time"
                        value={eventData.time}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Location"
                        name="location"
                        value={eventData.location}
                        onChange={handleChange}
                        margin="normal"
                    />

                    <Box display="flex" justifyContent="space-between" mt={3}>
                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                        {!isEdit ? (
                            <Button variant="contained" color="primary" onClick={handleCreateEvent}>Create Event</Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={() => handleEditEvent(eventData.uuid)}>Edit Event</Button>
                        )}
                    </Box>
                </div>
            </Modal>
        </div>
    );
}
