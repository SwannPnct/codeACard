import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Button from '$lib/components/Button.svelte';

describe('Button', () => {
	it('renders with default props', () => {
		render(Button);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});
	it('renders with loading props', async () => {
		const { component } = render(Button, {
			loadingMessage: 'Loading Message',
			loading: false
		});
		expect(screen.queryByText('Loading Message')).not.toBeInTheDocument();
		expect(screen.queryByRole('status')).not.toBeInTheDocument();
		await component.$$set({ loading: true });
		expect(screen.queryByText('Loading Message')).toBeInTheDocument();
		expect(screen.queryByRole('status')).toBeInTheDocument();
	});
	it('dispatches on:click event', () => {
		const { component } = render(Button);
		const onClick = vi.fn();
		component.$on('click', onClick);

		fireEvent.click(screen.getByRole('button'));
		expect(onClick).toHaveBeenCalledOnce();
	});
});
