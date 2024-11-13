'use client';
import React, {useState, useEffect} from 'react';

type User = {
	id: number;
	name: string;
	username: string;
	email: string;
	phone: string;
};

export default function UserClient() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchUsers() {
			try {
				const response = await fetch('https://jsonplaceholder.typicode.com/users');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setUsers(data);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('An unknown error occurred');
				}
			} finally {
				setLoading(false);
			}
		}

		fetchUsers();
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<ul className='space-y-4 p-4'>
			{users.map((user: User) => (
				<li
					key={user.id}
					className='p-4 bg-white shadow-md rounded-lg text-gray-700'>
					<h2 className='text-xl font-semibold'>{user.name}</h2>
					<p>{user.email}</p>
					<p className='text-lg font-medium'>{user.phone}</p>
				</li>
			))}
		</ul>
	);
}
