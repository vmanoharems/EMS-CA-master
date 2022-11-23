var APIUrlPendingInvoiceList = HOST + "/api/POInvoice/GetPendingInvoiceList";
var APIUrlInvoicePost = HOST + "/api/POInvoice/UpdateInvoiceStatus";
var oPendingInvoiceId = [];
$(document).ready(function () {

    $('#UlAccountPayable li').removeClass('active');
    $('#LiInvoice').addClass('active');
    GetPendingInvoiceList();
});

function GetPendingInvoiceList() {
    $.ajax({
        url: APIUrlPendingInvoiceList + '?ProdId=' + localStorage.ProdId,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
    })

.done(function (response)
{ GetPendingInvoiceListSucess(response); })
.fail(function (error)
{ console.log(error); })

}

function GetPendingInvoiceListSucess(response) {
    oPendingInvoiceId = [];
    var strhtml = '';
    var Tcount = response.length;
    for (var i = 0; i < Tcount; i++) {
        strhtml += '<tr>';
        strhtml += '<td></td>';

        strhtml += '<td><input type="checkBox" id="chk_' + response[i].Invoiceid + '" class="clsPosting" name="' + response[i].Invoiceid + '" ClearingFlag="' + response[i].ClearringAccountFlag + '" onchange="funSelectForPost(' + response[i].Invoiceid + ')" title="Select ' + response[i].InvoiceNumber + '"/></td>';
        strhtml += '<td>' + response[i].InvoiceDate + '</td>';
        strhtml += '<td><a href="#" style="color: #337ab7;" onclick="funGetInvoiceDetail(' + response[i].Invoiceid + ');">' + response[i].InvoiceNumber + '</a></td>';
        strhtml += '<td>' + response[i].TransactionNumber + '</td>';
        strhtml += '<td>' + response[i].CompanyCode + '</td>';
        strhtml += '<td>' + response[i].BatchNumber + '</td>';
        strhtml += '<td>' + response[i].tblVendorName + '</td>';
        strhtml += '<td>' + response[i].ThirdPartyVendor + '</td>';
        strhtml += '<td>' + response[i].InoviceLine + '</td>';
        var strAmount = '$ ' + parseFloat(response[i].CurrentBalance + "").toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        strhtml += '<td>' + strAmount + '</td>';
        strhtml += '</tr>';

        oPendingInvoiceId.push(response[i].Invoiceid);
    }
    localStorage.setItem("Invoices", JSON.stringify(oPendingInvoiceId));
    $('#tblPendingInvoiceTbody').html(strhtml);
    var heightt = $(window).height();
    heightt = heightt - 200;
    $('#DvTable').attr('style', 'height:' + heightt + 'px;');
    var oSearchVal = [];
 var table=  $('#TblPendingInvoice').DataTable({
        "iDisplayLength": 20,
        responsive: {
            details: {
                type: 'column',
            }
        },
        columnDefs: [{

            className: 'control',
            orderable: false,
            targets: 0,

        }],
        stateSave: true,
        stateSaveCallback: function (settings, data) {
            localStorage.setItem('DataTables_PendingInv' + settings.sInstance, JSON.stringify(data))
        },
        stateLoadCallback: function (settings) {
            if (JSON.parse(localStorage.getItem('DataTables_PendingInv' + settings.sInstance)) != null) {
                var searchval = JSON.parse(localStorage.getItem('DataTables_PendingInv' + settings.sInstance)).columns;
                $.each(searchval, function (index, value) {
                    oSearchVal.push(value.search.search);
                });
            }
            return JSON.parse(localStorage.getItem('DataTables_PendingInv' + settings.sInstance))
        },
     }).on('click', 'th', function () {
         GetPendingTransactions();
     });

 $('#TblPendingInvoice tfoot th').each(function () {
     var title = $('#TblPendingInvoice thead th').eq($(this).index()).text();
     var val = ""; if (oSearchVal[$(this).index()] != undefined) { val = oSearchVal[$(this).index()];}
     if (title == 'checkbox') {
        
        }
        else {
         $(this).html('<input type="text" style="width:100%;" placeholder=" ' + title + '" value="' + val + '"/>');
        }
    });

    // Apply the search
    table.columns().eq(0).each(function (colIdx) {
        $('input', table.column(colIdx).footer()).on('keyup change', function () {
            table
                .column(colIdx)
                .search(this.value)
                .draw();
        });
        $('select', table.column(colIdx).footer()).on('keyup change', function () {
            table
                .column(colIdx)
                .search(this.value)
                .draw();
        });
    });

    $('#TblPendingInvoice tfoot tr').insertAfter($('#TblPendingInvoice thead tr'));
    GetPendingTransactions();
}

