import { Link } from "react-router-dom";

export default function Brand({ className = "" }) {
  return (
    <Link className={`brand ${className}`.trim()} to="/" aria-label="ABTalks home">
      <img src="/assets/abtalks-logo-light.png" alt="ABTalks" className="brand-logo brand-logo--light" width="900" height="225" />
      <img src="/assets/abtalks-logo-dark.png" alt="" className="brand-logo brand-logo--dark" width="900" height="225" aria-hidden="true" />
    </Link>
  );
}
