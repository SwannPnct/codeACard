import { render } from '@testing-library/svelte';
import { describe, expect } from 'vitest';
import Error from '$lib/components/Error.svelte';

describe('Error', () => {
	it('renders with default props', () => {
		const { container } = render(Error);
		expect(container.querySelector('strong.text-red-600')).toBeInTheDocument();
	});
});
