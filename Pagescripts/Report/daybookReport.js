$(document).ready(function () {
    
  
    var currentTime = new Date();
    // First Date Of the month 
    var startDateFrom = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);

    $("#txtfromdate").datepicker().datepicker("setDate", currentTime);
    $("#txttodate").datepicker().datepicker("setDate", currentTime);
    //LoadData();
})

function LoadData() {
    var data = [];
    data[0] = "sno";
    data[1] = "entrydate";
    data[2] = "type";
    data[3] = "invoiceno";
    data[4] = "customersysid";
    data[5] = "total";
    var FilterParameter = {
        FROM_DATE: $('#txtfromdate').val(),
        TO_DATE: $('#txttodate').val(),
       
    }

    Parameterbindwithfordaybookviewdata("#Gvlist", "/DayBookReport/Getlist", data, FilterParameter);
}

function getdetails(sysid) {
  
    let data = sysid.split("-");
 
    if (data[0] == 'Sales')
    {
        $.ajax({
            url: '/SalesEntry/Get_Edit',
            data: "{ 'sysid': '" + data[1] + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                $("#detailsTable tbody").empty();
                $.each(res.result.SalesDeatils, function (i, v) {
                    let sno = i + 1;
                    let row = `<tr><td>` + sno + `</td> <td>` + v.type + `</td><td>` + v.sparename + `</td><td>` + v.hsncode + `</td><td>` + v.salesprice + `</td><td>` + v.qty + `</td><td>` + v.amount + `</td></tr>`;
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
    else if(data[0]=='Purchase')
    {
        $.ajax({
            url: '/Stock/GetById',
            data: "{ 'sysid': '" + data[1] + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                $("#detailsTablepurchase tbody").empty();
                $.each(res.result.SpareDetails, function (i, v) {
                    let sno = i + 1;
                    let row = `<tr><td>` + sno + `</td><td>` + v.sparename + `</td><td>` + v.hsncode + `</td><td>` + v.purchaseprice + `</td><td>` + v.qty + `</td><td>` + (v.qty * v.purchaseprice) + `</td></tr>`;
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
    else if(data[0]=='Expense')
    {
        try {
            $.ajax({
                url: '/Expense/GetReportDetailsID',
                data: "{ 'sysid': '" + data[1] + "'}",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                
                    let data = JSON.parse(res)
                    $("#detailsTablesexpense tbody").empty();
                    $.each(data, function (i, v) {
                        let sno = i + 1;
                        let row = `<tr><td>` + sno + `</td><td>` + v.expansename + `</td><td>` + v.expensedesc + `</td><td>` + v.paymode + `</td><td>` + v.amount + `</td></tr>`;
                        $("#detailsTablesexpense tbody").append(row);
                    })
                    $('#con-close-modal3').modal('show')
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
        } catch (e) {

        }

    }

}

function Parameterbindwithfordaybookviewdata(tablename, uri, data, FilterParameter) {

    var datacount = data.length;
    for (i = 0; i < datacount; i++) {
        data[i] = eval({ "data": data[i], "name": data[i], "autoWidth": true });
    }

    data[datacount] = eval({
        "data": "sysid", "width": "50px", "render": function (data) {
            return '<a style="padding:1px;" class="btn btn-icon waves-effect btn-white m-b-5" href="#" onclick="return getdetails(\'' + data + '\')"><i style="color:teal;" class="far fa-eye"></i>  </a>';
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
        "dom": '<"top">rt<"bottom"<"row"<"col-md-2"><"col-md-3"><"col-md-4">>><"clear">',
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

