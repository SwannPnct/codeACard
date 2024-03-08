import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { success } from '$lib/utils/server.utils';
import { createBrowserClient } from '@supabase/ssr';
import { createSupabaseClient } from '$lib/utils/server.utils';
import { redirect } from '@sveltejs/kit';
import { checkSessionAndRedirect, defineMetadata } from '$lib/utils/server.utils';
import { METADATA } from '../../../src/lib/utils/enums';

describe('success', () => {
	it('returns a success object with message and options', () => {
		expect(success('Success', { goto: '/url' })).toStrictEqual({
			success: true,
			message: 'Success',
			goto: '/url'
		});
	});
});

describe('createSupabaseClient', () => {
	beforeAll(() => {
		vi.mock('@supabase/ssr', () => ({
			createBrowserClient: vi.fn().mockImplementation(() => {})
		}));
	});

	it('calls supabase createclient method', () => {
		createSupabaseClient({ fetch, data: {} });
		expect(createBrowserClient).toHaveBeenCalled();
	});
});

describe('checkSessionAndRedirect', () => {
	beforeAll(() => {
		vi.mock('@sveltejs/kit', () => ({
			redirect: vi.fn()
		}));
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('redirects to /cards if session is truthy and user not already on /cards', () => {
		checkSessionAndRedirect({ session: {}, url: { pathname: '/' } });
		expect(redirect).toHaveBeenCalledWith('301', '/cards');
	});
	it('redirects to / if session is falsy and user not already on /', () => {
		checkSessionAndRedirect({ session: null, url: { pathname: '/cards' } });
		expect(redirect).toHaveBeenCalledWith('301', '/');
	});
	it('does not redirect if session is truthy and user already on /cards', () => {
		checkSessionAndRedirect({ session: null, url: { pathname: '/' } });
		expect(redirect).not.toHaveBeenCalled();
	});
	it('does not redirect if session is falsy and user already on /', () => {
		checkSessionAndRedirect({ session: {}, url: { pathname: '/cards' } });
		expect(redirect).not.toHaveBeenCalled();
	});
});

describe('defineMetadata', () => {
	it('returns home metadata', () => {
		expect(defineMetadata({ route: { id: '/' } })).toStrictEqual(METADATA['/']);
	});
	it('returns cards metadata', () => {
		expect(defineMetadata({ route: { id: '/cards' } })).toStrictEqual(METADATA['/cards']);
	});
});
