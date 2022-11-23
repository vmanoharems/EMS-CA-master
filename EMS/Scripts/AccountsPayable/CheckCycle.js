
var APIUrlFillBankDetails = HOST + "/api/CompanySettings/GetBankInfoDetails";
var APIUrlFillVendor = HOST + "/api/POInvoice/GetVendorAddPO";
var APIUrlFillSegment = HOST + "/api/Payroll/GetSegmentForPayroll";
var APIUrlGetCOA = HOST + "/api/Ledger/GetCOABySegmentPosition";


var CheckBankID = [];

var TabID = '';

$(document).ready(function () {
    $('#UlAccountPayable li').removeClass('active');
    $('#LiCheckCycle').addClass('active');
    FillBankDetails();
    FillSegment();

});

function FillBankDetails() {
    $.ajax({
        url: APIUrlFillBankDetails + '?ProdId=' + localStorage.ProdId,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response)
    { FillBankDetailsSucess(response); })
    .fail(function (error)
    { ShowMSG(error); })
}
function FillBankDetailsSucess(response) {

    if (response.length == 1) {
        $('#txtBankName').val(response[0].Bankname);
        $('#hdnBank').val(response[0].BankId);
    }

    CheckBankID = [];
    CheckBankID = response;
    var ProductListjson = response;
    var array = response.error ? [] : $.map(response, function (m) {
        return {
            value: m.BankId,
            label: m.Bankname,

        };
    });
    $(".SearchBank").autocomplete({
        minLength: 0,
        source: array,
        focus: function (event, ui) {

            $("#hdnBank").val(ui.item.value);
            $('#txtBankName').val(ui.item.label);
            return false;
        },
        select: function (event, ui) {

            $("#hdnBank").val(ui.item.value);
            $('#txtBankName').val(ui.item.label);
            return false;
        },
        change: function (event, ui) {
            if (!ui.item) {
            }
        }
    })
}

function funBankCheck() {
    var StrAddInvcCheckBanks = $('#txtBankName').val().trim();
    if (StrAddInvcCheckBanks != '') {
        for (var i = 0; i < CheckBankID.length; i++) {
            if (CheckBankID[i].Bankname == StrAddInvcCheckBanks) {
                $('#hdnBank').val(CheckBankID[i].BankId);
                $('#txtBankName').val(CheckBankID[i].Bankname);
                break;
            }
            else {
                $('#hdnBank').val('');
                $('#txtBankName').val('');
            }
        }
        for (var i = 0; i < CheckBankID.length; i++) {
            if (CheckBankID[i].Bankname.substring(0, StrAddInvcCheckBanks.length) === StrAddInvcCheckBanks) {
                $('#hdnBank').val(CheckBankID[i].BankId);
                $('#txtBankName').val(CheckBankID[i].Bankname);
                break;
            }
        }
    }
    else {
        $('#hdnBank').val(CheckBankID[0].BankId);
        $('#txtBankName').val(CheckBankID[0].Bankname);
    }
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
            $("#hdnVendorID").val(ui.item.value);
            $('#txtVendor').val(ui.item.label);

            return false;
        },
        select: function (event, ui) {

            $("#hdnVendorID").val(ui.item.value);
            $('#txtVendor').val(ui.item.label);
            return false;
        },
        change: function (event, ui) {
            if (!ui.item) {

            }
        }
    })

}
//================CheckVendorName======================//
$('#txtVendor').focusin(function () {
    FillVendor();
})

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

function FillSegment() {
    $.ajax({
        url: APIUrlFillSegment + '?ProdId=' + localStorage.ProdId,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })

    .done(function (response)
    { FillSegmentSucess(response); })
}

