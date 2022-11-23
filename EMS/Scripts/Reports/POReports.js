
var APIUrlFillCompany = HOST + "/api/CompanySettings/GetCompanyList";
var APIUrlGetBatchNumByProdId = HOST + "/api/ReportAPI/GetAllBatchNumber";
var APIUrlGetUserByProdId = HOST + "/api/ReportAPI/GEtAllUserInfo";

var APIUrlReportPOListing = HOST + "/api/ReportAPI/POListingReports";
var APIUrlReportsPOListing = HOST + "/api/ReportAPI/ReportsPOListing";
var APIUrlGetVendoreByProdId = HOST + "/api/AccountPayableOp/GetVendorListByProdID";
var APIUrlGetPeriodForPO = HOST + "/api/ReportAPI/GetPeriodForBible";

var ApiUrlReportPOHistory = HOST + "/api/ReportAPI/POHistoryReports";



var StrSegment = '';
var StrSegmentOptional = '';
var strTransCode = '';
var StrSClassification = '';
var tabindex = 0;
AtlasUtilities.init();
var REv2 = new ReportEngine();
$(document).ready(function () {
    if ($('#txtPOFilterReportDate').val() === '') {
        $(this).next().show();
        $('[tabindex=' + tabindex + ']').focus();

    }

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

    $('#LiPurchaseReports').addClass('active');

    var retriveSegment = $.parseJSON(localStorage.ArrSegment);
    var retriveTransaction = $.parseJSON(localStorage.ArrTransaction);

    for (let i = 0; i < retriveSegment.length; i++) {
        if (retriveSegment[i].Type == 'SegmentRequired') {
            StrSegment = StrSegment + retriveSegment[i].SegmentName + ',';
            StrSClassification = StrSClassification + retriveSegment[i].SegmentClassification + ',';
        } else {
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
    funVendorFilter();
    FillCompany();
    funBatchNumberFilter();
    funGetUserFilter();
    // GetPeriodForPO();

    $('#txtPOFilterReportDate').val(Date1);
    $('#txtPOFilterCreateDateTo').val(Date1);

    let SegmentJSON = AtlasUtilities.SegmentJSON(
        {
            "Company": {
                fillElement: '#ddlPOFilterCompany'
            }
            , "Location": {
                fillElement: '#POFilterLocation'
                , ElementGroupID: '#POFilterLocationGroup'
                , ElementGroupLabelID: '#POFilterLocationLabel'
            }
            , "Episode": {
                fillElement: '#POFilterEpisode'
                , ElementGroupID: '#POFilterEpisodeGroup'
                , ElementGroupLabelID: '#POFilterEpisodeLabel'
            }
            , "Set": {
                fillElement: '#POFilterFilterSet'
                , ElementGroupID: '#POFilterSetGroup'
                , ElementGroupLabelID: '#POFilterSetLabel'
            }
        }
    );
    REv2.FormRender(SegmentJSON);

    $('.segments-detail').autocomplete(
        {
            minLength: 0
            , source: function (request, response) {
                let matches = $.map((Object.values(AtlasCache.Cache.GetItem('COA').DT)), (e) => { if (e.AccountCode.toUpperCase().indexOf(request.term.toUpperCase()) === 0) return { 'label': `${e.AccountCode} (${e.AccountName})`, 'value': e.AccountCode } });
                response(matches);
            }
        }
    )
});

//========= Company
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
    .done(function (response) {
        FillCompanySucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function FillCompanySucess(response) {
    for (var i = 0; i < response.length; i++) {
        $('#ddlPOFilterCompany').append('<option value=' + response[i].CompanyID + '>' + response[i].CompanyCode + '</option>');
    }
}

//============Batch
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
    .done(function (response) {
        funBatchNumberFilterSucess(response);
    })
    .fail(function (error) {
        AtlasUtilities.LogError(error);
    })
}

function funBatchNumberFilterSucess(response) {
    for (var i = 0; i < response.length; i++) {
        $('#ddlPOFilterBatch').append('<option value="' + response[i].BatchNumber + '">' + response[i].BatchNumber + '</option>');
    }
    $('#ddlPOFilterBatch').multiselect({ nonSelectedText: 'Select', enableFiltering: true });
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
    .done(function (response) {
        funGetUserFilterSucess(response);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function funGetUserFilterSucess(response) {
    for (var i = 0; i < response.length; i++) {
        $('#ddlPOFilterUserName').append('<option value="' + response[i].UserID + '">' + response[i].Name + '</option>');
    }
    $('#ddlPOFilterUserName').multiselect();
}

function funPreview(isExport) {
    if (1 === 1) {
        var obj = {
            CompanyId: ($('#ddlPOFilterCompany').val()[0]),
            PeriodNoFrom: $('#txtPOFilterPeriodNoFrom').val(),
            PeriodNoTo: $('#txtPOFilterPeriodNoTo').val(),
            CreateDateFrom: ($('#txtPOFilterCreateDateFrom').val() === '') ? '01/01/2017' : $('#txtPOFilterCreateDateFrom').val(), //$('#txtPOFilterCreateDateFrom').val(),
            CreateDateTo: ($('#txtPOFilterCreateDateTo').val() === '') ? '01/01/2017' : $('#txtPOFilterCreateDateTo').val(), //$('#txtPOFilterCreateDateTo').val(),
            PoNoFrom: $('#txtPOFilterFrom').val(),
            PoNoTo: $('#txtPOFilterTo').val(),
            //  VendorId: strFinalVendor,
            // Batch: strFinalBatchNumber,
            //  POStatus: strPOStatus,
        }

        var ObjReportDetails = {
            ProductionName: localStorage.ProductionName,
            Company: '',
            Bank: localStorage.strBankId,
            Batch: localStorage.BatchNumber,
            Segment: StrSegment,
            SegmentOptional: StrSegmentOptional,
            TransCode: strTransCode,
            SClassification: StrSClassification
        }
        var finalObj = {
            objPO: obj,
            ObjRD: ObjReportDetails
        }

        var ddlSelectText = {
            userName: $("#ddlPOFilterUserName option:selected").map(function () {
                return $(this).text();
            }).get().join(',').split(',')[0],
            vendorName: $("#ddlPOFilterVendor option:selected").map(function () {
                return $(this).text();
            }).get().join(',').split(',')[0]
        }
    }
   
    var TCodes = AtlasCache.Cache.GetItembyName('Transaction Codes');
    if ($('#liPOListing').attr('class') === 'active') {
        APIName = 'APIUrlReportPOListing';
        let RE = new ReportEngine(APIUrlReportPOListing);
        RE.ReportTitle = 'PO Audit';
        RE.callingDocumentTitle = 'Reports > PO > PO Audit';
        RE.FormCapture('#POReportdiv');
        if (isExport) {
            console.log(isExport + 'man');
            RE.setasExport({
                "PONumber": "PO Number",
                "tblVendorName": "Vendor Name",
                "COAString": function (COAstring) {
                    let ret = {};
                    $.each(COAstring.split('|'), function (key, value) {
                        if (value.indexOf(">")) {
                            var DTvalue = value.split('>');
                            this[AtlasUtilities.SEGMENTS_CONFIG.sequence[key].SegmentCode] = '="' + DTvalue[DTvalue.length-1] + '"';
                        } else {
                            this[AtlasUtilities.SEGMENTS_CONFIG.sequence[key].SegmentCode] = '="' + value + '"';
                        }
                    }.bind(ret));
                    return ret;
                },
                "SetCode": "Set",
                "TransStr": function (TransStr) {
                    let objTCS = TransStr.split(',').reduce((acc, cur, i) => { let a = cur.split(':'); acc[a[0]] = a[1]; return acc; }, {});
                    let ret = Object.keys(TCodes).reduce((acc, cur, i) => { acc[TCodes[cur].TransCode] = objTCS[TCodes[cur].TransCode]; return acc; }, {});
                    return ret;
                },
                "TaxCode": "Tax Code",
                "LineDescription": "Line Item Description",
                "Currency": function () { return { "Currency": "USD" } },
                "CompanyPeriod": "Period",
                "POLinestatus": "PO Status",
                "PODate": "PO Date",
                "Amount_POL": "Original Amount",
                "Adjustment_POL": "Adjusted Amount",
                "NewAmount": "Open Amount",
                "BatchNumber":true
            })
        }
        RE.FormJSON.objPO = obj;
        RE.FormJSON.ObjRD = ObjReportDetails;
        RE.FormJSON.PO = finalObj;
        RE.FormJSON.DdlSelectText = ddlSelectText;
        RE.FormJSON.ProductionName = localStorage.ProductionName;
        RE.isJSONParametersCall = true;
        RE.FormJSON.EpisodeFilterID = 'POFilterEpisode';
        RE.RunReport({ DisplayinTab: true });
    } else {
        APIName = 'ApiUrlReportPOHistory';
        let RE = new ReportEngine(ApiUrlReportPOHistory);
        RE.ReportTitle = 'Purchase Order History by PO Number';
        RE.callingDocumentTitle = 'Reports > PO > PO History Reports';
        RE.FormCapture('#POReportdiv');

        if (isExport) {
            RE.setasExport({
                "PONumber": "PO Number",
                "tblVendorName": "Vendor Name",
                "COAString": function (COAstring) {
                    let ret = {};
                    $.each(COAstring.split('|'), function (key, value) {
                        if (value.indexOf(">")) {
                            var DTvalue = value.split('>');
                            this[AtlasUtilities.SEGMENTS_CONFIG.sequence[key].SegmentCode] = '="' + DTvalue[DTvalue.length - 1] + '"';
                        } else {
                            this[AtlasUtilities.SEGMENTS_CONFIG.sequence[key].SegmentCode] = '="' + value + '"';
                        }
                    }.bind(ret));
                    return ret;
                },
                "SetCode": "Set",
                "TransStr": function (TransStr) {
                    let objTCS = TransStr.split(',').reduce((acc, cur, i) => { let a = cur.split(':'); acc[a[0]] = a[1]; return acc; }, {});
                    let ret = Object.keys(TCodes).reduce((acc, cur, i) => { acc[TCodes[cur].TransCode] = objTCS[TCodes[cur].TransCode]; return acc; }, {});
                    return ret;
                },
                "TaxCode": "Tax Code",
                "LineDescription": "Line Item Description",
                "Currency": function () { return { "Currency": "USD" } },
                "CompanyPeriod": "Period",
                "POLinestatus": "PO Status",
                "PODate": "PO Date",
                "Amount_POL": "Original Amount",
                "Adjustment_POL": "Adjusted Amount",
                "RelievedTotal_POL": "Relieved Amount",
                "NewAmount": "Open Amount",
                "BatchNumber": true
            })
        }
        RE.FormJSON.objPO = obj;
        RE.FormJSON.ObjRD = ObjReportDetails;
        RE.FormJSON.PO = finalObj;
        RE.FormJSON.DdlSelectText = ddlSelectText;
        RE.FormJSON.ProductionName = localStorage.ProductionName;
        RE.isJSONParametersCall = true;
        RE.FormJSON.EpisodeFilterID = 'POFilterEpisode';
        RE.RunReport({ DisplayinTab: true });
    }
}

function PrintBrowserPDF() {

    var PDFURL = 'POListing/' + GlobalFile;
    var w = window.open(PDFURL);
    w.print();
}

function ClosePDF() {
    $('#dialog11').attr('style', 'display:none;');
    $('#dvFilterDv').attr('style', 'display:block');
}

function ShowMSG(error) {
    console.log(error);
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
    .done(function (response) {
        funVendorFilterSucess(response);
    })
    .fail(function (error) {
        AtlasUtilities.LogError(error);
    })
    ;
}

function funVendorFilterSucess(response) {
    for (var i = 0; i < response.length; i++) {
        $('#ddlPOFilterVendor').append('<option value="' + response[i].VendorID + '">' + response[i].VendorName + '</option>');
    }
    $('#ddlPOFilterVendor').multiselect({ nonSelectedText: 'Select', enableFiltering: true });
}

//=================Period  Autofill=====================//
function GetPeriodForPO(objDom) {

    $.ajax({
        url: APIUrlGetPeriodForPO + '?CompanyId=-1' //+ $('#ddlPOFilterCompany').val(),
        , cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })
    .done(function (response) {
        GetPeriodForPOSucess(response, objDom);
    })
    .fail(function (error) {
        ShowMSG(error);
    })
}

function GetPeriodForPOSucess(response, objDom) {
    StrCompanyListGet = [];
    StrCompanyListGet = response;
    var ProductListjson = response;
    var strgetcoaId = response.COAId;
    var array = response.error ? [] : $.map(response, function (m) {
        return {
            value: m.ClosePeriodId,
            label: m.CompanyPeriod,
        };
    });
    $(objDom).data('aclist', array);

    $(".SearchPOPeriod").autocomplete({
        minLength: 0,
        //autoFocus: true,
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
            let find = $(this).data('aclist').filter(e => e.value == this.value).length;

            if (find === 0) {
                $(this).val('');
                $(this).removeAttr('name');
            }
        }
    })
}