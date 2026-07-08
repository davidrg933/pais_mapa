import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// Datos geográficos de todos los países del mundo (formato TopoJSON), públicos y gratuitos.
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

export default function WorldMap({ notesByCode, onSelectCountry }) {
  return (
    <ComposableMap projection="geoMercator" style={{ width: '100%', height: 'auto' }}>
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const code = geo.id; // código numérico ISO del país
            const hasNote = Boolean(notesByCode[code]?.note);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => onSelectCountry(geo)}
                style={{
                  default: {
                    fill: hasNote ? '#4f8cff' : '#d6d6da',
                    stroke: '#ffffff',
                    strokeWidth: 0.5,
                    outline: 'none',
                  },
                  hover: { fill: '#2f5fd0', outline: 'none', cursor: 'pointer' },
                  pressed: { fill: '#1c3f9e', outline: 'none' },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}
