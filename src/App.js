import { useState, useEffect } from "react";

const initialTreinos = {
  A: [
    { nome: "Extensora + Aquecimento", aquecimento: 1, series: 3, reps: "10 - 12", carga: "", anotacao: "" },
    { nome: "Agachamento Hack + Aquecimento", aquecimento: 1, series: 3, reps: "10 - 12", carga: "", anotacao: "" },
    { nome: "Flexonra", series: 3, reps: "10 - 12", carga: "", anotacao: "" },
    { nome: "Cadeira Abdutora", series: 3, reps: "10 - 12", carga: "", anotacao: "" },
    { nome: "Panturrilha", series: 3, reps: "10 - 12", carga: "", anotacao: "" }
  ],
  B: [
    { nome: "Puxada Alta + Aquecimento", aquecimento: 1, series: 3, reps: "10-12", carga: "", anotacao: "" },
    { nome: "Remada Aberta", series: 3, reps: "10 - 12", carga: "", anotacao: "" },
    { nome: "Supino Reto + Aquecimento", aquecimento: 1, series: 3, reps: "10 - 12", carga: "", anotacao: "" },
    { nome: "Desenvolvimento", series: 3, reps: "10 - 12", carga: "", anotacao: "" },
    { nome: "Elevação Lateral", series: 2, reps: "10 - 12", carga: "", anotacao: "" },
    { nome: "Tríceps Corda", series: 2, reps: "10 - 12", carga: "", anotacao: "" },
    { nome: "Bíceps Corda", series: 2, reps: "10 - 12", carga: "", anotacao: "" }
  ],
  C: [
    { nome: "Mesa Flexora + Aquecimento", aquecimento: 1, series: 3, reps: "10-12", carga: "", anotacao: "" },
    { nome: "Agachamento Hack + Aquecimento", aquecimento: 1, series: 3, reps: "10 - 12", carga: "", anotacao: "" },
    { nome: "Stiff", series: 3, reps: "10 - 12", carga: "", anotacao: "" },
    { nome: "Elevação Pélvica", series: 3, reps: "10 - 12", carga: "", anotacao: "" },
    { nome: "Panturrilha", series: 3, reps: "10 - 12", carga: "", anotacao: "" }
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
    <div
      style={{
        minHeight: "100vh",
        padding: 20,
        background: "#1a0029",
        backgroundImage:
          "radial-gradient(circle at top, #6a0dad55, transparent), radial-gradient(circle at bottom, #8b00ff55, transparent)",
        color: "#fff",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#d38bff", textShadow: "0 0 10px #b300ff" }}>
        Treino Pirulita 💜
      </h1>

      {/* Botões de seleção */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
        {Object.keys(dados).map(key => (
          <button
            key={key}
            onClick={() => setTreinoSelecionado(key)}
            style={{
              padding: "12px 20px",
              borderRadius: 12,
              background: treinoSelecionado === key ? "#b300ff" : "#4a0072",
              color: "white",
              border: "2px solid #b300ff",
              textShadow: "0 0 8px #ff00ff",
              boxShadow: treinoSelecionado === key ? "0 0 15px #ff00ff" : "0 0 5px #550077",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            Ficha {key}
          </button>
        ))}
      </div>

      {/* Lista de exercícios */}
      <div style={{ marginTop: 30 }}>
        {dados[treinoSelecionado].map((ex, i) => (
          <div
            key={i}
            style={{
              padding: 20,
              marginBottom: 20,
              borderRadius: 15,
              background: "#2c0040",
              border: "1px solid #b300ff",
              boxShadow: "0 0 12px #6a0dad",
            }}
          >
            <h2 style={{ color: "#e5b3ff", marginBottom: 5 }}>{ex.nome}</h2>
            <p style={{ color: "#c77dff" }}>
              Séries: {ex.series} | Reps: {ex.reps}
            </p>

            <input
              type="text"
              placeholder="Carga usada (kg)"
              value={ex.carga}
              onChange={e => updateCarga(i, e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                background: "#3d0066",
                color: "white",
                border: "1px solid #d400ff",
                boxShadow: "0 0 8px #d400ff",
                marginTop: 10,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
