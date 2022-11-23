var APIUrlGetPettyCashPDF = HOST + "/api/ReportAPI/ReportPettyCash";
var APIUrlFillCompany = HOST + "/api/CompanySettings/GetCompanyList";
var APIUrlGetVendoreByProdId = HOST + "/api/AccountPayableOp/GetVendorListByProdID";
var APIUrlGetBatchNumByProdId = HOST + "/api/ReportAPI/GetAllBatchNumber";
var APIUrlGetUserByProdId = HOST + "/api/ReportAPI/GEtAllUserInfo";
var APIUrlPCBankAutofill = HOST + "/api/POInvoice/GetCustodianCode";
var APIUrlFillRecipient = HOST + "/api/POInvoice/GetRecipientList";

//var APIUrlGetVendoreByProdId = HOST + "/api/POInvoice/GetVendorListForCustodian";


var StrSegment = '';
var StrSegmentOptional = '';
var strTransCode = '';

AtlasUtilities.init();
var REv2 = new ReportEngine();

$(document).ready(function () {
    $(".datepicker").datepicker({
        onSelect: function (dateText, inst) {
            this.focus();
        }
    });

   /// FilterPettyCashSucess();
    if ($('#txtReportDate').val() == '') {
        $('#ddlCompany').focus();
        $(this).next('input').focus();
      //  })
    }

   // $('#txtReportDate').focus();
    funGetUserFilter();
    funVendorFilter();
    funBatchNumberFilter();
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

    $('#txtReportDate').val(Date1);
    $('#txtApInvsCreatedTo').val(Date1);

    $('#LiReportPettyCash').addClass('active');

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

    FillCompany();
    FillPCBankAutofill();
    FillRecipient();
    let SegmentJSON = AtlasUtilities.SegmentJSON(
        {
            "Company": {
                fillElement: '#ddlCompany'
            }
            , "Location": {
                fillElement: '#FilterLocation'
                , ElementGroupID: '#FilterLocationGroup'
                , ElementGroupLabelID: '#FilterLocationLabel'
            }
            , "Episode": {
                fillElement: '#FilterEpisode'
                , ElementGroupID: '#FilterEpisodeGroup'
                , ElementGroupLabelID: '#FilterEpisodeLabel'
            }
            , "Set": {
                fillElement: '#FilterSet'
                , ElementGroupID: '#FilterSetGroup'
                , ElementGroupLabelID: '#FilterSetLabel'
            }
        }
    );

    // BUG ALERT!!! sp is expecting the CompanyID, but the companyID does not always match the AccountID associated with the Company!!!
    // This is a bug with the sp and not with the js or html
    //SegmentJSON.Company.elementConfig.values = $.map(
    //    AtlasUtilities.SEGMENTS_CONFIG.CO
    //    , function (m) {
    //        return { "value": m.AccountID, "label": m.AccountCode }
    //    })
    //;

    REv2.FormRender(SegmentJSON);
});

//============= Company
function FillCompany() {
    $.ajax({
        url: APIUrlFillCompany + '?ProdId=' + localStorage.ProdId,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'GET',

        contentType: 'application/json; charset=utf-8',
    })

    .done(function (response)
    { FillCompanySucess(response); })
    .fail(function (error)
    { ShowMSG(error); })
}

function FillCompanySucess(response) {

    //$('#ddlCompany').append('<option value=0>Select Company</option>');
    for (var i = 0; i < response.length; i++) {
        $('#ddlCompany').append('<option value=' + response[i].CompanyID + '>' + response[i].CompanyCode + '</option>');
    }

}

