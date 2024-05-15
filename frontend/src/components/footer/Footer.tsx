import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa';

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
          <span>
            {/* LinkedIn */}
            <Link
              style={{ color: "white", marginRight: "20px" }}
              className="nav-link"
              to={"https://www.linkedin.com/in/anoop-kumar-4048791b9/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </Link>
            {/* GitHub */}
            <Link
              style={{ color: "white", marginRight: "20px" }}
              className="nav-link"
              to={"https://github.com/anoop-rkt"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </Link>
            {/* Instagram */}
            <Link
              style={{ color: "white", marginRight: "20px" }}
              className="nav-link"
              to={"https://www.instagram.com/theanoopkr/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </Link>
            {/* Twitter */}
            <Link
              style={{ color: "white", fontSize: "22px" }}
              className="nav-link"
              to={"https://twitter.com/theanoopkr"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </Link>
            {/* Gmail */}
            <Link
              style={{ color: "white", fontSize: "23px" }}
              className="nav-link"
              to={"mailto:anooprkt736@gmail.com"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope />
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
