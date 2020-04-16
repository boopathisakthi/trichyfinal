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
function Loadoutofstock() {
    var data = [];
    data[0] = "SNo";
    data[1] = "PartNumber";
    data[2] = "Partdescription";
    data[3] = "PartCategory";
    data[4] = "BinLocation";
    data[5] = "CurrentStock";
    bindReportdata("#gvlessqty", "/Dashboard/Getlessqtylist", data);
}
function Loadoutofstock1() {
    var data = {
        FromDate: null,
        ToDate: null,
        Driver_Name: null

    }
    uri = "/Dashboard/Getlessqtylist";
    $.ajax({
        url: uri,
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {

            $.each(data, function (i, item) {
                var rows = "<tr>"
        + "<td>" + item.SNo + "</td>"
        + "<td>" + item.PartNumber + "</td>"
        + "<td>" + item.Partdescription + "</td>"
        + "<td>" + item.PartCategory + "</td>"

        + "<td>" + item.BinLocation + "</td>"
        + "<td>" + item.CurrentStock + "</td>"
        + "</tr>";
                $('#gvlessqty tbody').append(rows);
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
function Loadfreq() {
    var data = {
        FromDate: null,
        ToDate: null,
        Driver_Name: null

    }
    uri = "/Dashboard/GetFreqqtylist";
    $.ajax({
        url: uri,
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {

            $.each(data, function (i, item) {
                var rows = "<tr>"
        + "<td>" + item.SNo + "</td>"
        + "<td>" + item.PartNumber + "</td>"
        + "<td>" + item.Partdescription + "</td>"
        + "<td>" + item.PartCategory + "</td>"

        + "<td>" + item.BinLocation + "</td>"
        + "<td>" +parseInt(item.CurrentStock) + "</td>"
        + "</tr>";
                $('#gvfreqqty tbody').append(rows);
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
function Loadfreqproduct() {
    var data = {
        FromDate: null,
        ToDate: null,
        Driver_Name: null

    }
    uri = "/Dashboard/GetFreqqtylist";
    $.ajax({
        url: uri,
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {

            $.each(data, function (i, item) {
                var rows ='<a>' +
                     '<div class="inbox-item">' +
                        '<div class="inbox-item-img"><h5>' + item.SNo + '</h5></div>' +
                        '<p class="inbox-item-author"><span class="text-danger text-dark">' + item.PartNumber + '</span>~<span class="text-success text-right">' + item.PartCategory + '</span></p>' +
                        '<p class="inbox-item-text">' + item.Partdescription + '</p>' +
                        '<p class="inbox-item-date"><span class="avatar-sm-box bg-pink">' + parseInt(item.CurrentStock) + '</span></p>' +
                    '</div>' +
                     '</a>';
                $('#divfreq').append(rows);
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