export const styles = {
    main: {
        backgroundImage: { xs: "url(/images/banner-background-mobile.png)", md: "url(/images/banner-background.png)" },
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: { xs: "200%", md: "100% 100%" },
        height: { xs: "auto", md: "22.5rem" },
        padding: { xs: "3rem 0.5rem", md: "0" },
        display: 'flex',
        textAlign: { xs: "center", md: "left" },
        alignItems: "center",
        mt: { xs: "5rem", md: "1.5rem" }
    },
    container: {
        width: "100%",
        margin: "0 auto",
        pl: "0rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    title: {
        color: "#0B4665",
        fontSize: { xs: "1.45rem", md: "auto" },
        mb: { xs: "1rem", md: "0" }
    },
    description: {
        color: "black",
        mt: "0.35rem",
        fontSize: { xs: '1.25rem', md: "1.35rem" },
        whiteSpace: 'pre-line',
        maxWidth: { md: "75%" },
    }
}