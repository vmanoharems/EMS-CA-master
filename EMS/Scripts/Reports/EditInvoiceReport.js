var APIUrlGetGetInvoicePDFTransaction = HOST + "/api/ReportAPI/APAuditByTransaction";

var APIUrlGetGetInvoicePDF = HOST + "/api/ReportAPI/APAuditByAccount";

var APIUrlFillVendor = HOST + "/api/POInvoice/GetVendorAddPO";
var APIUrlBankListByCompanyId = HOST + "/api/CompanySettings/GetBankInfoDetails";
var APIUrlGetVendoreByProdId = HOST + "/api/AccountPayableOp/GetVendorListByProdID";
var APIUrlGetBatchNumByProdId = HOST + "/api/ReportAPI/GetAllBatchNumber";
var APIUrlGetUserByProdId = HOST + "/api/ReportAPI/GEtAllUserInfo";


var APIUrlGetClosePeriodByProdId = HOST + "/api/ReportAPI/GetClosePeriodList";

var APIUrlGetOpenPeriodByProdId = HOST + "/api/ReportAPI/GetOpenPeriod";

var StrSegment = '';
var StrSegmentOptional = '';
var strTransCode = '';

AtlasUtilities.init();
var REv2 = new ReportEngine();
$(document).ready(function () {
    FillBank();
    heightt = $(window).height();
    heightt = heightt - 180;
    $('#dvMainDv').attr('style', 'height:' + heightt + 'px;');
    $('#dialog11').attr('style', 'width:100%;height:' + heightt + 'px;');

    $('#dvAuditCPeriod').removeClass('displayNone');


    funVendorFilter();
    funBatchNumberFilter();
    funGetUserFilter();
    $('#txtApInvsBank').focus();
    $('#LiAPInvoiceReports').addClass('active');
    var retriveSegment = $.parseJSON(localStorage.ArrSegment);
    var retriveTransaction = $.parseJSON(localStorage.ArrTransaction);

    for (var i = 0; i < retriveSegment.length; i++) {
        if (retriveSegment[i].Type == 'SegmentRequired') {
            StrSegment = StrSegment + retriveSegment[i].SegmentName + ',';
        }
        else {
            StrSegmentOptional = StrSegmentOptional + retriveSegment[i].SegmentName + ',';
        }
    }
    for (var i = 0; i < retriveTransaction.length; i++) {
        strTransCode = strTransCode + retriveTransaction[i].TransCode + ',';
    }

    StrSegment = StrSegment.substring(0, StrSegment.length - 1);
    StrSegmentOptional = StrSegmentOptional.substring(0, StrSegmentOptional.length - 1);
    strTransCode = strTransCode.substring(0, strTransCode.length - 1);

    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;

    var curr_year = d.getFullYear();
    if (curr_date.toString().length == 1) {
        curr_date = '0' + curr_date;
    }

    if (curr_month.toString().length == 1) {
        curr_month = '0' + curr_month;
    }

    var Date1 = curr_month + '/' + curr_date + '/' + curr_year;

    $('#txtApInvsCreatedTo').val(Date1);
    $(".datepicker").datepicker({
        onSelect: function (dateText, inst) {
            this.focus();
        }
    });

    let SegmentJSON = AtlasUtilities.SegmentJSON(
         {
             "Company": {
                 fillElement: '#InvoiceFilterCompany'
             }
             , "Location": {
                 fillElement: '#InvoiceFilterLocation'
                 , ElementGroupID: '#InvoiceFilterLocationGroup'
                 , ElementGroupLabelID: '#InvoiceFilterLocationLabel'
             }
             , "Episode": {
                 fillElement: '#InvoiceFilterEpisode'
                 , ElementGroupID: '#InvoiceFilterEpisodeGroup'
                 , ElementGroupLabelID: '#InvoiceFilterEpisodeLabel'
             }
             , "Set": {
                 fillElement: '#InvoiceFilterSet'
                 , ElementGroupID: '#InvoiceFilterSetGroup'
                 , ElementGroupLabelID: '#InvoiceFilterSetLabel'
             }
         }
     );
    REv2.FormRender(SegmentJSON);

    funPeriodNumberFilter();

});

