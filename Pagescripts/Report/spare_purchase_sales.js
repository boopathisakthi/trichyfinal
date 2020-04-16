$(document).ready(function () {
    var currentTime = new Date();
    // First Date Of the month 
    var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);
    $("#txtfromdate").datepicker().datepicker("setDate", currentTime);
    $("#txttodate").datepicker().datepicker("setDate", currentTime);
    LoadData();
})
function LoadData() {
    var data = [];
    data[0] = "sno";
    data[1] = "sparename";
    data[2] = "purchaseqty";
    data[3] = "salesqty";
    data[4] = "balanceqty";

    var FilterParameter = {
        FROM_DATE: $('#txtfromdate').val(),
        TO_DATE: $('#txttodate').val(),

    }

    Parameterbindwithfordoubleviewdata("#Gvlist", "/Spare_Purchase_Sales/Getlist", data, FilterParameter);
}

function Parameterbindwithfordoubleviewdata(tablename, uri, data, FilterParameter) {

    var datacount = data.length;
    for (i = 0; i < datacount; i++) {
        data[i] = eval({ "data": data[i], "name": data[i], "autoWidth": true });
    }

    data[datacount] = eval({
        "data": "sysid", "width": "50px", "render": function (data) {
            return '<a style="padding:1px;" class="btn btn-icon waves-effect btn-white m-b-5" href="#" onclick="return getpurchasedetails(\'' + data + '\')"><i style="color:teal;" class="far fa-eye"></i>  </a>';
        }
    });
    data[datacount+1] = eval({
        "data": "sysid", "width": "50px", "render": function (data) {
            return '<a style="padding:1px;" class="btn btn-icon waves-effect btn-white m-b-5" href="#" onclick="return getsalesdetails(\'' + data + '\')"><i style="color:teal;" class="far fa-eye"></i>  </a>';
        }
    });

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
    $('#btnSearch').click(function () {
        //Apply search for Employee Name // DataTable column index 0
        oTable.columns(0).search($('#searchby').val().trim());
        //Apply search for Country // DataTable column index 3
        oTable.columns(3).search($('#searchtext').val().trim());
        //hit search on server
        oTable.draw();
    });
}

function getsalesdetails(sysid) {
    var FilterParameter = {
        FROM_DATE: $('#txtfromdate').val(),
        TO_DATE: $('#txttodate').val(),
        type:"Spare",
        sysid: sysid
    }
    $.ajax({
        url: '/Sparesale/Getspares_salesdetails',
        data: FilterParameter,
        dataType: "json",
        type: "POST",

        success: function (res) {

            $("#detailsTable tbody").empty();
            $.each(res.data, function (i, v) {
                let sno = i + 1;
                let row = `<tr><td>` + sno + `</td><td>` + v.entrydate + `</td><td>` + v.invoiceno + `</td> <td>` + v.name + `</td><td>` + v.sparename + `</td><td>` + v.hsncode + `</td><td>` + v.qty + `</td></tr>`;
                $("#detailsTable tbody").append(row);
            })
            $('#con-close-modal1').modal('show')

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


}

function getpurchasedetails(sysid) {
    var FilterParameter = {
        FROM_DATE: $('#txtfromdate').val(),
        TO_DATE: $('#txttodate').val(),
        sysid: sysid
    }
    $.ajax({
        url: '/Sparesale/Getspares_purchasedetails',
        data: FilterParameter,
        dataType: "json",
        type: "POST",
        success: function (res) {

            $("#detailsTablepurchase tbody").empty();
            $.each(res.data, function (i, v) {
                let sno = i + 1;
                let row = `<tr><td>` + sno + `</td><td>` + v.entrydate + `</td><td>` + v.invoiceno + `</td> <td>` + v.name + `</td><td>` + v.sparename + `</td><td>` + v.hsncode + `</td><td>` + v.qty + `</td></tr>`;
                $("#detailsTablepurchase tbody").append(row);
            })
            $('#con-close-modal2').modal('show')

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


}