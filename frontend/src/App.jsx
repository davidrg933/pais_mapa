import React, { useEffect, useState, useCallback } from 'react';
import WorldMap from './components/WorldMap';
import CountryPanel from './components/CountryPanel';
import { getAllCountries, saveCountryNote, deleteCountryNote } from './api';

export default function App() {
  const [notesByCode, setNotesByCode] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(null);

  const loadNotes = useCallback(async () => {
    const rows = await getAllCountries();
    const map = {};
    rows.forEach((r) => { map[r.code] = r; });
    setNotesByCode(map);
  }, []);

  useEffect(() => { loadNotes(); }, [loadNotes]);

  const handleSelectCountry = (geo) => setSelectedCountry(geo);

  const handleSave = async (text) => {
    const code = selectedCountry.id;
    const name = selectedCountry.properties.name;
    const saved = await saveCountryNote(code, name, text);
    setNotesByCode((prev) => ({ ...prev, [code]: saved }));
  };

  const handleDelete = async () => {
    const code = selectedCountry.id;
    await deleteCountryNote(code);
    setNotesByCode((prev) => {
      const copy = { ...prev };
      delete copy[code];
      return copy;
    });
  };

  return (
    <div className="app">
      <h1>Mi mapa de países</h1>
      <p className="subtitle">Haz clic en un país para añadir tus notas. Los países en azul ya tienen algo escrito.</p>
      <div className="layout">
        <WorldMap notesByCode={notesByCode} onSelectCountry={handleSelectCountry} />
        <CountryPanel
          country={selectedCountry}
          note={selectedCountry ? notesByCode[selectedCountry.id] : null}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setSelectedCountry(null)}
        />
      </div>
    </div>
  );
}
