import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import useDarkMode from "@/components/darkMode";

const Design = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Fragment>
      <section className={`Design ${isDarkMode ? 'mode-dark' : ''}`}>
        <div className="container px-4 mx-auto">
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              id="darkModeToggle"
              checked={isDarkMode}
              onChange={toggleDarkMode} 
            />
            <label htmlFor="darkModeToggle">Dark Mode</label>
          </div>
          <Outlet />
        </div>
      </section>
    </Fragment>
  );
};

export default Design;
