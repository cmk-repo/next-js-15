'use client';
// import {useAuth} from '@clerk/nextjs';
import {useUser} from '@clerk/nextjs';
import {useState} from 'react';

export const Counter = () => {
	// const {isLoaded, userId, sessionId, getToken} = useAuth();
	const {isLoaded, isSignedIn} = useUser();

	console.log('counter component runs onnce in server');
	const [count, setCount] = useState(0);

	// if (!isLoaded || !userId) {
	if (!isLoaded || !isSignedIn) {
		return null;
	}
	return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>;
};
