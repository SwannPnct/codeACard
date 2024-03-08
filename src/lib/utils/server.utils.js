import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';
import { redirect } from '@sveltejs/kit';
import { METADATA } from './enums';

export const success = (message, options = {}) => {
	return {
		success: true,
		message,
		...options
	};
};

export const createSupabaseClient = ({ fetch, data }) => {
	return createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: {
			fetch
		},
		cookies: {
			get(key) {
				if (!isBrowser()) {
					return JSON.stringify(data.session);
				}

				const cookie = parse(document.cookie);
				return cookie[key];
			}
		}
	});
};

export const checkSessionAndRedirect = ({ session, url }) => {
	if (session && !url.pathname.includes('/cards')) {
		redirect('301', '/cards');
	} else if (!session && url.pathname.includes('/cards')) {
		redirect('301', '/');
	}
};

export const defineMetadata = ({ route }) => {
	return route.id?.includes('/cards') ? METADATA['/cards'] : METADATA['/'];
};
