import { Link } from "react-router-dom";

export default function Brand({ className = "" }) {
  return (
    <Link className={`brand ${className}`.trim()} to="/" aria-label="ABTalks home">
      <img src="/assets/abtalks-logo.png" alt="ABTalks" className="brand-logo" width="747" height="182" />
    </Link>
  );
}
