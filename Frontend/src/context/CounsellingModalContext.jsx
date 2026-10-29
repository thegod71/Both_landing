import { useState, useEffect, useCallback } from "react";
import { CounsellingModalContext } from "./counsellingContext";

/**
 * CounsellingModalProvider manages the state of the lead capture / counselling popup form.
 * Automatically opens the popup modal on initial website visit after a smooth delay,
 * and allows any CTA button across the website to re-open it at any time.
 */
export function CounsellingModalProvider({
  children,
  autoOpen = true,
  autoOpenDelay = 1200,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [modalKey, setModalKey] = useState(0);

  useEffect(() => {
    if (!autoOpen) return;

    // Trigger popup smoothly after initial page load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, autoOpenDelay);

    return () => clearTimeout(timer);
  }, [autoOpen, autoOpenDelay]);

  const openModal = useCallback((customData = {}) => {
    if (customData && typeof customData === "object") {
      setInitialData(customData);
    }
    setModalKey((k) => k + 1);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <CounsellingModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        toggleModal,
        initialData,
        submittedData,
        setSubmittedData,
        modalKey,
      }}
    >
      {children}
    </CounsellingModalContext.Provider>
  );
}

export default CounsellingModalProvider;