//=================Vendor====================//
function FillVendor() {
    $.ajax({
        url: APIUrlFillVendor + '?ProdId=' + localStorage.ProdId,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'GET',

        contentType: 'application/json; charset=utf-8',
    })

    .done(function (response)
    { FillVendorSucess(response); })
    .fail(function (error)
    { ShowMSG(error); })
}
function FillVendorSucess(response) {
    GetVendorNamePO = [];
    GetVendorNamePO = response;
    var ProductListjson = response;
    var array = response.error ? [] : $.map(response, function (m) {
        return {
            value: m.VendorID,
            label: m.VendorName,
        };
    });
    $(".VendorCode").autocomplete({
        minLength: 0,
        source: array,
        focus: function (event, ui) {

            $("#txtInvoiceVendorName").val(ui.item.value);
            $('#txtInvoiceVendorName').val(ui.item.label);

            return false;
        },
        select: function (event, ui) {

            $("#txtInvoiceVendorName").val(ui.item.value);
            $('#txtInvoiceVendorName').val(ui.item.label);

            return false;
        },
        change: function (event, ui) {
            if (!ui.item) {
                //$(this).val('');
                //$("#hdnVendorID").val('');
                //$('#txtVendor  ').val('');
            }
        }
    })
}

//--------------------------------------------------- Bank
function FillBank() {

    $.ajax({
        url: APIUrlBankListByCompanyId + '?ProdId=' + localStorage.ProdId,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'POST',

        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response)
    { FillBankSucess(response); })
    .fail(function (error)
    { ShowMSG(error); })
}
function FillBankSucess(response) {
    if (response.length == 1) {
        $('#txtApInvsBank').val(response[0].Bankname);
        $('#txtApInvshdnBank').val(response[0].BankId);
    }
    StrBankList = [];
    StrBankList = response;
    var ProductListjson = response;
    var array = response.error ? [] : $.map(response, function (m) {
        return {
            value: m.BankId,
            label: m.Bankname,
            //  BuyerId: m.BuyerId,

        };
    });
    $(".SearchBank").autocomplete({
        minLength: 0,
        source: array,
        focus: function (event, ui) {

            $('#txtApInvshdnBank').val(ui.item.value);
            //   $("#txtApInvsBank").val(ui.item.value);
            $('#txtApInvsBank').val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            $('#txtApInvshdnBank').val(ui.item.value);
            //   $("#txtApInvsBank").val(ui.item.value);
            $('#txtApInvsBank').val(ui.item.label);
            return false;
        },
        change: function (event, ui) {
            if (!ui.item) {

                //$(this).val('');
                //// $('#f').val('');
                //$("#hdnBank").val('');
                //$('#txtBank').val('');
            }
        }
    })
}

//----------------------------------------------------- Preview

