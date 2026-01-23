import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { Message } from '../types';

export const sendMessage = async (matchId: string, senderId: string, text: string) => {
  const messagesRef = collection(db, 'matches', matchId, 'messages');
  await addDoc(messagesRef, {
    matchId,
    senderId,
    text,
    timestamp: serverTimestamp()
  });

  // Update last message in match doc
  const matchRef = doc(db, 'matches', matchId);
  await updateDoc(matchRef, {
    lastMessage: text,
    timestamp: Date.now()
  });
};

export const subscribeToMessages = (matchId: string, callback: (messages: Message[]) => void) => {
  const messagesRef = collection(db, 'matches', matchId, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'asc'));

  return onSnapshot(q, (snap) => {
    const messages = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Message));
    callback(messages);
  });
};
