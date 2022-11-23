
var APIUrlPrintPDF = HOST + "/api/ReportP1/CostReport";
var APIUrlPrintPDFv1 = HOST + "/api/ReportP1/CostReportv1";
var APIUrlFillAccount = HOST + "/api/CRW/GetAccountForCRWFromBudget";
var APIUrlFillLocation = HOST + "/api/CRW/GetLocationForCRWFromBudget";
var APIUrlFillBudgetForCompany = HOST + "/api/CRW/GetBudgetByCompanyForCRW";
var APIUrlCheckSetSegment = HOST + "/api/CRW/CheckForSetSegment";

var heightt;
var GlobalFile;

var CheckLocationStatus = 'NO';
var REv2 = new ReportEngine();

AtlasUtilities.init();

$(document).ready(function () {
    $('#LiCostReport').addClass('active');
    //CheckLocationStatus1();
    heightt = $(window).height();
    heightt = heightt - 180;
    $('#dvMainDv').attr('style', 'height:' + heightt + 'px;');
    $('#divPDF').attr('style', 'width:100%;height:' + heightt + 'px;');

    let SegmentJSON = AtlasUtilities.SegmentJSON(
        {
            "Company": {
                fillElement: '#CRFilterCompany'
            }
            , "Location": {
                fillElement: '#CRFilterLocation'
                , ElementGroupID: '#CRFilterLocationGroup'
                , ElementGroupLabelID: '#CRFilterLocationLabel'
            }
            , "Episode": {
                fillElement: '#CRFilterEpisode'
                , ElementGroupID: '#CRFilterEpisodeGroup'
                , ElementGroupLabelID: '#CRFilterEpisodeLabel'
            }
            , "Set": {
                fillElement: '#CRFilterSet'
                , ElementGroupID: '#CRFilterSetGroup'
                , ElementGroupLabelID: '#CRFilterSetLabel'
            }
        }
    );

    REv2.FormRender(SegmentJSON);

    $('#CRFilterAccountFrom').focusin(function () {
        FillDTFrom();
    })
    $('#CRFilterAccountTo').focusin(function () {
        FillDTFrom();
    })

    FillBudgetForCompany('', '', 1);
});

function ShowMSG(error) {
    console.log(error);
    $("#preload").css("display", "none");
}

function GetCRWExport() {
    APIName = '/api/CRWv2/CRWv2GetCRWData';
    let RE = new ReportEngine(APIName);
    RE.ReportTitle = 'Cost Report';
    RE.callingDocumentTitle = 'Reports > Cost Report > Cost Report';
    RE.FormCapture('#tabCostReport');

    let BudgetID = RE.FormJSON.Budget.split(',')[0];
    BudgetID = ((BudgetID === "0") ? -1 : parseInt(BudgetID));
    RE.FormJSON.BudgetID = BudgetID;

    let objExport = {
        "PA": "Header Account"
            , "PN": "Header Description"
            , "AA": "Account"
            , "AN": "Account Description"
            , "AP": "Period Activity"
            , "AT": "Actuals"
            , "APO": "PO Commitments"
            , "TC": "Total Cost"
            , "ETC": "ETC"
            , "EFC": "EFC"
            , "B": "Budget"
            , "V": "Variance"
    };

    if (RE.FormJSON.isSummary === "1") {
        delete objExport.AA;
        delete objExport.AN;
    }

    RE.setasExport(objExport);
    RE.isJSONParametersCall = true;
    RE.RunReport({ DisplayinTab: true });
    return;
}

