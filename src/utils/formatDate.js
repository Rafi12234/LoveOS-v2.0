export function formatDate(dateStr) {
  if (!dateStr || dateStr === 'Ongoing') return dateStr;
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatNumber(num) {
  return num.toLocaleString('en-US');
}