function FilterPettyCash() {
    var strStatus = '';
    if ($('#liPCAudit').attr('class') == 'active') {
        strStatus = 'Pending';
    }
    else {
        strStatus = 'Posted';
    }
    
    var ddlSelectText = {
        PettyCashCustodian: $("#ddlPettyCashCustodian option:selected").map(function () {
            return $(this).text();
        }).get().join(',').split(',')[0],
        PettyCashRecipient: $("#ddlPettyCashRecipient option:selected").map(function () {
            return $(this).text();
        }).get().join(',').split(',')[0],
        PettyCashUserName: $("#ddlPettyCashUserName option:selected").map(function () {
            return $(this).text();
        }).get().join(',').split(',')[0],
        thirdPartyVendor: $("#ddlthirdPartyVendor option:selected").map(function () {
            return $(this).text();
        }).get().join(',').split(',')[0],
        PettyCashVendor: $("#ddlPettyCashVendor option:selected").map(function () {
            return $(this).text();
        }).get(),
        ids: $("#ddlPettyCashVendor option:selected").map(function () {
            return $(this).val();
        }).get(),

    }
    APIName = 'APIUrlGetPettyCashPDF';
    let RE = new ReportEngine(APIUrlGetPettyCashPDF);
    RE.ReportTitle = 'Petty Cash';
    RE.callingDocumentTitle = 'Reports > Petty Cash > Petty Cash Audit';
    RE.FormCapture('#divPC');
    //RE.FormJSON.PC = finalObj;
    RE.FormJSON.DdlSelectText = ddlSelectText;
    RE.FormJSON.Segment = StrSegment;
    RE.FormJSON.SegmentOptional = StrSegmentOptional;
    RE.FormJSON.TransCode = strTransCode;
    RE.FormJSON.ProductionName = localStorage.ProductionName;
    RE.FormJSON.Status = strStatus;
    RE.isJSONParametersCall = true;
    RE.RunReport({ DisplayinTab: true });
}

function PrintBrowserPDF() {

    var PDFURL = 'PettyCashReport/' + GlobalFile;
    var w = window.open(PDFURL);
    w.print();
}

function ClosePDF() {
    $('#dialog11').attr('style', 'display:none;');
    $('#dvFilterDv').attr('style', 'display:block');
}


function ShowMSG(error) {
    console.log(error);
    $("#preload").css("display", "none");
}

function ShowhideFilter() {


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
        $('#ddlPettyCashVendor').append('<option value="' + response[i].VendorID + '">' + response[i].VendorName + '</option>');
        $('#ddlthirdPartyVendor').append('<option value="' + response[i].VendorID + '">' + response[i].VendorName + '</option>');
    }
    $('#ddlPettyCashVendor').multiselect(
     {
         includeSelectAllOption: true
         , enableFiltering: true
         , maxHeight: 300
     });
    $('#ddlthirdPartyVendor').multiselect(
     {
         includeSelectAllOption: true
         , enableFiltering: true
         , maxHeight: 300
     });
}

//===============multiselect BatchNumber===========//
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
        $('#ddlPettyCashBatch').append('<option value="' + response[i].BatchNumber + '">' + response[i].BatchNumber + '</option>');
    }
    $('#ddlPettyCashBatch').multiselect(
     {
         includeSelectAllOption: true
         , enableFiltering: true
         , maxHeight: 300
     });
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
        $('#ddlPettyCashUserName').append('<option value="' + response[i].UserID + '">' + response[i].Name + '</option>');
    }
    $('#ddlPettyCashUserName').multiselect(
        {
           includeSelectAllOption: true
         , enableFiltering: true
         , maxHeight: 300
        });

}
//===============PC Bank =================//
function FillPCBankAutofill()
{
    $.ajax({
        url: APIUrlPCBankAutofill + '?ProdId=' + localStorage.ProdId,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response)
    { FillPCBankAutofillSucess(response); })
    .fail(function (error)
    { ShowMSG(error); })
}
function FillPCBankAutofillSucess(response)
{
    console.log(response);
    for (var i = 0; i < response.length; i++) {
        $('#ddlPettyCashCustodian').append('<option value="' + response[i].CustodianID + '">' + response[i].CustodianCode + '</option>');
    }
    $('#ddlPettyCashCustodian').multiselect(
     {
         includeSelectAllOption: true
         , enableFiltering: true
         , maxHeight: 300
     });
   
}

function FillRecipient() {
    $.ajax({
        url: APIUrlFillRecipient + '?ProdId=' + localStorage.ProdId,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
    })

    .done(function (response) {
        FillRecipientSucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function FillRecipientSucess(response) {

    for (var i = 0; i < response.length; i++) {
        $('#ddlPettyCashRecipient').append('<option value="' + response[i].RecipientID + '">' + response[i].VendorName + '</option>');
    }
    $('#ddlPettyCashRecipient').multiselect(
     {
         includeSelectAllOption: true
         , enableFiltering: true
         , maxHeight: 300
     });

}




