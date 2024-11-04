sap.ui.define([
    "sap/ui/core/Control"
], function(Control) {
    "use strict";
    
    return Control.extend("com.smod.ux.customcontrol.custom.TimerControl", {
        metadata: {
            properties: {
                timeRemaining: { type: "int", defaultValue: 0 }
            },
            events: {
                timeout: {}
            }
        },

        init: function() {
               const sLibraryPath = jQuery.sap.getModulePath("com.smod.ux.customcontrol");
            jQuery.sap.includeStyleSheet(sLibraryPath + "/css/style.css");
            this._interval = null;
            this._paused = false;
            this._timeElapsed = 0;
            this._duration = 0;
        },

        updateDisplay: function() {
            this.invalidate();
        },

        start: function(duration) {
            this._duration = duration;
            this.setTimeRemaining(duration);
            this._paused = false;
            this._timeElapsed = 0;

            clearInterval(this._interval);
            this._interval = setInterval(() => {
                if (!this._paused) {
                    this._timeElapsed += 1;
                    this.setTimeRemaining(this._duration - this._timeElapsed);
                    
                    // Eğer kalan süre kritikse, sınıfı değiştir
                    if (this._duration - this._timeElapsed <= 10) {
                        this.addStyleClass("criticalTime");
                    }

                    if (this._timeElapsed >= this._duration) {
                        clearInterval(this._interval);
                        this.fireTimeout(); 
                    }
                }
            }, 1000);
        },

        stop: function() {
            clearInterval(this._interval);
            this._paused = true;
        },

        resume: function() {
            if (this._paused) {
                this._paused = false;
                this._interval = setInterval(() => {
                    this._timeElapsed += 1;
                    this.setTimeRemaining(this._duration - this._timeElapsed);
                    if (this._timeElapsed >= this._duration) {
                        clearInterval(this._interval);
                        this.fireTimeout(); 
                    }
                }, 1000);
            }
        },

        renderer: function(oRM, oControl) {
            oRM.write("<div");
            oRM.writeControlData(oControl);
            oRM.addClass("timerControl");
            oRM.writeClasses();
            oRM.write(">");
            oRM.writeEscaped("Kalan Süre: " + oControl.getTimeRemaining() + " sn");
            oRM.write("</div>");
        }
    });
});
