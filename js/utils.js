function median(values) {
  if (values.length === 0) throw new Error("No inputs");

  values.sort((a, b) => a - b);

  var half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}

function mod(values) {
  const list = Object.entries(
    values.reduce((accumulator, item) => {
      return { ...accumulator, [item]: (accumulator[item] || 0) + 1 };
    }, {})
  ).sort((first, second) => second[1] - first[1]);
  const elements = list.filter((el) => el[0] === list[0][0]);
  return (
    elements.reduce((a, b) => (a += parseInt(b[0]) || a), 0) / elements.length
  );
}

function averageColor(imageElement, countList, algoritimo = "media") {
  const tipos = ["media", "mediana", "moda"];
  if (!tipos.includes(algoritimo))
    throw Error("Tipo invalido: " + tipos.join(", "));
  // Create the canvas element
  var canvas = document.createElement("canvas"),
    // Get the 2D context of the canvas
    context = canvas.getContext && canvas.getContext("2d"),
    imgData,
    width,
    height;

  height = canvas.height =
    imageElement.naturalHeight ||
    imageElement.offsetHeight ||
    imageElement.height;
  width = canvas.width =
    imageElement.naturalWidth || imageElement.offsetWidth || imageElement.width;
  context.drawImage(imageElement, 0, 0);
  imgData = context.getImageData(0, 0, width, height);

  let colorList = [];
  const max = Math.floor(imgData.data.length / countList);
  for (var indice = 0; indice < countList; indice++) {
    if (algoritimo === tipos[0]) colorList.push({ count: 0, r: 0, g: 0, b: 0 });
    else colorList.push({ r: [], g: [], b: [] });
    for (var i = max * indice; i < max * (indice + 1); i += 4) {
      if (algoritimo === tipos[0]) {
        colorList[indice].r += imgData.data[i] || 0;
        colorList[indice].g += imgData.data[i + 1] || 0;
        colorList[indice].b += imgData.data[i + 2] || 0;
        colorList[indice].count++;
      } else {
        colorList[indice].r.push(imgData.data[i] || 0);
        colorList[indice].g.push(imgData.data[i + 1] || 0);
        colorList[indice].b.push(imgData.data[i + 2] || 0);
      }
    }
  }

  return colorList
    .map((color) =>
      algoritimo === tipos[0] // Media
        ? {
          r: Math.floor(color.r / color.count),
          g: Math.floor(color.g / color.count),
          b: Math.floor(color.b / color.count),
        }
        : algoritimo === tipos[1] // Mediana
          ? {
            r: median(color.r),
            g: median(color.g),
            b: median(color.b),
          }
          : {
            // Moda
            r: mod(color.r),
            g: mod(color.g),
            b: mod(color.b),
          }
    )
    .map((rgb) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`); // Converter em texto
}

function timePad(time) {
  const timeSeconds = Math.abs(time);
  const mileseconds = Math.floor((timeSeconds % 1) * 10);
  const seconds = timeSeconds % 60;
  const minutes = (timeSeconds / 60) % 60;
  const hours = (timeSeconds / 60 / 60) % 60;

  return [hours, minutes, seconds, mileseconds]
    .map(value => value >= 10 ? Math.floor(value) : "0" + Math.floor(value))
    .join(":");
}