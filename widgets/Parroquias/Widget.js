///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define(['dojo/_base/declare', 'jimu/BaseWidget',"esri/tasks/QueryTask","esri/tasks/query","dojo/_base/lang","esri/SpatialReference","esri/graphic","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol","esri/Color"],
  function(declare, BaseWidget, QueryTask, Query, lang, SpatialReference, Graphic,SimpleFillSymbol,SimpleLineSymbol,Color) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-customwidget',

      //this property is set by the framework when widget is loaded.
      //name: 'CustomWidget',


      //methods to communication with app container:

      postCreate: function() {
      },

      startup: function() {       
      },

      onOpen: function(){
      },

      cargaMunicipios(){
        let codigoProvincia= this.seleccionProvincia.value;
        if (codigoProvincia==-1) return;

        this.seleccionMunicipio.innerHTML = "";

        let queryTask = new QueryTask(this.config.urlmunicipios);
        let query = new Query();
        query.returnGeometry = false;
        query.outFields = ["CODCONC", "CONCELLO"];
        query.orderByFields = ["CONCELLO"];
        query.where = "CODPROV =" + codigoProvincia;

        queryTask.execute(query, lang.hitch(this, function(resultados){
          let opcion = document.createElement("option");
          opcion.value = -1;
          opcion.text= "Seleccione un municipio";
          this.seleccionMunicipio.add(opcion);

          for(let i = 0; i < resultados.features.length; i++){
            opcion = document.createElement("option");
            opcion.value = resultados.features[i].attributes.CODCONC;
            opcion.text = resultados.features[i].attributes.CONCELLO;
            this.seleccionMunicipio.add(opcion);
          }
        }))
      },

      cargaParroquias(){
        let codMunicipio = this.seleccionMunicipio.value;
        console.log(codMunicipio)
        if(codMunicipio == -1) return;

        this.seleccionParroquia.innerHTML = "";

        let queryParroquia = new QueryTask(this.config.urlparroquias);
        let qParroquia = new Query();
        qParroquia.returnGeometry = false;
        qParroquia.outFields = ["CODPARRO", "PARROQUIA"];
        qParroquia.orderByFields = ["PARROQUIA"];
        qParroquia.where = "CODCONC =" + codMunicipio;
        
        queryParroquia.execute(qParroquia, lang.hitch(this, function(rParroquias){
          let opcion = document.createElement("option");
          opcion.value = -2;
          opcion.text= "Seleccione una parroquia";
          this.seleccionParroquia.add(opcion);

          for(let i = 0; i <rParroquias.features.length; i++){
            opcion = document.createElement("option");
            opcion.value = rParroquias.features[i].attributes.CODPARRO;
            opcion.text = rParroquias.features[i].attributes.PARROQUIA;
            this.seleccionParroquia.add(opcion);
          }
        }))
      },

      zoomMunicipio(){
        if(this.seleccionMunicipio.value == -1) return;

        let zoomMunicipio = new QueryTask (this.config.urlmunicipios);
        let queryMunicipios = new Query();
        queryMunicipios.returnGeometry = true;
        queryMunicipios.outSpatialReference = new SpatialReference(102100);
        queryMunicipios.where = "CODCONC =" + this.seleccionMunicipio.value;
               
        zoomMunicipio.execute(queryMunicipios, lang.hitch(this, function(resultado){
          if(resultado.features.length > 0){
            let geometria = resultado.features[0].geometry;
            this.map.graphics.clear();
            this.map.graphics.add(new Graphic(geometria, new SimpleFillSymbol(SimpleFillSymbol.STYLE_BACKWARD_DIAGONAL, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color("#433F43"), 2), new Color("#E09CDC"))));
            this.map.setExtent(geometria.getExtent(), true);
          }
        }))

      },

      zoomParroquia(){
        if(this.seleccionParroquia.value == -1) return;

        let zoomParroquia = new QueryTask (this.config.urlparroquias);
        let queryParroquias = new Query();
        queryParroquias.returnGeometry = true;
        queryParroquias.outSpatialReference = new SpatialReference(102100);
        queryParroquias.where = "CODPARRO =" + this.seleccionParroquia.value;
               
        zoomParroquia.execute(queryParroquias, lang.hitch(this, function(resultado){
          if(resultado.features.length > 0){
            let geometria = resultado.features[0].geometry;
            this.map.graphics.clear();
            this.map.graphics.add(new Graphic(geometria, new SimpleFillSymbol(SimpleFillSymbol.STYLE_BACKWARD_DIAGONAL, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color("#433F43"), 2), new Color("#E09CDC"))));
            this.map.setExtent(geometria.getExtent(), true);
          }
        }))
      },

      onClose: function(){
      },

      // onMinimize: function(){
      //   console.log('onMinimize');
      // },

      // onMaximize: function(){
      //   console.log('onMaximize');
      // },

      // onSignIn: function(credential){
      //   /* jshint unused:false*/
      //   console.log('onSignIn');
      // },

      // onSignOut: function(){
      //   console.log('onSignOut');
      // }

      // onPositionChange: function(){
      //   console.log('onPositionChange');
      // },

      // resize: function(){
      //   console.log('resize');
      // }

      //methods to communication between widgets:

    });
  });