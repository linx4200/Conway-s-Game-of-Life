function init() {
  var cells = genCells(50, 50);
  draw(cells, 10, 10);

  setInterval(function () {
    clear();
    cells = nextGen(cells);
    draw(cells, 10, 10);
  }, 100);
}

function genCells(m, n) {
  var cells = [];
  for(var i = 0; i < m; i++) {
    cells[i] = [];
    for(var j = 0; j < n; j++) {
      cells[i].push(Math.round(Math.random()));
    }
  }
  return cells;
}

function draw(cells, m, n) {
  var cont = document.querySelector('.containter');
  var fragment = document.createDocumentFragment();
  var rowH = 500 / cells.length;
  cells.map(function (r, i) {
    var row = document.createElement('div');
    row.classList.add('row');
    row.style.height = rowH + 'px';
    r.map(function (c, j) {
      var cell = document.createElement('div');
      cell.classList.add('cell');
      if (c) cell.classList.add('live');
      row.appendChild(cell);
    });
    fragment.appendChild(row);
  });
  cont.appendChild(fragment);
}

function clear() {
  document.querySelector('.containter').innerHTML = '';
}

function nextGen(cells) {
  var map = genMap(cells);
  return liveOrDead(cells, map);
}

function liveOrDead(cells, map) {
  var nextGen = [];
  for (var i = 0, l = cells.length; i < l; i++) {
    nextGen[i] = [];
    for (var j = 0, ll = cells[i].length; j < ll; j++) {
      var cell = cells[i][j];
      var neighbours = map[i][j];
      if (cell) { // live cell
        if (neighbours < 2) {
          nextGen[i].push(0); // dies
          continue;
        }
        if (neighbours === 2 || neighbours === 3) {
          nextGen[i].push(1); // lives
          continue;
        }
        if (neighbours > 2) {
          nextGen[i].push(0); // dies
          continue;
        }
      } else { // dead cell
        if (neighbours === 3) {
          nextGen[i].push(1); // lives
          continue;
        } else {
          nextGen[i].push(0); // dies
        }
      }
    }
  }
  return nextGen;
}


function genMap(cells) {
  var map = [];
  for (var i = 0, l = cells.length; i < l; i++) {
    map[i] = [];
    for (var j = 0, ll = cells[i].length; j < ll; j++) {
      map[i].push(addUp(cells, i, j));
    }
  }
  return map;
}

function addUp(cells, i, j) {
  var res = 0;
  if (cells[i-1]) {
    res += (cells[i-1][j-1] || 0) + cells[i-1][j] + (cells[i-1][j+1] || 0);
  }
  res += (cells[i][j-1] || 0) + (cells[i][j+1] || 0);
  if (cells[i+1]) {
    res += (cells[i+1][j-1] || 0) + cells[i+1][j] + (cells[i+1][j+1] || 0);
  }
  return res;
}
