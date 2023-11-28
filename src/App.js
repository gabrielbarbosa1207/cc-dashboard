import "./styles.css";
import Editor from "./Editor";
import 'react-quill/dist/quill.snow.css';

export default function App() {
  return (
    <div className="App">
      <h1>Category Forms</h1>
      <p>Note: this is an experimental build of Comparar Cartões</p>
      <Editor />

    </div>
  );
}
