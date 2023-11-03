import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Main,
  MyCabinet,
  MyQuizzes,
  Registration,
  TestPage,
} from "./pages";
import { Header, NotFound } from "./components";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./actions";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  flex-wrap: wrap;
  margin: 1rem 6rem;
  padding: 2rem 0;
  background: #fff;
  border-radius: 0.5rem;
`;
function App() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserJSON = sessionStorage.getItem("user");

    if (!currentUserJSON) {
      return;
    }
    const currentUser = JSON.parse(currentUserJSON);
    dispatch(setUser(currentUser));
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <AppContainer>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/test/:id" element={<TestPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-quizzes" element={<MyQuizzes />} />
          <Route path="/my-cabinet" element={<MyCabinet />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContainer>
    </div>
  );
}

export default App;
