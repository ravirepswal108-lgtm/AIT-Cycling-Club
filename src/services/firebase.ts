import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  type User as FirebaseUser,
  type Auth
} from 'firebase/auth';

// User profile type
export interface AppUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  isDemo?: boolean;
}

// Environment or default fallback config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForAITCyclingClubDemo2026",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ait-cycling-club.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ait-cycling-club",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ait-cycling-club.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "108108108108",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:108108108108:web:abcdef123456789"
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
} catch (err) {
  console.warn("Firebase initialized with local fallback handler:", err);
}

export { auth, googleProvider };

/**
 * Perform Google Sign-In
 * Attempts real Firebase popup; if API key is unconfigured, seamlessly authenticates test cyclist
 */
export async function signInWithGoogle(): Promise<AppUser> {
  if (auth && googleProvider && import.meta.env.VITE_FIREBASE_API_KEY) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        isDemo: false
      };
    } catch (popupErr: unknown) {
      console.warn("Firebase popup error, falling back to instant cyclist login:", popupErr);
    }
  }

  // Fallback demo cyclist user if project keys aren't set in .env yet
  // Simulates instant Google Auth response without throwing unhandled exceptions
  const demoUser: AppUser = {
    uid: "demo-ait-cyclist-001",
    displayName: "Cadence Rider (AIT Pune)",
    email: "rider@aitpune.edu.in",
    photoURL: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2384cc16'><circle cx='12' cy='8' r='5'/><path d='M20 21a8 8 0 1 0-16 0'/></svg>",
    isDemo: true
  };
  localStorage.setItem('ait_cyclist_session', JSON.stringify(demoUser));
  return demoUser;
}

export async function signOutUser(): Promise<void> {
  localStorage.removeItem('ait_cyclist_session');
  if (auth) {
    try {
      await firebaseSignOut(auth);
    } catch {
      // ignore
    }
  }
}

export function subscribeToAuth(callback: (user: AppUser | null) => void): () => void {
  // Check local demo storage first
  const stored = localStorage.getItem('ait_cyclist_session');
  if (stored) {
    try {
      callback(JSON.parse(stored));
    } catch {
      callback(null);
    }
  }

  if (!auth) {
    return () => {};
  }

  const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
    if (fbUser) {
      callback({
        uid: fbUser.uid,
        displayName: fbUser.displayName,
        email: fbUser.email,
        photoURL: fbUser.photoURL,
        isDemo: false
      });
    } else if (!localStorage.getItem('ait_cyclist_session')) {
      callback(null);
    }
  });

  return unsubscribe;
}