$('#chkAllForPosing').change(function () {
    var strcheckBox = $('.clsPosting');
    var strval = true;
    var strValCount = 0;
    if ($('#chkAllForPosing').is(':checked')) {
        strval = true;
    }
    else {
        strval = false;
    }

    for (var i = 0; i < strcheckBox.length; i++) {
        var strId = strcheckBox[i].id;
        if (strval == true) {
            if ($('#' + strId).attr('clearingflag') == 'Yes') {
                $('#' + strId).prop('checked', true);
            }
            else {
                strValCount++;
            }
        }
        else {
            $('#' + strId).prop('checked', false);
        }
    }
    if (strValCount > 0) {
        ShowMsgBox('showMSG', 'There is no AP Clearing account setup for the Bank. You must setup the AP Clearing account for the bank before you can post Invoices.', '', '');
    }
})

function funSelectForPost(value) {
   
    if ($('#chk_' + value).attr('clearingflag') != 'Yes') {
        $('#chk_' + value).prop('checked', false);
        ShowMsgBox('showMSG', 'There is no AP Clearing account setup for the Bank. You must setup the AP Clearing account for the bank before you can post Invoices.', '', '');

    }

}

function funPostInvoice() {
    var strcheckBox = $('.clsPosting');
    var strval = '';
    var strCleringFlagCount = 0;

    for (var i = 0; i < strcheckBox.length; i++) {
        var strchecked = strcheckBox[i].checked;
        var strid = strcheckBox[i].id;
        if (strchecked == true) {
            if ($('#' + strid).attr('clearingflag') == 'No') {
                strval += $('#' + strid).attr('name') + ',';
                strCleringFlagCount++;
            }
            else {
                strval += $('#' + strid).attr('name') + ',';
            }
        }
    }

    strval = strval.substring(0, strval.length - 1);
    if (strval == '') {
        ShowMsgBox('showMSG', 'Please Select Invoice first..!!', '', '');
    }
    else {

        //show popup
        postInvoice(strval);
    }
}

function postInvoice(strval) {
    $.ajax({
        url: APIUrlInvoicePost + '?InvoiceId=' + strval + '&CreatedBy=' + localStorage.UserId + '&ProdId=' + localStorage.ProdId,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        cache: false,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
    })
               .done(function (response)
               { PostInvoiceSucess(response); })
               .fail(function (error)
               { ShowMSG(error); })
}

function PostInvoiceSucess(response) {
    $('#SaveInvoiceSuccess').show();
    var strhtml = '';
    strhtml += '<tr><th style="width: 31%;">Invoice #</th><th> Transaction #</th></tr>';
    for (var i = 0; i < response.length; i++)
    {
        var strsplit = response[i].split(',');
        strhtml += '<tr>';
        strhtml += '<td>' + strsplit[0] + '</td>';
        strhtml += '<td>' + strsplit[1] + '</td>';
        strhtml += '</tr>';
    }
    $('#tblResult').html(strhtml);
    $('#btnSaveOK').focus();
}
function funSaveInvoiceSuccess()
{
    location.reload(true);
}
function ShowMSG(error) {
    console.log(error);
}

function funGetInvoiceDetail(value) {
    localStorage.EditInvoiceId = value;
    window.location.replace(HOST + "/AccountPayable/EditInvoice");
}
function GetPendingTransactions() {
    oPendingInvoiceId = [];

    var table = $('#TblPendingInvoice')
    table.find('tr').each(function (i, el) {
        var id = $(this).find("td").find('input').attr("name");
        if (id != undefined) {
            oPendingInvoiceId.push(id);
        }
    });

    localStorage.setItem("Invoices", JSON.stringify(oPendingInvoiceId));
}
//========================= Alt+N
$(document).on('keydown', function (event) {
    event = event || document.event;
    var key = event.which || event.keyCode;

    if (event.altKey === true && key === 78) {
        window.location.replace(HOST + "/AccountPayable/AddInvoice");
    }


});