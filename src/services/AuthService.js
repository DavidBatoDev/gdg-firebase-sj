import {auth, db} from '../firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const signUpService = async (name, email, password) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password) // Create user with email and password
        const userData = {
            uuid: user.user.uid,
            name: name,
            email: user.user.email,
            isAdmin: false
        }
        
        await setDoc(doc(db, 'users', userData.uuid), userData); // Add user data to the database
    
        return {success: true, data: userData}

    } catch (error) {
        console.log(error)
        return {success: false, data: error}
    }
}

const signInService = async (email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password)

        // fetch user data from the database
        const userDoc = await getDoc(doc(db, 'users', user.user.uid))

        // get user data
        const userData = userDoc.data()
        
        return {success: true, data: userData}
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
        
        await setDoc(doc(db, 'users', userData.uuid), userData); // Add user data to the database
    
        return {success: true, data: userData}

    } catch (error) {
        console.log(error)
        return {success: false, data: error}
    }
}


export { signUpService, signInService, signUpAdminService }

