// sleep method
export const sleep = async (sec = 1) => {
  return new Promise((res) => setTimeout(res, sec * 1000));
};

export const isEmpty = (param: string | null | any) =>
  param === null || typeof param === 'undefined' || param.length == 0;

export const copyToClipboard = (content: string) => {
  navigator && navigator.clipboard.writeText(content);
};

export const formatNumberWithCommas = (value: number): string | null => {
  // format number from 1000 to 1,000
  if (!value || !Number.isFinite(value)) return null;
  return new Intl.NumberFormat('en-US').format(value);
};

export const getDiscountPercentage = (costPrice: string, sellingPrice: string) => {
  const difference = Number(costPrice) - Number(sellingPrice);
  const discountPercentage = (difference / Number(costPrice)) * 100;
  return discountPercentage;
};
