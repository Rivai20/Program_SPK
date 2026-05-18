const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
};

const formatPersen = (number) => {
  return number.toFixed(2) + '%';
};

const calculateMinMax = (values) => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return { min, max };
};

const calculateNormalization = (value, min, max, isBenefit = true) => {
  if (min === max) return 1;
  if (isBenefit) return (value - min) / (max - min);
  return (max - value) / (max - min);
};

module.exports = {
  formatRupiah,
  formatPersen,
  calculateMinMax,
  calculateNormalization
};