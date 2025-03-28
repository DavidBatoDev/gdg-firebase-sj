import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const RSVP_COLLECTION = "events";

/**
 * CREATE a new RSVP document
 */
export async function createRSVP(data) {
  try {
    const docRef = await addDoc(collection(db, RSVP_COLLECTION), data);
    console.log("Document written with ID:", docRef.id);

    return {
      success: true,
      data: {
        uuid: docRef.id,
        ...data,
      },
    };
  } catch (error) {
    console.error("Error creating RSVP:", error);
    return {
      success: false,
      data: error.message,
    };
  }
}

/*
    Read all RSVP documents with real-time updates
  */
export function getAllRSVPs(callback) {
  try {
    const unsubscribe = onSnapshot(
      collection(db, RSVP_COLLECTION),
      (querySnapshot) => {
        const rsvps = [];
        querySnapshot.forEach((docItem) => {
          rsvps.push({
            uuid: docItem.id,
            ...docItem.data(),
          });
        });
        callback({
          success: true,
          data: rsvps,
        });
      }
    );

    return unsubscribe; // Return the unsubscribe function to stop listening for updates
  } catch (error) {
    console.error("Error fetching all RSVPs:", error);
    callback({
      success: false,
      data: error.message,
    });
  }
}

/**
 * READ a single RSVP document by its ID
 */
export async function getRSVPById(id) {
  try {
    const docRef = doc(db, RSVP_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // Document not found
      return {
        success: false,
        data: `No RSVP found with ID: ${id}`,
      };
    }

    return {
      success: true,
      data: {
        uuid: docSnap.id,
        ...docSnap.data(),
      },
    };
  } catch (error) {
    console.error(`Error fetching RSVP with ID ${id}:`, error);
    return {
      success: false,
      data: error.message,
    };
  }
}

/**
 * UPDATE an RSVP document
 */
export async function updateRSVP(uuid, updatedData) {
  try {
    const docRef = doc(db, RSVP_COLLECTION, uuid);
    await updateDoc(docRef, updatedData);
    console.log("Document updated with ID:", uuid);

    // Optionally, you can return the new data or just success:
    return {
      success: true,
      data: {
        uuid,
        ...updatedData,
      },
    };
  } catch (error) {
    console.error(`Error updating RSVP with ID ${uuid}:`, error);
    return {
      success: false,
      data: error.message,
    };
  }
}

/**
 * DELETE an RSVP document
 */
export async function deleteRSVP(uuid) {
  try {
    const docRef = doc(db, RSVP_COLLECTION, uuid);
    await deleteDoc(docRef);
    console.log("Document deleted with ID:", uuid);

    return {
      success: true,
      data: `Document with ID ${uuid} deleted successfully`,
    };
  } catch (error) {
    console.error(`Error deleting RSVP with ID ${uuid}:`, error);
    return {
      success: false,
      data: error.message,
    };
  }
}

export async function registerUserToEvent(eventId, userId) {
  try {
    const eventRef = doc(db, "events", eventId);
    const userRef = doc(db, "users", userId);

    // Fetch event and user data
    const eventSnap = await getDoc(eventRef);
    const userSnap = await getDoc(userRef);

    if (!eventSnap.exists()) throw new Error("Event not found");
    if (!userSnap.exists()) throw new Error("User not found");

    const eventData = eventSnap.data();
    const userData = userSnap.data();

    // Update the registeredPeople array
    await updateDoc(eventRef, {
      registeredPeople: [...(eventData.registeredPeople || []), userData],
    });

    return { success: true };
  } catch (error) {
    console.error("Error registering user to event:", error);
    return { success: false, data: error.message };
  }
}

export async function unregisterUserFromEvent(eventId, userId) {
  try {
    const eventRef = doc(db, "events", eventId);
    const userRef = doc(db, "users", userId);

    // Fetch event and user data
    const eventSnap = await getDoc(eventRef);
    const userSnap = await getDoc(userRef);

    if (!eventSnap.exists()) throw new Error("Event not found");
    if (!userSnap.exists()) throw new Error("User not found");

    const eventData = eventSnap.data();
    const userData = userSnap.data();

    // Remove the user from the registeredPeople array
    const updatedRegisteredPeople = eventData.registeredPeople.filter(
      (user) => user.uuid !== userData.uuid
    );

    await updateDoc(eventRef, {
      registeredPeople: updatedRegisteredPeople,
    });

    return { success: true };
  } catch (error) {
    console.error("Error unregistering user from event:", error);
    return { success: false, data: error.message };
  }
}
