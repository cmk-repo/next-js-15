'use client';
import {useRouter} from 'next/navigation';
import React from 'react';

export default function About() {
	const router = useRouter();
	return (
		<div>
			<h1>About Page</h1>
			<button
				onClick={() => router.push('/')}
				className='bg-blue-500 text-white p-2 rounded-md'>
				Go Home
			</button>
		</div>
	);
}
// react hook to return to home
