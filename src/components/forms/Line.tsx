import { HTMLAttributes } from "react";

export const Line: React.FC<HTMLAttributes<HTMLDivElement>> = ({className ,...rest}) => {
	return (
        <hr {...rest} className={`border-t border-default-gray my-4 ${className}`} />
	);
};
