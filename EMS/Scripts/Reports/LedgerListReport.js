﻿var APIUrlGetJEAuditPDF = HOST + "/api/ReportAPI/JEAuditReportFilter";
var APIUrlGetJEAuditPDFByAccount = HOST + "/api/ReportAPI/JEAuditByAccount";


var APIUrlGetCompanyCode = HOST + "/api/CompanySettings/GetCompanyList";
var APIUrlTrialbalancePDF = HOST + "/api/ReportAPI/TBReportComExpense";

var APIUrlPrintBiblePDF = HOST + "/api/ReportAPI/LedgerBible";
var APIUrlGetPeriodBible = HOST + "/api/ReportAPI/GetPeriodForBible";
var APIUrlGetLocationByLoc = HOST + "/api/Ledger/GetCOABySegmentPosition";

var APIUrlJEGetBatchNumByProdId = HOST + "/api/ReportAPI/GetAllBatchNumber";
var APIUrlGetJEUserByProdId = HOST + "/api/ReportAPI/GEtAllUserInfo";
var APIUrlGetJECompanyCode = HOST + "/api/CompanySettings/GetCompanyList";
var APIUrlCOAReport = HOST + "/api/ReportAPI/COAListing";
var APIUrlGetCompanyCodeLEnq = HOST + "/api/CompanySettings/GetCompanyList";
var APIUrlLedGetBatchNumByProdId = HOST + "/api/ReportAPI/GetAllBatchNumber";
var APIUrlLedgerInquiry = HOST + "/api/ReportAPI/LedgerInQuiry";
var APIUrlLedgerInquiryTransaction = HOST + "/api/ReportAPI/LedgerInQuiryTransaction";
var APIUrlLedgerListing = HOST + "/api/ReportAPI/LedgerListing";

var APIUrlJEGetJEPostingBatchN = HOST + "/api/ReportAPI/GetAllBatchNumber";
var APIUrlGetJEPostingUserByProdId = HOST + "/api/ReportAPI/GEtAllUserInfo";
var APIUrlGetJEPostingCompCode = HOST + "/api/CompanySettings/GetCompanyList";
var APIUrlBibleWithoutPO = HOST + "/api/ReportAPI/LedgerBibleWithoutPO";

var APIUrlGetClosePeriodByProdId = HOST + "/api/ReportAPI/GetClosePeriodList";
var APIUrlGetOpenPeriodByProdId = HOST + "/api/ReportAPI/GetOpenPeriod";
var APIUrlFillVendor = HOST + "/api/POInvoice/GetVendorAddPO";

var APIUrlFillDetailAc = HOST + "/api/ReportP1/getDetailAccount";

var StrSegment = '';
var StrSegmentOptional = '';
var strTransCode = '';
var StrSClassification = '';
var strCompanyResponse = [];
var GetVendorNameList = [];
var GetDTAccountList = [];

AtlasUtilities.init();
var REv2 = new ReportEngine();

$(document).ready(function () {

    $(".datepicker").datepicker({
        onSelect: function (dateText, inst) {
            this.focus();
        }
    });

    funLInqGetUserFilter();
    funLedgerInqBatch();
    funLEnqCompany();
    funJEAuditCompany();
    funJEBatchNumberFilter();
    funJEGetUserFilter();
    funTBCompany();
    funBibleCompany();
    funJEPostingBatchNumberFilter();
    funJEPostingGetUserFilter();
    funJEPostingCompany();
    funPeriodNumberFilter();

    FillVendor();
    FillDTAccount();

    $('#txtBiblePeportDate').focus();
    $('#LiReportsledgers').addClass('active');

    var retriveSegment = $.parseJSON(localStorage.ArrSegment);
    var retriveTransaction = $.parseJSON(localStorage.ArrTransaction);

    for (let i = 0; i < retriveSegment.length; i++) {
        if (retriveSegment[i].Type.toUpperCase() === 'SEGMENTREQUIRED') {
            StrSegment = StrSegment + retriveSegment[i].SegmentName + ',';
            StrSClassification = StrSClassification + retriveSegment[i].SegmentClassification + ',';
        }
        else {
            StrSegmentOptional = StrSegmentOptional + retriveSegment[i].SegmentName + ',';
        }
    }
    for (let i = 0; i < retriveTransaction.length; i++) {
        strTransCode = strTransCode + retriveTransaction[i].TransCode + ',';
    }

    StrSegment = StrSegment.substring(0, StrSegment.length - 1);
    StrSegmentOptional = StrSegmentOptional.substring(0, StrSegmentOptional.length - 1);
    strTransCode = strTransCode.substring(0, strTransCode.length - 1);
    StrSClassification = StrSClassification.substring(0, StrSClassification.length - 1);
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;

    var curr_year = d.getFullYear();
    if (curr_date.toString().length === 1) {
        curr_date = '0' + curr_date;
    }

    if (curr_month.toString().length === 1) {
        curr_month = '0' + curr_month;
    }

    var Date1 = curr_month + '/' + curr_date + '/' + curr_year;

    ///  FunLedgerListPDf();
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;

    var curr_year = d.getFullYear();
    if (curr_date.toString().length === 1) {
        curr_date = '0' + curr_date;
    }

    if (curr_month.toString().length === 1) {
        curr_month = '0' + curr_month;
    }

    var Date1 = curr_month + '/' + curr_date + '/' + curr_year;

    $('#txtJEAudCreatedTo').val(Date1);
    $('#txtBibleFilterEffTo').val(Date1);
    $('#txtBiblePeportDate').val(Date1);
    $('#txtTBFilterDate').val(Date1);
    $('#txtTBFilterPostedDateTo').val(Date1);
    $('#txtToTB').val(Date1);
    //  $('#txtFromTB').val(Date1);
    $('#txtCreatedDateJETo').val(Date1);
    $('#txtDateJEFilter').val(Date1);
    $('#txtReportDateJEFilter').val(Date1);
    $('#txtLedgerInquiryRD').val(Date1);
    $('#txtLedgerInquiryTo').val(Date1);
    $('#txtReportDateJEPosting').val(Date1);

    $('#txtCreatedDateJEPostingTo').val(Date1);
    $('#txtPostedDateJEPostingTo').val(Date1);
    $('#txtReportDate').val(Date1);
    $('#JEAuditCreatedDateFrom').val(Date1);

    let SegmentJSON = AtlasUtilities.SegmentJSON(
        {
            "Company": {
                fillElement: '#BibleFilterCompany'
            }
            , "Location": {
                fillElement: '#BibleFilterLocation'
                , ElementGroupID: '#BibleFilterLocationGroup'
                , ElementGroupLabelID: '#BibleFilterLocationLabel'
            }
            , "Episode": {
                fillElement: '#BibleFilterEpisode'
                , ElementGroupID: '#BibleFilterEpisodeGroup'
                , ElementGroupLabelID: '#BibleFilterEpisodeLabel'
            }
            , "Set": {
                fillElement: '#BibleFilterSet'
                , ElementGroupID: '#BibleFilterSetGroup'
                , ElementGroupLabelID: '#BibleFilterSetLabel'
            }
        }
    );

    REv2.FormRender(SegmentJSON);

    SegmentJSON.Company.fillElement = "#LIFilterCompany";
    SegmentJSON.Company.Complete = undefined;
    SegmentJSON.Location.fillElement = "#LIFilterLocation";
    SegmentJSON.Location.ElementGroupID = "#LIFilterLocationGroup";
    SegmentJSON.Episode.fillElement = '#LIFilterEpisode';
    SegmentJSON.Episode.ElementGroupID = "#LIFilterEpisodeGroup";
    SegmentJSON.Episode.elementConfig.multiselectOptions = { nonSelectedText: 'Select' };
    SegmentJSON.Set.fillElement = '#LIFilterSet';
    SegmentJSON.Set.ElementGroupID = "#LIFilterSetGroup";
    REv2.FormRender(SegmentJSON);

    // Trail Balance
    SegmentJSON.Company.fillElement = "#TrailFilterCompany";
    SegmentJSON.Location.fillElement = "#TrailFilterLocation";
    SegmentJSON.Set.fillElement = "#TrailFilterSet";
    REv2.FormRender(SegmentJSON);

    // JE Posting
    SegmentJSON.Company.fillElement = "#JEPostingFilterCompany";
    SegmentJSON.Location.fillElement = "#JEPostingFilterLocation";
    SegmentJSON.Location.ElementGroupID = "#JEPostingFilterLocationGroup";
    SegmentJSON.Episode.fillElement = '#JEPostingFilterEpisode';
    SegmentJSON.Episode.ElementGroupID = "#JEPostingFilterEpisodeGroup";
    SegmentJSON.Episode.elementConfig.multiselectOptions = { nonSelectedText: 'Select' };
    SegmentJSON.Set.fillElement = "#JEPostingFilterSet";
    SegmentJSON.Set.ElementGroupID = "#JEPostingFilterSetGroup";
    REv2.FormRender(SegmentJSON);

    // JE Audit
    SegmentJSON.Company.fillElement = "#JEAuditFilterCompany";
    SegmentJSON.Location.fillElement = "#JEAuditFilterLocation";
    SegmentJSON.Location.ElementGroupID = "#JEAuditFilterLocationGroup";
    SegmentJSON.Episode.fillElement = '#JEAuditFilterEpisode';
    SegmentJSON.Episode.ElementGroupID = "#JEAuditFilterEpisodeGroup";
    SegmentJSON.Episode.elementConfig.multiselectOptions = { nonSelectedText: 'Select' };
    SegmentJSON.Set.fillElement = "#JEAuditFilterSet";
    SegmentJSON.Set.ElementGroupID = "#JEAuditFilterSetGroup";
    REv2.FormRender(SegmentJSON);

    // COA
    SegmentJSON.Company.fillElement = "#COAFilterCompany";
    SegmentJSON.Location.fillElement = "#COAFilterLocation";
    var array = [];
    array = $.map(AtlasUtilities.SEGMENTS_CONFIG.sequence[2].Accounts, function (m) {
        return {
            label: m.AccountCode,
            value: m.AccountID,
            //COAId: m.COAID,
        };
    });

    $(".SearchCode").autocomplete({
        minLength: 0,
        source: array,
        focus: function (event, ui) {
            $(this).val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            $(this).val(ui.item.label);
            $(this).attr('accountId', ui.item.value);

            return false;
        },
        change: function (event, ui) {
            if (!ui.item) { }
        }
    })
    SegmentJSON.Set.fillElement = "#COAFilterSet";
    REv2.FormRender(SegmentJSON);
    REv2.Form.RenderMemoCodes('additionalfilters', 'fieldsetMC');

    //AtlasConfig.DisplayGearIcon('lblSelectReport');
    //AtlasConfig.ConfigName('Reports.Ledger.Bible');
});

