import React from 'react';
import './App.css';
import RNAViewer from './components/RNAViewer';

function App() {
  const sequence = "CGCUUCAUAUAAUCCUAAUGAUAUGGUUUGGGAGUUUCUACCAAGAGCCUUAAACUCUUGAUUAUGAAGUG";
  const structure = "...(((((((..((((((.........))))))......).((((((.......))))))..))))))...";

  return (
    <div style={{ padding: '20px' }}>
      <h1>RNA Forna Demo</h1>
      <RNAViewer sequence={sequence} structure={structure} />
    </div>
  );
}

export default App;
