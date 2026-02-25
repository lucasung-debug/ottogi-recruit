import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { DEFAULT_COMPANY_PROFILE } from "../config/defaults";
import { generateTheme } from "../styles/theme";

const CompanyProfileContext = createContext(null);

const STORAGE_KEY = "recruit-tool-profile";

export function CompanyProfileProvider({ children }) {
  const [profile, setProfile] = useLocalStorage(
    STORAGE_KEY,
    DEFAULT_COMPANY_PROFILE
  );

  const theme = useMemo(
    () => generateTheme(profile.brandColors),
    [profile.brandColors]
  );

  const value = useMemo(
    () => ({ profile, setProfile, theme }),
    [profile, setProfile, theme]
  );

  return (
    <CompanyProfileContext.Provider value={value}>
      {children}
    </CompanyProfileContext.Provider>
  );
}

export function useCompanyProfile() {
  const ctx = useContext(CompanyProfileContext);
  if (!ctx) {
    throw new Error("useCompanyProfile must be used within CompanyProfileProvider");
  }
  return ctx;
}
