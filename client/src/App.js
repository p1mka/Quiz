import "./App.css";
import { Route, Routes } from "react-router-dom";
import { EditTest, Main, TestPage } from "./pages";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direcrtion: column;
  align-items: center;
  justify-content: center;
  margin: 0 10rem;
  padding: 2rem 0;
  background: #fff;
  height: auto;
`;
function App() {
  return (
    <div className="App">
      <AppContainer>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/edit" element={<EditTest />} />
        </Routes>
      </AppContainer>
    </div>
  );
}

export default App;
