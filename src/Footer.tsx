const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={{ backgroundColor: '#fdf8f0', color: '#5e4b3c', padding: '24px', textAlign: 'center', borderTop: '1px solid #e3d5ca' }}>
      <p className="mb-0">Marc Aries Bantasan | {currentYear} | Earth Tones Edition</p>
    </footer>
  );
};

export default Footer;