'use client'

import { useEffect } from 'react';
import { usePathname } from 'next/navigation'
import HorizontalBar from './HorizontalBar';
import NavbarLogo from './NavbarLogo';
import NavbarIconsLinks from './NavbarIconsLinks';
import NavbarSearchForm from './NavbarSearchForm';
import NavbarThemeToggle from './NavbarThemeToggle';
import NavbarMessagesDrop from './NavbarMessagesDrop';
import NavbarNotificationDrop from './NavbarNotificationDrop';
import NavbarProfileDrop from './NavbarProfileDrop';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectThemeConfig } from '@/lib/features/themeConfig/themeConfigSlice';
import { setMessagesState } from '@/lib/features/notification/notificationSlice';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { setActiveUsersState } from '@/lib/features/user/userSlice';
import { useSocket } from '@/lib/contexts/SocketContext';


const Header = () => {
	const pathname = usePathname()
	const dispatch = useAppDispatch()
	const { userInfo } = useCurrentUser()

	const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;
	const socket = useSocket()
	// socket connection
	useEffect(() => {
		if (socket) {
			socket.on('connect', () => {
				console.log('Connected to server');
				if (userInfo?.id) socket.emit('userConnected', userInfo?.id)
			});

			socket.on('disconnect', () => {
				console.log('Disconnected from server');
			});

			socket.on('activeUsers', (users) => {
				dispatch(setActiveUsersState(users))
			})

			return () => {
				socket.off('connect');
				socket.off('disconnect');
				socket.off('activeUsers');
			};
		}
	}, [socket, userInfo, dispatch]);


	useEffect(() => {

		socket?.on('receiveNotification', (notification) => {
			console.log('Notification received:', notification);
			dispatch(setMessagesState(notification))
		})
		return () => {
			if (socket) {
				socket.off('receiveNotification')
			}
		}

	}, [socket, dispatch])


	useEffect(() => {
		const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
		if (selector) {
			const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
			for (let i = 0; i < all.length; i++) {
				all[0]?.classList.remove('active');
			}

			let allLinks = document.querySelectorAll('ul.horizontal-menu a.active');
			for (let i = 0; i < allLinks.length; i++) {
				const element = allLinks[i];
				element?.classList.remove('active');
			}
			selector?.classList.add('active');

			const ul: any = selector.closest('ul.sub-menu');
			if (ul) {
				let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
				if (ele) {
					ele = ele[0];
					setTimeout(() => {
						ele?.classList.add('active');
					});
				}
			}
		}
	}, [pathname]);

	const themeConfig = useAppSelector(selectThemeConfig)

	return (
		<header className={themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}>
			<div className="shadow-sm">
				<div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
					<NavbarLogo />
					<NavbarIconsLinks />
					<div className="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
						<NavbarSearchForm />
						<NavbarThemeToggle />
						<NavbarMessagesDrop />
						<NavbarNotificationDrop />
						<NavbarProfileDrop />
					</div>
				</div>

				{/* horizontal menu */}
				<HorizontalBar />
			</div>
		</header>
	);
};

export default Header;
