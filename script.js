const selectDe = document.getElementById('deMoeda');
const selectPara = document.getElementById('paraMoeda');
const resultado = document.getElementById('resultado');

async function carregarMoedas() {
  try {
    const res = await fetch("https://api.exchangerate.host/symbols");
    const data = await res.json();

    if (!data.success) {
      throw new Error("Erro ao buscar símbolos da API.");
    }

    const symbols = data.symbols;

    for (let codigo in symbols) {
      let nome = symbols[codigo].description;
      let option1 = new Option(`${codigo} - ${nome}`, codigo);
      let option2 = new Option(`${codigo} - ${nome}`, codigo);
      selectDe.add(option1);
      selectPara.add(option2);
    }

    selectDe.value = "USD";
    selectPara.value = "BRL";
  } catch (error) {
    console.error("Erro ao carregar moedas:", error);
    resultado.innerText = "Erro ao carregar moedas. Verifique sua conexão ou tente novamente.";
  }
}

async function converter() {
  const valor = parseFloat(document.getElementById("valor").value);
  const de = selectDe.value;
  const para = selectPara.value;

  if (isNaN(valor)) {
    resultado.innerText = "Digite um valor válido.";
    return;
  }

  try {
    const res = await fetch(`https://api.exchangerate.host/convert?from=${de}&to=${para}&amount=${valor}`);
    const data = await res.json();

    if (!data.result) {
      throw new Error("Erro na conversão.");
    }

    resultado.innerText = `${valor} ${de} = ${data.result.toFixed(2)} ${para}`;
  } catch (error) {
    console.error("Erro na conversão:", error);
    resultado.innerText = "Erro ao converter. Tente novamente.";
  }
}

carregarMoedas();
