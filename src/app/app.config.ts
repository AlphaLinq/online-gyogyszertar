import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "egeszsegportal-13fc2", appId: "1:997334053837:web:d8da02d2b3f256d3e2ca84", storageBucket: "egeszsegportal-13fc2.firebasestorage.app", apiKey: "AIzaSyAbqZjuz1WBpcVgDr-8wClREUSjx3mlD2E", authDomain: "egeszsegportal-13fc2.firebaseapp.com", messagingSenderId: "997334053837", measurementId: "G-2F5DCZJCE6" })), provideAuth(() => getAuth()), provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService, provideFirestore(() => getFirestore())]
};