function FillSegmentSucess(response) {
    ArrSegment = [];
    var TLength = response.length;
    var strHtml = '';
    var strHtmlTh = '';
    var strHtmlTd = '';
    if (TLength > 0) {
        for (var i = 0; i < TLength; i++) {

            //if (response[i].Classification != 'Company') {          
            //    SegmentStrTr += '<th>' + response[i].SegmentCode + '</th>';
            //}

            var ObjSegment = {
                SegmentId: response[i].SegmentId, SegmentName: response[i].SegmentCode
            }


            ArrSegment.push(ObjSegment);
            var Check = response[i].Classification

            //strHtmlTh += "<th>" + response[i].SegmentCode + "</th>";

            if (Check == 'Company') {
                // strHtmlTh += "<th>" +  + "</th>";
                $('#lblCO').html(response[i].SegmentCode);
                strHtmlTd = '<input type="text" tabindex="1"  class="SearchCode form-control marb0 detectTab" onblur="javascript:GetSegmentValue(' + 0 + ',\'' + Check + '\',' + i + ');" onfocus="javascript:funSegment(' + 0 + ',\'' + Check + '\',' + i + ');" id="txt_' + 0 + '_' + i + '" name="' + Check + '" />';
                TabID = "txt_0_" + i + "";
            }

            //else if (Check == 'Set') {
            //    strHtmlTd += '<td class="width100"><input type="text"  class="SearchOptionalCode clsOtional' + 0 + '   " onblur="javascript:funCheckOptionalAutoFill(' + 0 + ',\'' + Check + '\',' + i + ');" onfocus="javascript:GetOptional(' + 0 + ',\'' + Check + '\',' + i + ');" id="txtOptional_' + 0 + '_' + i + '" name="' + Check + '" /></td>';

            //}
            //else if (Check == 'Series') {
            //    strHtmlTd += '<td class="width100"><input type="text"  class="SearchOptionalCode clsOtional' + 0 + '   " onblur="javascript:funCheckOptionalAutoFill(' + 0 + ',\'' + Check + '\',' + i + ');" onfocus="javascript:GetOptional(' + 0 + ',\'' + Check + '\',' + i + ');" id="txtOptional_' + 0 + '_' + i + '" name="' + Check + '" /><input type="hidden" class="clsCOACode" id="hdnCode_' + 0 + '"/><input type="hidden" class="clsCOAId" id="hdnCOAId_' + 0 + '"  ></td>';

            //}
            //else {
            //    strHtmlTd += '<td class="width100"><input type="text"  class="SearchCode   detectTab" onblur="javascript:GetSegmentValue(' + 0 + ',\'' + Check + '\',' + i + ');" onfocus="javascript:funSegment(' + 0 + ',\'' + Check + '\',' + i + ');" id="txt_' + 0 + '_' + i + '" name="' + Check + '" /></td>';
            //}
            '<input type="hidden" class="clsCOACode" id="hdnCode_' + 0 + '"/><input type="hidden" class="clsCOAId" id="hdnCOAId_' + 0 + '">';

        }

    }

    $('#tblSegment').html(strHtmlTd);

    CheckCompanyCnt();
}
function funSegment(values, SegmentName, SegmentP) {
    GlbCOAList = [];
    var COACode = '';
    var PreSegment = 0;
    COACode = $('#hdnCode_' + values).val();
    if (SegmentP == 0) {
        COACode = '~';
    }
    else {

        PreSegment = SegmentP - 1;
    }
    var strCOACode = $('#txt_' + values + '_' + PreSegment).attr('coacode');
    //txt_0_Company

    $.ajax({
        url: APIUrlGetCOA + '?COACode=' + strCOACode + '&ProdID=' + localStorage.ProdId + '&SegmentPosition=' + SegmentP,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
    })

  .done(function (response)
  { funSegmentSucess(response, values); })
  .fail(function (error)
  { console.log(error); })
}
function funSegmentSucess(response, values) {

    GlbCOAList = response;
    var array = [];
    var ProductListjson = response;
    array = response.error ? [] : $.map(response, function (m) {
        return {
            label: m.COANo,
            value: m.COACode,
            COAId: m.COAID,
        };
    });
    $(".SearchCode").autocomplete({
        minLength: 0,
        source: array,
        focus: function (event, ui) {

            $(this).val(ui.item.label);
            $(this).attr('COACode', ui.item.value);
            $(this).attr('COAId', ui.item.COAId);

            $('#hdnCode_' + values).val(ui.item.value);
            $('#hdnCOAId_' + values).val(ui.item.COAId);
            return false;
        },
        select: function (event, ui) {

            $(this).val(ui.item.label);
            $(this).attr('COACode', ui.item.value);
            $(this).attr('COAId', ui.item.COAId);

            $('#hdnCode_' + values).val(ui.item.value);
            $('#hdnCOAId_' + values).val(ui.item.COAId);

            return false;
        },
        change: function (event, ui) {
            if (!ui.item) {
                // $(this).val('');
                // $('#f').val('');
                //$(this).val('');
                //$(this).removeAttr('COACode');
                //$(this).removeAttr('COAId');

                //$('#hdnCode_' + values).val('');
                //$('#hdnCOAId_' + values).val('');

            }
        }
    })
}

///-------------------------------------------------------------

function ApplyFilter() {
    var CID = $('#txt_0_0').val();
    var BankID = $('#hdnBank').val();
    if ((CID == '') || (BankID == '')) {
        $('#' + TabID).focus();
        ShowMsgBox('showMSG', 'Please Select Company & Bank before you can continue...', '', 'failuremsg');

    }
    else {

        //localStorage.CoTEmp = CID;
        //localStorage.BankTemp = BankID;
        //localStorage.VendorIDTemp = $('#hdnVendorID').val();
        //localStorage.Inv1Temp = $('#txtInv1').val();
        //localStorage.Inv2Temp = $('#txtInv2').val();
        var D1 = "";
        var D2 = "";
        var V = $('#hdnVendorID').val();

        if ($('#txtInv1').val() == "") {
            D1 = "01/01/1099";
        }
        else {
            D1 = $('#txtInv1').val();
        }
        if ($('#txtInv2').val() == "") {
            D2 = "01/01/9999";
        }
        else {
            D2 = $('#txtInv2').val();
        }


        var P = $('select#ddlPeriod option:selected').val();

        localStorage.CheckCycleTemp = CID + "|" + BankID + "|" + V + "|" + D1 + "|" + D2 + "|" + $('#txtBankName').val() + "|" + P;
        window.location.href = 'PaymentFilter';
    }
}


$(document).on('keydown', function (event) {
    event = event || document.event;
    var key = event.which || event.keyCode;

    if (event.altKey === true && key === 83) {
        ApplyFilter();
    }
});



function CheckCompanyCnt() {



    $.ajax({
        url: APIUrlGetCOA + '?COACode=' + "0" + '&ProdId=' + localStorage.ProdId + '&SegmentPosition=' + 0,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
    })

  .done(function (response)
  { CheckCompanyCntSucess(response); })
  .fail(function (error)
  { console.log(error); })
}

function CheckCompanyCntSucess(response) {
    if (response.length == 1) {
        $('#txt_0_0').val(response[0].COACode);
        FillBankDetails1();
    }
}
