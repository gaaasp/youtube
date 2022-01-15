import Head from "next/head";
import { HTMLAttributes } from "react";

export interface SEOProps extends HTMLAttributes<HTMLHeadElement> {
	title: string;
}

const APP_NAME = "YouTube";

export const SEO = ({ title }: SEOProps) => (
	<Head>
		<title>{title ? `${title} | ${APP_NAME}` : APP_NAME}</title>
		<meta property="og:type" content="website" />
		<meta property="og:title" content={title || "Accueil"} />
		<meta property="og:site_name" content={APP_NAME} />
		<meta property="twitter:card" content="summary" />
		<meta property="twitter:title" content={title || "Accueil"} />
		<meta name="apple-mobile-web-app-title" content={APP_NAME} />
		<meta name="application-name" content={APP_NAME} />
	</Head>
);
