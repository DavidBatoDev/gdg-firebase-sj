import {auth, db} from '../firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

const signUpService = async (name, email, password) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password) // Create user with email and password
        const userData = {
            uuid: user.user.uid,
            name: name,
            email: user.user.email,
            isAdmin: false
        }
        const docRef = await addDoc(collection(db, 'users'), userData); // Add user data to the database
    
        return {success: true, data: userData}

    } catch (error) {
        console.log(error)
        return {success: false, data: error}
    }
}

const signInService = async (email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password)
        return {success: true, data: user}
    } catch (error) {
        console.log(error)
        return {success: false, data: error}
    }
}

const signUpAdminService = async (name, email, password) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password) // Create user with email and password
        const userData = {
            uuid: user.user.uid,
            name: name,
            email: user.user.email,
            isAdmin: true
        }
        const docRef = await addDoc(collection(db, 'users'), userData); // Add user data to the database
    
        return {success: true, data: userData}

    } catch (error) {
        console.log(error)
        return {success: false, data: error}
    }
}


export { signUpService, signInService, signUpAdminService }

