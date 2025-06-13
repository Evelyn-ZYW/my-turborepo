import PaginatedList from "./comps/PaginatedList";
import InfiniteList from "./comps/InfiniteList";
import "./App.scss";

function App() {
  return <div className="App">
  <PaginatedList />
  <InfiniteList />
  </div>;
}

export default App;
