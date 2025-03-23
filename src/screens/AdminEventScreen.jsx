
import React, { useState } from "react";
import { WarpBackground } from "@/components/magicui/warp-background";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";


export default function AdminEventScreen() {
const [modalOpen, setModalOpen] = useState(false);

const handleChange = (e) => {
    // setEventData({ ...eventData, [e.target.name]: e.target.value });
}

const handleSubmit = () => {
    // FIREBASE: Create Event
}


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const navigate = useNavigate();
const events = [
    {
        uuid: '1',
        eventName: 'GDG Event',
        description: 'An interactive event RSVP platform for GDG events built using Firebase FireStore.',
        date: '2022-12-12',
        time: '12:00 PM',
        location: 'Online',
    },
    {
        uuid: '2',
        eventName: 'GDG Event',
        description: 'An interactive event RSVP platform for GDG events built using Firebase FireStore.',
        date: '2022-12-12',
        time: '12:00 PM',
        location: 'Online',
    },
    {
        uuid: '3',
        eventName: 'GDG Event',
        description: 'An interactive event RSVP platform for GDG events built using Firebase FireStore.',
        date: '2022-12-12',
        time: '12:00 PM',
        location: 'Online',
    }
]

// FIREBASE AUTHENTHICATION: Logout
const handleLogout = () => {
    navigate('/login');
}

const openModal = () => {
    setModalOpen(true);
}

const handleClose = () => {
    setModalOpen(false);
}


return (
    <div className="relative w-screen">
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
                    <button onClick={openModal} className="bg-destructive text-white px-4 py-2 rounded-lg mt-4">
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
                                <button className="bg-green-400 flex-1 text-white px-4 py-2 rounded-lg mt-4">
                                    Edit
                                </button>
                                <button className="bg-destructive flex-1 text-white px-4 py-2 rounded-lg mt-4">
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
                <Typography variant="h6" fontWeight="bold">Create New Event</Typography>

                <TextField
                    fullWidth
                    label="Event Name"
                    name="eventName"
                    // value={eventData.eventName}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    // value={eventData.description}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    rows={3}
                />
                <TextField
                    fullWidth
                    type="date"
                    name="date"
                    // value={eventData.date}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    type="time"
                    name="time"
                    // value={eventData.time}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    // value={eventData.location}
                    onChange={handleChange}
                    margin="normal"
                />

                <Box display="flex" justifyContent="space-between" mt={3}>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Create Event</Button>
                </Box>
            </div>
        </Modal>


    </div>
);
}
