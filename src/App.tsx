import { CopyProvider } from './context/CopyContext';
import CommandGrid from "./components/CommandGrid";

const App = () => {
  return (
    <CopyProvider>
      <div>
        <CommandGrid />
      </div>
    </CopyProvider>
  );
};

export default App;