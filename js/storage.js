function getFieldText(groupname, fieldID) {
    return localStorage.getItem(groupname + "fieldText" + fieldID);
}

function setFieldText(groupname, fieldID, text) {
    localStorage.setItem(groupname + "fieldText" + fieldID, text);
}

function getFieldChecked(groupname, fieldID) {
    var checked = localStorage.getItem(groupname + "fieldChecked" + fieldID);
    return (checked == "True") ? true : false;
}

function setFieldChecked(groupname, fieldID, checked) {
    localStorage.setItem(groupname + "fieldChecked" + fieldID, checked ? "True" : "False");
}

function clearGroupState(groupname) {
    for (i = 0; i < 24; ++i) {
	localStorage.removeItem(groupname + "fieldText" + i);
	localStorage.removeItem(groupname + "fieldChecked" + i);
    }
}

function getLocalGroupName() {
    return sessionStorage.getItem("groupName");
}

function setLocalGroupName(name) {
    sessionStorage.setItem("groupName", name);
}

function getLocalUserName() {
    return sessionStorage.getItem("userName");
}

function setLocalUserName(name) {
    sessionStorage.setItem("userName", name);
}
