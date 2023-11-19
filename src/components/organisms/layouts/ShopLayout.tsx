import { Navbar } from "@/components/atoms/Navbar";
import { SideMenu } from "@/components/molecules/SideMenu";
import { Box } from "@mui/material";
import Head from "next/head"
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
}

export const ShopLayout = ({ children, title, pageDescription, imageFullUrl }: Props) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
                <meta name="og:title" content={title} />
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
                    margin: "80px auto",
                    width:"100% !important",
                    maxWidth: "1440px",
                }}
            >
                {children}
            </Box>
        </>
    )
}
