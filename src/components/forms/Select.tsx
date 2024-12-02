interface SelectProps {
	id: string;
	name: string;
	value: string;
	onChange: any;
	options: { value: string; label: string }[];
	required?: boolean;
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
			border border-default-gray rounded-xl
			focus:outline-none 
			focus:ring-2 
			focus:ring-orange
		"
		>
		{p.options.map((option) => (
			<option 
				key={option.value} 
				value={option.value}
				className="text-default-text hover:bg-orange hover:text-white rounded-md"
			>
				{option.label}
			</option>
		))}
		</select>
	);
};
