import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (fullName) => {
  if (!fullName) return "";
  const names = fullName.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(names.length, 2); i++) {
    initials += names[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";
  const [integerPart, decimalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

const fmt = (d) => new Date(d).toLocaleDateString("en-GB");

export const prepareExpanseBarChartData = (data = []) => {
  const grouped = {};
  data.forEach(({ date, amount }) => {
    const key = new Date(date).toISOString().slice(0, 10);
    grouped[key] = (grouped[key] || 0) + amount;
  });

  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const iso = d.toISOString().slice(0, 10);
    return { date: fmt(d), amount: grouped[iso] || 0 };
  });
};

export const prepareIncomeBarChartData = (data = []) => {
  const grouped = {};
  data.forEach(({ date, amount }) => {
    const key = new Date(date).toISOString().slice(0, 10);
    grouped[key] = (grouped[key] || 0) + amount;
  });

  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const iso = d.toISOString().slice(0, 10);
    return { date: fmt(d), amount: grouped[iso] || 0 };
  });
};

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    category: item?.category,
  }));

  return chartData;
};
