# RNA Visualization with React + Fornac

## Setup

1. Install Node.js: `brew install node`
2. Create React app: `npx create-react-app rna-demo --template typescript`
3. Go to project: `cd rna-demo`

## Add Fornac Library

- Copy prebuilt Fornac assets into public/fornac/: fornac.js, fornac.css from https://github.com/ViennaRNA/fornac/tree/36df3c5d73d2f651c3c3b5266e7d705e5bb1d3d1/dist
- Add this to public/index.html
- Place these tags before `</body>` so the DOM is ready when Fornac initializes (prevents "Forna not defined").
- Load d3 first so Fornac finds its dependency.

```html
<script src="https://d3js.org/d3.v3.min.js"></script>
<script src="%PUBLIC_URL%/fornac/fornac.js"></script>
<link rel="stylesheet" href="%PUBLIC_URL%/fornac/fornac.css" />
```

## Create RNA Component

Make `src/components/RNAViewer.tsx`:

```tsx
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    fornac: any;
  }
}

const RNAViewer = ({ sequence, structure }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && window.fornac) {
      const fornaContainer = new window.fornac.FornaContainer(
        containerRef.current,
        {
          animation: true,
          allowPanningAndZooming: true,
          allowEditing: true,
        }
      );

      fornaContainer.addRNA(structure, { sequence: sequence });
    }
  }, [sequence, structure]);

  return <div ref={containerRef} style={{ width: "700px", height: "200px" }} />;
};
```

## Use in App

Update `src/App.tsx`:

```tsx
import RNAViewer from "./components/RNAViewer";

function App() {
  const sequence =
    "CGCUUCAUAUAAUCCUAAUGAUAUGGUUUGGGAGUUUCUACCAAGAGCCUUAAACUCUUGAUUAUGAAGUG";
  const structure =
    "...(((((((..((((((.........))))))......).((((((.......))))))..))))))...";

  return (
    <div style={{ padding: "20px" }}>
      <h1>RNA Demo</h1>
      <RNAViewer sequence={sequence} structure={structure} />
    </div>
  );
}
```

## Common Issues

- **"Forna not defined"** → Check script tags are loaded
- **"Unmatched base"** → Make sure sequence and structure match exactly
- **Wrong API** → Use `addRNA(structure, {sequence: sequence})` format
- **Need d3.js** → Fornac depends on d3.js library

## Run

`npm start` - opens http://localhost:3000
