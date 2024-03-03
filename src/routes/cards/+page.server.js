import { fail } from '@sveltejs/kit';
import { success } from '$lib/utils/server.utils';

export const load = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase
		.from('cards')
		.select('id,name,size,recto,created_at')
		.order('created_at', { ascending: true });

	return { cards: data, error };
};

export const actions = {
	add: async ({ locals: { supabase } }) => {
		const { data, error } = await supabase.from('cards').insert({}).select();
		if (error) {
			return fail(400, {
				message: 'Card failed to be added'
			});
		} else {
			return success('Card was successfully added', { goto: `/cards/${data[0].id}` });
		}
	}
};
