import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <Fragment>
      <header>
        <h1 className={`text-center`}>Hello Header</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <h1 className={`text-center`}>Hello Footer</h1>
      </footer>
    </Fragment>
  );
};

export default App;
