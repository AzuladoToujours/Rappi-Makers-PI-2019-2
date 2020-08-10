export const formatPosition = (position) => {
  if (position === 'cocinero') return 1;
  if (position === 'mesero') return 2;
  if (position === 'lavaplatos') return 3;
  return 0;
};

export const getPositionName = (positionId) => {
  if (positionId === '1') return 'Cocinero';
  if (positionId === '2') return 'Mesero';
  if (positionId === '3') return 'Lava platos';
  return '';
};

export const formatReqDate = (date, hour) => {
  return `${date} ${hour}`;
};

export const formatDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    hour12: 'false',
  };
  const newDate = new Date(date);
  return newDate.toLocaleString('es-ES', options);
};

export const formatPayment = (payment) => {
  const number = parseInt(payment, 10);
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
