import { createSupabaseClient } from '$lib/utils/server.utils';
import { checkSessionAndRedirect } from '$lib/utils/server.utils';
import { defineMetadata } from '../lib/utils/server.utils';

export const load = async ({ fetch, data, url, route }) => {
	const supabase = createSupabaseClient({ fetch, data });

	const {
		data: { session }
	} = await supabase.auth.getSession();

	checkSessionAndRedirect({ session, url });

	return {
		supabase,
		session,
		metadata: defineMetadata({ route })
	};
};
