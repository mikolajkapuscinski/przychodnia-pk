interface InputBoxProps {
	type: string;
	id: string;
	name: string;
	value: string;
	onChange: any;
	required?: boolean;
}

export const InputBox = (p: InputBoxProps) => {
	return (
		<input
			type={p.type}
			id={p.id}
			name={p.name}
			value={p.value}
			onChange={p.onChange}
			required={p.required}
			className="
				w-full 
				px-4 py-2 
				border border-default-gray rounded-3xl
				focus:outline-none 
				focus:ring-2 
				focus:ring-orange
			"
		/>
	);
};
