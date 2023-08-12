export function formatearFecha(fecha: any): string {
  const miFecha = new Date(fecha);
  const formatter = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const fechaFormateada = formatter.format(miFecha);

  return fechaFormateada;
}
