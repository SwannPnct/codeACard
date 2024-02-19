import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	signout: async ({ locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			return fail(400, {
				message: 'Something went wrong'
			});
		}
		redirect(301, '/');
	},
	signin: async ({ locals: { supabase } }) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github'
		});

		if (error) {
			return fail(400, {
				message: 'Something went wrong'
			});
		}

		redirect(303, data.url);
	}
};
