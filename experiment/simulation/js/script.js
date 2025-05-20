

// stepNo & Step TITLE
const stepNumber = document.querySelector(".practice-step-no");
const stepTitle = document.querySelector(".practice-step-info");
const taskTitle = document.querySelector(".task-title");

function Refresh() {
    window.location = window.location.href;
};

let stuckAt = 0;
  let output = 0;
  const result = [
    [
      [1, 0],
      [0, 1],
    ],
    [
      [0, 1],
      [1, 0],
    ],
  ]

  const switches = document.querySelectorAll('.switch');
  const stuckAtButton = document.querySelectorAll('.stuck-at-button');

  turnBulb(answer(switches[0].dataset.value, switches[1].dataset.value, switches[2].dataset.value, stuckAt));

  // who is stuck at
  function whereStuckAt(e) {
    if (stuckAt == e.dataset.value) {
      document.getElementById(stuckAt).style.visibility = 'hidden';
      stuckAt = 0;
      e.style.backgroundColor = '#34a9e4';
    }
    else if (stuckAt == 0) {
      stuckAt = e.dataset.value;
      document.getElementById(stuckAt).style.visibility = 'visible';
      e.style.backgroundColor = '#ff6600';
    }
    else {
      stuckAtButton[stuckAt - 1].style.backgroundColor = '#0bbeb4';
      document.getElementById(stuckAt).style.visibility = 'hidden';
      stuckAt = e.dataset.value;
      document.getElementById(stuckAt).style.visibility = 'visible';
      e.style.backgroundColor = '#ff6600';
    }
    output = answer(switches[0].dataset.value, switches[1].dataset.value, switches[2].dataset.value, stuckAt);
    turnBulb(output);
  }



  // funtion to turn switch on and off
  function turnSwitch(e) {
    e.src = (e.src.includes("off")) ? "./images/switchon.png" : "./images/switchoff.png";
    e.dataset.value = (e.dataset.value == 0) ? 1 : 0;
    output = answer(switches[0].dataset.value, switches[1].dataset.value, switches[2].dataset.value, stuckAt);
    turnBulb(output);
  }

  // function to turn bulb on and off based on inputs
  function turnBulb(output) {
    let bulb = document.querySelector(".bulb");
    bulb.src = output == 0 ? "./images/offg.png" : "./images/ong.png";
  }

  function answer(A, B, C, stuckAt) {
    if (stuckAt == '0') {
      return result[A][B][C];
    }
    else if (stuckAt == '1') {
      A = 0;
      return result[A][B][C];
    }
    else if (stuckAt == '2') {
      A = 1;
      return result[A][B][C];
    }
    else if (stuckAt == '3') {
      B = 0;
      return result[B][A][C];
    }
    else if (stuckAt == '4') {
      B = 1;
      return result[B][A][C];
    }
    else if (stuckAt == '5') {
      C = 0;
      return result[C][A][B];
    }
    else if (stuckAt == '6') {
      C = 1;
      return result[C][A][B];
    }
    else if (stuckAt == '7') {
      return C == 0 ? 1 : 0;
    }
    else if (stuckAt == '8') {
      return C;
    }
    else if (stuckAt == '9') {
      return 1;
    }
    else if (stuckAt == '10') {
      return 0;
    }
    return 'error';
  }

  // function to add new row to table
  function addResult() {
    let html = `
                     <tr>
                        <td class="tg-nrix">${switches[0].dataset.value}</td>
                        <td class="tg-nrix">${switches[1].dataset.value}</td>
                        <td class="tg-nrix">${switches[2].dataset.value}</td>
                        <td class="tg-nrix">${stuckAt == 0 ? 'N/A' : stuckAtButton[stuckAt - 1].innerHTML}</td>
                        <td class="tg-nrix">${result[switches[0].dataset.value][switches[1].dataset.value][switches[2].dataset.value]}</td>
                        <td class="tg-nrix">${output}</td>
                    </tr>
                    `
    document.getElementById('insert-here').innerHTML += html;
  }
