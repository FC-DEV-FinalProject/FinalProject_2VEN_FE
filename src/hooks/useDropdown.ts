import { useState, useEffect } from 'react';

export const useDropdown = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleDropdown = (strategyId: number) => {
    setActiveDropdown((prev) => (prev === strategyId ? null : strategyId));
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      closeDropdown();
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return { activeDropdown, toggleDropdown, closeDropdown };
};
