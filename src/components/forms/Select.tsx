interface SelectProps {
	id: string;
	name: string;
	value: string;
	onChange: any;
	options: { value: string; label: string }[];
	required?: boolean;
	placeholder?: string;
}

export const Select = (p: SelectProps) => {
	return (
		<select
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
		>
		{p.placeholder && (
			<option value="" disabled className="text-default-gray">
				{p.placeholder}
			</option>
      	)}
		{p.options.map((option) => (
			<option 
				key={option.value} 
				value={option.value}
				className="text-default-text hover:bg-orange hover:text-white rounded-3xl"
			>
				{option.label}
			</option>
		))}
		</select>
	);
};
