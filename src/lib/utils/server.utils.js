export const success = (message, options = {}) => {
	return {
		success: true,
		message,
		...options
	};
};
