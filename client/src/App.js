import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Categories from "./components/pages/Categories";
import AddCategories from "./components/pages/AddCategories";
import AddOperation from "./components/pages/AddOperation";
import Operations from "./components/pages/Operations";
import Report from "./components/pages/Report";
import ReportGenerator from "./components/pages/ReportGenerator";
import { ProtectedRoute } from "./components/partials/ProtectedRoute";

function App() {
  const [generatedData, setGeneratedData] = useState([]);
  const [initialDate, setInitialDate] = useState();
  const [finalDate, setFinalDate] = useState();
  const [active, setActive] = useState(false);
  const [data, setData] = useState([]);
  const [access, setAccess] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="wrapper" onClick={() => setOpen(false)}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Categories open={open} setOpen={setOpen} />
          </Route>

          <Route path="/edit-cat">
            <AddCategories
              active={active}
              setActive={setActive}
              data={data}
              setData={setData}
              open={open}
              setOpen={setOpen}
            />
          </Route>

          <Route path="/edit-op">
            <AddOperation
              active={active}
              setActive={setActive}
              data={data}
              setData={setData}
              open={open}
              setOpen={setOpen}
            />
          </Route>

          <Route path="/operations">
            <Operations open={open} setOpen={setOpen} />
          </Route>

          <Route path="/generator">
            <ReportGenerator
              generatedData={generatedData}
              setGeneratedData={setGeneratedData}
              setInitialDate={setInitialDate}
              setFinalDate={setFinalDate}
              active={active}
              setActive={setActive}
              data={data}
              setData={setData}
              setAccess={setAccess}
              open={open}
              setOpen={setOpen}
            />
          </Route>

          <ProtectedRoute path="/report" access={access}>
            <Report
              generatedData={generatedData}
              initialDate={initialDate}
              finalDate={finalDate}
              open={open}
              setOpen={setOpen}
            />
          </ProtectedRoute>

          <Route path="*">
            <Categories open={open} setOpen={setOpen} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
