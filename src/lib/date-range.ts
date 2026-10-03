const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

const toInstant = (day: string | undefined, time: string) => {
  if (!day || !DATE_ONLY.test(day)) return undefined;

  // Sin zona en el texto, la fecha se interpreta en la zona horaria del navegador.
  const date = new Date(`${day}T${time}`);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

// El rango se guarda en la URL como días (YYYY-MM-DD). La API recibe instantes: el
// inicio del día "desde" y el final del día "hasta", para que ambos días queden
// completos. Con solo la fecha, "hasta" dejaría fuera todo ese día.
export const toRangeBounds = ({ from, to }: { from?: string; to?: string }) => ({
  from: toInstant(from, "00:00:00.000"),
  to: toInstant(to, "23:59:59.999"),
});
