import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase's web config is meant to be public — it identifies the project,
// it doesn't authorize anything. Real access control lives in the Firestore
// security rules (see firestore.rules), not in hiding these values.
const firebaseConfig = {
  apiKey: 'AIzaSyCF-1LrmZ70V6gDFVRQuA1e84-y2AEcq88',
  authDomain: 'divyansh-portfolio-2a903.firebaseapp.com',
  projectId: 'divyansh-portfolio-2a903',
  storageBucket: 'divyansh-portfolio-2a903.firebasestorage.app',
  messagingSenderId: '45481375965',
  appId: '1:45481375965:web:173597266cc048e87d0334',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
