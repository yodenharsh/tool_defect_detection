const Footer = () => {
  return (
    <div>
      <footer style = {{
        display: "flex", 
        justifyContent: "center", 
        alignContent: "center", 
        marginTop: "-150px",
        fontSize: "22px"
        }}>This is a footer</footer>

      <p style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignContent: "center", 
        whiteSpace: 'pre-line'
        }}> {'<'}This is where the data row comes in{'>'}</p>
    </div>
  );
};

export default Footer;
