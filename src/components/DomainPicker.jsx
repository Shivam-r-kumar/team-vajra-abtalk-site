import { useEffect } from "react";

export default function DomainPicker({ domains, currentDomainId, onSelect, onClose, required = false }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !required) onClose?.();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, required]);

  return (
    <div className="domain-picker-modal" onMouseDown={(event) => event.target === event.currentTarget && !required && onClose?.()}>
      <section className="domain-picker-dialog" role="dialog" aria-modal="true" aria-labelledby="domainPickerTitle" aria-describedby="domainPickerDescription">
        <header className="domain-picker-header">
          <div>
            <p className="dashboard-overline dashboard-overline--blue">Personalise your challenge</p>
            <h2 id="domainPickerTitle">Choose your learning domain</h2>
            <p id="domainPickerDescription">Your daily task and 30-day challenge history will adapt to this track.</p>
          </div>
          {!required && <button type="button" onClick={onClose} aria-label="Close domain selector">×</button>}
        </header>

        <div className="domain-picker-grid" role="group" aria-label="Available learning domains">
          {domains.map((domain, index) => {
            const selected = currentDomainId === domain.id;
            return (
              <button
                className={`domain-option domain-option--${domain.id}${selected ? " is-selected" : ""}`}
                type="button"
                onClick={() => onSelect(domain.id)}
                aria-pressed={selected}
                autoFocus={required && index === 0}
                key={domain.id}
              >
                <span className="domain-option__symbol" aria-hidden="true">{domain.symbol}</span>
                <span className="domain-option__name">{domain.name}</span>
                <span className="domain-option__description">{domain.description}</span>
                <span className="domain-option__footer">
                  {domain.badge ? <b>{domain.badge}</b> : <span>{selected ? "Selected" : "Choose track"}</span>}
                  <i aria-hidden="true">→</i>
                </span>
              </button>
            );
          })}
        </div>

        <p className="domain-picker-note">Saved on this device. You can change the domain later from your dashboard.</p>
      </section>
    </div>
  );
}
