!function(){var e={},t=function(t){for(var n=e[t],i=n.deps,o=n.defn,a=i.length,s=new Array(a),l=0;l<a;++l)s[l]=r(i[l]);var u=o.apply(null,s);if(void 0===u)throw"module ["+t+"] returned undefined";n.instance=u},n=function(t,n,r){if("string"!=typeof t)throw"module id must be a string";if(void 0===n)throw"no dependencies for "+t;if(void 0===r)throw"no definition function for "+t;e[t]={deps:n,defn:r,instance:void 0}},r=function(n){var r=e[n];if(void 0===r)throw"module ["+n+"] was undefined";return void 0===r.instance&&t(n),r.instance},i=function(e,t){for(var n=e.length,i=new Array(n),o=0;o<n;++o)i.push(r(e[o]));t.apply(null,t)},o={};o.bolt={module:{api:{define:n,require:i,demand:r}}};var a=n,s=function(e,t){a(e,[],function(){return t})};s("1",tinymce.PluginManager),s("2",tinymce.util.Tools),s("3",tinymce.util.VK),a("4",[],function(){var e=function(e){return e&&3===e.nodeType},t=function(e){return e&&/^(OL|UL|DL)$/.test(e.nodeName)},n=function(e){return e&&/^(LI|DT|DD)$/.test(e.nodeName)},r=function(e){return e&&"BR"===e.nodeName},i=function(e){return e.parentNode.firstChild===e},o=function(e){return e.parentNode.lastChild===e},a=function(e,t){return t&&!!e.schema.getTextBlockElements()[t.nodeName]},s=function(e,t){return!!r(t)&&!(!e.isBlock(t.nextSibling)||r(t.previousSibling))},l=function(e,t,n){var r=e.isEmpty(t);return!(n&&e.select("span[data-mce-type=bookmark]",t).length>0)&&r},u=function(e,t){return e.isChildOf(t,e.getRoot())};return{isTextNode:e,isListNode:t,isListItemNode:n,isBr:r,isFirstChild:i,isLastChild:o,isTextBlock:a,isBogusBr:s,isEmpty:l,isChildOfBody:u}}),s("9",tinymce.dom.TreeWalker),s("a",tinymce.dom.RangeUtils),a("b",["2","4"],function(e,t){var n=function(n){return e.grep(n.selection.getSelectedBlocks(),function(e){return t.isListItemNode(e)})};return{getSelectedListItems:n}}),s("h",tinymce.dom.DOMUtils.DOM),a("d",["a","4"],function(e,t){var n=function(n,r){var i=e.getNode(n,r);if(t.isListItemNode(n)&&t.isTextNode(i)){var o=r>=n.childNodes.length?i.data.length:0;return{container:i,offset:o}}return{container:n,offset:r}},r=function(e){var t=e.cloneRange(),r=n(e.startContainer,e.startOffset);t.setStart(r.container,r.offset);var i=n(e.endContainer,e.endOffset);return t.setEnd(i.container,i.offset),t};return{getNormalizedEndPoint:n,normalizeRange:r}}),a("c",["h","4","d"],function(e,t,n){var r=function(t){var n={},r=function(r){var i,o,a;o=t[r?"startContainer":"endContainer"],a=t[r?"startOffset":"endOffset"],1===o.nodeType&&(i=e.create("span",{"data-mce-type":"bookmark"}),o.hasChildNodes()?(a=Math.min(a,o.childNodes.length-1),r?o.insertBefore(i,o.childNodes[a]):e.insertAfter(i,o.childNodes[a])):o.appendChild(i),o=i,a=0),n[r?"startContainer":"endContainer"]=o,n[r?"startOffset":"endOffset"]=a};return r(!0),t.collapsed||r(),n},i=function(t){function r(n){var r,i,o,a=function(e){for(var t=e.parentNode.firstChild,n=0;t;){if(t===e)return n;1===t.nodeType&&"bookmark"===t.getAttribute("data-mce-type")||n++,t=t.nextSibling}return-1};r=o=t[n?"startContainer":"endContainer"],i=t[n?"startOffset":"endOffset"],r&&(1===r.nodeType&&(i=a(r),r=r.parentNode,e.remove(o)),t[n?"startContainer":"endContainer"]=r,t[n?"startOffset":"endOffset"]=i)}r(!0),r();var i=e.createRng();return i.setStart(t.startContainer,t.startOffset),t.endContainer&&i.setEnd(t.endContainer,t.endOffset),n.normalizeRange(i)};return{createBookmark:r,resolveBookmark:i}}),a("e",["h","2","4"],function(e,t,n){var r=function(t,r){var i,o=r.parentNode;"LI"===o.nodeName&&o.firstChild===r&&(i=o.previousSibling,i&&"LI"===i.nodeName?(i.appendChild(r),n.isEmpty(t,o)&&e.remove(o)):e.setStyle(o,"listStyleType","none")),n.isListNode(o)&&(i=o.previousSibling,i&&"LI"===i.nodeName&&i.appendChild(r))},i=function(e,n){t.each(t.grep(e.select("ol,ul",n)),function(t){r(e,t)})};return{normalizeList:r,normalizeLists:i}}),s("f",tinymce.dom.BookmarkManager),s("j",tinymce.Env),a("i",["h","j"],function(e,t){var n=function(n,r,i){var o,a,s,l=e.createFragment(),u=n.schema.getBlockElements();if(n.settings.forced_root_block&&(i=i||n.settings.forced_root_block),i&&(a=e.create(i),a.tagName===n.settings.forced_root_block&&e.setAttribs(a,n.settings.forced_root_block_attrs),l.appendChild(a)),r)for(;o=r.firstChild;){var c=o.nodeName;s||"SPAN"===c&&"bookmark"===o.getAttribute("data-mce-type")||(s=!0),u[c]?(l.appendChild(o),a=null):i?(a||(a=e.create(i),l.appendChild(a)),a.appendChild(o)):l.appendChild(o)}return n.settings.forced_root_block?s||t.ie&&!(t.ie>10)||a.appendChild(e.create("br",{"data-mce-bogus":"1"})):l.appendChild(e.create("br")),l};return{createNewTextBlock:n}}),a("g",["h","2","i","4"],function(e,t,n,r){var i=function(i,o,a,s){var l,u,c,d,f=function(n){t.each(c,function(e){n.parentNode.insertBefore(e,a.parentNode)}),e.remove(n)};for(c=e.select('span[data-mce-type="bookmark"]',o),s=s||n.createNewTextBlock(i,a),l=e.createRng(),l.setStartAfter(a),l.setEndAfter(o),u=l.extractContents(),d=u.firstChild;d;d=d.firstChild)if("LI"===d.nodeName&&i.dom.isEmpty(d)){e.remove(d);break}i.dom.isEmpty(u)||e.insertAfter(u,o),e.insertAfter(s,o),r.isEmpty(i.dom,a.parentNode)&&f(a.parentNode),e.remove(a),r.isEmpty(i.dom,o)&&e.remove(o)};return{splitList:i}}),a("7",["h","4","c","b","g","e","i"],function(e,t,n,r,i,o,a){var s=function(n,r){t.isEmpty(n,r)&&e.remove(r)},l=function(n,r){var l,u=r.parentNode,c=u.parentNode;return u===n.getBody()||("DD"===r.nodeName?(e.rename(r,"DT"),!0):t.isFirstChild(r)&&t.isLastChild(r)?("LI"===c.nodeName?(e.insertAfter(r,c),s(n.dom,c),e.remove(u)):t.isListNode(c)?e.remove(u,!0):(c.insertBefore(a.createNewTextBlock(n,r),u),e.remove(u)),!0):t.isFirstChild(r)?("LI"===c.nodeName?(e.insertAfter(r,c),r.appendChild(u),s(n.dom,c)):t.isListNode(c)?c.insertBefore(r,u):(c.insertBefore(a.createNewTextBlock(n,r),u),e.remove(r)),!0):t.isLastChild(r)?("LI"===c.nodeName?e.insertAfter(r,c):t.isListNode(c)?e.insertAfter(r,u):(e.insertAfter(a.createNewTextBlock(n,r),u),e.remove(r)),!0):("LI"===c.nodeName?(u=c,l=a.createNewTextBlock(n,r,"LI")):l=t.isListNode(c)?a.createNewTextBlock(n,r,"LI"):a.createNewTextBlock(n,r),i.splitList(n,u,r,l),o.normalizeLists(n.dom,u.parentNode),!0))},u=function(e){var t=r.getSelectedListItems(e);if(t.length){var i,o,a=n.createBookmark(e.selection.getRng(!0)),s=e.getBody();for(i=t.length;i--;)for(var u=t[i].parentNode;u&&u!==s;){for(o=t.length;o--;)if(t[o]===u){t.splice(i,1);break}u=u.parentNode}for(i=0;i<t.length&&(l(e,t[i])||0!==i);i++);return e.selection.setRng(n.resolveBookmark(a)),e.nodeChanged(),!0}};return{outdent:l,outdentSelection:u}}),a("8",["2","f","b","4","c","g","e","7"],function(e,t,n,r,i,o,a,s){var l=function(e,t,n){var r=n["list-style-type"]?n["list-style-type"]:null;e.setStyle(t,"list-style-type",r)},u=function(t,n){e.each(n,function(e,n){t.setAttribute(n,e)})},c=function(t,n,r){u(n,r["list-attributes"]),e.each(t.select("li",n),function(e){u(e,r["list-item-attributes"])})},d=function(e,t,n){l(e,t,n),c(e,t,n)},f=function(e,t,n){var i,o,a=e.getBody();for(i=t[n?"startContainer":"endContainer"],o=t[n?"startOffset":"endOffset"],1===i.nodeType&&(i=i.childNodes[Math.min(o,i.childNodes.length-1)]||i);i.parentNode!==a;){if(r.isTextBlock(e,i))return i;if(/^(TD|TH)$/.test(i.parentNode.nodeName))return i;i=i.parentNode}return i},p=function(n,i){for(var o,a=[],s=n.getBody(),l=n.dom,u=f(n,i,!0),c=f(n,i,!1),d=[],p=u;p&&(d.push(p),p!==c);p=p.nextSibling);return e.each(d,function(e){if(r.isTextBlock(n,e))return a.push(e),void(o=null);if(l.isBlock(e)||r.isBr(e))return r.isBr(e)&&l.remove(e),void(o=null);var i=e.nextSibling;return t.isBookmarkNode(e)&&(r.isTextBlock(n,i)||!i&&e.parentNode===s)?void(o=null):(o||(o=l.create("p"),e.parentNode.insertBefore(o,e),a.push(o)),void o.appendChild(e))}),a},h=function(t,n,o){var a,s=t.selection.getRng(!0),l="LI",u=t.dom;o=o?o:{},"false"!==u.getContentEditable(t.selection.getNode())&&(n=n.toUpperCase(),"DL"===n&&(l="DT"),a=i.createBookmark(s),e.each(p(t,s),function(e){var i,a,s=function(e){var t=u.getStyle(e,"list-style-type"),n=o?o["list-style-type"]:"";return n=null===n?"":n,t===n};a=e.previousSibling,a&&r.isListNode(a)&&a.nodeName===n&&s(a)?(i=a,e=u.rename(e,l),a.appendChild(e)):(i=u.create(n),e.parentNode.insertBefore(i,e),i.appendChild(e),e=u.rename(e,l)),d(u,i,o),C(t.dom,i)}),t.selection.setRng(i.resolveBookmark(a)))},m=function(t){var l=i.createBookmark(t.selection.getRng(!0)),u=t.getBody(),c=n.getSelectedListItems(t),d=e.grep(c,function(e){return t.dom.isEmpty(e)});c=e.grep(c,function(e){return!t.dom.isEmpty(e)}),e.each(d,function(e){if(r.isEmpty(t.dom,e))return void s.outdent(t,e)}),e.each(c,function(e){var n,i;if(e.parentNode!==t.getBody()){for(n=e;n&&n!==u;n=n.parentNode)r.isListNode(n)&&(i=n);o.splitList(t,i,e),a.normalizeLists(t.dom,i.parentNode)}}),t.selection.setRng(i.resolveBookmark(l))},g=function(e,t){return e&&t&&r.isListNode(e)&&e.nodeName===t.nodeName},v=function(e,t,n){var r=e.getStyle(t,"list-style-type",!0),i=e.getStyle(n,"list-style-type",!0);return r===i},y=function(e,t){return e.className===t.className},b=function(e,t,n){return g(t,n)&&v(e,t,n)&&y(t,n)},C=function(e,t){var n,r;if(n=t.nextSibling,b(e,t,n)){for(;r=n.firstChild;)t.appendChild(r);e.remove(n)}if(n=t.previousSibling,b(e,t,n)){for(;r=n.lastChild;)t.insertBefore(r,t.firstChild);e.remove(n)}},x=function(e,t,n){var r=e.dom.getParent(e.selection.getStart(),"OL,UL,DL");if(n=n?n:{},r!==e.getBody())if(r)if(r.nodeName===t)m(e,t);else{var o=i.createBookmark(e.selection.getRng(!0));d(e.dom,r,n),C(e.dom,e.dom.rename(r,t)),e.selection.setRng(i.resolveBookmark(o))}else h(e,t,n)};return{toggleList:x,removeList:m,mergeWithAdjacentLists:C}}),a("5",["9","a","3","b","4","c","d","e","8"],function(e,t,n,r,i,o,a,s,l){var u=function(n,r,o){var a,s,l=r.startContainer,u=r.startOffset;if(3===l.nodeType&&(o?u<l.data.length:u>0))return l;for(a=n.schema.getNonEmptyElements(),1===l.nodeType&&(l=t.getNode(l,u)),s=new e(l,n.getBody()),o&&i.isBogusBr(n.dom,l)&&s.next();l=s[o?"next":"prev2"]();){if("LI"===l.nodeName&&!l.hasChildNodes())return l;if(a[l.nodeName])return l;if(3===l.nodeType&&l.data.length>0)return l}},c=function(e,t,n){var r,o,a=t.parentNode;if(i.isChildOfBody(e,t)&&i.isChildOfBody(e,n)){if(i.isListNode(n.lastChild)&&(o=n.lastChild),a===n.lastChild&&i.isBr(a.previousSibling)&&e.remove(a.previousSibling),r=n.lastChild,r&&i.isBr(r)&&t.hasChildNodes()&&e.remove(r),i.isEmpty(e,n,!0)&&e.$(n).empty(),!i.isEmpty(e,t,!0))for(;r=t.firstChild;)n.appendChild(r);o&&n.appendChild(o),e.remove(t),i.isEmpty(e,a)&&a!==e.getRoot()&&e.remove(a)}},d=function(e,t){var n,r,s,d=e.dom,f=e.selection,p=d.getParent(f.getStart(),"LI");if(p){if(n=p.parentNode,n===e.getBody()&&i.isEmpty(d,n))return!0;if(r=a.normalizeRange(f.getRng(!0)),s=d.getParent(u(e,r,t),"LI"),s&&s!==p){var h=o.createBookmark(r);return t?c(d,s,p):c(d,p,s),e.selection.setRng(o.resolveBookmark(h)),!0}if(!s&&!t&&l.removeList(e,n.nodeName))return!0}return!1},f=function(e,t){var n=e.dom,r=n.getParent(e.selection.getStart(),n.isBlock);if(r&&n.isEmpty(r)){var i=a.normalizeRange(e.selection.getRng(!0)),o=n.getParent(u(e,i,t),"LI");if(o)return e.undoManager.transact(function(){n.remove(r),l.mergeWithAdjacentLists(n,o.parentNode),e.selection.select(o,!0),e.selection.collapse(t)}),!0}return!1},p=function(e,t){return d(e,t)||f(e,t)},h=function(e){var t=e.dom.getParent(e.selection.getStart(),"LI,DT,DD");return!!(t||r.getSelectedListItems(e).length>0)&&(e.undoManager.transact(function(){e.execCommand("Delete"),s.normalizeLists(e.dom,e.getBody())}),!0)},m=function(e,t){return e.selection.isCollapsed()?p(e,t):h(e)},g=function(e){e.on("keydown",function(t){t.keyCode===n.BACKSPACE?m(e,!1)&&t.preventDefault():t.keyCode===n.DELETE&&m(e,!0)&&t.preventDefault()})};return{setup:g,backspaceDelete:m}}),a("6",["h","4","c","b"],function(e,t,n,r){var i=function(n,r){var i;if(t.isListNode(n)){for(;i=n.firstChild;)r.appendChild(i);e.remove(n)}},o=function(n){var r,o,a;return"DT"===n.nodeName?(e.rename(n,"DD"),!0):(r=n.previousSibling,r&&t.isListNode(r)?(r.appendChild(n),!0):r&&"LI"===r.nodeName&&t.isListNode(r.lastChild)?(r.lastChild.appendChild(n),i(n.lastChild,r.lastChild),!0):(r=n.nextSibling,r&&t.isListNode(r)?(r.insertBefore(n,r.firstChild),!0):(r=n.previousSibling,!(!r||"LI"!==r.nodeName)&&(o=e.create(n.parentNode.nodeName),a=e.getStyle(n.parentNode,"listStyleType"),a&&e.setStyle(o,"listStyleType",a),r.appendChild(o),o.appendChild(n),i(n.lastChild,o),!0))))},a=function(e){var t=r.getSelectedListItems(e);if(t.length){for(var i=n.createBookmark(e.selection.getRng(!0)),a=0;a<t.length&&(o(t[a])||0!==a);a++);return e.selection.setRng(n.resolveBookmark(i)),e.nodeChanged(),!0}};return{indentSelection:a}}),a("0",["1","2","3","4","5","6","7","8"],function(e,t,n,r,i,o,a,s){var l=function(e,t){return function(){var n=e.dom.getParent(e.selection.getStart(),"UL,OL,DL");return n&&n.nodeName===t}},u=function(e){e.on("BeforeExecCommand",function(t){var n,r=t.command.toLowerCase();if("indent"===r?o.indentSelection(e)&&(n=!0):"outdent"===r&&a.outdentSelection(e)&&(n=!0),n)return e.fire("ExecCommand",{command:t.command}),t.preventDefault(),!0}),e.addCommand("InsertUnorderedList",function(t,n){s.toggleList(e,"UL",n)}),e.addCommand("InsertOrderedList",function(t,n){s.toggleList(e,"OL",n)}),e.addCommand("InsertDefinitionList",function(t,n){s.toggleList(e,"DL",n)})},c=function(e){e.addQueryStateHandler("InsertUnorderedList",l(e,"UL")),e.addQueryStateHandler("InsertOrderedList",l(e,"OL")),e.addQueryStateHandler("InsertDefinitionList",l(e,"DL"))},d=function(e){e.on("keydown",function(t){9!==t.keyCode||n.metaKeyPressed(t)||e.dom.getParent(e.selection.getStart(),"LI,DT,DD")&&(t.preventDefault(),t.shiftKey?a.outdentSelection(e):o.indentSelection(e))})},f=function(e){var n=function(n){return function(){var i=this;e.on("NodeChange",function(e){var o=t.grep(e.parents,r.isListNode);i.active(o.length>0&&o[0].nodeName===n)})}},i=function(e,n){var r=e.settings.plugins?e.settings.plugins:"";return t.inArray(r.split(/[ ,]/),n)!==-1};i(e,"advlist")||(e.addButton("numlist",{title:"Numbered list",cmd:"InsertOrderedList",onPostRender:n("OL")}),e.addButton("bullist",{title:"Bullet list",cmd:"InsertUnorderedList",onPostRender:n("UL")})),e.addButton("indent",{icon:"indent",title:"Increase indent",cmd:"Indent",onPostRender:function(t){var n=t.control;e.on("nodechange",function(){for(var t=e.selection.getSelectedBlocks(),i=!1,o=0,a=t.length;!i&&o<a;o++){var s=t[o].nodeName;i="LI"===s&&r.isFirstChild(t[o])||"UL"===s||"OL"===s||"DD"===s}n.disabled(i)})}})};return e.add("lists",function(e){return f(e),i.setup(e),e.on("init",function(){u(e),c(e),d(e)}),{backspaceDelete:function(t){i.backspaceDelete(e,t)}}}),function(){}}),r("0")()}();
