function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function menuTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (items, title) {pug_html = pug_html + "\u003Cdiv class=\"menu pure-menu custom-restricted-width\"\u003E\u003Cspan class=\"menu__title pure-menu-heading\"\u003E" + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cul class=\"menu__list pure-menu-list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
        var item = $$obj[index];
pug_html = pug_html + "\u003Cli" + (" class=\"pure-menu-item\""+pug_attr("data-index", index, true, false)) + "\u003E\u003Ca" + (" class=\"pure-menu-link\""+pug_attr("href", item.href, true, false)+" data-action=\"pick\"") + "\u003E" + (pug_escape(null == (pug_interp = item.anchor) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003Ci class=\"close\" data-action=\"remove\"\u003E\u003C\u002Fi\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;
      var item = $$obj[index];
pug_html = pug_html + "\u003Cli" + (" class=\"pure-menu-item\""+pug_attr("data-index", index, true, false)) + "\u003E\u003Ca" + (" class=\"pure-menu-link\""+pug_attr("href", item.href, true, false)+" data-action=\"pick\"") + "\u003E" + (pug_escape(null == (pug_interp = item.anchor) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003Ci class=\"close\" data-action=\"remove\"\u003E\u003C\u002Fi\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E";}.call(this,"items" in locals_for_with?locals_for_with.items:typeof items!=="undefined"?items:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));;return pug_html;}