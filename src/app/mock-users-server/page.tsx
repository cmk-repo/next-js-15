import {revalidatePath} from 'next/cache';
import {currentUser} from '@clerk/nextjs/server';
import {SignInButton} from '@clerk/nextjs';
// import {useUser} from '@clerk/nextjs';

type MockUser = {
	id: number;
	name: string;
};

export default async function UserServer() {
	//auth first
	// const authObj = await auth();
	// const userObj = await currentUser();
	// console.log(authObj); // in client we cannot read data so we use hooks see the counter page file
	// console.log(userObj);
	// get data
	const user = await currentUser();
	console.log(user);
	if (!user) {
		return (
			<div className='flex flex-col items-center justify-center h-screen'>
				<div className='text-2xl text-red-500'> Not Registerd </div>
				<SignInButton mode='modal'>
					<button
						className='bg-blue-500
						text-white
						px-4
						py-2
						rounded'>
						Sign In please
					</button>
				</SignInButton>
			</div>
		);
	}
	await new Promise(resolve => setTimeout(resolve, 2000));
	const response = await fetch('https://67341f80a042ab85d118f267.mockapi.io/users');
	const users = await response.json();

	async function addUser(formData: FormData) {
		// Formdata is browser api
		'use server';
		const name = formData.get('name');
		const res = await fetch('https://67341f80a042ab85d118f267.mockapi.io/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// 'Authorisation': 'Bearer YourPrivateKey',
			},
			body: JSON.stringify({name}),
		});
		const newUser = await res.json();
		revalidatePath('mock-users-server');
		console.log(newUser);
	}

	return (
		<div className='px-10 py-10'>
			{/* <form className='mb-4'> */}
			<form
				action={addUser}
				className='mb-4'>
				<input
					type='text'
					name='name'
					required
					className='border p-2 mr-2 text-black'
				/>
				<button
					type='submit'
					className='bg-blue-500
						text-white
						px-4
						py-2
						rounded'>
					Add New User
				</button>
			</form>

			<div className='grid grid-cols-4 gap-4 py-10'>
				{users.map((user: MockUser) => (
					<div
						key={user.id}
						className='p-4 bg-white shadow-md rounded-lg text-gray-700'>
						<div className='text-xl font-semibold'>{user.name}</div>
					</div>
				))}
			</div>
		</div>
	);
}
