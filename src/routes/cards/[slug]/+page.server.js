import { error, fail } from '@sveltejs/kit';
import { success } from '$lib/utils/server.utils';

export const load = async ({ params, locals: { supabase } }) => {
	const { data, error: supaError } = await supabase.from('cards').select().eq('id', params.slug);
	if (supaError || data.length === 0) {
		error(404, {
			message: supaError?.message ?? 'Something went wrong'
		});
	} else {
		return { card: data[0] };
	}
};

export const actions = {
	save: async ({ params, request, locals: { supabase } }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const recto = formData.get('recto');
		const verso = formData.get('verso');
		const size = formData.get('size');

		const { error } = await supabase
			.from('cards')
			.update({ name, recto, verso, size })
			.eq('id', params.slug);

		if (error) {
			return fail(400, {
				message: 'Card failed to save'
			});
		} else {
			return success('Card was successfully saved');
		}
	},
	delete: async ({ params, locals: { supabase } }) => {
		const { error } = await supabase.from('cards').delete().eq('id', params.slug);

		if (error) {
			return fail(400, {
				message: 'Card failed to delete'
			});
		} else {
			return success('Card was successfully deleted');
		}
	}
};
