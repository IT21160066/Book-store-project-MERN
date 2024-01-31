import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Dashlayout from "./components/Dashlayout";
import Welcome from "./features/auth/Welcome";
import NoteList from "./features/notes/NoteList";
import UsersList from "./features/users/UsersList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route path="dash" element={<Dashlayout />}>
          <Route index element={<Welcome />} />
          <Route path="notes">
            <Route index element={<NoteList />} />
          </Route>
          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>
        </Route>
        {/* End dash*/}
      </Route>
    </Routes>
  );
}

export default App;
