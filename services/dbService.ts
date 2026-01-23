import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  getDocs, 
  where, 
  onSnapshot,
  serverTimestamp,
  updateDoc,
  arrayUnion
} from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile, Match } from '../types';

export const saveUser = async (user: UserProfile) => {
  const userRef = doc(db, 'users', user.id);
  await setDoc(userRef, {
    ...user,
    updatedAt: serverTimestamp()
  }, { merge: true });
};

export const getUser = async (id: string): Promise<UserProfile | null> => {
  const userRef = doc(db, 'users', id);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data() as UserProfile : null;
};

export const getAllUsers = async (excludeId: string): Promise<UserProfile[]> => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('id', '!=', excludeId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data() as UserProfile);
};

export const addLike = async (userId: string, targetId: string) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    likes: arrayUnion(targetId)
  });
  
  // Check for match
  const targetUser = await getUser(targetId);
  if (targetUser && targetUser.likes && targetUser.likes.includes(userId)) {
    const matchId = [userId, targetId].sort().join('_');
    const matchRef = doc(db, 'matches', matchId);
    await setDoc(matchRef, {
      id: matchId,
      users: [userId, targetId],
      timestamp: Date.now(),
      lastMessage: ''
    });
    return true;
  }
  return false;
};

export const subscribeToMatches = (userId: string, callback: (matches: Match[]) => void) => {
  const matchesRef = collection(db, 'matches');
  const q = query(matchesRef, where('users', 'array-contains', userId));
  return onSnapshot(q, (snap) => {
    const matches = snap.docs.map(doc => doc.data() as Match);
    callback(matches);
  });
};