var _mobile=false;
if( navigator.userAgent.match(/Android/i)|| navigator.userAgent.match(/webOS/i)|| navigator.userAgent.match(/iPhone/i)
	|| navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPod/i)|| navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)){
    _mobile=true;
  } else {
    _mobile=false;
  }
Ext.application({
	name : 'App',
	launch : function() {
		storage_auth();
		Ext.create('App.system.Main');
	}
});
function storage_auth(){
	if(_clear_storage=='Y')
		localStorage.removeItem(session_name);
	var ses=_get_session(session_name,true);
	if(ses==undefined)
		ses={list:{}};
	if(ses.list[_user_id]==undefined)
		ses.list[_user_id]={tab_list:_tab_list};
	ses.user_id=_user_id;
	var tab_list=ses.list[_user_id].tab_list,
		ada=false;
	for(var i=0,iLen=tab_list.length; i<iLen; i++){
		 ada=false;
		for(var j=0,jLen=_role_list.length; j<jLen; j++){
			if(tab_list[i] != undefined){
				if(tab_list[i].code==_role_list[j].code){
					tab_list[i]['update']=_role_list[j].update;
					ada=true;
				}
			}
		}
		if(ada==false)
			tab_list.splice(i,1);
	}
	ses.list[_user_id].tab_list=tab_list;
	_tab_list=tab_list;
	if(ses.mod == undefined)
		ses['mod']={}
	if(ses.fun == undefined)
		ses['fun']={}
	_set_session(session_name,ses);
}