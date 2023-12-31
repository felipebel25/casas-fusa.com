import { PropsWithChildren } from "react";
import Head from "next/head"
import { Box } from "@mui/material";

import { Navbar } from "@/components/atoms/navBar/Navbar";
import { SideMenu } from "@/components/molecules/SideMenu";

interface Props extends PropsWithChildren {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
    tags: string[];
}

export const ShopLayout = ({
    children,
    title,
    pageDescription,
    imageFullUrl = 'https://i.ibb.co/9sxsNy6/Screenshot-from-2023-12-31-00-15-28.png',
    tags
}: Props) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
                <meta name="og:title" content={title} />
                <meta name="author" content="casasfusa.com" />
                <meta name="keywords" content={tags.toString()} />
                <meta name="robots" content="index, follow" />
                <meta name="og:type" content="website" />
                <meta name="og:description" content={pageDescription} />
                {imageFullUrl && (<meta property='og:image' content={imageFullUrl} />)}
            </Head>
            <nav>
                <Navbar />
            </nav>
            <SideMenu />
            <Box
                component={'main'}
                sx={{
                    marginTop: "4.5rem",
                    width: "100%",
                    height: "calc(100% - 4.5rem)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                {children}
            </Box>
        </>
    )
}
