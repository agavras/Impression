let ColorRed = 128;
let ColorGreen = 128;
let ColorBlue = 128;
let img;
let table;
let newRow;
let buttonImport;
let buttonExport;
let buttonSave;
let buttonOpen;
let sliderSize;
let sliderOpacity;
let valSize;
let valOpacity;
let valSize2;
let valOpacity2;
let Re_Draw = false;
let r = 0;
let rows;
let fs = 0;
let sliderR;
let sliderG;
let sliderB;
let colorPick = false;

function preload() {
  img = loadImage("myCanvas.png");
  table2 = loadTable("new.csv", "csv", "header");
}

function setup() {
  createCanvas(1920, 1080);
  createNewTable();
  background(210, 200, 150);
  SetInterface();
  buttonSave = createButton("Save CSV");
  buttonSave.position(320, 0);
  buttonSave.size(100, 32);
  buttonSave.mousePressed(SaveFile);
  buttonSave.class("save");
  buttonOpen = createButton("Open CSV");
  buttonOpen.position(320, 32);
  buttonOpen.size(100, 32);
  buttonOpen.mousePressed(OpenFile);
  buttonOpen.class("open");

  buttonExport = createButton("Export PNG");
  buttonExport.position(420, 0);
  buttonExport.size(100, 32);
  buttonExport.mousePressed(ExportImg);
  buttonExport.class("export");
  buttonImport = createButton("Import PNG");
  buttonImport.position(420, 32);
  buttonImport.size(100, 32);
  buttonImport.mousePressed(ImportImg);
  buttonImport.class("import");

  buttonPlayTimeLapse = createButton("TimeLapse");
  buttonPlayTimeLapse.position(520, 0);
  buttonPlayTimeLapse.size(100, 32);
  buttonPlayTimeLapse.mousePressed(PlayTimeLapse);
  buttonPlayTimeLapse.class("timelapse");

  buttonClearAll = createButton("Clear All");
  buttonClearAll.position(520, 32);
  buttonClearAll.size(100, 32);
  buttonClearAll.mousePressed(GoClearAll);
  buttonClearAll.class("clearall");

  buttonPick = createButton("P");
  buttonPick.position(620, 32);
  buttonPick.size(32, 32);
  buttonPick.mousePressed(ActivePicker);
  buttonPick.class("colorPicker");

  buttonFullScreen = createButton("FS");
  buttonFullScreen.position(620, 0);
  buttonFullScreen.size(32, 32);
  buttonFullScreen.mousePressed(GoFullScreen);
  buttonFullScreen.class("fullscreen");

  sliderSize = createSlider(0.1, 10, 3.3, 0.1);
  sliderSize.position(5, 38);
  sliderSize.style("width", "150px");

  sliderOpacity = createSlider(1, 255, 210);
  sliderOpacity.position(160, 38);
  sliderOpacity.style("width", "150px");

  sliderR = createSlider(0, 255, 128);
  sliderR.position(5, 70);
  sliderR.style("width", "600px");

  sliderG = createSlider(0, 255, 128);
  sliderG.position(5, 90);
  sliderG.style("width", "600px");

  sliderB = createSlider(0, 255, 128);
  sliderB.position(5, 110);
  sliderB.style("width", "600px");

  updateColorSelector();
  currentTool = 'brush';
}

function ActivePicker() {
  // alert("Color Picker Activated !");
  currentTool = 'colorPicker';
}

function createNewTable() {
  table = new p5.Table();
  table.addColumn("id");
  table.addColumn("BrushSize");
  table.addColumn("BrushOpacity");
  table.addColumn("BrushRed");
  table.addColumn("BrushGreen");
  table.addColumn("BrushBlue");
  table.addColumn("M_X");
  table.addColumn("M_Y");
  table.addColumn("M_PX");
  table.addColumn("M_PY");
}

function GoClearAll() {
  if (Re_Draw === false) {
    clear();
    background(210, 200, 150);
    SetInterface();
  }
}

function GoFullScreen() {
  if (Re_Draw === false) {
    if (fs === 0) {
      fs = 1;
    } else {
      fs = 0;
    }
    fullscreen(fs);
  }
}

function SetInterface() {
  strokeWeight(1);
  stroke(0, 0, 0, 255);
  fill(191, 0, 18, 255);
  rect(0, 0, 32, 32);
  fill(245, 151, 1, 255);
  rect(32, 0, 32, 32);
  fill(255, 215, 0, 255);
  rect(64, 0, 32, 32);
  fill(107, 148, 4, 255);
  rect(96, 0, 32, 32);
  fill(1, 75, 138, 255);
  rect(128, 0, 32, 32);
  fill(25, 0, 89, 255);
  rect(160, 0, 32, 32);
  fill(78, 1, 66, 255);
  rect(192, 0, 32, 32);
  fill(0, 0, 0, 255);
  rect(224, 0, 32, 32);
  fill(128, 128, 128, 255);
  rect(256, 0, 32, 32);
  fill(255, 255, 255, 255);
  rect(288, 0, 32, 32);
}

