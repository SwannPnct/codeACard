import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import LabeledContainer from '$lib/components/LabeledContainer.svelte';

describe('LabeledContainer', () => {
	it('renders with default props', () => {
		const { container } = render(LabeledContainer, { label: 'Label' });
		expect(container.querySelector('span').innerHTML).toBe('Label');
	});
	it('renders with overrided class', () => {
		const { container } = render(LabeledContainer, {
			label: 'Label',
			overrideClass: 'added-class'
		});
		expect(container.querySelector('.added-class')).toBeInTheDocument();
	});
});
