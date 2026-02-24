import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Your Name</h2>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Projects</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;