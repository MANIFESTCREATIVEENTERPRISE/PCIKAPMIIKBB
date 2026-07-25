import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";
import fs from "fs";
import path from "path";

let firestoreDb: any = null;

export function initFirestore() {
  if (firestoreDb) return firestoreDb;
  try {
    const configPath = path.resolve(process.cwd(), "firebase-applet-config.json");
    if (!fs.existsSync(configPath)) {
      console.warn("firebase-applet-config.json not found, falling back to in-memory.");
      return null;
    }
    const configRaw = fs.readFileSync(configPath, "utf-8");
    const firebaseConfig = JSON.parse(configRaw);

    const firebaseApp = initializeApp({
      apiKey: firebaseConfig.apiKey,
      authDomain: firebaseConfig.authDomain,
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket,
      messagingSenderId: firebaseConfig.messagingSenderId,
      appId: firebaseConfig.appId,
    });

    const databaseId = firebaseConfig.firestoreDatabaseId || "(default)";
    firestoreDb = getFirestore(firebaseApp, databaseId);
    console.log(`[Firestore] Connected to database ID: ${databaseId}`);
    return firestoreDb;
  } catch (err) {
    console.error("[Firestore] Initialization error:", err);
    return null;
  }
}

export async function fetchCollectionFromFirestore(collName: string): Promise<any[] | null> {
  const db = initFirestore();
  if (!db) return null;
  try {
    const collRef = collection(db, collName);
    const snapshot = await getDocs(collRef);
    if (snapshot.empty) {
      return [];
    }
    const items: any[] = [];
    snapshot.forEach((docSnap) => {
      items.push({ ...docSnap.data(), _firestoreId: docSnap.id });
    });
    return items;
  } catch (err) {
    console.error(`[Firestore] Error fetching collection ${collName}:`, err);
    return null;
  }
}

export async function saveDocumentToFirestore(collName: string, docId: string | number, data: any): Promise<boolean> {
  const db = initFirestore();
  if (!db) return false;
  try {
    const docRef = doc(db, collName, String(docId));
    await setDoc(docRef, data, { merge: true });
    return true;
  } catch (err) {
    console.error(`[Firestore] Error saving document to ${collName}/${docId}:`, err);
    return false;
  }
}

export async function deleteDocumentFromFirestore(collName: string, docId: string | number): Promise<boolean> {
  const db = initFirestore();
  if (!db) return false;
  try {
    const docRef = doc(db, collName, String(docId));
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error(`[Firestore] Error deleting document from ${collName}/${docId}:`, err);
    return false;
  }
}

export async function seedCollectionIfEmpty(collName: string, defaultItems: any[]) {
  const db = initFirestore();
  if (!db) return;
  try {
    const existing = await fetchCollectionFromFirestore(collName);
    if (existing && existing.length === 0 && defaultItems && defaultItems.length > 0) {
      console.log(`[Firestore] Seeding ${collName} with ${defaultItems.length} initial items...`);
      for (const item of defaultItems) {
        const id = item.id || Date.now() + Math.floor(Math.random() * 1000);
        await saveDocumentToFirestore(collName, id, item);
      }
      console.log(`[Firestore] Seeding ${collName} complete.`);
    }
  } catch (err) {
    console.error(`[Firestore] Error seeding collection ${collName}:`, err);
  }
}