function FunEditInvoice(isExport) {
    var StrInvoiceUser = $('#ddlInvoiceUserName').val();
    var StrFinalInvoiceVen = '';
    if (StrInvoiceUser == null) {
        StrFinalInvoiceVen = '';
    }
    else {
        for (var i = 0; i < StrInvoiceUser.length; i++) {
            StrFinalInvoiceVen = StrFinalInvoiceVen + ',' + StrInvoiceUser[i]
        }
    }
    var strVendor = $('#ddlInvoiceVendor').val();
    var strFinalVendor = '';
    if (strVendor == null) {
        strVendor = '';
    }
    else {
        for (var i = 0; i < strVendor.length; i++) {
            strFinalVendor = strFinalVendor + ',' + strVendor[i]
        }
    }
    var strBatchNumber = $('#ddlInvoiceBatch').val();
    var strFinalBatchNumber = '';
    if (strBatchNumber == null) {
        strBatchNumber = '';
    }
    else {
        for (var j = 0; j < strBatchNumber.length; j++) {
            strFinalBatchNumber = strFinalBatchNumber + ',' + strBatchNumber[j]

        }
    }
    var strUserName = $('#ddlAPInvoiceReportVendor').val();
    var strFinalUSerName = '';
    if (strUserName == null) {
        strFinalUSerName = '';
    }
    else {
        for (var k = 0; k < strUserName.length; k++) {
            strFinalUSerName = strFinalUSerName + ',' + strUserName[k]
        }
    }
    var strStatus = '';
    var strFinalPeriodID = '';
    if ($('#liInvoiceAudit').attr('class') == 'active') {
        strStatus = 'Saved';
        strFinalPeriodID = $('select#txtApInvsPeriod option:selected').val();
    }
    else {
        strStatus = 'Posted';
        var strClosePeriod = $('#txtApInvsPeriodPost').val();
        if (strClosePeriod == null) {
            strClosePeriod = '';
        }
        else {
            for (var i = 0; i < strClosePeriod.length; i++) {
                strFinalPeriodID = strFinalPeriodID + ',' + strClosePeriod[i]
            }
        }
    }
    var obj = {
        CId: parseFloat($('#InvoiceFilterCompany').val()[0]),// $('select#ddlCompany option:selected').val(),
        BankId: $('#txtInvshdnBank').val(),
        PeriodStatus: strFinalPeriodID,
        CreatedDateFrom: ($('#txtApInvsCreatedFrom').val() === '') ? '01/01/2017' : $('#txtApInvsCreatedFrom').val(),
        CreatedDateTo: $('#txtApInvsCreatedTo').val(),
        TransactionNumberFrom: $('#txtInvoiceTransFrom').val(),
        TransactionNumberTo: $('#txtInvoiceTransTo').val(),
        VendorId: strFinalVendor,
        BatchNumber: strFinalBatchNumber,
        CreatedBy: StrFinalInvoiceVen,
        ProdId: localStorage.ProdId,
        Status: strStatus
    }
    var ObjReportDetails = {
        ProductionName: localStorage.ProductionName,
        Company: '',
        Bank: localStorage.strBankId,
        Batch: localStorage.BatchNumber,
        UserName: localStorage.UserId,
        Segment: StrSegment,
        SegmentOptional: StrSegmentOptional,
        TransCode: strTransCode,
    }
    var finalObj = {
        objRD: ObjReportDetails,
        objRDF: obj
    }
    var ddlSelectText = {
        userName: $("#ddlInvoiceUserName option:selected").map(function () {
            return $(this).text();
        }).get().join(',').split(',')[0],
        vendorName: $("#ddlInvoiceVendor option:selected").map(function () {
            return $(this).text();
        }).get().join(',').split(',')[0],
        Batch: $("#ddlInvoiceBatch option:selected").map(function () {
            return $(this).text();
        }).get().join(',').split(',')[0]
    }

    if ($("#rbAccount").prop("checked")) {
        APIName = 'APIUrlGetGetInvoicePDF';
        let RE = new ReportEngine(APIUrlGetGetInvoicePDF);
        RE.ReportTitle = 'AP Invoice Audit';
        RE.callingDocumentTitle = 'Reports > Invoices > AP Invoice Audit';
        RE.FormCapture('#DivInvoiceF');
        if (isExport) {
            RE.setasExport({
                "TransactionNumber": function (TransactionNumber) {
                    return { "Transaction #": TransactionNumber }
                },
                "VendorName": function (VendorName) {
                    return { "Vendor": VendorName }
                },
                "PrintOncheckAS": (PrintOncheckAS) => {
                    return { 'Print on Check': PrintOncheckAS }
                },
                "InvoiceNumber": function (InvoiceNumber) {
                    return { "Invoice #": InvoiceNumber }
                },
                "InvoiceDate": function (InvoiceDate) {
                    return { "Invoice Date": InvoiceDate }
                },
                "Description": function (Description) {
                    return { "Invoice Description": Description }
                },
                "ClosePeriod": function (ClosePeriod) {
                    return { "Period": ClosePeriod }
                },
                "PaymentID": function (PaymentID) {
                    return { "Payment #": PaymentID }
                },
                "PaymentDate": function (PaymentDate) {
                    return { "Payment Date": PaymentDate }
                },
                "BatchNumber": function (BatchNumber) {
                    return { "Batch #": BatchNumber }
                },
                "Location": true,
                "AccountCode": function (AccountCode) {
                    return { "Detail": AccountCode }
                },
                ///"MemoCode":true,
                "TaxCode": function (TaxCode) {
                    return { "Tax Code (1099)": TaxCode }
                },
                "Amount": function (Amount) {
                    return { "Line Item Amount": Amount }
                },
                "LineDescription": function (LineDescription) {
                    return { "Line Item Description": LineDescription }
                }

            });
        }
        RE.FormJSON.Invoice = finalObj;
        RE.isJSONParametersCall = true;
        RE.FormJSON.Status = strStatus;
        RE.FormJSON.DdlSelectText = ddlSelectText;
        RE.FormJSON.ProductionName = localStorage.ProductionName;
        RE.RunReport({ DisplayinTab: true });
        //return;
    }
    else {
        APIName = 'APIUrlGetGetInvoicePDFTransaction';
        let RE = new ReportEngine(APIUrlGetGetInvoicePDFTransaction);
        RE.ReportTitle = 'AP Posting by Transaction';
        RE.callingDocumentTitle = 'Reports > Invoices > AP Invoice Posting';
        RE.FormCapture('#DivInvoiceF');
        if (isExport) {
            RE.setasExport({
                "TransactionNumber": function (TransactionNumber) {
                    return { "Transaction #": TransactionNumber }
                },
                "VendorName": function (VendorName) {
                    return { "Vendor": VendorName }
                },
                "PrintOncheckAS": (PrintOncheckAS) => {
                    return { 'Print on Check': PrintOncheckAS }
                },
                "InvoiceNumber": function (InvoiceNumber) {
                    return { "Invoice #": InvoiceNumber }
                },
                "InvoiceDate": function (InvoiceDate) {
                    return { "Invoice Date": InvoiceDate }
                },
                "Description": function (Description) {
                    return { "Invoice Description": Description }
                },
                "ClosePeriod": function (ClosePeriod) {
                    return { "Period": ClosePeriod }
                },
                "PaymentID": function (PaymentID) {
                    return { "Payment #": PaymentID }
                },
                "PaymentDate": function (PaymentDate) {
                    return { "Payment Date": PaymentDate }
                },
                "BatchNumber": function (BatchNumber) {
                    return { "Batch #": BatchNumber }
                },
                "Location": true,
                "AccountCode": function (AccountCode) {
                    return { "Detail": AccountCode }
                },
                ///"MemoCode":true,
                "TaxCode": function (TaxCode) {
                    return { "Tax Code (1099)": TaxCode }
                },
                "Amount": function (Amount) {
                    return { "Line Item Amount": Amount }
                },
                "LineDescription": function (LineDescription) {
                    return { "Line Item Description": LineDescription }
                }

            });
        }
        RE.FormJSON.Invoice = finalObj;
        RE.isJSONParametersCall = true;
        RE.FormJSON.Status = strStatus;
        RE.FormJSON.DdlSelectText = ddlSelectText;
        RE.FormJSON.ProductionName = localStorage.ProductionName;
        RE.RunReport({ DisplayinTab: true });
        //return;
    }
    // return;
}
function FunEditInvoiceSucess(response) {
    if (response == '') {
        alert(' No Records Found for the search Criteria');
    }
    //  $('#btnPreview').show();
}

