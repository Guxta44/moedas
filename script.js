const selectDe = document.getElementById('deMoeda');
const selectPara = document.getElementById('paraMoeda');
const resultado = document.getElementById('resultado');

async function carregarMoedas() {
  const res = await fetch("https://api.exchangerate.host/symbols");
  const data = await res.json();
  const symbols = data.symbols;
  for (let codigo in symbols) {
    let option1 = new Option(codigo, codigo);
    let option2 = new Option(codigo, codigo);
    selectDe.add(option1);
    selectPara.add(option2);
  }
  selectDe.value = "USD";
  selectPara.value = "BRL";
}

async function converter() {
  const valor = parseFloat(document.getElementById("valor").value);
  const de = selectDe.value;
  const para = selectPara.value;
  if (isNaN(valor)) {
    resultado.innerText = "Digite um valor válido.";
    return;
  }
  const res = await fetch(`https://api.exchangerate.host/convert?from=${de}&to=${para}&amount=${valor}`);
  const data = await res.json();
  resultado.innerText = `${valor} ${de} = ${data.result.toFixed(2)} ${para}`;
}

carregarMoedas();
