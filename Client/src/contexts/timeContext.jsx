import moment from "moment";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const TimeContext = createContext(Date.now());

export const TimeProvider = ({ children }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <TimeContext.Provider value={now}>{children}</TimeContext.Provider>;
};

export const TimeAgo = ({ timestamp }) => {
  const now = useContext(TimeContext);
  return <span>{moment(timestamp).fromNow()}</span>;
};
