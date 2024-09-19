import Head from "next/head";
import React from "react";

const SEO = ({ title, description, image, url }: { title: string, description: string, image: string, url: string }) => {
    return (
        <Head>
            <title>{title} U2R Technologies</title>
            <meta name="description" content={description} />
            <meta name="og:title" content= {title} />
            <meta name="og:description" content={description} />
            <meta name="og:image" content={image} />
            <meta name="og:url" content={url} />
        </Head>
    );
};

export default SEO;