function ShowMSG(error) {
    console.log(error);
    //$('#preload').attr('style', 'display:none;');
}

//===============multiselect Vendor===========//
function funVendorFilter() {
    var strval = 'All';
    $.ajax({

        url: APIUrlGetVendoreByProdId + '?SortBy=' + strval + '&ProdID=' + localStorage.ProdId,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })
     .done(function (response)
     { funVendorFilterSucess(response); })
     .fail(function (error)
     { ShowMSG(error); })
}
function funVendorFilterSucess(response) {
    for (var i = 0; i < response.length; i++) {
        $('#ddlInvoiceVendor').append('<option value="' + response[i].VendorID + '">' + response[i].VendorName + '</option>');
    }
    // $('#ddlInvoiceVendor').multiselect();
    $('#ddlInvoiceVendor').multiselect({ nonSelectedText: 'Select', enableFiltering: true, maxHeight: 350 });

}

//===============multiselect BatchNumber===========//
function funPeriodNumberFilter() {
    //var CID = $('select#ddlCompany option:selected').val();
    var CID = ($('#InvoiceFilterCompany').val());
    if (CID == null)
        return;
    $.ajax({
        url: APIUrlGetClosePeriodByProdId + '?ProdID=' + localStorage.ProdId + '&CID=' + CID[0] + '&Mode=' + 1,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response)
    { funPeriodNumberFilterSucess(response); })
    .fail(function (error)
    { ShowMSG(error); })
}
function funPeriodNumberFilterSucess(response) {
    for (var i = 0; i < response.length; i++) {
        $('#txtApInvsPeriodPost').append('<option value="' + response[i].CPeriod + '">' + response[i].CPeriod + '</option>');
    }
    // $('#txtApInvsPeriodPost').multiselect();
}





