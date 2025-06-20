export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div>
        <h4>Contact</h4>
        <p>
          Email Support:{' '}
          <a href="mailto:support@emergencyhub.org">
            support@emergencyhub.org
          </a>
        </p>
        <p>Phone Help Line: +1‑800‑EM‑HELP</p>
        <p className="social">
          <a href="#fb"></a> <a href="#tw"></a> <a href="#wa"></a>
        </p>
        <p>1234 Elm St, Springfield, USA</p>
      </div>

      <div>
        <h4>Follow for urgent updates</h4>
        <a href="#volunteer">Volunteer Signup</a>
        <a href="#chatbot">Live Chat / Chatbot</a>
      </div>
    </footer>
  );
}
