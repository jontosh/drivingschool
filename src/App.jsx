import { Fragment } from "react";

const App = () => {
  return (
    <Fragment>
      <header>
        <h1 className={`text-center`}>Hello Header</h1>
      </header>
      <main>
        <h1 className={`text-center`}>Hello Main</h1>
      </main>
      <footer>
        <h1 className={`text-center`}>Hello Footer</h1>
      </footer>
    </Fragment>
  );
};

export default App;
