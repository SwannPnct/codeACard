import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase
		.from('cards')
		.select('id,name,size,recto')
		.order('id', { ascending: false });

	return { cards: data, error };
};

export const actions = {
	add: async ({ locals: { supabase } }) => {
		const { data, error } = await supabase.from('cards').insert({}).select();
		if (error) {
			return fail(400, {
				message: error.message
			});
		} else {
			redirect(303, `/cards/${data[0].id}`);
		}
	}
};
