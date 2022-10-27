const getStyles = () => ({
  title: {
    fontSize: 40,
    padding: '17px',
    marginBottom: '60px'
  }
})

const Title = ()=> {
  const styles = getStyles()

  return <h1 style={styles.title}>People And Their Cars</h1>
}

export default Title;