import { createContext, useContext, useState } from 'react';
import { User } from 'src/types/user.type';
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth';
import { Peer } from 'peerjs';

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  peer: Peer;
  peerId: string | null;
  setPeerId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const getInitialAppContext = (): AppContextInterface => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  peer: new Peer(),
  peerId: null,
  setPeerId: () => null
});

const initialContext = getInitialAppContext();

export const AppContext = createContext<AppContextInterface>(initialContext);

export const AppProvider = ({
  children,
  defaultValue = initialContext
}: {
  children: React.ReactNode;
  defaultValue?: AppContextInterface;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    defaultValue.isAuthenticated
  );
  const [profile, setProfile] = useState<User | null>(defaultValue.profile);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile: defaultValue.profile,
        setProfile: defaultValue.setProfile,
        peer: defaultValue.peer,
        peerId: defaultValue.peerId,
        setPeerId: defaultValue.setPeerId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};
