import { createContext, useContext, useMemo, useCallback } from "react";
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

  const updateField = useCallback(
    (path, value) => {
      setProfile((prev) => {
        const keys = path.split(".");
        if (keys.length === 1) {
          return { ...prev, [keys[0]]: value };
        }
        const next = { ...prev };
        let obj = next;
        for (let i = 0; i < keys.length - 1; i++) {
          obj[keys[i]] = { ...obj[keys[i]] };
          obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = value;
        return next;
      });
    },
    [setProfile]
  );

  const value = useMemo(
    () => ({ profile, setProfile, updateField, theme }),
    [profile, setProfile, updateField, theme]
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
