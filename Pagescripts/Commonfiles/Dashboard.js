$(document).ready(function () {
    var currentTime = new Date();
    // First Date Of the month 
    var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);
    $("#txtfromdate").datepicker().datepicker("setDate", startDateFrom);
    $("#txttodate").datepicker().datepicker("setDate", currentTime);
    $('#wrapper').addClass("enlarged forced");
    $('ul').removeAttr("style");
    loadtotal_profit();
 
  

})

function loadtotal_profit() {
    var data = {
        fdate: $("#txtfromdate").val(),
        tdate: $("#txttodate").val()
    }
    uri = "/Dashboard/Gettotalprofit";
    $.ajax({
        url: uri,
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {

            $.each(data, function (i, item) {
                $("#lbltotalsales").html(item.totalsales)
                $("#lbltotalpurchase").html(item.totalpurchase)
                $("#lbltotalexpense").html(item.totalexpense)
              
                $("#lblprofit").html(item.profit)
            })
        },
        error: function (response) {
            var parsed = JSON.parse(response.responseText);
            Error_Msg(parsed.Message);
            d.resolve();
        },
        failure: function (response) {
            var parsed = JSON.parse(response.responseText);
            Error_Msg(parsed.Message);
            d.resolve();
        }

    });
    loadbankpayments()
    loadcashpayments()
    loadprofitloss()
    return false

}
function loadbankpayments() {
    var data = {
        fromdate: $("#txtfromdate").val(),
        todate: $("#txttodate").val()
    }
   
    $.ajax({
        url: "/Dashboard/GetBanktransactions",
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#tblbanktransaction tbody').empty();
            let row = '';
            let total = 0;
            $.each(data, function (i, v) {
                row = '';
                row = `<tr><td>` + v.sno + `</td><td>` + v.entrydate + `</td> <td> By ` + v.name + ` For invoiceno `+v.invoiceno+` </td> <td>` + v.amount + `</td></tr>`
                $('#tblbanktransaction tbody').append(row);
            });
           
        },
        error: function (response) {
            var parsed = JSON.parse(response.responseText);
            Error_Msg(parsed.Message);
            d.resolve();
        },
        failure: function (response) {
            var parsed = JSON.parse(response.responseText);
            Error_Msg(parsed.Message);
            d.resolve();
        }

    });
    return false

}
function loadcashpayments() {
    var data = {
        fromdate: $("#txtfromdate").val(),
        todate: $("#txttodate").val()
    }

    $.ajax({
        url: "/Dashboard/GetCashtransactions",
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#tblcashtransaction tbody').empty();
            let row = '';
            let total = 0;
            $.each(data, function (i, v) {
                row = '';
                row = `<tr><td>` + v.sno + `</td><td>` + v.entrydate + `</td> <td> By ` + v.name + ` For invoiceno ` + v.invoiceno + ` </td> <td>` + v.amount + `</td></tr>`
                $('#tblcashtransaction tbody').append(row);
            });

        },
        error: function (response) {
            var parsed = JSON.parse(response.responseText);
            Error_Msg(parsed.Message);
            d.resolve();
        },
        failure: function (response) {
            var parsed = JSON.parse(response.responseText);
            Error_Msg(parsed.Message);
            d.resolve();
        }

    });
    return false

}

function loadprofitloss() {
    var FilterParameter = {
        fromdate: $("#txtfromdate").val(),
        todate: $("#txttodate").val()

    }
    var data = [];
    data[0] = 'sno';
    data[1] = 'sparename';
    data[2] = 'purchaseqty';
    data[3] = 'salesqty';
    data[4] = 'purchaseamount';
    data[5] = 'salesamount';
    data[6] = 'profit'
    Parameterbindwithoutview($('#Gvlistprofitloss'), "/Dashboard/Getsparebased_profit_loss", data, FilterParameter)
}

function Parameterbindwithoutview(tablename, uri, data, FilterParameter) {

    var datacount = data.length;
    for (i = 0; i < datacount; i++) {
        data[i] = eval({ "data": data[i], "name": data[i], "autoWidth": true });
    }

  

    $(tablename).dataTable().fnDestroy();

    $(tablename).DataTable({
        "ajax": {
            "url": uri,
            "type": "POST",
            "datatype": "json",
            "data": FilterParameter
        },
        "columns": data,
        "serverSide": "true",
        "order": [0, "desc"],
        "dom": '<"top">rt<"bottom"<"row"<"col-md-2"l><"col-md-3"i><"col-md-4"p>>><"clear">',
        "processing": "true",
        "language": {
            "processing": "processing ... please wait"
        }
    });
    oTable = $(tablename).DataTable();
    $('#btnspareseacrh').click(function () {
        //Apply search for Employee Name // DataTable column index 0
        oTable.columns(0).search('sparename');
        //Apply search for Country // DataTable column index 3
        oTable.columns(3).search($('#searchtext').val());
        //hit search on server
        oTable.draw();
    });
}
