import React from "react";
import SearchForm from "./components/SearchForm"; 
import ResultTable from "./components/ResultTable"; 
import AddUser from "./components/AddUser";

function App() { 
const [kw, setKeyword] = React.useState(""); 
const [newUser, setNewUser] = React.useState(null); 
return ( 
  <div> 
    <h1>Quản lý người dùng</h1> 
    <SearchForm onChangeValue={setKeyword} />
    <AddUser onAdd={(user) => setNewUser(user)} />
    <ResultTable keyword={kw} user={newUser} onAdd={() =>setNewUser(null)} />
  </div> 
  );
}
export default App;