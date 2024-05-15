import { Link } from "react-router-dom";
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
        }}
      >
        <p style={{ fontSize: "25px", textAlign: "center", padding: "20px" }}>
          Built With love by
          <span>
            <Link
              style={{ color: "white" }}
              className="nav-link"
              to={"https://www.linkedin.com/in/anoop-kumar-4048791b9/"}
            >
              <FaLinkedin /> Anoop Kumar
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
