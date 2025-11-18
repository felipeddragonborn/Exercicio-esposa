import { useState, useEffect } from "react";

const initialTreinos = {
  A: [
    { nome: "Extensora + Aquecimento", aquecimento: 1, series: 3, reps: "10 - 12", carga: "" },
    { nome: "Agachamento Hack + Aquecimento", aquecimento: 1, series: 3, reps: "10 - 12", carga: "" },
    { nome: "Flexonra", series: 3, reps: "10 - 12", carga: "" },
    { nome: "Cadeira Abdutora", series: 3, reps: "10 - 12", carga: "" },
    { nome: "Panturrilha", series: 3, reps: "10 - 12", carga: "" }
    
  ],
  B: [
    { nome: "Puxada Alta + Aquecimento", aquecimento: 1, series: 3, reps: "10-12", carga: "" },
    { nome: "Remada Aberta", series: 3, reps: "10 - 12", carga: "" },
    { nome: "Supino Reto + Aquecimento", aquecimento: 1, series: 3, reps: "10 - 12", carga: "" },
    { nome: "Desenvolvimento", series: 3, reps: "10 - 12", carga: "" },
    { nome: "Elevação Lateral", series: 2, reps: "10 - 12", carga: "" },
    { nome: "Tríceps Corda", series: 2, reps: "10 - 12", carga: "" },
    { nome: "Bíceps Corda", series: 2, reps: "10 - 12", carga: "" },
   
  ],
  C: [
    { nome: "Mesa Flexora + Aquecimento", aquecimento: 1, series: 3, reps: "10-12", carga: "" },
    { nome: "Agachamento Hack + Aquecimento", aquecimento: 1, series: 3, reps: "10 - 12", carga: "" },
    { nome: "Stiff", series: 3, reps: "10 - 12", carga: "" },
    { nome: "Elevação Pélvica", series: 3, reps: "10 - 12", carga: "" },
    { nome: "Panturrilha", series: 3, reps: "10 - 12", carga: "" }
  ]
};

export default function App() {
  const [treinoSelecionado, setTreinoSelecionado] = useState("A");
  const [dados, setDados] = useState(() => {
    const salvo = localStorage.getItem("TreinoPirulita");
    return salvo ? JSON.parse(salvo) : initialTreinos;
  });

  useEffect(() => {
    localStorage.setItem("TreinoPirulita", JSON.stringify(dados));
  }, [dados]);

  const updateCarga = (index, novaCarga) => {
    setDados(prev => {
      const copia = { ...prev };
      copia[treinoSelecionado][index].carga = novaCarga;
      return copia;
    });
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Treino Pirulita</h1>

      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {Object.keys(dados).map(key => (
          <button
            key={key}
            onClick={() => setTreinoSelecionado(key)}
            style={{
              padding: "10px 20px",
              borderRadius: 10,
              background: treinoSelecionado === key ? "#1976d2" : "#ccc",
              color: treinoSelecionado === key ? "white" : "black"
            }}
          >
            Ficha {key}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        {dados[treinoSelecionado].map((ex, i) => (
          <div
            key={i}
            style={{
              padding: 15,
              marginBottom: 15,
              background: "white",
              borderRadius: 15,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}
          >
            <h2>{ex.nome}</h2>
            <p>Séries: {ex.series} | Reps: {ex.reps}</p>

            <input
              type="text"
              placeholder="Carga usada (kg)"
              value={ex.carga}
              onChange={e => updateCarga(i, e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 10,
                background: "#f0f0f0",
                border: "1px solid #ccc"
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
