let stuckAt = 0;
let output = 0;
const result = [
  [
    [0, 1],
    [1, 0],
  ],
  [
    [1, 0],
    [0, 1],
  ],
];
let stuckAtarray = [
  "N/A",
  "A SA0",
  "A SA1",
  "B SA0",
  "B SA1",
  "C SA0",
  "C SA1",
  "D SA0",
  "D SA1",
  "E SA0",
  "E SA1",
];

const switches = document.querySelectorAll(".switch");
const stuckAtButton = document.querySelectorAll(".stuck-at-button");

turnBulb(
  answer(
    switches[0].dataset.value,
    switches[1].dataset.value,
    switches[2].dataset.value,
    stuckAt
  )
);

// who is stuck at
function whereStuckAt(e) {
  if (stuckAt == e.dataset.value) {
    document.getElementById(stuckAt).style.visibility = "hidden";
    stuckAt = 0;
    e.style.backgroundColor = "#27d447";
  } else if (stuckAt == 0) {
    stuckAt = e.dataset.value;
    document.getElementById(stuckAt).style.visibility = "visible";
    e.style.backgroundColor = "#ff6600";
  } else {
    stuckAtButton[stuckAt - 1].style.backgroundColor = "#27d447";
    document.getElementById(stuckAt).style.visibility = "hidden";
    stuckAt = e.dataset.value;
    document.getElementById(stuckAt).style.visibility = "visible";
    e.style.backgroundColor = "#ff6600";
  }
  output = answer(
    switches[0].dataset.value,
    switches[1].dataset.value,
    switches[2].dataset.value,
    stuckAt
  );
  turnBulb(output);
}

// funtion to turn switch on and off
function turnSwitch(e) {
  e.src = e.src.includes("off")
    ? "./images/switchon.png"
    : "./images/switchoff.png";
  e.dataset.value = e.dataset.value == 0 ? 1 : 0;
  output = answer(
    switches[0].dataset.value,
    switches[1].dataset.value,
    switches[2].dataset.value,
    stuckAt
  );
  turnBulb(output);
}

// function to turn bulb on and off based on inputs
function turnBulb(output) {
  let bulb = document.querySelector(".bulb");
  bulb.src = output == 0 ? "./images/offg.png" : "./images/ong.png";
}

// if fault is at A
// answer = result[A][B][C]

// if fault is at B
// answer = result[B][A][C]

// if fault is at C
// answer = result[C][A][B]

function answer(A, B, C, stuckAt) {
  if (stuckAt == "0") {
    return result[A][B][C];
  } else if (stuckAt == "1") {
    A = 0;
    return result[A][B][C];
  } else if (stuckAt == "2") {
    A = 1;
    return result[A][B][C];
  } else if (stuckAt == "3") {
    B = 0;
    return result[B][A][C];
  } else if (stuckAt == "4") {
    B = 1;
    return result[B][A][C];
  } else if (stuckAt == "5") {
    C = 0;
    return result[C][A][B];
  } else if (stuckAt == "6") {
    C = 1;
    return result[C][A][B];
  } else if (stuckAt == "7") {
    return C;
  } else if (stuckAt == "8") {
    return C == 0 ? 1 : 0;
  } else if (stuckAt == "9") {
    return 0;
  } else if (stuckAt == "10") {
    return 1;
  }
  return "error";
}

// function to add new row to table
function addResult() {
  let ogoutput =
    result[switches[0].dataset.value][switches[1].dataset.value][
      switches[2].dataset.value
    ];
  let html = `
                     <tr style="background-color:${
                       ogoutput == output ? "#96ff96" : "#f88570"
                     }">
                        <td class="tg-nrix">${switches[0].dataset.value}</td>
                        <td class="tg-nrix">${switches[1].dataset.value}</td>
                        <td class="tg-nrix">${switches[2].dataset.value}</td>
                        <td class="tg-nrix">${
                          stuckAt == 0
                            ? "N/A"
                            : stuckAtButton[stuckAt - 1].innerHTML
                        }</td>
                        <td class="tg-nrix">${
                          result[switches[0].dataset.value][
                            switches[1].dataset.value
                          ][switches[2].dataset.value]
                        }</td>
                        <td class="tg-nrix">${output}</td>
                    </tr>
                    `;
  document.getElementById("insert-here").innerHTML += html;
}

function fillTable(stuckAt) {
  let inner = "";
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        inner += `
                <tr>
                <td class="tg-nrix">${i}</td>
                <td class="tg-nrix">${j}</td>
                <td class="tg-nrix">${k}</td>
                <td class="tg-nrix">${stuckAtarray[stuckAt]}</td>
                <td class="tg-nrix">${result[i][j][k]}</td>
                <td class="tg-nrix">${answer(i, j, k, stuckAt)}</td>
            </tr>`;
      }
    }
  }
  let html = `<table class="tg">
        <thead>
            <tr>
                <th class="tg-b7zx" colspan="3">Input</th>
                <th class="tg-ogub" rowspan="2">Fault</th>
                <th class="tg-ogub" rowspan="2">Output <br>(without Fault)</th>
                <th class="tg-ogub" rowspan="2">Output <br>(with Fault)</th>
            </tr>
            <tr>
                <th class="tg-b7zx">X</th>
                <th class="tg-b7zx">Y</th>
                <th class="tg-b7zx">Z</th>
            </tr>
        </thead>
        <tbody id="insert-here">
            ${inner}
        </tbody>
    </table>`;
  document.getElementById("table-here").innerHTML = html;
}
