import "./App.css";
import { BoardLayout } from "./components/BoardLayout/BoardLayout";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";

function App() {
  return (
    <BoardLayout>
      <ControlPanel />
    </BoardLayout>
  );
}

export default App;
