import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

import TermsAndConditions from "../../components/Modals/TermsAndConditions";
import PrivacyPolicy from "../Modals/PrivacyPolicy";

import FacebookIcon from "../../assets/logos/thirdparty/icons8-facebook.svg";
import InstagramIcon from "../../assets/logos/thirdparty/icons8-instagram.svg";
import TwitterIcon from "../../assets/logos/thirdparty/icons8-twitter.svg";
import EmailIcon from "../../assets/icons/created/MessagesBlack.svg";

function Footer() {
  const [termsAndConditionsDisplay, setTermsAndConditionsDisplay] =
    useState(false);
  const [privacyPolicyDisplay, setPrivacyPolicyDisplay] = useState(false);

  function openTermsAndConditionsModal() {
    setTermsAndConditionsDisplay(true);
  }

  function closeTermsAndConditionsModal() {
    setTermsAndConditionsDisplay(false);
  }

  function openPrivacyPolicyModal() {
    setPrivacyPolicyDisplay(true);
  }

  function closePrivacyPolicyModal() {
    setPrivacyPolicyDisplay(false);
  }

  return (
    <>
      <footer className={styles["footer"]}>
        <div className={styles["links"]}>
          <span className={styles["our-team-header"]}>
            <h5>Our Team</h5>
          </span>
          <div className={styles["our-team"]}>
            <Link to="/Edgar">Edgar | </Link>
            <Link to="/Daniel">Daniel | </Link>
            <Link to="/Em">Em | </Link>
            <Link to="/Sabrina">Sabrina | </Link>
            <Link to="/Wenjie">Wenjie | </Link>
            <Link to="/Cameron">Cameron | </Link>
            <Link to="/Wameedh">Wameedh</Link>
          </div>
          <span className={styles["social-media-header"]}>
            <h5>Follow Us</h5>
          </span>
          <div className={styles["social-media-links"]}>
            <a href="https://www.facebook.com/">
              <img className={styles["facebook-icon"]} src={FacebookIcon} />
            </a>
            <a href="https://www.instagram.com/">
              <img className={styles["instagram-icon"]} src={InstagramIcon} />
            </a>
            <a href="https://twitter.com/">
              <img className={styles["twitter-icon"]} src={TwitterIcon} />
            </a>
            <a href="">
              <img className={styles["email-icon"]} src={EmailIcon} />
            </a>
          </div>
          <span className={styles["icons8-attribution-header"]}>
            <h5>Icons by</h5>
          </span>
          <div className={styles["icons8-attribution"]}>
            <a href="https://icons8.com/">icons8.com</a>
          </div>
        </div>

        <div className={styles["terms-conditions"]}>
          <button
            className={styles["terms-button"]}
            onClick={openTermsAndConditionsModal}
          >
            Terms of Use
          </button>
          <span>|</span>
          <button
            className={styles["policy-button"]}
            onClick={openPrivacyPolicyModal}
          >
            Privacy Policy
          </button>
        </div>
      </footer>
      {/* Modals */}
      <TermsAndConditions
        display={termsAndConditionsDisplay}
        onClose={closeTermsAndConditionsModal}
      />
      <PrivacyPolicy
        display={privacyPolicyDisplay}
        onClose={closePrivacyPolicyModal}
      />
    </>
  );
}

export default Footer;
