(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f23ec8e2"],{"0b5a":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"next-view"},[n("button",{on:{click:function(t){e.$emit("next")}}},[e.text?[e._v(e._s(e.text))]:[e._v("Weiter")]],2)])},o=[],u={props:["text"]},s=u,r=(n("78d9"),n("2877")),i=Object(r["a"])(s,a,o,!1,null,"5d486b23",null);i.options.__file="NextButton.vue";t["a"]=i.exports},"1b31":function(e,t,n){},"52a4":function(e,t,n){"use strict";var a=n("1b31"),o=n.n(a);o.a},"78d9":function(e,t,n){"use strict";var a=n("b3b5"),o=n.n(a);o.a},"8e0b":function(e,t,n){},"97ab":function(e,t,n){"use strict";var a=n("8e0b"),o=n.n(a);o.a},b3b5:function(e,t,n){},ef00:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h3",[e._v("Name:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{type:"text"},domProps:{value:e.name},on:{blur:e.updateCustomerName,input:function(t){t.target.composing||(e.name=t.target.value)}}}),n("h3",[e._v("Telefonnummer:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.tel,expression:"tel"}],attrs:{type:"text"},domProps:{value:e.tel},on:{blur:e.updateCustomerTel,input:function(t){t.target.composing||(e.tel=t.target.value)}}}),n("nextButton",{on:{next:e.next}})],1)},o=[],u=n("2154"),s=n("0b5a"),r={data:function(){return{name:this.$store.getters.customerName,tel:this.$store.getters.customerTel}},components:{nextButton:s["a"]},methods:{updateCustomerTel:function(e){this.$store.dispatch("updateCustomerTel",e.target.value)},updateCustomerName:function(e){this.$store.dispatch("updateCustomerName",e.target.value)},next:function(){var e=this;this.$router.push(Object(u["a"])(e)+"/overview")}}},i=r,c=(n("52a4"),n("2877")),l=Object(c["a"])(i,a,o,!1,null,"8d8e9870",null);l.options.__file="CustomerInfo.vue";t["a"]=l.exports},ff32:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"padding"},[n("h2",[e._v("Bitte trage noch deinen Namen ein")]),n("customername")],1)},o=[],u=(n("cadf"),n("551c"),n("097d"),n("ef00")),s={components:{customername:u["a"]}},r=s,i=(n("97ab"),n("2877")),c=Object(i["a"])(r,a,o,!1,null,null,null);c.options.__file="CustomerInfo.vue";t["default"]=c.exports}}]);
//# sourceMappingURL=chunk-f23ec8e2.e60cc525.js.map