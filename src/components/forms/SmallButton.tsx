interface SmallButtonProps {
	type?: 'submit' | 'reset' | 'button' | undefined;
	disabled?: boolean,
    onClick?: any;
	children: string
}

export const SmallButton = (p: SmallButtonProps) => {
	return (
		<button
            onClick={p.onClick}
            className=" 
              text-orange
                font-bold
                w-8
              bg-default-white
                p-1
                m-1
                rounded-full
            "
        >
            {p.children}
        </button>
	);
}; 