function ShowHide(value) {
    $('.clsHide').hide();
    $('.clsFilter').hide();

    $('#dvAuditCPeriod').addClass('displayNone');
    $('#dvPostCPeriod').addClass('displayNone');

    if (value === 'JEAudit') {
        $('#dvAuditCPeriod').removeClass('displayNone');
        $('#DvJE').show();
        $('#DvJEAuditF').show();
    } else if (value === 'JEPosting') {
        $('#dvAuditCPeriod').removeClass('displayNone');
        $('#PostingReportDiv').show();
        $('#DvJEPostedF').show();
        $('#ddlCompanyJEPosting').focus();
    } else if (value === 'Bible') {
        $('#DvBibleF').show();
        $('#DvBible').show();
    } else if (value === 'LedgerInquiry') {
        $('#DivLedgerInquiryF').show();
        $('#DvLedgerInquiry').show();
        //AtlasConfig.ConfigName('Reports.Ledger.LedgerInquirybyAccount');
    } else if (value == 'TrialBalance') {
        $('#DvTBF').show();
        $('#DivTB').show();
    } else if (value === 'LedgerListing') {
        $('#DvLedgerListing').show();
        $('#DivLedgerInquiryF').show();
    } else if (value === 'BibleWithoutPO') {
        $('#DvBibleWithoutPO').show();
        $('#DvBible').show();
    } else if (value === 'COA') {
        $('#DvCOAF').show();
        $('#COADiv').show();

        $('#ddlCOA').html('<option value="select">Select</option>');
        for (var i = 0; i < strCompanyResponse.length; i++) {
            $('#ddlCOA').append('<option value=' + strCompanyResponse[i].CompanyCode + '>' + strCompanyResponse[i].CompanyCode + '</option>');
        }
    }

}

$('#TabTrialBal').click(function () {
    FunPrintTB();
})

$('#txtBibleFilterCreatedFrom').focus(function () {
    GetPeriodBible('Bible');
});

//====================JE Audit Report=======================//
function FunPrintJEAudit(isExport) {
    if (1 === 1) {
        var strStatus = '';
        strStatus = 'Saved';

        var StrJEAuditUser = $('#ddlJEAudUserName').val();
        var StrFinalJEAuditUser = '';
        if (StrJEAuditUser == null) {
            StrJEAuditUser = '';
        } else {
            for (var i = 0; i < StrJEAuditUser.length; i++) {
                StrFinalJEAuditUser = StrFinalJEAuditUser + ',' + StrJEAuditUser[i]
            }
        }

        var StrJEAuditBatchNum = $('#ddlBatchJEAudit').val();
        var StrFinalJEAuditBatchNum = '';
        if (StrJEAuditBatchNum == null) {
            StrJEAuditBatchNum = '';
        } else {
            for (var i = 0; i < StrJEAuditBatchNum.length; i++) {
                StrFinalJEAuditBatchNum = StrFinalJEAuditBatchNum + ',' + StrJEAuditBatchNum[i]
            }
        }

        var objRD2 = {
            ProductionName: localStorage.ProductionName,
            Company: '',
            Bank: localStorage.strBankId,
            Batch: localStorage.BatchNumber,
            UserName: localStorage.UserId,
            Segment: StrSegment,
            SegmentOptional: StrSegmentOptional,
            TransCode: strTransCode,
        }
        var objRDF1 = {

            ProdId: localStorage.ProdId,
            CompanyId: parseFloat($('#JEAuditFilterCompany').val()[0]),
            PeriodStatus: $('select#JEAuditPeriodStatus option:selected').text(),
            CreateDateFrom: $('#JEAuditCreatedDateFrom').val(),
            CreatedDateTo: $('#JEAuditCreatedDateTo').val(),
            TransactionFrom: $('#JEAuditTransFrom').val(),
            TranasactionTo: $('#JEAuditTransTo').val(),
            BatchNumber: StrFinalJEAuditBatchNum,
            UserName: StrFinalJEAuditUser,
            Status: strStatus
        }
        var objFinalres = {
            objRDF: objRDF1,
            objRD: objRD2
        }
    }
    var TCodes = AtlasCache.Cache.GetItembyName('Transaction Codes');
    if ($("#rbAccountJE").prop("checked")) {
        APIName = 'APIUrlGetJEAuditPDF';
        let RE = new ReportEngine(APIUrlGetJEAuditPDF);
        RE.ReportTitle = 'Journal Entry Audit by Account';
        RE.callingDocumentTitle = 'Reports > Ledger > Ledger Inquiry';
        RE.FormCapture('#DvJE');
        if (isExport) {
            RE.setasExport({
                "COAString": function (COAS) {
                    return RE.ExportFunctions.COAStohash(COAS);
                },
                "TransactionvalueString": function (TVS) {
                    let objTVS = TVS.split(',').reduce((acc, cur, i) => { let a = cur.split(':'); acc[a[0]] = a[1]; return acc; }, {});
                    let ret = Object.keys(TCodes).reduce((acc, cur, i) => { acc[TCodes[cur].TransCode] = objTVS[TCodes[cur].TransCode]; return acc; }, {});
                    return ret;
                },
                "TransactionNumber": "Transaction #",
                "DocumentNo": "Document #",
                "DebitAmount": "Debit",
                "CreditAmount": "Credit",
                "Currency": function () { return { "Currency": "USD" } },
                "VendorName": "Vendor",
                "TaxCode": "Tax Code",
                "Note": "Line Description",
                "EntryDate": function (EntryDate) {
                    return { "Document Date": EntryDate.split('T')[0] }
                },
                "PostedDate": function (PostedDate) {
                    return { "Posted Date #": PostedDate.split('T')[0] }
                },
                "ClosePeriod": "Company Period",
                "BatchNumber": "Batch #",
                "Source": function () { return { "Type": "JE" } },
                "Description": "Document Description",
                "AccountName": "Account Description"
            })
        }
        RE.FormJSON.JE = objFinalres;
        RE.FormJSON.ProdId = localStorage.ProdId;
        RE.FormJSON.UserId = localStorage.UserId;
        RE.FormJSON.JEReport = 'JEAudit';
        RE.FormJSON.JESort = 'ACCOUNT';
        RE.FormJSON.EpisodeFilterID = 'JEAuditFilterEpisode';
        RE.isJSONParametersCall = true;
        RE.RunReport({ DisplayinTab: true });
        return;
    } else {
        APIName = 'APIUrlGetJEAuditPDF';
        let RE = new ReportEngine(APIUrlGetJEAuditPDF);
        RE.ReportTitle = 'Journal Entry Audit by Transaction';
        RE.callingDocumentTitle = 'Reports > Ledger > Ledger Inquiry';
        RE.FormCapture('#DvJE');
        if (isExport) {
            RE.setasExport({
                "TransactionNumber": "Transaction #",
                "DocumentNo": "Document #",
                "COAString": function (COAS) {
                    return RE.ExportFunctions.COAStohash(COAS);
                },
                "TransactionvalueString": function (TVS) {
                    let objTVS = TVS.split(',').reduce((acc, cur, i) => { let a = cur.split(':'); acc[a[0]] = a[1]; return acc; }, {});
                    let ret = Object.keys(TCodes).reduce((acc, cur, i) => { acc[TCodes[cur].TransCode] = objTVS[TCodes[cur].TransCode]; return acc; }, {});
                    return ret;
                },
                "DebitAmount": "Debit",
                "CreditAmount": "Credit",
                "Currency": function () { return { "Currency": "USD" } },
                "VendorName": "Vendor",
                "TaxCode": "Tax Code",
                "Note": "Line Description",
                "EntryDate": function (EntryDate) {
                    return { "Document Date": EntryDate.split('T')[0] }
                },
                "PostedDate": function (PostedDate) {
                    return { "Posted Date": PostedDate.split('T')[0] }
                },
                "ClosePeriod": "Company Period",
                "BatchNumber": "Batch #",
                "Source": function () { return { "Type": "JE" } },
                "Description": "Document Description",
                "AccountName": "Account Description"
            })
        }
        RE.FormJSON.JE = objFinalres;
        RE.FormJSON.ProdId = localStorage.ProdId;
        RE.FormJSON.UserId = localStorage.UserId;
        RE.FormJSON.JEReport = 'JEAudit';
        RE.FormJSON.JESort = 'TRANSACTION';
        RE.FormJSON.EpisodeFilterID = 'JEAuditFilterEpisode';
        RE.isJSONParametersCall = true;
        RE.RunReport({ DisplayinTab: true });
        return;
    }
}

