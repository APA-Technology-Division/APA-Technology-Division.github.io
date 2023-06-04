/* 
-----------------------------------------------------------------------------
|    Notice a vulnerability in this script?  Help us improve by sending us  | 
|    a message and any pointers on how we can improve :)                    |
-----------------------------------------------------------------------------
*/

$(document).ready(function () {
  const apiKey = 'AIzaSyBgGb06IGOhCDG7To0fSBm53INVwZRbLjA';
    // const apiKey = 'AIzaSyB_wctvMCmfSUFMYkvnDOKNAcVx-ohsQqg';
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

    function openModal(header, value) {
      const modalBody = $('<div class="modal-body" id="forUserCopy"></div>');
      modalBody.html(value.replace(/\[(.*?)\]/g, function(match, p1) {
          return '<strong class="placeholder-text">[CLICK HERE]</strong><div class="update-form" style="display:none;"><input type="text" class="form-control" placeholder="' + p1 + '"><button style="background-color:#dbf436; font-weight: bold; font-family:\'Courier New\', Courier, monospace; font-weight:bold; color:black" class="btn btn-primary mt-2 update-text">Update</button></div>';
      }));
    
      const modalDialog = $('<div class="modal-dialog"></div>');
      const modalContent = $('<div class="modal-content"></div>');
      const modalHeader = $('<div class="modal-header"><h5>' + 'Build Your Prompt' + '</h5></div>');
      const modalFooter = $('<hr style="width:95%"><div style="padding-bottom:15px;"><center><table style="width:95%;"><tbody><tr><td style="text-align:left"> <button type="button" class="btn btn-secondary" id="copyButton" onclick="copyText()"><i class="fas fa-copy"></i></button></td><td style="text-align:right"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button></td></tr></tbody></table></center></div>');
      
      modalDialog.append(modalContent);
      modalContent.append(modalHeader, modalBody, modalFooter);
      
      $('#myModal').html(modalDialog);
      $('#myModal').modal('show');
    
      // Show update form on placeholder text click
      $(document).on('click', '.placeholder-text', function() {
        $(this).next('.update-form').toggle();
      });
      
      $(document).on('click', '.update-text', function () {
        const newText = $(this).siblings('input').val();
        if (newText.trim()) {
          const placeholderText = $(this).parent().prev('.placeholder-text');
          placeholderText.text(newText);
          $(this).parent().toggle(); // Hide the update form
        }
      });
    }
    
    function generateCard(header, rowData) {
      const card = $('<div class="card" style="font-family:\'Courier New\', Courier, monospace;"></div>');
      const cardHeader = $('<div class="card-header" style="font-size:20px; font-family:\'Courier New\', Courier, monospace; font-weight:bold;"></div>');
      cardHeader.text(header);
      cardHeader.click(function() {
        openModal(header, rowData[Object.keys(rowData)[1]]);
      });      
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
  
    function displayResults(results) {
      const resultsContainer = $('#results');
      resultsContainer.empty();
  
      if (results.length === 0) {
        resultsContainer.append('<p>No results found</p>');
        return;
      }
  
      results.forEach(rowData => {
        const header = rowData[Object.keys(rowData)[4]];
        const card = generateCard(header, rowData);
        resultsContainer.append(card);
      });
    }
  });

function copyText() {
  var text = document.getElementById("forUserCopy").innerText;
  
    navigator.clipboard.writeText(text)
      .then(function() {
        var copyButton = document.getElementById("copyButton");
        copyButton.innerHTML = '<i style="color:black" class="fas fa-check"></i>';
  
        setTimeout(function() {
          copyButton.innerHTML = '<a style="color:black; font-size:small; font-family:Courier New; font-weight:bold;" href="https://chat.openai.com/" target="_blank">Paste in ChatGPT</a>';
        }, 1000);
          copyButton.style.backgroundColor = "#dbf436";
      })
      .catch(function(err) {
        console.error('Failed to copy text: ', err);
      });
      
  }


