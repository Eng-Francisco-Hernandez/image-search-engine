import { ThemeProvider } from "react-bootstrap";
import { Landing } from "./pages";
import './app.scss';

function App() {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <Landing />
    </ThemeProvider>
  );
}

export default App;
