async function afficherBougies() {
    const res = await fetch("https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=20");
    const data = await res.json();
  
    const graphe = document.getElementById("graphe");
    const template = document.getElementById("bougie-template");
  
    const highGlobal = Math.max(...data.map(d => parseFloat(d[2])));
    const lowGlobal = Math.min(...data.map(d => parseFloat(d[3])));
    const range = highGlobal - lowGlobal;
    const facteur = 250 / range;
  
    for (let i = 0; i < data.length; i++) {
      const bougie = data[i];
      const open = parseFloat(bougie[1]);
      const high = parseFloat(bougie[2]);
      const low = parseFloat(bougie[3]);
      const close = parseFloat(bougie[4]);
  
      const up = close >= open;
  
      const clone = template.content.cloneNode(true);
      const corps = clone.querySelector(".corps");
      const meche = clone.querySelector(".meche");
  
      const corpsTop = (highGlobal - Math.max(open, close)) * facteur;
      const corpsHauteur = Math.abs(close - open) * facteur;
      const mecheTop = (highGlobal - high) * facteur;
      const mecheHauteur = (high - low) * facteur;
  
      corps.style.height = `${corpsHauteur}px`;
      corps.style.top = `${corpsTop}px`;
      corps.style.backgroundColor = up ? "green" : "red";
  
      meche.style.height = `${mecheHauteur}px`;
      meche.style.top = `${mecheTop}px`;
      meche.style.backgroundColor = up ? "green" : "red";
  
      graphe.appendChild(clone);
    }
  }
  
  afficherBougies();