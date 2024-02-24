import { error, fail, redirect } from '@sveltejs/kit';

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
				message: error.message
			});
		}
	},
	delete: async ({ params, locals: { supabase } }) => {
		const { error } = await supabase.from('cards').delete().eq('id', params.slug);

		if (error) {
			return fail(400, {
				message: error.message
			});
		} else {
			redirect('301', '/cards');
		}
	}
};