function funBatchNumberFilter() {
    $.ajax({
        url: APIUrlGetBatchNumByProdId + '?ProdID=' + localStorage.ProdId,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })
     .done(function (response)
     { funBatchNumberFilterSucess(response); })
     .fail(function (error)
     { ShowMSG(error); })
}
function funBatchNumberFilterSucess(response) {
    for (var i = 0; i < response.length; i++) {
        $('#ddlInvoiceBatch').append('<option value="' + response[i].BatchNumber + '">' + response[i].BatchNumber + '</option>');
    }
    //  $('#ddlInvoiceBatch').multiselect();
    $('#ddlInvoiceBatch').multiselect({ nonSelectedText: 'Select', enableFiltering: true, maxHeight: 350 });

}

//===============multiselect Users===========//
function funGetUserFilter() {
    $.ajax({
        url: APIUrlGetUserByProdId + '?ProdID=' + localStorage.ProdId,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })
     .done(function (response)
     { funGetUserFilterSucess(response); })
     .fail(function (error)
     { ShowMSG(error); })
}
function funGetUserFilterSucess(response) {
    for (var i = 0; i < response.length; i++) {
        $('#ddlInvoiceUserName').append('<option value="' + response[i].UserID + '">' + response[i].Name + '</option>');
    }
    $('#ddlInvoiceUserName').multiselect();

}

//==============//
function SetfocustoNext() {
    if ($('#txtApInvsCreatedTo').val() == '') {
        $('#txtInvoiceTransFrom').focus();
    }
}


function PrintBrowserPDF(value) {
    var PDFURL = '/' + value + '/' + GlobalFile;
    var w = window.open(PDFURL);
    w.print();
}

function ClosePDF() {
    $('#btnPreview').show();
    $('#btnPrint').attr('style', 'display:block;');
    $('#dialog11').attr('style', 'display:none;');
    $('#dvFilterDv').attr('style', 'display:block');
}
//================InvoicePosting==================//

function GetClosePeriod() {
    funPeriodNumberFilter();
    //  funOpenPeriod();
}