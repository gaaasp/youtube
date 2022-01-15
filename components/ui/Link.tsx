import NextLink from "next/link";
import { AnchorHTMLAttributes } from "react";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
}

export const Link = ({ href, ...props }: LinkProps) => (
	<NextLink href={href}>
		<a {...props} />
	</NextLink>
);
