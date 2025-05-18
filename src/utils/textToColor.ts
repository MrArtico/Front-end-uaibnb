export default function textToColor(text: string) {
  // Gera um número baseado no texto
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 2) - hash);
  }

  // Garante que fique no intervalo de 0-360 (matiz)
  const hue = hash % 360;

  // Retorna uma cor HSL com saturação e luminosidade fixas
  return `hsl(${hue}, 70%, 40%)`;
}
