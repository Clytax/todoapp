import React, { useState, useEffect } from 'react';

// Store
import useThemeStore from '../../Store/ThemeStore';

import { sun, moon } from '../../constants/images';

const Header = () => {
  const theme = useThemeStore((state) => state.theme);
  const changeTheme = useThemeStore((state) => state.changeTheme);

  return (
    <div className="header">
      <h1 className="header-h1 text-d-neutral-100 fw-bold">TODO</h1>
      <div className="header__theme">
        <img
          src={theme === 'light' ? sun : moon}
          alt="theme"
          onClick={() => changeTheme(theme === 'light' ? 'dark' : 'light')}
        />
      </div>
    </div>
  );
};

export default Header;
