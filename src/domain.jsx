import { createContext, useContext, useMemo, useState } from "react";
import { domainsData, getDomainById } from "./data";

const DomainContext = createContext(null);
const STORAGE_KEY = "abtalks-selected-domain";
const DEFAULT_DOMAIN_ID = "software-engineering";

function getSavedDomain() {
  try {
    const savedDomain = localStorage.getItem(STORAGE_KEY);
    return getDomainById(savedDomain) ? savedDomain : null;
  } catch (error) {
    return null;
  }
}

export function DomainProvider({ children }) {
  const [selectedDomainId, setSelectedDomainId] = useState(getSavedDomain);

  const value = useMemo(() => {
    const activeDomain = getDomainById(selectedDomainId) || getDomainById(DEFAULT_DOMAIN_ID) || domainsData[0];

    return {
      domains: domainsData,
      activeDomain,
      selectedDomainId,
      hasSelectedDomain: Boolean(selectedDomainId),
      selectDomain(domainId) {
        if (!getDomainById(domainId)) return;
        setSelectedDomainId(domainId);
        try {
          localStorage.setItem(STORAGE_KEY, domainId);
        } catch (error) {
          // The selected domain remains active for the current session.
        }
      }
    };
  }, [selectedDomainId]);

  return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
}

export function useDomain() {
  return useContext(DomainContext);
}
