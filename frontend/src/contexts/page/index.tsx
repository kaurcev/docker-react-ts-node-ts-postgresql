import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface PageContextType {
  title: string;
  setTitle: (title: string) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (title) {
      document.title = `${title} | TypicalFolder`;
    }
  }, [title]);

  return (
    <PageContext.Provider value={{ title, setTitle }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) throw new Error('usePage must be used within PageProvider');
  return context;
};

export const usePageTitle = (title: string) => {
  const { setTitle } = usePage();
  useEffect(() => {
    setTitle(title);
  }, [title, setTitle]);
};