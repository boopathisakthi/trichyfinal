﻿$(document).ready(function () {
    BindddlData('#ddlstate', '/Company/getstate');
    LoadData();
    $(".dis").attr("disabled", "disabled");
    
    //Bindddl_Data($('#ddltax'), '/Sparepart/gettax');
     
})

function LoadData() {
    var data = [];
    data[0] = "sno";
    data[1] = "name";
    data[2] = "mobile";
    //data[3] = "companyname";
    data[3] = "gstno";
    data[4] = "address";
     var filedata = {
         type: $('#ddltype').val()
    }
     baindatataparams("#Gvlist", "/Customer/Getlist", data, filedata);
}

function Add() {
  
    if ($('#txtname').val() == '' || $('#txtmobile').val() == '' || $('#ddlstate').val()=='0') {
        toastr.error('Please Enter valid Name And mobile number And State');
        return false;
    }

    var Data = {
        sysid: $('#hfsysid').val(),
        name: $('#txtname').val(),
        mobile: $('#txtmobile').val(),
     
        email: $('#txtemail').val(),
        gstno: $('#txtgstno').val(),
        panno: $('#txtpano').val(),
        type: $('#ddltype').val(),
        description: $('#txtdesc').val(),
        address: $('#txtaddress').val(),
        state: $('#ddlstate').val(),
        statecode: $('#ddlstatecode').val(),
    };

    return insertdata("#frm", Data, "/Customer/Save");
}
function afterinsertupdate()
{
    cleardata();
    LoadData();
}
function cleardata() {
    $('#hfsysid').val("");
    $('#txtname').val("");
    $('#txtemail').val("");
    $('#txtmobile').val("");
    $('#txtcompanyname').val("");
    $('#txtgstno').val("");
    $('#txtpano').val("");
    $('#txtdesc').val("");
    $('#txtaddress').val("");
    $('#ddlstate').val("30");
    $('#ddlstatecode').val("33")
  
}
function getbyID(SysId) {
    editassignvalue(SysId, '/Customer/GetbyID')
}

function assignvalue(Item) {
    $('#con-close-modal1').modal('show');
    $('#hfsysid').val(Item.sysid);
    $('#txtname').val(Item.Name);
    $('#txtemail').val(Item.email);
    $('#txtmobile').val(Item.mobile);
    $('#txtcompanyname').val(Item.companyname);
    $('#txtgstno').val(Item.gstin);
    $('#txtpano').val(Item.panno);
    $('#ddltype').val(Item.type);
    $('#txtdesc').val(Item.description);
    $('#txtaddress').val(Item.Address);
    $('#ddlstate').val(Item.state);
    $('#ddlstatecode').val(Item.statecode)
}

function Delete(ID) {
    deletedata(ID, "/Customer/Delete/");
}


function show() {
    cleardata();
  
    $('#con-close-modal1').modal('show');
    $("#ddlstate").val("30");
   
}
function closedata() {

    cleardata();
    $('#con-close-modal1').modal('hide');
}