function PlayTimeLapse() {
  if (Re_Draw === false) {
    clear();
    background(210, 200, 150);
    SetInterface();
    rows = table.getRows();
    Re_Draw = true;
  }
}

function OpenFile() {
  if (Re_Draw === false) {

    // let input = document.createElement('input');
    // input.type = 'file';
    // input.onchange = _ => {
    // // you can use this method to get file and perform respective operations
    //         let files =   Array.from(input.files);
    //         console.log(files);
    //     };
    // input.click();

    clear();
    background(210, 200, 150);
    SetInterface();
    createNewTable();
    rows = table2.getRows();
    for (let r = 0; r < rows.length; r++) {
      let TLID = rows[r].getNum("id");
      let TLSize = rows[r].getNum("BrushSize");
      let TLOpacity = rows[r].getNum("BrushOpacity");
      let TLRed = rows[r].getNum("BrushRed");
      let TLGreen = rows[r].getNum("BrushGreen");
      let TLBlue = rows[r].getNum("BrushBlue");
      let TLM_X = rows[r].getNum("M_X");
      let TLM_Y = rows[r].getNum("M_Y");
      let TLM_PX = rows[r].getNum("M_PX");
      let TLM_PY = rows[r].getNum("M_PY");
      TLSize2 = TLSize * 1.5;
      TLOpacity2 = TLOpacity * 0.1;
      strokeWeight(TLSize);
      stroke(TLRed, TLGreen, TLBlue, TLOpacity);
      line(TLM_X, TLM_Y, TLM_PX, TLM_PY);
      stroke(TLRed + TLOpacity2, TLGreen, TLBlue, TLOpacity);
      line(TLM_X + TLSize2, TLM_Y, TLM_PX + TLSize2, TLM_PY);
      stroke(TLRed - TLOpacity2, TLGreen, TLBlue, TLOpacity);
      line(TLM_X - TLSize2, TLM_Y, TLM_PX - TLSize2, TLM_PY);
      stroke(TLRed, TLGreen, TLBlue + TLOpacity2, TLOpacity);
      line(TLM_X, TLM_Y + TLSize2, TLM_PX, TLM_PY + TLSize2);
      stroke(TLRed, TLGreen, TLBlue - TLOpacity2, TLOpacity);
      line(TLM_X, TLM_Y - TLSize2, TLM_PX, TLM_PY - TLSize2);
      newRow = table.addRow();
      newRow.setNum("id", TLID);
      newRow.setNum("BrushSize", TLSize);
      newRow.setNum("BrushOpacity", TLOpacity);
      newRow.setNum("BrushRed", TLRed);
      newRow.setNum("BrushGreen", TLGreen);
      newRow.setNum("BrushBlue", TLBlue);
      newRow.setNum("M_X", TLM_X);
      newRow.setNum("M_Y", TLM_Y);
      newRow.setNum("M_PX", TLM_PX);
      newRow.setNum("M_PY", TLM_PY);
    }
  }
}

function SaveFile() {
  if (Re_Draw === false) {
    saveTable(table, "new.csv");
  }
}

function ImportImg() {
  if (Re_Draw === false) {
    image(img, 0, 0, 1920, 1080);
    SetInterface();
  }
}

function ExportImg() {
  if (Re_Draw === false) {
    saveCanvas("myCanvas.png");
  }
}

function AddColor(r, v, b) {
  if (ColorRed < r) {
    ColorRed = ColorRed + 1;
  }
  if (ColorRed > r) {
    ColorRed = ColorRed - 1;
  }
  if (ColorGreen < v) {
    ColorGreen = ColorGreen + 1;
  }
  if (ColorGreen > v) {
    ColorGreen = ColorGreen - 1;
  }
  if (ColorBlue < b) {
    ColorBlue = ColorBlue + 1;
  }
  if (ColorBlue > b) {
    ColorBlue = ColorBlue - 1;
  }
}

function changeBG() {
  let val = random(255);
  background(val);
}

function updateColorSelector() {
  // mise à jour de la couleur du selecteur
  strokeWeight(1);
  stroke(0, 0, 0, 255);
  fill(ColorRed, ColorGreen, ColorBlue, 255);
  rect(0, 32, 320, 32);

  // mise a jour RGB Slider
  sliderR.value(ColorRed);
  sliderG.value(ColorGreen);
  sliderB.value(ColorBlue);
  strokeWeight(1);
  stroke(0, 0, 0, 255);
  fill(ColorRed, ColorGreen, ColorBlue, 255);
  rect(0, 64, 620, 70);
}

