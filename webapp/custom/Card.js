sap.ui.define([
    "sap/ui/core/Control"
],
function (Control) {
    "use strict";
 
    return Control.extend("com.smod.ux.customcontrol.custom.Card", {
        metadata: {
            properties: {
                title: {
                    type:"string",
                    bindable: true,
                },
                description: {
                    type:"string",
                    bindable: true,
                },
                imageSrc: {
                    type:"string",
                    bindable: true,
                },
                enabled: {
                    type: "boolean",
                    bindable: true,
                    defaultValue: true
                },
                isFlipped: {
                    type: "boolean", 
                    defaultValue: false 
                }
            },
            events: {
                click: {}
            }
        },

        init: function () {
            const sLibraryPath = jQuery.sap.getModulePath("com.smod.ux.customcontrol");
            jQuery.sap.includeStyleSheet(sLibraryPath + "/custom/Card.css");
      
           
            this.loadRandomImage();
        },

        loadRandomImage: function () {
           
            this.aPokemonNames = [
                "Bulbasaur",
                "Ivysaur",
                "Venusaur",
                "Charmander",
                "Charmeleon",
                "Charizard",
                "Squirtle",
                "Wartortle",
                "Blastoise",
                "Primeape",
                "Pikachu",
                "Raichu",
                "Sandslash",
                "Absol", 
                "Wingull",
                "Golbat",
                "Persian",
                "Golduck",
                "Abra", 
            ];

           
            const randomName = this.aPokemonNames[
                Math.floor(Math.random() * this.aPokemonNames.length)
            ];
            const randomImageUrl = `https://img.pokemondb.net/sprites/home/normal/2x/${randomName.toLowerCase()}.jpg`;

            
            this.setImageSrc(randomImageUrl);
            this.setTitle(randomName);
;        },

        renderer: {
            render: function(oRM, oControl) {
             
                oRM.openStart("div", oControl)
                    .class("smod-ux-card")
                   // .class(oControl.getEnabled() ? "smod-ux-card-active" : "smod-ux-card-inactive")
                    .class(oControl.getIsFlipped() ? "flipped" : "")
                    .openEnd();
                
               
                oRM.openStart("div")
                    .class("smod-ux-card-inner") 
                    .openEnd();
                
               
                oRM.openStart("div")
                    .class("smod-ux-card-back") 
                    .openEnd();
                  
                oRM.openStart("img")
                    .attr("src", oControl.getImageSrc())
                    .attr("alt", oControl.getTitle())
                    .openEnd()
                    .close("img");
                    oRM.openStart("div")
                    .class("smod-ux-card-title")
                    .openEnd()
                    .text(oControl.getTitle())

                    .openStart("div")
                    .class("smod-ux-card-description")
                    .openEnd()
                    .text(oControl.getDescription())
                    .close("div")
                    
                    .close("div");

                oRM.close("div");
                
                
                oRM.openStart("div")
                    .class("smod-ux-card-front") 
                    .openEnd();
             
             
        
               
                oRM.openStart("div")
                    .class("smod-ux-card-description")
                    .openEnd()
                    .text(oControl.getDescription())
                    .close("div");
                
                oRM.close("div");
                
                oRM.close("div"); 
                oRM.close("div"); 
            }
        },
     
        ontap: function(oEvent) {

     
       
                    oEvent.preventDefault();
                 
            if (!this.getEnabled()) {
                return;
            }

            
           
            if (!this.isMatched) { 
                
                this.$().toggleClass("flipped");
               
                const imageSrc = this.getImageSrc();
                const oEventBus = sap.ui.getCore().getEventBus();
                oEventBus.publish("Card", "Click", {
                    clickedItem: this,
                    imageSrc: imageSrc
                });
            }
        },
    });
});