function PrintCostReport() {
    var Error = '';
    var CO = $('#CRFilterCompany').val();
    var LO = $('#CRFilterLocation').val();
    var Budget = $('#ddlBudget').val() === '-1' ? '0' : $('#ddlBudget').val();

    if (Error === '') {
        var FinalFilter = CO + '|' + LO + '|' + Budget;

        var JSONParameters = {};
        JSONParameters.callPayload = JSON.stringify({
            ProdID: localStorage.ProdId,
            Filter: FinalFilter,
            ProName: localStorage.ProductionName,
            UserID: localStorage.UserId,
            BudgetID: $('#ddlBudget').val().split(',')[0],
            isSummary: $('#isSummary').prop('checked'),
            noJSON: 0,
            supressZero:0
        });

        APIName = 'APIUrlPrintPDF';
        let RE = new ReportEngine((localStorage.ProdId == '60')? APIUrlPrintPDFv1: APIUrlPrintPDF);
        RE.ReportTitle = 'Cost Report';
        RE.callingDocumentTitle = 'Reports > Cost Report > Cost Report';
        RE.FormCapture('#CostReportdiv');
        RE.FormJSON.ProName = localStorage.ProductionName
        RE.FormJSON.BudgetID = $('#ddlBudget').val().split(',')[0]
        RE.FormJSON.BudgetFileID = $('#ddlBudget').val().split(',')[1]
        RE.FormJSON.CR = JSONParameters.callPayload;
        RE.isJSONParametersCall = true;
        //RE.FormJSON.ProdId = localStorage.ProdId;
        //RE.FormJSON.UserId = localStorage.UserId;
        RE.RunReport({ DisplayinTab: true });
        return;
    } else {
        alert(Error);
    }
}
/*
function FillCompany() {
    $.ajax({
        url: APIUrlFillAccount + '?ProdId=' + localStorage.ProdId,
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

    $('#ddlLocation').empty();
    if (response.length == 1) {
        for (var i = 0; i < response.length; i++) {
            $('#CRFilterCompany').append('<option value=' + response[i].AccountCode + '>' + response[i].AccountCode + '</option>');
        }
        if (CheckLocationStatus == 'YES') {
            $('#dvLo').attr('style', 'display:block;');
            FillLocation();
        }
        else {
            $('#dvLo').attr('style', 'display:none;');
            FillBudgetForCompany('', '', 1);
        }
    }
    else {
        $('#CRFilterCompany').append('<option value=0>Select Company</option>');
        for (var i = 0; i < response.length; i++) {
            $('#CRFilterCompany').append('<option value=' + response[i].AccountCode + '>' + response[i].AccountCode + '</option>');
        }

        if (CheckLocationStatus == 'YES') {
            $('#dvLo').attr('style', 'display:block;');           
        }
        else {
            $('#dvLo').attr('style', 'display:none;');
            FillBudgetForCompany('', '', 1);
        }
    }
}

function FillLocation() {
    $('#ddlLocation').empty();
    $('#ddlBudget').empty();

    var CO = $('select#CRFilterCompany option:selected').text();

    $.ajax({
        url: APIUrlFillLocation + '?ProdId=' + localStorage.ProdId + '&CO=' + CO,
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })

.done(function (response)
{ FillLocationSucess(response); })
.fail(function (error)
{ ShowMSG(error); })
}

function FillLocationSucess(response) {
    if (response.length == 1) {
        $('#ddlBudget').empty();
        for (var i = 0; i < response.length; i++) {
            var Check = parseInt(response[i].AccountCode);
            if (Check > 0) {
                $('#dvLo').attr('style', 'display:block;');
                $('#ddlLocation').append('<option value=' + response[i].AccountCode + '>' + response[i].AccountCode + '</option>');
                FillBudgetForCompany('', '', 1);
            }
            else
            {
                $('#dvLo').attr('style', 'display:none;');
                FillBudgetForCompany('', '', 1);
            }
        }
       // LO();
    }
    else {
         $('#ddlLocation').append('<option value=0>Select Location</option>');
          $('#ddlBudget').empty();
        for (var i = 0; i < response.length; i++) {
            var Check = parseInt(response[i].AccountCode);
            if (Check > 0) {
                $('#dvLo').attr('style', 'display:block;');
                $('#ddlLocation').append('<option value=' + response[i].AccountCode + '>' + response[i].AccountCode + '</option>');
            }
            else
            {
                $('#dvLo').attr('style', 'display:none;');
                FillBudgetForCompany('', '', 1);
            }
        }
       // LO();
    }

}

function CO() {
    FillLocation();
    FillBudgetForCompany('', '', 1);
}

function LO() {
    $('#ddlBudget').empty();
    var CO = $('select#CRFilterCompany option:selected').val();
    var LO = $('select#ddlLocation option:selected').val();
    if (LO == '0') {
        FillBudgetForCompany(LO, '', 1);
    }
    else {
        FillBudgetForCompany(LO, '', 2);
    }
}
*/
function FillBudgetForCompany(LO, EP, Mode) {
    var CompanyCode = $('select#CRFilterCompany option:selected').val();
    if (CompanyCode != '0') {
        $.ajax({
            url: APIUrlFillBudgetForCompany + '?CompanCode=' + CompanyCode + '&ProdID=' + localStorage.ProdId + '&LO=' + LO + '&EP=' + EP + '&Mode=' + Mode,
            cache: false,
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
            },
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
        })
        .done(function (response) {
            FillBudgetForCompanySucess(response);
        })
        .fail(function (error) {
            ShowMSG(error);
        });
    } else {
        $('#ddlLocation').empty();
    }
}

function ShowMSG(error) {
    console.log(error);
}

function FillBudgetForCompanySucess(response) {
    if (localStorage.ProdId == '60') {
        var TLength = response.length;
        var str = '';
        if (TLength == 1) {
            $('#ddlBudget').empty();
            for (var i = 0; i < TLength; i++) {
                var Value = response[i].Budgetid + "," + response[i].BudgetFileID;
                $('#ddlBudget').append('<option value=' + Value + '>' + response[i].BudgetName + '</option>');
            }
        } else {
            $('#ddlBudget').empty();
            $('#ddlBudget').append('<option value=0>Select Budget</option>');
            for (var i = 0; i < TLength; i++) {
                var Value = response[i].Budgetid + "," + response[i].BudgetFileID;
                $('#ddlBudget').append('<option value=' + Value + '>' + response[i].BudgetName + '</option>');
            }
        }
    } else {
        var TLength = response.length;
        var str = '';
        if (TLength == 1) {
            $('#ddlBudget').empty();
            for (var i = 0; i < TLength; i++) {
                var Value = response[i].Budgetid;
                $('#ddlBudget').append('<option value=' + Value + '>' + response[i].BudgetName + '</option>');
            }
        } else {
            $('#ddlBudget').empty();
            $('#ddlBudget').append('<option value="-1">Select Budget</option>');
            for (var i = 0; i < TLength; i++) {
                var Value = response[i].Budgetid + "," + response[i].BudgetFileID;
                $('#ddlBudget').append('<option value=' + Value + '>' + response[i].BudgetName + '</option>');
            }
        }
    }
}

/*
function CheckLocationStatus1() {

    $.ajax({
        url: APIUrlCheckSetSegment + '?ProdID=' + localStorage.ProdId + '&Type=Location',
        cache: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", localStorage.EMSKeyToken);
        },
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
    })

    .done(function (response) {
        CheckLocationStatusSucess(response);
    })
    .fail(function (error)
    { ShowMSG(error); })
}

function CheckLocationStatusSucess(response) {
    if (response.length > 0) {
        CheckLocationStatus = 'YES';
    }
    else {
        CheckLocationStatus = 'NO';
    }

    FillCompany();
}
*/