function GetJEAuditPDFSucess(response) {
    $("#preload").css("display", "none");
    if (response == '') {
        alert('Data not found for given Values.');
    } else {
        heightt = $(window).height();
        heightt = heightt - 180;
        $('#dvMainDv').attr('style', 'height:' + heightt + 'px;');
        $('#dialog11').attr('style', 'width:100%;height:' + heightt + 'px;');

        var fileName = response;
        GlobalFile = fileName;
        $('#dvFilterDv').attr('style', 'display:none');
        $('#dialog11').attr('style', 'width:100%;height:' + heightt + 'px;display:block;');
        var FILECompleteName = 'JournalEntryReport/' + fileName;
        var DialogContent = '<object data="' + FILECompleteName + '" type="application/pdf" style="width:100%;height:100%;"><a href="' + FILECompleteName + '">ii</a> </object>';
        DialogContent = DialogContent + '<a href="#" style="margin:0 20px 0 10px;" class="btn btn-default floatRight  pull-right marginLeft10" onclick="javascript:PrintBrowserPDF(\'JournalEntryReport\');" id="btnPrint">Print</a>';
        DialogContent = DialogContent + '<a href="#" class="btn btn-default floatRight  pull-right marginLeft10" onclick="javascript: ClosePDF();" id="btnClose">Close</a>';
        $('#dialog11').html(DialogContent);
        $('#fade').hide();
        $("#preload").css("display", "none");
    }
}

