'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {SignInButton, UserButton, SignedIn, SignedOut} from '@clerk/nextjs';

// client side navigation
export const Navigation = () => {
	const pathname = usePathname();
	return (
		<nav className='flex justify-center items-center p-4'>
			<Link
				href='/'
				className={pathname === '/' ? 'font-bold mr-4' : 'mr-4 text-blue-500'}>
				Home
			</Link>
			<Link
				href='/about'
				className={pathname === '/about' ? 'font-bold mr-4' : 'mr-4 text-blue-500'}>
				About
			</Link>
			<Link
				href='/mock-users-server'
				className={pathname === '/mock-users-server' ? 'font-bold mr-4' : 'mr-4 text-blue-500'}>
				Product
			</Link>
			<SignedOut>
				<SignInButton mode='modal' />
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
		</nav>
	);
};
