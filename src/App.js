import { useState, useEffect } from "react";

const initialTreinos = {
  A: [
    { nome: "Extensora + Aquecimento", aquecimento: 1, series: 3, reps: "10 - 12", carga: "", anotacao: "" },
    { nome: "Agachamento Hack + Aquecimento", aquecimento: 1, series: 3, reps: "10 - 12", carga: "", anotacao: "" },
    { nome: "Flexora", series: 3, reps: "10 - 12", carga: "", anotacao: "" },
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
    { nome: "Flexora + Aquecimento", aquecimento: 1, series: 3, reps: "10-12", carga: "", anotacao: "" },
    { nome: "Agachamento Hack + Aquecimento", aquecimento: 1, series: 3, reps: "10 - 12", carga: "", anotacao: "" },
    { nome: "Stiff", series: 3, reps: "10 - 12", carga: "", anotacao: "" },
    { nome: "Elevação Pélvica", series: 3, reps: "10 - 12", carga: "", anotacao: "" },
    { nome: "Panturrilha", series: 3, reps: "10 - 12", carga: "", anotacao: "" }
  ]
};

export default function App() {
  const [treinoSelecionado, setTreinoSelecionado] = useState("A");
  const [tela, setTela] = useState("treino");

  const [dados, setDados] = useState(() => {
    const salvo = localStorage.getItem("TreinoPirulita");
    return salvo ? JSON.parse(salvo) : initialTreinos;
  });

  useEffect(() => {
    localStorage.setItem("TreinoPirulita", JSON.stringify(dados));
  }, [dados]);

  const updateCampo = (index, campo, valor) => {
    setDados((prev) => {
      const copia = { ...prev };
      copia[treinoSelecionado][index][campo] = valor;
      return copia;
    });
  };

  // Salvar histórico
  const finalizarTreino = () => {
    const treinoFeito = {
      data: new Date().toLocaleString(),
      tipo: treinoSelecionado,
      exercicios: dados[treinoSelecionado]
    };

    const historicoAntigo =
      JSON.parse(localStorage.getItem("historicoTreinos")) || [];

    const novoHistorico = [...historicoAntigo, treinoFeito];

    localStorage.setItem("historicoTreinos", JSON.stringify(novoHistorico));

    alert("Treino salvo no histórico!");
  };

  const historico =
    JSON.parse(localStorage.getItem("historicoTreinos")) || [];

  // -------------- ESTILOS ROXO NEON ----------------
  const container = {
    padding: 20,
    maxWidth: 600,
    margin: "auto",
    color: "white",
    fontFamily: "Arial",
    background: "#0a0014",
    minHeight: "100vh"
  };

  const botaoNeon = (ativo) => ({
    padding: "10px 20px",
    borderRadius: 10,
    background: ativo
      ? "linear-gradient(45deg, #9b4dff, #7a00ff)"
      : "#2a2a2a",
    color: "white",
    border: ativo ? "2px solid #b566ff" : "1px solid #555",
    boxShadow: ativo ? "0 0 10px #b566ff" : "none",
    cursor: "pointer"
  });

  const card = {
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
    background: "#1a002e",
    boxShadow: "0 0 15px rgba(150,0,255,0.3)"
  };

  const inputStyle = {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    background: "#26004b",
    border: "1px solid #7a00ff",
    color: "white"
  };

  const botaoFinalizar = {
    background: "linear-gradient(45deg, #b400ff, #6000ff)",
    padding: "12px",
    width: "100%",
    marginTop: 25,
    borderRadius: 10,
    border: "none",
    color: "white",
    boxShadow: "0 0 12px #b700ff",
    cursor: "pointer",
    fontSize: 18
  };

  // ----------------------------------------------------

  return (
    <div style={container}>
      <h1 style={{ textAlign: "center", textShadow: "0 0 10px #a200ff" }}>
        Treino Pirulita 💜
      </h1>

      {/* Botões para trocar treino */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {Object.keys(dados).map((key) => (
          <button
            key={key}
            onClick={() => {
              setTreinoSelecionado(key);
              setTela("treino");
            }}
            style={botaoNeon(treinoSelecionado === key)}
          >
            Treino {key}
          </button>
        ))}
      </div>

      {/* Botão para histórico */}
      <button
        onClick={() => setTela("historico")}
        style={{
          ...botaoNeon(false),
          width: "100%",
          marginTop: 20,
          background: "black",
          border: "1px solid #7a00ff"
        }}
      >
        📅 Ver Histórico
      </button>

      {/* Tela de Histórico */}
      {tela === "historico" && (
        <div style={{ marginTop: 20 }}>
          <h2 style={{ textShadow: "0 0 10px #a200ff" }}>Histórico</h2>

          {historico.length === 0 && <p>Nenhum treino salvo ainda.</p>}

          {historico.map((t, idx) => (
            <div key={idx} style={card}>
              <h3>Treino {t.tipo} — {t.data}</h3>

              {t.exercicios.map((e, i) => (
                <p key={i}>
                  <strong>{e.nome}</strong><br />
                  Carga: {e.carga || "—"}<br />
                  Anotação: {e.anotacao || "—"}
                </p>
              ))}
            </div>
          ))}

          <button
            onClick={() => setTela("treino")}
            style={{ ...botaoNeon(false), width: "100%", marginTop: 10 }}
          >
            🔙 Voltar
          </button>
        </div>
      )}

      {/* Tela de Treino */}
      {tela === "treino" && (
        <div style={{ marginTop: 20 }}>
          {dados[treinoSelecionado].map((ex, i) => (
            <div key={i} style={card}>
              <h2>{ex.nome}</h2>
              <p>Séries: {ex.series} | Reps: {ex.reps}</p>

              <input
                type="text"
                placeholder="Carga usada (kg)"
                value={ex.carga}
                onChange={(e) => updateCampo(i, "carga", e.target.value)}
                style={inputStyle}
              />

              <textarea
                placeholder="Anotações"
                value={ex.anotacao}
                onChange={(e) => updateCampo(i, "anotacao", e.target.value)}
                rows={2}
                style={inputStyle}
              />
            </div>
          ))}

          <button onClick={finalizarTreino} style={botaoFinalizar}>
            ✔ Finalizar Treino
          </button>
        </div>
      )}
    </div>
  );
}
