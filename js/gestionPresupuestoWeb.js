export function mostrarDatoEnId(idElemento, valor) {
  const el = document.getElementById(idElemento);
  if (!el) return;
  el.textContent = String(valor ?? "");
}

