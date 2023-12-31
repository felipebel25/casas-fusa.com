export const styles = {
    main: {
        width: { xs: "95%", md: "32.5%" },
        padding: "0.4rem",
        m: { xs: "1rem auto", md: "0" },
        borderRadius: "1rem",
        '& > p': {
            textDecoration: "none",
        }
    },
    imageHouse: {
        width: "95%",
        height: { xs: "auto", md: "284px" },
        m: "1rem auto",
        mt: "0",
        mb: "0",
        borderRadius: "0.25rem"
    },
    description: {
        maxWidth: '95%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        display: 'inline-block',
    },
    textIcon: {
        display: "flex",
        alignItems: "center",
        m: "1rem 0",
        fontFamily: "'Raleway'"
    },
    icon: {
        color: "#e8f7ff",
        stroke: "black",
        mr: "0.5rem"
    }
}