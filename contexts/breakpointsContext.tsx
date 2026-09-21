import React, { useContext, useEffect } from 'react';
import { useState, useMemo } from 'react';
import { useWindowWidth } from '@utils';

interface Breakpoints {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
}

export const BREAKPOINTS = {
  XS: 0,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
};

const initialState: Breakpoints = {
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
};

interface BreakpointsContextProps {
  breakpoints: Breakpoints;
  mobileMode: boolean;
  tabletDown: boolean;
  width: number;
}

export const BreakpointsContext = React.createContext<BreakpointsContextProps>({
  breakpoints: initialState,
  mobileMode: false,
  tabletDown: false,
  width: undefined,
});

export const BreakpointsContextProvider = (props) => {
  const { width, triggerWidthChange } = useWindowWidth(500);
  const [breakpoints, setBreakpoints] = useState<Breakpoints>(initialState);
  const [mobileMode, setMobileMode] = useState<boolean>(width <= BREAKPOINTS.MD);
  const tabletDown = useMemo(
    () => breakpoints.xs || breakpoints.sm || breakpoints.md,
    [breakpoints]
  );

  useEffect(() => {
    triggerWidthChange();
  }, []);

  useEffect(() => {
    setBreakpoints({
      xs: BREAKPOINTS.XS <= width && width < BREAKPOINTS.SM,
      sm: BREAKPOINTS.SM <= width && width < BREAKPOINTS.MD,
      md: BREAKPOINTS.MD <= width && width < BREAKPOINTS.LG,
      lg: BREAKPOINTS.LG <= width && width < BREAKPOINTS.XL,
      xl: BREAKPOINTS.XL <= width,
    });
    setMobileMode(width < BREAKPOINTS.MD);
  }, [width]);

  return (
    <BreakpointsContext.Provider
      value={{
        breakpoints,
        mobileMode,
        tabletDown,
        width,
      }}
    >
      {React.Children.toArray(props.children)}
    </BreakpointsContext.Provider>
  );
};

export const useBreakpoints = () => useContext(BreakpointsContext);
