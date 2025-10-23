import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial" }}>
      <h1>🔥 Bienvenido a tu Foro Comunitario 🔥</h1>
      <p>Este es un foro anónimo en construcción.</p>
      <p>Si ves esto, tu servidor y tu cliente están funcionando correctamente ✅</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);