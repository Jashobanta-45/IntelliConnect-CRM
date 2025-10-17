'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

// This function is memoized to ensure it only runs once.
function getFirebaseServices() {
  if (!getApps().length) {
    try {
      // Prioritize Firebase App Hosting's auto-configuration
      firebaseApp = initializeApp();
    } catch (e) {
      // Fallback to local config for development or if auto-config fails
      firebaseApp = initializeApp(firebaseConfig);
    }
  } else {
    firebaseApp = getApp();
  }

  auth = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);

  return { firebaseApp, auth, firestore };
}


// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  // The services are initialized inside getFirebaseServices and memoized.
  // This function just ensures they are ready and returns them.
  return getFirebaseServices();
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