//=================Company Autofill=====================//
function GetCompanyCode() {
    $.ajax({
        url: APIUrlGetCompanyCode + '?ProdId=' + localStorage.ProdId,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'GET',

        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        GetCompanyCodeSucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function GetCompanyCodeSucess(response) {
    StrCompanyListGet = [];
    StrCompanyListGet = response;
    var ProductListjson = response;
    var strgetcoaId = response.COAId;
    var array = response.error ? [] : $.map(response, function (m) {
        return {
            value: m.CompanyID,
            label: m.CompanyCode,
        };
    });
    $(".SearchCompanyCode").autocomplete({
        minLength: 0,
        source: array,
        focus: function (event, ui) {
            $(this).val(ui.item.label);
            $(this).attr('name', ui.item.value);

            return false;
        },
        select: function (event, ui) {

            $(this).val(ui.item.label);
            $(this).attr('name', ui.item.value);

            return false;
        },
        change: function (event, ui) {
            if (!ui.item) {
                $(this).val('');
                $(this).removeAttr('name');
            }
        }
    })
}

//=================Error Message====================//
function ShowMSG(error) {
    console.log(error);
}

//==================trialBalance===========================//
function FunPrintTB() {
    $('.clsHide').hide();
    $('.clsFilter').hide();
    $('#DivTB').show();
    $('#DvTBF').show();
    funTBCompany();
}

function funTBCompany() {
    $.ajax({
        url: APIUrlGetCompanyCode + '?ProdId=' + localStorage.ProdId,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'GET',

        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        funTBCompanySucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function funTBCompanySucess(response) {
    $('#ddlCompanyTB').html('');

    for (var i = 0; i < response.length; i++) {
        $('#ddlCompanyTB').append('<option value=' + response[i].CompanyID + '>' + response[i].CompanyCode + '</option>');
    }
}

function TBComEx(isExport) {
    if (1 === 1) {
        var obj = {
            CompanyId: parseFloat($('#TrailFilterCompany').val()[0]),
            FromDate: $('#txtFromTB').val(),
            ToDate: $('#txtToTB').val(),
            ProdId: localStorage.ProdId,
            ProductionName: localStorage.ProductionName,
            SuppressZuro: $('#chkSuppressZuro').prop('checked')
        }
    }
    APIName = 'APIUrlTrialbalancePDF';
    let RE = new ReportEngine(APIUrlTrialbalancePDF);
    RE.ReportTitle = 'General Ledger Trial Balance';
    RE.callingDocumentTitle = 'Reports > Ledger > Trial Balance';
    RE.FormCapture('#DivTB');
    if (isExport) {
        RE.setasExport({
            "Type": "Account Type",
            "Parent": "Header Account",
            "Child": "Account #",
            "Description": "Account Description",
            "BeginingBal": "Begining Balance",
            "Currentactivity": "Current Activity",
            "AccountBal": "Ending Balance",
        })
    }
    RE.FormJSON.TrailBalance = obj;
    RE.isJSONParametersCall = true;
    RE.RunReport({ DisplayinTab: true });

}

function FunPrintTBSucess(response) {
    $('#dialog11').html('');

    if (response == '') {
        alert('Data not found for given Values.');
    } else {
        heightt = $(window).height();
        heightt = heightt - 180;
        $('#dvMainDv').attr('style', 'height:' + heightt + 'px;');
        $('#dialog11').attr('style', 'width:100%;height:' + heightt + 'px;');

        var fileName = response;
        GlobalFile = fileName;
        $('#dvFilterDv').attr('style', 'display:none');
        $('#dialog11').attr('style', 'width:100%;height:' + heightt + 'px;display:block;');
        var FILECompleteName = 'TrialBalance/' + fileName;
        var DialogContent = '<object data="' + FILECompleteName + '" type="application/pdf" style="width:100%;height:100%;"><a href="' + FILECompleteName + '">ii</a> </object>';
        DialogContent = DialogContent + '<a href="#" style="margin:0 20px 0 10px;" class="btn btn-default floatRight  pull-right marginLeft10" onclick="javascript:PrintBrowserPDF(\'TrialBalance\');" id="btnPrint">Print</a>';
        DialogContent = DialogContent + '<a href="#" class="btn btn-default floatRight  pull-right marginLeft10" onclick="javascript: ClosePDF();" id="btnClose">Close</a>';
        $('#dialog11').html(DialogContent);
        $('#fade').hide();
    }
    $("#preload").css("display", "none");
}

//============== Bible Report========================//
function funBible(isExport) {
    if ($('#txtBibleFilterCompany').val() != '') {
        if (1 === 1) {
            var StrFunLO = $('#BibleFilterLocation').val();
            var StrFinalStrFunLO = '';
            if (StrFunLO == null) {
                StrFunLO = '';
            } else {
                for (var i = 0; i < StrFunLO.length; i++) {
                    if (i == 0) {
                        StrFinalStrFunLO = StrFunLO[i];
                    } else {
                        StrFinalStrFunLO = StrFinalStrFunLO + ',' + StrFunLO[i];
                    }
                }
            }

            var obj = {
                Companyid: parseFloat($('#BibleFilterCompany').val()[0]),
                PeriodIdfrom: $('#txtBibleFilterCreatedFrom').attr('name'),
                PeriodIdTo: $('#txtBibleFilterCreatedTo').attr('name'),
                ProdId: localStorage.ProdId,
                LO: StrFinalStrFunLO
            }
            var objRD2 = {
                ProductionName: localStorage.ProductionName,
                Company: '',
                Bank: localStorage.strBankId,
                Batch: localStorage.BatchNumber,
                UserName: localStorage.UserId,
                Segment: StrSegment,
                SegmentOptional: StrSegmentOptional,
                TransCode: strTransCode,
                SClassification: StrSClassification
            }

            var finalObj = {
                objLBible: obj,
                ObjRD: objRD2
            }
        }
        APIName = 'APIUrlPrintBiblePDF';
        let RE = new ReportEngine(APIUrlPrintBiblePDF);
        RE.ReportTitle = 'General Ledger Bible';
        RE.callingDocumentTitle = 'Reports > Ledger > Bible';
        RE.FormCapture('#DvBible');

        if (isExport) {
            var TCodes = AtlasCache.Cache.GetItembyName('Transaction Codes') || {}; // Get an empty object so that our report doesn't fail in case we don't have cache of the Transaction Codes
            var FullSegments = AtlasUtilities.SEGMENTS_CONFIG.sequence;
            var DetailIndex = AtlasUtilities.SEGMENTS_CONFIG.DetailIndex;

            RE.setasExport({
                "COAString": function (COAS) {
                    return RE.ExportFunctions.COAStohash(COAS);
                },
                //"Acct": "DT",
                "AcctDescription": "Account Description",
                "TransactionCode": function (TransactionCode) {
                    let objTCS = TransactionCode.split(',').reduce((acc, cur, i) => { let a = cur.split(':'); acc[a[0]] = a[1]; return acc; }, {});
                    let ret = Object.keys(TCodes).reduce((acc, cur, i) => { acc[TCodes[cur].TransCode] = objTCS[TCodes[cur].TransCode]; return acc; }, {});
                    return ret;
                },
                "LineDescription": "Line Item Description",
                "VendorName": "Vendor Name",
                "TransactionNumber": "Trans #",
                "Source": "TT",
                "ClosePeriod": "Period",
                "DocumentNo": "Document #",
                "DocDate": function (DocDate) {
                    return { "Posted Date": DocDate.split('T')[0] } //new Date(DocDate).toISOString().substring(0, 10) }; // Should not use js date functions because it will export local time conversions
                },
                "Amount": "Amount",
                "Currency": function () { return { "Currency": "USD" } },
            });
        }
        RE.FormJSON.Bible = finalObj;
        RE.FormJSON.ProdId = localStorage.ProdId;
        RE.FormJSON.UserId = localStorage.UserId;
        RE.isJSONParametersCall = true;
        RE.RunReport({ DisplayinTab: true });
        return;
    } else {
        $('#txtBibleFilterCompany').focus();
        ShowMsgBox('showMSG', 'Please Select Company..!!', '', '');
    }
}

function funBibleFunSucess(response) {
    if (response === '') {
        alert('Data not found for given Values.');
    } else {
        heightt = $(window).height();
        heightt = heightt - 180;
        $('#dvMainDv').attr('style', 'height:' + heightt + 'px;');
        $('#dialog11').attr('style', 'width:100%;height:' + heightt + 'px;');

        var fileName = response;
        GlobalFile = fileName;
        $('#dvFilterDv').attr('style', 'display:none');
        $('#dialog11').attr('style', 'width:100%;height:' + heightt + 'px;display:block;');
        var FILECompleteName = 'LedgerBible/' + fileName;
        var DialogContent = '<object data="' + FILECompleteName + '" type="application/pdf" style="width:100%;height:100%;"><a href="' + FILECompleteName + '">ii</a> </object>';
        DialogContent = DialogContent + '<a href="#" style="margin:0 20px 0 10px;" class="btn btn-default floatRight  pull-right marginLeft10" onclick="javascript:PrintBrowserPDF(\'LedgerBible\');" id="btnPrint">Print</a>';
        DialogContent = DialogContent + '<a href="#" class="btn btn-default floatRight  pull-right marginLeft10" onclick="javascript: ClosePDF();" id="btnClose">Close</a>';
        $('#dialog11').html(DialogContent);
        $('#fade').hide();
    }
    $("#preload").css("display", "none");
}

function PrintBrowserPDF(value) {
    var PDFURL = '' + value + '/' + GlobalFile;
    var w = window.open(PDFURL);
    w.print();
}

function ClosePDF() {
    $('#dialog11').attr('style', 'display:none;');
    $('#dvFilterDv').attr('style', 'display:block');
}

//=================Period  Autofill=====================//
function GetPeriodBible(value) {
    if (value == 'Bible') {
        var StrCompany = $('#BibleFilterCompany').val();
        if (typeof StrCompany === 'object') {
            StrCompany = StrCompany[0];
        }
    } else {
        var StrCompany = $('#ddlCompanyTB').val();
    }

    $.ajax({
        url: APIUrlGetPeriodBible + '?CompanyId=' + StrCompany,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        GetPeriodBibleSucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    });
}

function GetPeriodBibleSucess(response) {
    StrCompanyListGet = [];
    StrCompanyListGet = response;
    var ProductListjson = response;
    var strgetcoaId = response.COAId;
    var array = response.error ? [] : $.map(response, function (m) {
        return {
            value: m.CompanyPeriod,
            label: m.ClosePeriodId,
        };
    });
    $(".SearchPeriod").autocomplete({
        minLength: 0,
        source: array,
        focus: function (event, ui) {
            $(this).val(ui.item.label);
            $(this).attr('name', ui.item.value);

            return false;
        },
        select: function (event, ui) {

            $(this).val(ui.item.label);
            $(this).attr('name', ui.item.value);

            return false;
        },
        change: function (event, ui) {
            if (!ui.item) {
                $(this).val('');
                $(this).removeAttr('name');
            }
        }
    })
}

//===============multiselect BatchNumber===========//
function funJEBatchNumberFilter() {
    $.ajax({
        url: APIUrlJEGetBatchNumByProdId + '?ProdID=' + localStorage.ProdId,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        funBatchNumberFilterSucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function funBatchNumberFilterSucess(response) {
    for (var i = 0; i < response.length; i++) {
        $('#ddlBatchJEAudit').append('<option value="' + response[i].BatchNumber + '">' + response[i].BatchNumber + '</option>');
    }
    $('#ddlBatchJEAudit').multiselect({ nonSelectedText: 'Select', enableFiltering: true, maxHeight: 350 });
}

//===============multiselect Users===========//
function funJEGetUserFilter() {
    $.ajax({
        url: APIUrlGetJEUserByProdId + '?ProdID=' + localStorage.ProdId,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        funGetUserFilterSucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function funGetUserFilterSucess(response) {
    for (var i = 0; i < response.length; i++) {
        $('#ddlJEAudUserName').append('<option value="' + response[i].UserID + '">' + response[i].Name + '</option>');
    }
    $('#ddlJEAudUserName').multiselect({ nonSelectedText: 'Select' });
}

function funJEAuditCompany() {
    $.ajax({
        url: APIUrlGetJECompanyCode + '?ProdId=' + localStorage.ProdId,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'GET',

        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        funJEAuditCompanySucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function funJEAuditCompanySucess(response) {
    strCompanyResponse = response;
    for (var i = 0; i < response.length; i++) {
        $('#ddlCompanyJEAudit').append('<option value=' + response[i].CompanyID + '>' + response[i].CompanyCode + '</option>');
    }
    GetClosePeriod();
}

function funBibleCompany() {
    $.ajax({
        url: APIUrlGetCompanyCode + '?ProdId=' + localStorage.ProdId,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        funBibleCompanySucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function funBibleCompanySucess(response) {
    $('#txtBibleFilterCompany').html('');

    for (var i = 0; i < response.length; i++) {
        $('#txtBibleFilterCompany').append('<option value=' + response[i].CompanyID + '>' + response[i].CompanyCode + '</option>');
    }
    funSegment();
}

function funGetCOAReport() {
    //$("#preload").css("display", "block");
    //if ($('#ddlCOA').val() != 'select') {
    APIName = 'APIUrlCOAReport ';
    let RE = new ReportEngine(APIUrlCOAReport);
    RE.ReportTitle = 'COA';
    RE.callingDocumentTitle = 'Reports > Ledger > COA';
    RE.FormCapture('#COADiv');
    RE.FormJSON.ProdId = localStorage.ProdId;
    RE.FormJSON.UserId = localStorage.UserId;
    RE.FormJSON.ProductionName = localStorage.ProductionName;
    RE.isJSONParametersCall = true;
    RE.RunReport({ DisplayinTab: true });
    return;
}

function funGetCOAReportSucess(response) {
    if (response == '') {
        alert('Data not found for given Values.');
    } else {
        heightt = $(window).height();
        heightt = heightt - 180;
        $('#dvMainDv').attr('style', 'height:' + heightt + 'px;');
        $('#dialog11').attr('style', 'width:100%;height:' + heightt + 'px;');

        var fileName = response;
        GlobalFile = fileName;
        $('#dvFilterDv').attr('style', 'display:none');
        $('#dialog11').attr('style', 'width:100%;height:' + heightt + 'px;display:block;');
        var FILECompleteName = 'COA/' + fileName;
        var DialogContent = '<object data="' + FILECompleteName + '" type="application/pdf" style="width:100%;height:100%;"><a href="' + FILECompleteName + '">ii</a> </object>';
        DialogContent = DialogContent + '<a href="#" style="margin:0 20px 0 10px;" class="btn btn-default floatRight  pull-right marginLeft10" onclick="javascript:PrintBrowserPDF(\'COA\');" id="btnPrint">Print</a>';
        DialogContent = DialogContent + '<a href="#" class="btn btn-default floatRight  pull-right marginLeft10" onclick="javascript: ClosePDF();" id="btnClose">Close</a>';
        $('#dialog11').html(DialogContent);
        $('#fade').hide();
    }
    $("#preload").css("display", "none");
}

//=========Ledger Inquiry============//
function funLEnqCompany() {
    $.ajax({
        url: APIUrlGetCompanyCodeLEnq + '?ProdId=' + localStorage.ProdId,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'GET',

        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        funLEnqCompanySucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function funLEnqCompanySucess(response) {
    $('#ddlCompanyLInquiry').html('');

    for (var i = 0; i < response.length; i++) {
        $('#ddlCompanyLInquiry').append('<option value=' + response[i].CompanyID + '>' + response[i].CompanyCode + '</option>');
    }
    GetClosePeriod();
}

//===============multiselect BatchNumber===========//
function funLedgerInqBatch() {
    $.ajax({
        url: APIUrlLedGetBatchNumByProdId + '?ProdID=' + localStorage.ProdId,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        funLedgerInqBatchSucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function funLedgerInqBatchSucess(response) {
    for (var i = 0; i < response.length; i++) {
        $('#ddlLedgInqBatch').append('<option value="' + response[i].BatchNumber + '">' + response[i].BatchNumber + '</option>');
    }
    $('#ddlLedgInqBatch').multiselect({ nonSelectedText: 'Select', enableFiltering: true, maxHeight: 350 });
}

//===============multiselect Users===========//
function funLInqGetUserFilter() {
    $.ajax({
        url: APIUrlGetJEUserByProdId + '?ProdID=' + localStorage.ProdId,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        funLInqGetUserFilterSucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function funLInqGetUserFilterSucess(response) {
    for (var i = 0; i < response.length; i++) {
        $('#ddlLedgInqUserName').append('<option value="' + response[i].UserID + '">' + response[i].Name + '</option>');
    }
    $('#ddlLedgInqUserName').multiselect({ nonSelectedText: 'Select' });
}

//=====================//Ledger InQuiry================//
function funLedgerInquiry(isExport) {
    debugger;
    if (1 === 1) { // This is all the old code that is no longer needed We will keep it for backwards compatability and demo purposes
        //---- Batch Number -----//
        var strBatchNumber = $('#ddlLedgInqBatch').val();
        var strFinalBatchNumber = '';
        if (strBatchNumber == null) {
            strBatchNumber = '';
        } else {
            for (var j = 0; j < strBatchNumber.length; j++) {
                strFinalBatchNumber = strFinalBatchNumber + ',' + strBatchNumber[j]
            }
        }

        //----------User Name ---------//
        var strUserName = $('#ddlLedgInqUserName').val();
        var strFinalUSerName = '';
        if (strUserName == null) {
            strUserName = '';
        } else {
            for (var k = 0; k < strUserName.length; k++) {
                strFinalUSerName = strFinalUSerName + ',' + strUserName[k]

            }
        }
        var strUserName1 = "";
        $('#ddlLedgInqUserName option:selected').each(function () { strUserName1 += ", " + $(this).text(); });

        //----------Location ---------//
        var strLocation = $('#ddlLedgerLocation').val();
        var strFinalLocation = '';
        if (strLocation == null) {
            strLocation = '';
        } else {
            for (var k = 0; k < strLocation.length; k++) {
                strFinalLocation = strFinalLocation + ',' + strLocation[k]

            }
        }

        //----------period Status ---------//
        var strPeriodList = $('#txtLedgerInquiryPS').val();
        var strFinalPeriodList = '';
        if (strPeriodList == null) {
            strPeriodList = '';
        } else {
            for (var k = 0; k < strPeriodList.length; k++) {
                strFinalPeriodList = strFinalPeriodList + ',' + strPeriodList[k]
            }
        }

        //--------------END ------------//
        var obj = {
            Companyid: parseFloat($('#LIFilterCompany').val()[0]),
            PeriodStatus: strFinalPeriodList,
            ProdId: localStorage.ProdId,
            EFDateFrom: $('#txtLedgerInquiryCDFrom').val(),
            EFDateTo: $('#txtLedgerInquiryTo').val(),
            Batch: strFinalBatchNumber,
            CreatedBy: strFinalUSerName,
            TrStart: ($('#txtLedgInqTransFrom').val() === '') ? '0' : $('#txtLedgInqTransFrom').val(),
            Trend: ($('#txtLedgInqTransTo').val() === '') ? '9999999' : $('#txtLedgInqTransTo').val(),
            UserID: localStorage.UserId,
            ReportDate: $('#txtLedgerInquiryRD').val(),
            DocumentNo: $('#txtDocNo').val(),
            TransactionType: $('select#ddlTT option:selected').val(),
            Location: strFinalLocation,
            VendorFrom: $('#txtVendorFromL').val(),
            VendorTo: $('#txtVendorToL').val(),
            AccountFrom: $('#txtAcNoFromL').val(),
            AccountTo: $('#txtAcNoToL').val(),
            UserName: strUserName1
        }
        var objRD2 = {
            ProductionName: localStorage.ProductionName,
            Company: '',
            Bank: localStorage.strBankId,
            Batch: localStorage.BatchNumber,
            UserName: localStorage.UserId,
            Segment: StrSegment,
            SegmentOptional: StrSegmentOptional,
            TransCode: strTransCode,
            SClassification: StrSClassification
        }

        var finalObj = {
            objLInquiry: obj,
            ObjRD: objRD2
        }
    }

    let APIName = '';

    if ($("#rbAccount").prop("checked")) {
        APIName = APIUrlLedgerInquiry;
    } else {
        APIName = APIUrlLedgerInquiryTransaction;
    }

    let RE = new ReportEngine(APIName);

    // First, set the API URL and then set the RE properties
    if ($("#rbAccount").prop("checked")) {
        RE.ReportTitle = 'General Ledger Inquiry by Account';
        RE.callingDocumentTitle = 'Reports > Ledger > Ledger Inquiry';
        RE.FormCapture('#DivLedgerInquiryF');
        RE.FormJSON.SortOrder = 'Account';
        RE.FormJSON.EpisodeFilterID = 'LIFilterEpisode';
    } else {
        RE.ReportTitle = 'General Ledger Inquiry by Transaction';
        RE.callingDocumentTitle = 'Reports > Ledger > Ledger Inquiry';
        RE.FormCapture('#DivLedgerInquiryF');
        RE.FormJSON.SortOrder = '';
        RE.FormJSON.EpisodeFilterID = 'LIFilterEpisode';
    }

    var TCodes = AtlasCache.Cache.GetItembyName('Transaction Codes') || {}; // Get an empty object so that our report doesn't fail in case we don't have cache of the Transaction Codes
    if (isExport) {
        RE.setasExport({
            "TransactionNumber": true
            , "COAString": function (COAS) {
                return RE.ExportFunctions.COAStohash(COAS);
            }
            , "Source": function (SOURCE) {
                return {
                    "TT": SOURCE
                }
            }
            //, "Acct": function (Acct) {
            //    return {
            //        "Acct": '="' + Acct + '"'
            //    }
            //}
            , "AcctDescription": true
            , "TransactionCode": function (TCS) {
                let objTCS = TCS.split(',').reduce((acc, cur, i) => { let a = cur.split(':'); acc[a[0]] = a[1]; return acc; }, {});

                let ret = Object.keys(TCodes).reduce((acc, cur, i) => { acc[TCodes[cur].TransCode] = objTCS[TCodes[cur].TransCode]; return acc; }, {});

                return ret;
            }
            , "Description": true
            , "VendorName": true
            , "batchnumber": true
            , "ClosePeriod": function (PeriodID) {
                return {
                    "Period": PeriodID
                }
            }
            , "DocumentNo": true
            , "DocDate": true
            , "CheckNumber": true
            , "Amount": true
            , "TaxCode": true
            , "LineDescription": true
        });
    }
    RE.FormJSON.objLInquiry = obj;
    RE.FormJSON.ObjRD = objRD2;
    RE.FormJSON.LE = finalObj;
    RE.isJSONParametersCall = true;
    RE.RunReport({ DisplayinTab: true });
}

function funLedgerInquirySucess(response) {
    if (response == '') {
        alert('Data not found for given Values.');
    } else {
        window.frames["print_frame"].document.body.innerHTML = JSON.parse(response).m_StringValue
        window.frames["print_frame"].window.focus();
        window.frames["print_frame"].window.print();
        /*
                heightt = $(window).height();
                heightt = heightt - 180;
                $('#dvMainDv').attr('style', 'height:' + heightt + 'px;');
                $('#dialog11').attr('style', 'width:100%;height:' + heightt + 'px;');
        
        
                var fileName = response;
                GlobalFile = fileName;
                $('#dvFilterDv').attr('style', 'display:none');
                $('#dialog11').attr('style', 'width:100%;height:' + heightt + 'px;display:block;');
                var FILECompleteName = '/' + fileName;
                var DialogContent = '<object data="' + FILECompleteName + '" type="application/pdf" style="width:100%;height:100%;"><a href="' + FILECompleteName + '">ii</a> </object>';
                DialogContent = DialogContent + '<a href="#" style="margin:0 20px 0 10px;" class="btn btn-default floatRight  pull-right marginLeft10" onclick="javascript:PrintBrowserPDF(\'\');" id="btnPrint">Print</a>';
                DialogContent = DialogContent + '<a href="#" class="btn btn-default floatRight  pull-right marginLeft10" onclick="javascript: ClosePDF();" id="btnClose">Close</a>';
                $('#dialog11').html(DialogContent);
                $('#fade').hide();
        */
    }
    $("#preload").css("display", "none");

}

//==============LocationFor Bible Filter===============//
function funSegment() {
    var SegmentP = 1;
    var StrCompany = $('#txtBibleFilterCompany :selected').text();
    $.ajax({
        url: APIUrlGetLocationByLoc + '?COACode=' + StrCompany + '&ProdID=' + localStorage.ProdId + '&SegmentPosition=' + SegmentP,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        funSegmentSucess(response);
    })
    .fail(function (error) {
        console.log(error);
    })
}

function funSegmentSucess(response) {
    for (var i = 0; i < response.length; i++) {
        $('#ddlBibleFilterLocation').append('<option value="' + response[i].COANo + '">' + response[i].COANo + '</option>');
    }
    $('#ddlBibleFilterLocation').multiselect({ nonSelectedText: 'Select' });
}

//=====================Ledger Listing================//
function funLedgerListing() {
    $("#preload").css("display", "block");
    var strBatchNumber = $('#ddlLedgInqBatch').val();
    var strFinalBatchNumber = '';
    if (strBatchNumber == null) {
        strBatchNumber = '';
    } else {
        for (var j = 0; j < strBatchNumber.length; j++) {
            strFinalBatchNumber = strFinalBatchNumber + ',' + strBatchNumber[j]
        }
    }
    var strUserName = $('#ddlLedgInqUserName').val();
    var strFinalUSerName = '';
    if (strUserName == null) {
        strUserName = '';
    } else {
        for (var k = 0; k < strBatchNumber.length; k++) {
            strFinalUSerName = strFinalUSerName + ',' + strUserName[k]
        }
    }
    var obj = {
        Companyid: $('#ddlCompanyLInquiry').val(),
        PeriodStatus: $('#txtLedgerInquiryPS option:selected').text(),
        ProdId: localStorage.ProdId,
        EFDateFrom: $('#txtLedgerInquiryCDFrom').val(),
        EFDateTo: $('#txtLedgerInquiryTo').val(),
        Batch: strFinalBatchNumber,
        CreatedBy: strFinalUSerName,
        TrStart: $('#txtLedgInqTransFrom').val(),
        Trend: $('#txtLedgInqTransTo').val()
    }
    var objRD2 = {
        ProductionName: localStorage.ProductionName,
        Company: '',
        Bank: localStorage.strBankId,
        Batch: localStorage.BatchNumber,
        UserName: localStorage.UserId,
        Segment: StrSegment,
        SegmentOptional: StrSegmentOptional,
        TransCode: strTransCode,
        SClassification: StrSClassification
    }

    var finalObj = {
        objLInquiry: obj,
        ObjRD: objRD2
    }
    $.ajax({
        url: APIUrlLedgerListing,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(finalObj),
    })
    .done(function (response) {
        funLedgerListingSucess(response);
    })
    .fail(function (error) {
        $("#preload").css("display", "none");
        console.log(error);
    })
}

function funLedgerListingSucess(response) {
    if (response == '') {
        alert('Data not found for given Values.');
    } else {
        heightt = $(window).height();
        heightt = heightt - 180;
        $('#dvMainDv').attr('style', 'height:' + heightt + 'px;');
        $('#dialog11').attr('style', 'width:100%;height:' + heightt + 'px;');

        var fileName = response;
        GlobalFile = fileName;
        $('#dvFilterDv').attr('style', 'display:none');
        $('#dialog11').attr('style', 'width:100%;height:' + heightt + 'px;display:block;');
        var FILECompleteName = '/' + fileName;
        var DialogContent = '<object data="' + FILECompleteName + '" type="application/pdf" style="width:100%;height:100%;"><a href="' + FILECompleteName + '">ii</a> </object>';
        DialogContent = DialogContent + '<a href="#" style="margin:0 20px 0 10px;" class="btn btn-default floatRight  pull-right marginLeft10" onclick="javascript:PrintBrowserPDF(\'\');" id="btnPrint">Print</a>';
        DialogContent = DialogContent + '<a href="#" class="btn btn-default floatRight  pull-right marginLeft10" onclick="javascript: ClosePDF();" id="btnClose">Close</a>';
        $('#dialog11').html(DialogContent);
        $('#fade').hide();
    }
    $("#preload").css("display", "none");
}

//===============JE Posting report==============//
//===============multiselect BatchNumber===========//
function funJEPostingBatchNumberFilter() {
    $.ajax({
        url: APIUrlJEGetJEPostingBatchN + '?ProdID=' + localStorage.ProdId,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        funJEPostingBatNoSucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function funJEPostingBatNoSucess(response) {
    for (var i = 0; i < response.length; i++) {
        $('#ddlBatchJEPosting').append('<option value="' + response[i].BatchNumber + '">' + response[i].BatchNumber + '</option>');
    }
    $('#ddlBatchJEPosting').multiselect({ nonSelectedText: 'Select', enableFiltering: true, maxHeight: 350 });
}

//===============multiselect JE POsting Users===========//
function funJEPostingGetUserFilter() {
    $.ajax({
        url: APIUrlGetJEPostingUserByProdId + '?ProdID=' + localStorage.ProdId,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        funGetJEPostingUserSucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    });
}

function funGetJEPostingUserSucess(response) {
    for (var i = 0; i < response.length; i++) {
        $('#ddlJEPostingUserName').append('<option value="' + response[i].UserID + '">' + response[i].Name + '</option>');
    }
    $('#ddlJEPostingUserName').multiselect({ nonSelectedText: 'Select' });
}

//=============JE Posting ==============//
function funJEPostingCompany() {
    $.ajax({
        url: APIUrlGetJEPostingCompCode + '?ProdId=' + localStorage.ProdId,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'GET',

        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        funJEPostingCompanySucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    });
}

function funJEPostingCompanySucess(response) {
    strCompanyResponse = response;
    for (var i = 0; i < response.length; i++) {
        $('#ddlCompanyJEPosting').append('<option value=' + response[i].CompanyID + '>' + response[i].CompanyCode + '</option>');
    }
    funPeriodNumberFilter();
}

//====================JE Posting Report=======================//
function FunPrintJEPosting(isExport) {
    var strStatus = '';

    strStatus = 'Posted';
    var StrJEAuditUser = $('#ddlJEPostingUserName').val();
    var StrFinalJEAuditUser = '';
    if (StrJEAuditUser == null) {
        StrJEAuditUser = '';
    } else {
        for (var i = 0; i < StrJEAuditUser.length; i++) {
            StrFinalJEAuditUser = StrFinalJEAuditUser + ',' + StrJEAuditUser[i]
        }
    }

    var StrJEAuditBatchNum = $('#ddlBatchJEPosting').val();
    var StrFinalJEAuditBatchNum = '';
    if (StrJEAuditBatchNum == null) {
        StrJEAuditBatchNum = '';
    } else {
        for (var i = 0; i < StrJEAuditBatchNum.length; i++) {
            StrFinalJEAuditBatchNum = StrFinalJEAuditBatchNum + ',' + StrJEAuditBatchNum[i]
        }
    }

    var objRD2 = {
        ProductionName: localStorage.ProductionName,
        Company: '',
        Bank: localStorage.strBankId,
        Batch: localStorage.BatchNumber,
        UserName: localStorage.UserId,
        Segment: StrSegment,
        SegmentOptional: StrSegmentOptional,
        TransCode: strTransCode,
    }

    var strFinalPeriodID = '';
    var strClosePeriod = $('#txtJEPostingPeriodStatus').val();

    if (strClosePeriod == null) {
        strClosePeriod = '';
    } else {
        for (var i = 0; i < strClosePeriod.length; i++) {
            strFinalPeriodID = strFinalPeriodID + ',' + strClosePeriod[i]
        }
    }

    var objRDF1 = {
        ProdId: localStorage.ProdId,
        CompanyId: parseFloat($('#JEPostingFilterCompany').val()[0]),//$('#ddlCompanyJEPosting').val(),
        PeriodStatus: strFinalPeriodID,
        CreateDateFrom: $('#txtCreatedDateJEPostingFrom').val(),
        CreatedDateTo: $('#txtPostedDateJEPostingTo').val(),
        TransactionFrom: $('#txtJEPostingTransFrom').val(),
        TranasactionTo: $('#txtJEPostingTransTo').val(),
        BatchNumber: StrFinalJEAuditBatchNum,
        UserName: StrFinalJEAuditUser,
        Status: strStatus
    }
    var objFinalres = {
        objRDF: objRDF1,
        objRD: objRD2
    }
    var TCodes = AtlasCache.Cache.GetItembyName('Transaction Codes');
    if ($("#rbAccountJEPosting").prop("checked")) {
        debugger;
        APIName = 'APIUrlGetJEAuditPDF';
        let RE = new ReportEngine(APIUrlGetJEAuditPDF);
        RE.ReportTitle = 'Journal Entry Posted by Account';
        RE.callingDocumentTitle = 'Reports > Ledger > JE Posting';
        RE.FormCapture('#PostingReportDiv');
        if (isExport) {
            RE.setasExport({
                "COAString": function (COAS) {
                    return RE.ExportFunctions.COAStohash(COAS);
                },
                "TransactionvalueString": function (TVS) {
                    let objTVS = TVS.split(',').reduce((acc, cur, i) => { let a = cur.split(':'); acc[a[0]] = a[1]; return acc; }, {});
                    let ret = Object.keys(TCodes).reduce((acc, cur, i) => { acc[TCodes[cur].TransCode] = objTVS[TCodes[cur].TransCode]; return acc; }, {});
                    return ret;
                },
                "TransactionNumber": "Transaction #",
                "DocumentNo": "Document #",
                "DebitAmount": "Debit",
                "CreditAmount": "Credit",
                "Currency": function () { return { "Currency": "USD" } },
                "VendorName": "Vendor",
                "TaxCode": "Tax Code",
                "Note": "Line Description",
                "EntryDate": function (EntryDate) {
                    return { "Document Date": EntryDate.split('T')[0] }
                },
                "PostedDate": function (PostedDate) {
                    return { "Posted Date #": PostedDate.split('T')[0] }
                },
                "ClosePeriod": "Company Period",
                "BatchNumber": "Batch #",
                "Source": function () { return { "Type": "JE" } },
                "Description": "Document Description",
                "AccountName": "Account Description"
            })
        }
        RE.FormJSON.Status = strStatus;
        RE.FormJSON.EpisodeFilterID = 'JEPostingFilterEpisode'
        RE.isJSONParametersCall = true;
        RE.FormJSON.ProdId = localStorage.ProdId;
        RE.FormJSON.UserId = localStorage.UserId;
        RE.FormJSON.JEReport = 'JEPosting';
        RE.FormJSON.JESort = 'ACCOUNT';
        RE.FormJSON.JEPostedStatus = 'POSTED';
        RE.FormJSON.JE = objFinalres;
        RE.RunReport({ DisplayinTab: true });
        return;
    } else {
        APIName = 'APIUrlGetJEAuditPDF';
        let RE = new ReportEngine(APIUrlGetJEAuditPDF);
        RE.ReportTitle = 'Journal Entry Posted by Transaction';
        RE.callingDocumentTitle = 'Reports > Ledger > JE Posting';
        RE.FormCapture('#PostingReportDiv');
        if (isExport) {
            RE.setasExport({
                "TransactionNumber": "Transaction #",
                "DocumentNo": "Document #",
                "COAString": function (COAS) {
                    return RE.ExportFunctions.COAStohash(COAS);
                },
                "TransactionvalueString": function (TVS) {
                    let objTVS = TVS.split(',').reduce((acc, cur, i) => { let a = cur.split(':'); acc[a[0]] = a[1]; return acc; }, {});
                    let ret = Object.keys(TCodes).reduce((acc, cur, i) => { acc[TCodes[cur].TransCode] = objTVS[TCodes[cur].TransCode]; return acc; }, {});
                    return ret;
                },
                "DebitAmount": "Debit",
                "CreditAmount": "Credit",
                "Currency": function () { return { "Currency": "USD" } },
                "VendorName": "Vendor",
                "TaxCode": "Tax Code",
                "Note": "Line Description",
                "EntryDate": function (EntryDate) {
                    return { "Document Date": EntryDate.split('T')[0] } //new Date(DocDate).toISOString().substring(0, 10) }; // Should not use js date functions because it will export local time conversions
                },
                "PostedDate": function (PostedDate) {
                    return { "Posted Date": PostedDate.split('T')[0] }
                },
                "ClosePeriod": "Company Period",
                "BatchNumber": "Batch #",
                "Source": function () { return { "Type": "JE" } },
                "Description": "Document Description",
                "AccountName": "Account Description"
            })
        }
        RE.FormJSON.Status = strStatus;
        RE.FormJSON.EpisodeFilterID = 'JEPostingFilterEpisode'
        RE.isJSONParametersCall = true;
        RE.FormJSON.ProdId = localStorage.ProdId;
        RE.FormJSON.UserId = localStorage.UserId;
        RE.FormJSON.JEReport = 'JEPosting';
        RE.FormJSON.JESort = 'TRANSACTION';
        RE.FormJSON.JEPostedStatus = 'POSTED';
        RE.FormJSON.JE = objFinalres;
        RE.RunReport({ DisplayinTab: true });
        return;
    }
}
function GetJEAuditPDFSucess(response) {
    $("#preload").css("display", "none");
    if (response == '') {
        alert('Data not found for given Values.');
    } else {
        heightt = $(window).height();
        heightt = heightt - 180;
        $('#dvMainDv').attr('style', 'height:' + heightt + 'px;');
        $('#dialog11').attr('style', 'width:100%;height:' + heightt + 'px;');

        var fileName = response;
        GlobalFile = fileName;
        $('#dvFilterDv').attr('style', 'display:none');
        $('#dialog11').attr('style', 'width:100%;height:' + heightt + 'px;display:block;');
        var FILECompleteName = 'JournalEntryReport/' + fileName;
        var DialogContent = '<object data="' + FILECompleteName + '" type="application/pdf" style="width:100%;height:100%;"><a href="' + FILECompleteName + '">ii</a> </object>';
        DialogContent = DialogContent + '<a href="#" style="margin:0 20px 0 10px;" class="btn btn-default floatRight  pull-right marginLeft10" onclick="javascript:PrintBrowserPDF(\'JournalEntryReport\');" id="btnPrint">Print</a>';
        DialogContent = DialogContent + '<a href="#" class="btn btn-default floatRight  pull-right marginLeft10" onclick="javascript: ClosePDF();" id="btnClose">Close</a>';
        $('#dialog11').html(DialogContent);
        $('#fade').hide();
        $("#preload").css("display", "none");
    }
}

//================================================//
function funBibleWithoutPO() {
    if ($('#txtBibleFilterCompany').val() != '') {
        $("#preload").css("display", "block");
        var StrFunLO = $('#ddlBibleFilterLocation').val();
        var StrFinalStrFunLO = '';
        if (StrFunLO == null) {
            StrFunLO = '';
        } else {
            for (var i = 0; i < StrFunLO.length; i++) {
                if (i == 0) {
                    StrFinalStrFunLO = StrFunLO[i];
                } else {
                    StrFinalStrFunLO = StrFinalStrFunLO + ',' + StrFunLO[i];
                }
            }
        }

        var obj = {
            Companyid: $('#txtBibleFilterCompany').val(),
            PeriodIdfrom: $('#txtBibleFilterCreatedFrom').attr('name'),
            PeriodIdTo: $('#txtBibleFilterCreatedTo').attr('name'),
            ProdId: localStorage.ProdId,
            LO: StrFinalStrFunLO
        }
        var objRD2 = {
            ProductionName: localStorage.ProductionName,
            Company: '',
            Bank: localStorage.strBankId,
            Batch: localStorage.BatchNumber,
            UserName: localStorage.UserId,
            Segment: StrSegment,
            SegmentOptional: StrSegmentOptional,
            TransCode: strTransCode,
            SClassification: StrSClassification
        }

        var finalObj = {
            objLBible: obj,
            ObjRD: objRD2
        }
        $.ajax({
            url: APIUrlBibleWithoutPO,
            cache: false,
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
            },
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(finalObj),
        })
        .done(function (response) {
            funBibleWithoutPOSucess(response);
        })
        .fail(function (error) {
            $("#preload").css("display", "none");
            console.log(error);
        })
    } else {
        $('#txtBibleFilterCompany').focus();
        ShowMsgBox('showMSG', 'Please Select Company..!!', '', '');
    }
}

function funBibleWithoutPOSucess(response) {
    if (response == '') {
        alert('Data not found for given Values.');
    } else {
        heightt = $(window).height();
        heightt = heightt - 180;
        $('#dvMainDv').attr('style', 'height:' + heightt + 'px;');
        $('#dialog11').attr('style', 'width:100%;height:' + heightt + 'px;');

        var fileName = response;
        GlobalFile = fileName;
        $('#dvFilterDv').attr('style', 'display:none');
        $('#dialog11').attr('style', 'width:100%;height:' + heightt + 'px;display:block;');
        var FILECompleteName = 'LedgerBible/' + fileName;
        var DialogContent = '<object data="' + FILECompleteName + '" type="application/pdf" style="width:100%;height:100%;"><a href="' + FILECompleteName + '">ii</a> </object>';
        DialogContent = DialogContent + '<a href="#" style="margin:0 20px 0 10px;" class="btn btn-default floatRight  pull-right marginLeft10" onclick="javascript:PrintBrowserPDF(\'LedgerBible\');" id="btnPrint">Print</a>';
        DialogContent = DialogContent + '<a href="#" class="btn btn-default floatRight  pull-right marginLeft10" onclick="javascript: ClosePDF();" id="btnClose">Close</a>';
        $('#dialog11').html(DialogContent);
        $('#fade').hide();
    }
    $("#preload").css("display", "none");
}

function funPeriodNumberFilter() {
    var CID = $('select#ddlCompanyJEPosting option:selected').val();
    CID = (CID === undefined) ? 1 : CID;
    $.ajax({
        url: APIUrlGetClosePeriodByProdId + '?ProdID=' + localStorage.ProdId + '&CID=' + CID + '&Mode=' + 2,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        funPeriodNumberFilterSucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function funPeriodNumberFilterSucess(response) {
    for (var i = 0; i < response.length; i++) {
        $('#txtJEPostingPeriodStatus').append('<option value="' + response[i].CPeriod + '">' + response[i].CPeriod + '</option>');
    }
    $('#txtJEPostingPeriodStatus').multiselect({ nonSelectedText: 'Select' });
}

function funOpenPeriod() {
    var CID = $('select#ddlCompanyJEAudit option:selected').val();
    $.ajax({
        url: APIUrlGetOpenPeriodByProdId + '?ProdID=' + localStorage.ProdId + '&CID=' + CID,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        funOpenPeriodSucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function funOpenPeriodSucess(response) {
}

function GetClosePeriod() {
    funPeriodNumberFilter();

    funPeriodNumberFilterLedger();
}

function FillVendorSucess(response) {
    GetVendorNameList = [];
    GetVendorNameList = response;
}

$('#txtVendorFromL').focusin(function () {
    FillVendorFrom();
})

$('#txtVendorToL').focusin(function () {
    FillVendorTo();
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
    .done(function (response) {
        FillVendorSucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function FillVendorFrom() {
    var response = '';
    response = GetVendorNameList

    var array = response.error ? [] : $.map(response, function (m) {
        return {
            value: m.VendorID,
            label: m.VendorName,
        };
    });
    $("#txtVendorFromL").autocomplete({
        minLength: 0,
        source: array,
        focus: function (event, ui) {

            $('#txtVendorFromL').val(ui.item.label);

            return false;
        },
        select: function (event, ui) {
            $('#txtVendorFromL').val(ui.item.label);
            return false;
        },
        change: function (event, ui) {
            if (!ui.item) {

            }
        }
    })
}

function FillVendorTo() {
    var response = '';
    response = GetVendorNameList

    var array = response.error ? [] : $.map(response, function (m) {
        return {
            value: m.VendorID,
            label: m.VendorName,
        };
    });
    $("#txtVendorToL").autocomplete({
        minLength: 0,
        source: array,
        focus: function (event, ui) {

            $('#txtVendorToL').val(ui.item.label);

            return false;
        },
        select: function (event, ui) {
            $('#txtVendorToL').val(ui.item.label);
            return false;
        },
        change: function (event, ui) {
            if (!ui.item) {

            }
        }
    })
}
//APIUrlFillDetailAc

function FillDTAccountSucess(response) {
    GetDTAccountList = [];
    GetDTAccountList = response;
}

$('#txtAcNoFromL').focusin(function () {
    FillDTFrom();
})

$('#txtAcNoToL').focusin(function () {
    FillDTTo();
})

function FillDTAccount() {
    $.ajax({
        url: APIUrlFillDetailAc + '?ProdId=' + localStorage.ProdId,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'GET',

        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        FillDTAccountSucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function FillDTFrom() {
    var response = '';
    response = GetDTAccountList

    var array = response.error ? [] : $.map(response, function (m) {
        return {
            value: m.AccountCode,
            label: m.AccountCode,
        };
    });
    $("#txtAcNoFromL").autocomplete({
        minLength: 0,
        source: array,
        focus: function (event, ui) {

            $('#txtAcNoFromL').val(ui.item.label);

            return false;
        },
        select: function (event, ui) {
            $('#txtAcNoFromL').val(ui.item.label);
            return false;
        },
        change: function (event, ui) {
            if (!ui.item) {

            }
        }
    })
}

function FillDTTo() {
    var response = '';
    response = GetDTAccountList

    var array = response.error ? [] : $.map(response, function (m) {
        return {
            value: m.AccountCode,
            label: m.AccountCode,
        };
    });
    $("#txtAcNoToL").autocomplete({
        minLength: 0,
        source: array,
        focus: function (event, ui) {

            $('#txtAcNoToL').val(ui.item.label);

            return false;
        },
        select: function (event, ui) {
            $('#txtAcNoToL').val(ui.item.label);
            return false;
        },
        change: function (event, ui) {
            if (!ui.item) {

            }
        }
    })
}

function funPeriodNumberFilterLedger() {
    var CID = numeral($('select#ddlCompanyLInquiry option:selected').val())._value;
    CID = (CID === null) ? 1 : CID;

    $.ajax({
        url: APIUrlGetClosePeriodByProdId + '?ProdID=' + localStorage.ProdId + '&CID=' + CID + '&Mode=' + 1,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        funPeriodNumberFilterLedgerSucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function funPeriodNumberFilterLedgerSucess(response) {
    $('#txtLedgerInquiryPS').empty();
    for (var i = 0; i < response.length; i++) {
        $('#txtLedgerInquiryPS').append('<option value="' + response[i].CPeriod + '">' + response[i].CPeriod + '</option>');
    }
    $('#txtLedgerInquiryPS').multiselect({ nonSelectedText: 'Select' });

    funSegmentLedger();
}

function funSegmentLedger() {
    var SegmentP = 1;
    var StrCompany = $('#ddlCompanyLInquiry :selected').text();
    $.ajax({
        url: APIUrlGetLocationByLoc + '?COACode=' + StrCompany + '&ProdID=' + localStorage.ProdId + '&SegmentPosition=' + SegmentP,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'POST',
        contentType: 'application/json; charset=utf-8',

    })
    .done(function (response) {
        funSegmentLedgerSucess(response);
    })
    .fail(function (error) {
        console.log(error);
    })
}

function funSegmentLedgerSucess(response) {
    $('#ddlLedgerLocation').empty();
    for (var i = 0; i < response.length; i++) {
        $('#ddlLedgerLocation').append('<option value="' + response[i].COANo + '">' + response[i].COANo + '</option>');
    }
    $('#ddlLedgerLocation').multiselect({ nonSelectedText: 'Select' });
}

function funTaxCode() {
    var array = [];
    var ProductListjson = TaxCode1099;
    array = TaxCode1099.error ? [] : $.map(TaxCode1099, function (m) {
        return { label: m.TaxCode.trim() + ' = ' + m.TaxDescription.trim(), value: m.TaxCode.trim(), };
    });
    $(".clsTax").autocomplete({
        minLength: 0,
        source: array,
        focus: function (event, ui) {
            $(this).val(ui.item.value);
            return false;
        },
        select: function (event, ui) {
            $(this).val(ui.item.value);
            return false;
        },
        change: function (event, ui) {
            if (!ui.item) {
                try {
                    var findVal = $(this).val();
                    findVal = findVal.toUpperCase();
                    var GetElm = $.grep(array, function (v) {
                        return v.value == findVal;
                    });
                    if (GetElm.length > 0)
                        $(this).val(findVal);
                    else
                        $(this).val('');
                }
                catch (er) {
                    $(this).val('');
                    console.log(er);
                }
            }
        }

    })
}
