async function fetchDerniereBougie() {
    const res = await fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1');
    const data = await res.json();
    const bougie = data[0]; // on récupère la première (et seule) bougie
  
    console.log({
      openTime: new Date(bougie[0]),
      open: bougie[1],
      high: bougie[2],
      low: bougie[3],
      close: bougie[4],
      volume: bougie[5],
      closeTime: new Date(bougie[6])
    });
  }
  
  fetchDerniereBougie();
  