YUI.add("aui-loading-mask-deprecated",function(e,t){var n=e.Lang,r="boundingBox",i="contentBox",s="hide",o="host",u="messageEl",t="loadingmask",a="position",f="show",l="static",c="strings",h="target",p="toggle",d=e.getClassName,v=d(t),m=d(t,"masked"),g=d(t,"masked","relative"),y=d(t,"message"),b=d(t,"message","content"),w='<div class="'+y+'"><div class="'+b+'">{0}</div></div>',E=e.Component.create({NAME:t,NS:t,ATTRS:{messageEl:{valueFn:function(t){var r=this,i=r.get(c);return e.Node.create(n.sub(w,[i.loading]))}},strings:{value:{loading:"Loading&hellip;"}},target:{setter:function(){var t=this,n=t.get(o);return n instanceof e.Widget&&(n=n.get(i)),n},value:null}},EXTENDS:e.Plugin.Base,prototype:{initializer:function(t){var n=this;n.IGNORED_ATTRS=e.merge({host:!0},E.ATTRS),n.renderUI(),n.bindUI(),n._createDynamicAttrs(t)},renderUI:function(){var e=this,t=e.get(c);e._renderOverlayMask(),e.overlayMask.get(r).append(e.get(u))},bindUI:function(){var e=this;e._bindOverlayMaskUI()},destructor:function(){var e=this;e.overlayMask.destroy(),e._visibleChangeHandle.detach()},_bindOverlayMaskUI:function(){var e=this;e._visibleChangeHandle=e.overlayMask.after("visibleChange",e._afterVisibleChange,e)},centerMessage:function(){var e=this;e.get(u).center(e.overlayMask.get(r))},refreshMask:function(){var e=this;e.overlayMask.refreshMask(),e.centerMessage()},_afterVisibleChange:function(e){var t=this,n=t.get(h),r=n.getStyle(a)==l;n.toggleClass(m,e.newVal),n.toggleClass(g,e.newVal&&r),e.newVal&&t.refreshMask()},_renderOverlayMask:function(){var t=this,n=t.get(h);t.overlayMask=(new e.OverlayMask({target:n,cssClass:v})).render(n)},_createDynamicAttrs:function(t){var n=this;e.each(t,function(e,t){var r=n.IGNORED_ATTRS[t];r||n.addAttr(t,{setter:function(e){return this.overlayMask.set(t,e),e},value:e})})}}});e.each([s,f,p],function(e){E.prototype[e]=function(){this.overlayMask[e]()}}),e.LoadingMask=E},"3.0.2-deprecated.1",{requires:["plugin","aui-overlay-mask-deprecated"],skinnable:!0});