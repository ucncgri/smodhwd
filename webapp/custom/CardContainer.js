sap.ui.define([
    "sap/ui/layout/Grid"
],
function (Grid) {
    "use strict";

    return Grid.extend("com.smod.ux.customcontrol.custom.CardContainer", {
        metadata: {
            properties: {
            },
            aggregations: {
               
                    cards: {
                        type: "com.smod.ux.customcontrol.custom.Card",
                        multiple: true,
                        
                    }
            },
            events:{
                click:{
                    parameters:{
                        clickedItem:{
                            type: "com.smod.ux.customcontrol.custom.Card"
                        }
                    }
                }
            }
        },
        init: function () {
        
        } ,
        renderer: {
            render: function(oRM, oControl) {
                
                oRM.openStart("div", oControl)
                    .class("smod-ux-card-container") 
                    .openEnd();

                
                const aCards = oControl.getCards(); 
                for (let i = 0; i < aCards.length; i++) {
                    oRM.renderControl(aCards[i]); 
                }

                oRM.close("div"); 
            }
        }

    });
});
