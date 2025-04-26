const conversionRates = {
    USD: { EUR: 0.8777, GBP: 0.7528, INR: 85.1275, CAD: 1.3788, AUD: 1.5540, JPY: 140.751, CHF: 0.8192, CNY: 7.2863, MXN: 19.6514, BRL: 5.8013, ZAR: 18.6602, KRW: 1424.22 },
    EUR: { USD: 1.1392, GBP: 0.8578, INR: 97.015, CAD: 1.5712, AUD: 1.7713, JPY: 160.33, CHF: 0.9333, CNY: 8.2991, MXN: 22.391, BRL: 6.6102, ZAR: 21.263, KRW: 1622.41 },
    GBP: { USD: 1.3278, EUR: 1.166, INR: 112.9, CAD: 1.8321, AUD: 2.065, JPY: 186.5, CHF: 1.0885, CNY: 9.678, MXN: 26.09, BRL: 7.707, ZAR: 24.77, KRW: 1889.3 },
    INR: { USD: 0.0117, EUR: 0.0103, GBP: 0.0089, CAD: 0.0163, AUD: 0.0183, JPY: 1.63, CHF: 0.0094, CNY: 0.0857, MXN: 0.258, BRL: 0.067, ZAR: 0.218, KRW: 16.74 },
    CAD: { USD: 0.725, EUR: 0.6365, GBP: 0.546, INR: 61.5, AUD: 1.127, JPY: 101.93, CHF: 0.5945, CNY: 5.287, MXN: 15.7, BRL: 4.165, ZAR: 13.49, KRW: 1085.3 },
    AUD: { USD: 0.6436, EUR: 0.5646, GBP: 0.484, INR: 54.7, CAD: 0.888, JPY: 90.42, CHF: 0.527, CNY: 4.69, MXN: 13.9, BRL: 3.68, ZAR: 11.96, KRW: 964.25 },
    JPY: { USD: 0.0071, EUR: 0.0062, GBP: 0.0054, INR: 0.61, CAD: 0.0098, AUD: 0.011, CHF: 0.0058, CNY: 0.0517, MXN: 0.154, BRL: 0.041, ZAR: 0.132, KRW: 10.66 },
    CHF: { USD: 1.22, EUR: 1.0714, GBP: 0.9188, INR: 106.38, CAD: 1.682, AUD: 1.897, JPY: 172.41, CNY: 8.925, MXN: 25.38, BRL: 6.99, ZAR: 22.8, KRW: 1835.4 },
    CNY: { USD: 0.1372, EUR: 0.1205, GBP: 0.1034, INR: 11.67, CAD: 0.1892, AUD: 0.213, JPY: 19.34, CHF: 0.112, MXN: 2.84, BRL: 0.784, ZAR: 2.56, KRW: 205.8 },
    MXN: { USD: 0.0509, EUR: 0.0447, GBP: 0.0384, INR: 3.88, CAD: 0.064, AUD: 0.072, JPY: 6.51, CHF: 0.0394, CNY: 0.352, BRL: 0.276, ZAR: 0.89, KRW: 72.46 },
    BRL: { USD: 0.1723, EUR: 0.1513, GBP: 0.1298, INR: 14.92, CAD: 0.240, AUD: 0.272, JPY: 24.5, CHF: 0.143, CNY: 1.275, MXN: 3.62, ZAR: 3.23, KRW: 262.5 },
    ZAR: { USD: 0.0536, EUR: 0.047, GBP: 0.0403, INR: 4.59, CAD: 0.0742, AUD: 0.0836, JPY: 7.57, CHF: 0.0439, CNY: 0.39, MXN: 1.12, BRL: 0.31, KRW: 81.2 },
    KRW: { USD: 0.00070, EUR: 0.00061, GBP: 0.00053, INR: 0.059, CAD: 0.00092, AUD: 0.00103, JPY: 0.093, CHF: 0.00055, CNY: 0.00486, MXN: 0.0138, BRL: 0.0038, ZAR: 0.0123 }
  };
  
  const amountInput = document.getElementById("amount");
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");
  const spinner = document.getElementById("spinner");
  
  async function convertCurrency() {
    const amount = amountInput.value.trim();
    errorDiv.textContent = "";
    resultDiv.textContent = "";
    spinner.style.display = "block";
  
    if (!amount || isNaN(amount)) {
      errorDiv.textContent = "Please enter a valid numeric amount.";
      spinner.style.display = "none";
      return;
    }
  
    const from = fromCurrency.value;
    const to = toCurrency.value;
  
    try {
      if (!conversionRates[from] || !conversionRates[from][to]) {
        throw new Error(`Conversion rate for ${from} to ${to} not found.`);
      }
  
      const rate = conversionRates[from][to];
      const convertedAmount = (parseFloat(amount) * rate).toFixed(2);
      resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
      errorDiv.textContent = "Error fetching conversion rate. Please try again.";
      console.error(error);
    } finally {
      spinner.style.display = "none";
    }
  }
  
  document.getElementById("swapButton").addEventListener("click", () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
  });
  