const Footer = (): JSX.Element => {
    const year = new Date().getFullYear()
    return(
        <footer className="footer">
            <p>&copy; Nasser Kessas {year}</p>
        </footer>
    )
}

export default Footer;