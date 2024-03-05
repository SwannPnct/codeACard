import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';
import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, data, depends, url, route }) => {
	depends('supabase:auth');

	const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
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

	const {
		data: { session }
	} = await supabase.auth.getSession();

	if (session && !url.pathname.includes('/cards')) {
		redirect('301', '/cards');
	} else if (!session && url.pathname.includes('/cards')) {
		redirect('301', '/');
	}

	const metadata = {
		'/': {
			title: 'codeACard',
			description: 'Code your business card with HTML and CSS then download it.'
		},
		'/cards': {
			title: 'codeACard - Your cards',
			description: 'Add, access and edit your cards.'
		}
	};

	return {
		supabase,
		session,
		metadata: route.id?.includes('/cards') ? metadata['/cards'] : metadata['/']
	};
};
