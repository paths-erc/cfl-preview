const loadClf = id => {
  fetch(`https://raw.githubusercontent.com/paths-erc/coptic-texts/master/colophons/paths.colophons.${id}.xml`)
    .then( response => response.text() )
    .then ( str => {
      const clfhtml = str.match(/<body>(.*)<\/body>/si)[1];
      document.getElementById('orig').textContent = clfhtml;
      document.getElementById('formattedResult').innerHTML = formatColophon(clfhtml, true);
    })
    .catch((error) => {
      document.getElementById('orig').textContent = `Error in gettin colophon #${id}`;
      document.getElementById('formattedResult').innerHTML = `Error in gettin colophon #${id}`;
    });;
};

document.getElementById('clf').onkeypress = (e) => {
  if (!e) e = window.event;
  const keyCode = e.keyCode || e.which;
  if (keyCode == '13'){
    window.location.hash = '#' + document.getElementById('clf').value;
    loadClf(document.getElementById('clf').value);
    return false;
  }
}

if(window.location.hash){
  document.getElementById('clf').value = window.location.hash.replace('#', '');
}

loadClf(document.getElementById('clf').value);
