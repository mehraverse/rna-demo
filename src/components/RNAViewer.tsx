import { useEffect, useRef } from 'react';
declare global {
  interface Window {
    fornac: any;
  }
}

type RNAViewerProps = {
  sequence: string;
  structure: string;
};

const RNAViewer = ({ sequence, structure }: RNAViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && window.fornac) {
      try {
        // Use the correct FornaContainer constructor (note: using FornaContainer, not window.fornac.FornaContainer)
        const fornaContainer = new window.fornac.FornaContainer(containerRef.current, {
          animation: true,
          allowPanningAndZooming: false,
          allowEditing: true
        });
        
        // Correct API: structure first, then options with sequence
        fornaContainer.addRNA(structure, {
          sequence: sequence,
          name: 'RNA Molecule'
        });
      } catch (error) {
        console.error('Fornac initialization error:', error);
      }
    }
  }, [sequence, structure]);

  return <div ref={containerRef} style={{ width: '700px', height: '200px' }} />;
};

export default RNAViewer;
