import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

function App() {
  const handleSubmit = (event, searchFields) => {
    event.preventDefault();

    console.log(searchFields);
  };

  return (
    <div className="App">
      <h1>Please enter two GitHub users</h1>
      <SearchBox handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
