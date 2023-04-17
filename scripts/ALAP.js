/* 
-----------------------------------------------------------------------------
|    Notice a vulnerability in this script?  Help us improve by sending us  | 
|    a message and any pointers on how we can improve :)                    |
-----------------------------------------------------------------------------
*/

$(document).ready(function () {
    const apiKey = 'AIzaSyB_wctvMCmfSUFMYkvnDOKNAcVx-ohsQqg';
    const spreadsheetId = '1ArTdEQOh2BKl2UXRJ55OQ8hELvdqOoLtVeA9U_YIg9s';
    const sheetName = 'LIVE_RESPONSES'; 
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;
  
    $('#searchInput').on('input', function () {
      const searchTerm = $(this).val();
      if (!searchTerm.trim()) {
        $('#results').empty();
        return;
      }
  
      $.getJSON(url, function (data) {
        const rows = data.values;
        const headers = rows.shift();
        const results = [];
  
        rows.forEach(row => {
          const rowData = {};
          row.forEach((cell, index) => {
            rowData[headers[index]] = cell;
          });
  
          if (Object.values(rowData).join(' ').toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push(rowData);
          }
        });
  
        displayResults(results);
      });
    });
  
    function generateCard(header, rowData) {
      const card = $('<div class="card"></div>');
      const cardHeader = $('<div class="card-header"></div>');
      cardHeader.text(header);
      card.append(cardHeader);
    
      const table = $('<table class="table"></table>');
      const tbody = $('<tbody></tbody>');
    
      Object.keys(rowData).forEach((key, index) => {
        if (index !== 1) {
          const tr = $('<tr></tr>');
          const th = $('<th scope="row"></th>');
          th.text(key);
          tr.append(th);
          const td = $('<td></td>');
          td.text(rowData[key]);
          tr.append(td);
          tbody.append(tr);
        }
      });
    
      
      table.append(tbody);
      card.append(table);
    
      return card;
    }
    
    function openModal(value) {
      const modalBody = $('#myModal .modal-body');
      modalBody.text(value);
    }
    

  
    function displayResults(results) {
      const resultsContainer = $('#results');
      resultsContainer.empty();
  
      if (results.length === 0) {
        resultsContainer.append('<p>No results found</p>');
        return;
      }
  
      results.forEach(rowData => {
        const header = rowData[Object.keys(rowData)[1]];
        const card = generateCard(header, rowData);
        resultsContainer.append(card);
      });
    }
  });
