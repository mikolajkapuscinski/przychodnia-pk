interface ButtonProps {
	type?: 'submit' | 'reset' | 'button' | undefined;
	disabled?: boolean,
	children: string
}

export const Button = (p: ButtonProps) => {
	return (
		<button
			type={p.type}
			className="
				w-full 
				py-2 
				bg-orange
				text-default-white
				rounded-md 
				hover:bg-light-orange
				focus:outline-none 
				focus:ring-2 
				focus:ring-orange
			"
		>
			{p.children}
		</button>
	);
};
