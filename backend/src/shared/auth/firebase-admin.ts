import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Для проверки ID-токенов сервисный ключ НЕ нужен: verifyIdToken использует
// публичные ключи Google, а projectId нужен лишь для сверки aud/iss.
const projectId = process.env.FIREBASE_PROJECT_ID;

if (!projectId) {
  throw new Error('Не задан FIREBASE_PROJECT_ID');
}

initializeApp({ projectId });

export const firebaseAuth = getAuth();
