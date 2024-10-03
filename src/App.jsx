import { BasicTable } from "./components/BasicTable";
import { mockData } from "./data/MOCK_DATA";

function App() {
  return (
    <>
      <BasicTable data={mockData} />
    </>
  );
}

export default App;