function draw() {
  valSize = sliderSize.value();
  valSize2 = valSize * 1.5;
  valOpacity = sliderOpacity.value();
  valOpacity2 = valOpacity * 0.05;
  strokeWeight(valSize);

  // Numpad1
  if (keyIsDown(97)) {
    let c = get(mouseX, mouseY);
    ColorRed = red(c);
    ColorGreen = green(c);
    ColorBlue = blue(c);
    updateColorSelector();
  }

  if (mouseIsPressed === true && Re_Draw === false) {
    if (mouseY < 32) {
      if (mouseX > 0 && mouseX < 32) {
        AddColor(191, 0, 18);
      }
      if (mouseX > 32 && mouseX < 64) {
        AddColor(245, 151, 1);
      }
      if (mouseX > 64 && mouseX < 96) {
        AddColor(255, 215, 0);
      }
      if (mouseX > 96 && mouseX < 128) {
        AddColor(107, 148, 4);
      }
      if (mouseX > 128 && mouseX < 160) {
        AddColor(1, 75, 138);
      }
      if (mouseX > 160 && mouseX < 192) {
        AddColor(25, 0, 89);
      }
      if (mouseX > 192 && mouseX < 224) {
        AddColor(78, 1, 66);
      }
      if (mouseX > 224 && mouseX < 256) {
        AddColor(0, 0, 0);
      }
      if (mouseX > 256 && mouseX < 288) {
        AddColor(128, 128, 128);
      }
      if (mouseX > 288 && mouseX < 320) {
        AddColor(255, 255, 255);
      }
      updateColorSelector();
    }

    if (mouseY > 64 && mouseY < 140) {
      ColorRed = sliderR.value();
      ColorGreen = sliderG.value();
      ColorBlue = sliderB.value();
      updateColorSelector();
    }

    if (mouseY > 140) {
      if (currentTool === 'brush') {
        stroke(ColorRed, ColorGreen, ColorBlue, valOpacity);
        line(mouseX, mouseY, pmouseX, pmouseY);
        stroke(ColorRed + valOpacity2, ColorGreen, ColorBlue, valOpacity);
        line(mouseX + valSize2, mouseY, pmouseX + valSize2, pmouseY);
        stroke(ColorRed - valOpacity2, ColorGreen, ColorBlue, valOpacity);
        line(mouseX - valSize2, mouseY, pmouseX - valSize2, pmouseY);
        stroke(ColorRed, ColorGreen, ColorBlue + valOpacity2, valOpacity);
        line(mouseX, mouseY + valSize2, pmouseX, pmouseY + valSize2);
        stroke(ColorRed, ColorGreen, ColorBlue - valOpacity2, valOpacity);
        line(mouseX, mouseY - valSize2, pmouseX, pmouseY - valSize2);
        let newRow = table.addRow();
        newRow.setNum("id", table.getRowCount() - 1);
        newRow.setNum("BrushSize", valSize);
        newRow.setNum("BrushOpacity", valOpacity);
        newRow.setNum("BrushRed", ColorRed);
        newRow.setNum("BrushGreen", ColorGreen);
        newRow.setNum("BrushBlue", ColorBlue);
        newRow.setNum("M_X", mouseX);
        newRow.setNum("M_Y", mouseY);
        newRow.setNum("M_PX", pmouseX);
        newRow.setNum("M_PY", pmouseY);
      }

      if (currentTool === 'colorPicker') {
        let c = get(mouseX, mouseY);
        ColorRed = red(c);
        ColorGreen = green(c);
        ColorBlue = blue(c);
        updateColorSelector();
        colorPick = true;
      }
    }
  }

  if (mouseIsPressed === false && colorPick === true) {
    if (currentTool === 'colorPicker') {
      currentTool = 'brush';
      colorPick = false;
    }
  }

  if (Re_Draw === true) {
    for (i = 0; i < 10; i++) {
      let TLID = rows[r].getNum("id");
      let TLSize = rows[r].getNum("BrushSize");
      let TLOpacity = rows[r].getNum("BrushOpacity");
      let TLRed = rows[r].getNum("BrushRed");
      let TLGreen = rows[r].getNum("BrushGreen");
      let TLBlue = rows[r].getNum("BrushBlue");
      let TLM_X = rows[r].getNum("M_X");
      let TLM_Y = rows[r].getNum("M_Y");
      let TLM_PX = rows[r].getNum("M_PX");
      let TLM_PY = rows[r].getNum("M_PY");
      TLSize2 = TLSize * 1.5;
      TLOpacity2 = TLOpacity * 0.1;
      strokeWeight(TLSize);
      stroke(TLRed, TLGreen, TLBlue, TLOpacity);
      line(TLM_X, TLM_Y, TLM_PX, TLM_PY);
      stroke(TLRed + TLOpacity2, TLGreen, TLBlue, TLOpacity);
      line(TLM_X + TLSize2, TLM_Y, TLM_PX + TLSize2, TLM_PY);
      stroke(TLRed - TLOpacity2, TLGreen, TLBlue, TLOpacity);
      line(TLM_X - TLSize2, TLM_Y, TLM_PX - TLSize2, TLM_PY);
      stroke(TLRed, TLGreen, TLBlue + TLOpacity2, TLOpacity);
      line(TLM_X, TLM_Y + TLSize2, TLM_PX, TLM_PY + TLSize2);
      stroke(TLRed, TLGreen, TLBlue - TLOpacity2, TLOpacity);
      line(TLM_X, TLM_Y - TLSize2, TLM_PX, TLM_PY - TLSize2);
      r = r + 1;
      if (r > rows.length - 1) {
        r = 0;
        Re_Draw = false;
      }
    }
  }
}
