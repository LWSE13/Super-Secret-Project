$(document).ready(function() {
    var modal = $('#supplierModal');
    var btn = $(".supplier .button");
    var close = $(".close");
    var form = $('#supplierForm');
  
    btn.click(function() {
      modal.show();
    });
  
    close.click(function() {
      modal.hide();
    });
  
    $(window).click(function(event) {
      if (event.target == modal[0]) {
        modal.hide();
      }
    });
  
    form.submit(function(event) {
        event.preventDefault();
      
        var supplierId = $('#supplierId').val();
        var supplierName = $('#supplierName').val();
        var supplierEmail = $('#supplierEmail').val();
        var supplierPhone = $('#supplierPhone').val();
        var supplierAddress = $('#supplierAddress').val();
      
        fetch('/api/suppliers/' + supplierId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            supplierId: supplierId,
            supplierName: supplierName,
            supplierEmail: supplierEmail,
            supplierPhone: supplierPhone,
            supplierAddress: supplierAddress
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
            location.reload();

        })
        .catch((error) => {
          console.error('Error:', error);
        });
      });
  });