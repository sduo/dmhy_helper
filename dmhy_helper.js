javascript:(function(){
    var hosts=['share.dmhy.org'];
    if(hosts.indexOf(window.location.host)===-1){return;}
    if(document.getElementsByClassName('el_remove').length>0){return;}
    var table=document.getElementById('topic_list');
    if(!table){return;}
    var rows=table.rows;
    if(!rows){return;}
    var el_parent=table.parentElement;
    if(!el_parent){return;}
    el_parent=el_parent.parentElement;
    if(!el_parent){return;}
    var divs=el_parent.getElementsByClassName('nav_title');    
    var flag_all=false;
    var downloads=[];
    function func_all(){
        var cbs=table.getElementsByClassName('cb_select');
        if(cbs.length===0){
            return;
        }
        flag_all=!flag_all;
        for(var i=0;i<cbs.length;++i){
            cbs[i].checked=flag_all;
        }        
    };
    function func_copy (e){
        e.clipboardData.setData('text/plain', downloads.join('\r'));
        e.preventDefault(); 
        document.removeEventListener('copy', func_copy, true);
        setTimeout(function(){
            alert('已复制'+downloads.length+'项到剪贴板!');
        },0);            
    };
    function func_clear (){
        var els=document.getElementsByClassName('el_remove');
        while(els.length){
            els[0].remove();
        }
    };
    function func_confirm (){
        var cbs=table.getElementsByClassName('cb_select');                
        var array=[];
        for(var i=0;i<cbs.length;++i){
            var cb=cbs[i];
            if(cb.checked){
                var data=cb.getAttribute('data');
                if(data){
                    array.push(data);
                }
            }                    
        }      
        if(array.length>0){
            var links=document.getElementsByClassName('download-arrow');
            if(links.length>0){
                downloads=[];
                for(var i=0;i<array.length;++i){
                    var link=links[array[i]];
                    if(link){
                        var href=link.getAttribute('href');
                        if(href){
                            downloads.push(href);
                        }                                
                    }
                }
            }
        }        
        document.addEventListener('copy',func_copy,true);
        try{
            document.execCommand('copy');
        } finally {
            if(typeof(func_clear)==='function'){
                func_clear();
            }
        }
    };    
    for(var i=0;i<rows.length;++i){
        var row=rows[i];
        var html='';
        if(i===0){
            html+='<th class="{sorter:false} el_remove" width="24px" nowrap="nowrap"><a href="javascript:;" id="all">全选</a></th>';            
        } else{                
            html+='<td width="24px" class="el_remove" align="center" nowrap="nowrap">';
            html+='<input type="checkbox" data="'+(i-1)+'" class="cb_select" />';
            html+='</td>';
        }
        row.insertAdjacentHTML('afterBegin',html);
    }
    var btn_all=document.getElementById('all');
    if(btn_all){
        btn_all.addEventListener('click',func_all);
    }    
    for(var i=0;i<divs.length;++i){
        var div=divs[i];
        var id_confirm='btn_confirm_'+i;
        var id_cancel='btn_cancel_'+i;
        var html='<div class="fl el_remove">';
        html+='<a href="javascript:;" id="'+id_confirm+'">确认</a>&nbsp';
        html+='<a href="javascript:;" id="'+id_cancel+'">取消</a>&nbsp';
        html+='</div>';    
        div.insertAdjacentHTML('afterBegin',html);
        var btn_confirm=document.getElementById(id_confirm);
        if(btn_confirm){
            btn_confirm.addEventListener('click',func_confirm);
        }
        var btn_cancel=document.getElementById(id_cancel);
        if(btn_cancel){
            btn_cancel.addEventListener('click',func_clear);
        }                        
    }
})();