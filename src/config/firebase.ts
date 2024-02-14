// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDGjanyZL5QGn8__jiTmflxRfqWS3mmhf8",
	authDomain: "pedrocourse-c8f31.firebaseapp.com",
	projectId: "pedrocourse-c8f31",
	storageBucket: "pedrocourse-c8f31.appspot.com",
	messagingSenderId: "873036205824",
	appId: "1:873036205824:web:7cebe7d67a47d1ca85ade5",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
