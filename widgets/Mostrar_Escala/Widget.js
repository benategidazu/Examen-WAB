define(['dojo/_base/declare', 'jimu/BaseWidget','dojo/_base/lang'], function (declare, BaseWidget, lang) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {

        // Custom widget code goes here

        baseClass: 'mostrar-escala',
        // this property is set by the framework when widget is loaded.
        // name: 'Mostrar_Escala',
        // add additional properties here

        //methods to communication with app container:
        postCreate: function postCreate() {
            this.inherited(arguments);
        },

        startup: function() {
          this.inherited(arguments);
        },

        onOpen: function(){
            this.map.on('zoom',lang.hitch(this, this.zoom ))    
            console.log(this.map)                             
       },
        zoom(){
            this.escala.innerHTML = Math.round(this.map.__LOD.scale);
        },

        onClose: function(){
        },

        // onMinimize: function(){
        //   console.log('Mostrar_Escala::onMinimize');
        // },

        // onMaximize: function(){
        //   console.log('Mostrar_Escala::onMaximize');
        // },

        // onSignIn: function(credential){
        //   console.log('Mostrar_Escala::onSignIn', credential);
        // },

        // onSignOut: function(){
        //   console.log('Mostrar_Escala::onSignOut');
        // }

        // onPositionChange: function(){
        //   console.log('Mostrar_Escala::onPositionChange');
        // },

        // resize: function(){
        //   console.log('Mostrar_Escala::resize');
        // }

        //methods to communication between widgets:

    });
});
//# sourceMappingURL=Widget.js.map
