import React, { useEffect, useState } from 'react';

export default function CountryPanel({ country, note, onSave, onDelete, onClose }) {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(note?.note || '');
  }, [country, note]);

  if (!country) {
    return (
      <div className="panel panel-empty">
        <p>Selecciona un país en el mapa para añadir o ver tus notas.</p>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>{country.properties.name}</h2>
        <button onClick={onClose}>✕</button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe aquí tus notas sobre este país..."
        rows={10}
      />
      <div className="panel-actions">
        <button onClick={() => onSave(text)}>Guardar</button>
        {note?.note && (
          <button onClick={onDelete} className="danger">Borrar</button>
        )}
      </div>
    </div>
  );
}
