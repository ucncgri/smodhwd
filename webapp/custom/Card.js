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
                "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard",
                "Squirtle", "Wartortle", "Blastoise", "Primeape", "Pikachu", "Raichu",
                "Sandslash", "Absol", "Wingull", "Golbat", "Persian", "Golduck", "Abra",
                "Treecko", "Grovyle", "Sceptile", "Torchic", "Combusken", "Blaziken", "Mudkip", 
                "Marshtomp", "Swampert", "Poochyena", "Mightyena", "Zigzagoon", "Linoone", 
                "Wurmple", "Silcoon", "Beautifly", "Cascoon", "Dustox", "Lotad", "Lombre", 
                "Ludicolo", "Seedot", "Nuzleaf", "Shiftry", "Taillow", "Swellow", "Wingull", 
                "Pelipper", "Ralts", "Kirlia", "Gardevoir", "Surskit", "Masquerain", "Shroomish", 
                "Breloom", "Slakoth", "Vigoroth", "Slaking", "Nincada", "Ninjask", "Shedinja", 
                "Whismur", "Loudred", "Exploud", "Makuhita", "Hariyama", "Azurill", "Nosepass", 
                "Skitty", "Delcatty", "Sableye", "Mawile", "Aron", "Lairon", "Aggron", "Meditite", 
                "Medicham", "Electrike", "Manectric", "Plusle", "Minun", "Volbeat", "Illumise", 
                "Roselia", "Gulpin", "Swalot", "Carvanha", "Sharpedo", "Wailmer", "Wailord", 
                "Numel", "Camerupt", "Torkoal", "Spoink", "Grumpig", "Spinda", "Trapinch", "Vibrava", 
                "Flygon", "Cacnea", "Cacturne", "Swablu", "Altaria", "Zangoose", "Seviper", "Lunatone", 
                "Solrock", "Barboach", "Whiscash", "Corphish", "Crawdaunt", "Baltoy", "Claydol", "Lileep", 
                "Cradily", "Anorith", "Armaldo", "Feebas", "Milotic", "Castform", "Kecleon", "Shuppet", 
                "Banette", "Duskull", "Dusclops", "Tropius", "Chimecho", "Absol", "Wynaut", "Snorunt", 
                "Glalie", "Spheal", "Sealeo", "Walrein", "Clamperl", "Huntail", "Gorebyss", "Relicanth", 
                "Luvdisc", "Bagon", "Shelgon", "Salamence", "Beldum", "Metang", "Metagross", "Regirock", 
                "Regice", "Registeel", "Latias", "Latios", "Kyogre", "Groudon", "Rayquaza", "Jirachi", "Deoxys"
            ];
            const randomName = this.aPokemonNames[
                Math.floor(Math.random() * this.aPokemonNames.length)
            ];
            const randomImageUrl = `https://img.pokemondb.net/sprites/home/normal/2x/${randomName.toLowerCase()}.jpg`;

            
            this.setImageSrc(randomImageUrl);
            this.setTitle(randomName);
        
           
       },

        renderer: {
            render: function(oRM, oControl) {
                oRM.openStart("div", oControl)
                    .class("smod-ux-card")
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
                    .close("div");
            
      
                oRM.close("div");  
              
                oRM.openStart("div")
                    .class("smod-ux-card-front") 
                    .openEnd();
                
                oRM.openStart("img")
                    .attr("src", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fit/w_828,h_1148/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-414w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiJcL2ZcLzRmNzcwNWVjLThjNDktNGVlZC1hNTZlLWMyMWYzOTg1MjU0Y1wvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9GzaYS7sd8RPY5FlHca09J9ZQZ9D9zI69Ru-BsbkLDA")  // Sabit resmin yolunu buraya ekleyin
                    .attr("alt", "Sabit Resim")
                    .openEnd()
                    .close("img");
            
          
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
