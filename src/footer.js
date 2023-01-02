import React from "react";

const Footer = () => (
  <div className="footer">
    <div>
      <button
        className="footer_button "
        onClick={() =>
          window.open(
            "https://ugurkoc.de/privacy-policy/",
            "_blank",
            "noreferrer"
          )
        }
      >
        <span>Privacy policy</span>
      </button>
      <button
        className="footer_button"
        onClick={() =>
          window.open(
            "https://ugurkoc.de/imprint/", 
            "_blank", 
            "noreferrer")
        }
      >
        <span>Imprint</span>
      </button>
      <span className="centertext">
        Made by{" "}
        <a
          href="https://twitter.com/UgurKocDe/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Ugur Koc
        </a>{" "}
        with &#x2615;
      </span>
    </div>
  </div>
);

export default Footer;
