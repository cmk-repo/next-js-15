type User = {
	id: number;
	name: string;
	username: string;
	email: string;
	phone: string;
};

export default async function UserServer() {
	await new Promise(resolve => setTimeout(resolve, 2000));
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const users = await response.json();

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
