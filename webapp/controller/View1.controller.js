sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "com/smod/ux/customcontrol/custom/Card",
    "com/smod/ux/customcontrol/custom/TimerControl",
"com/smod/ux/customcontrol/utils/sweetalert",
    
], function (Controller, MessageToast,Card, TimerControl, SwalJS) {
    "use strict";

    return Controller.extend("com.smod.ux.customcontrol.controller.View1", {
     
        onInit: function () {
            const sLibraryPath = jQuery.sap.getModulePath("com.smod.ux.customcontrol");
            jQuery.sap.includeStyleSheet(sLibraryPath + "/css/style.css");
            this.openCards = [];
            this.oTimer = new com.smod.ux.customcontrol.custom.TimerControl();
            this.oTimer.attachTimeout(this.onTimeOut, this);
            const oView = this.getView();
            oView.byId("timerContainer").addItem(this.oTimer);
            const username = localStorage.getItem("username");
            if (username) {
                oView.byId("usernameInput").setValue(username);
            }
            const oEventBus = sap.ui.getCore().getEventBus();
            oEventBus.subscribe("Card", "Click", this.onBusCardClick, this );
        },
        startTimer: function() {
            this.oTimer.start(30); // 60 saniye örnek başlangıç süresi
        },
        
        onTimeOut: function() {
         
            const username = localStorage.getItem("username");
            Swal.fire({
                title: "Süre Doldu!",
                text: ` Oyuncu ${username}, süreniz doldu! Oyun sona erdi.`,
                icon: "warning",
                confirmButtonText: "Tamam"
            });
            
            const oCardContainer = this.getView().byId("cardContainer");
            oCardContainer.getCards().forEach(card => {
                card.setEnabled(false); // Tüm kartları tıklanamaz yap
            });
            const oView = this.getView();
            
            oView.byId("pauseResumeButton").setVisible(false); 
            
        },
        togglePauseResume: function () {
            if (this.isPaused) {
              
                this.oTimer.resume(); 
                this.isPaused = false;
        
                const oCardContainer = this.getView().byId("cardContainer");
                oCardContainer.getCards().forEach(card => {
                    if (!card.isMatched) { 
                        card.setEnabled(true);
                    }
                });
        
                MessageToast.show("Oyun devam ediyor.");
                
                this.getView().byId("pauseResumeButton").setText("Durdur");
        
            } else {
                
                this.oTimer.stop(); 
                this.isPaused = true;
        
                const oCardContainer = this.getView().byId("cardContainer");
                oCardContainer.getCards().forEach(card => {
                    card.setEnabled(false);
                });
        
                MessageToast.show("Oyun durduruldu.");
               
                this.getView().byId("pauseResumeButton").setText("Devam Et");
            }
        }
,        
     
        onRestartGame: function () {
           
            this.onStartGame(); 
           
        },
       
        onStartGame: function () {
            const oView = this.getView();
            const username = oView.byId("usernameInput").getValue();
            const difficulty = oView.byId("difficultySelect").getSelectedKey();
            oView.byId("startbutton").setVisible(false); 
            oView.byId("usernameInput").setVisible(false); 
            oView.byId("timerContainer").setVisible(true); 
            oView.byId("pauseResumeButton").setVisible(true); 
            oView.byId("restartbutton").setVisible(true); 
            oView.byId("username").setVisible(false);
          
            localStorage.setItem("username", username);
            oView.byId("usernameText").setText(`${username}`);

        
            let cardCount = 0;
            let defaultSpan = "XL2 L2 M4 S6"; 
        
            switch (difficulty) {
                case "easy":
                    cardCount = 4; 
                    defaultSpan = "XL2 L4 M4 S2"; 
                    break;
                case "medium":
                    cardCount = 6; 
                    defaultSpan = "XL2 L2 M4 S6";
                    break;
                case "hard":
                    cardCount = 8;
                    defaultSpan = "XL1 L1 M4 S6";
                    break;
                default:
                    cardCount = 0;
            }
            this.cardCount = cardCount;
            
            MessageToast.show(`Oyun Başladı! Hoş geldin, ${username}. Zorluk: ${difficulty}`);
        
           
            this.matchedPairs = 0; 
            this.showCards(cardCount, defaultSpan);
            this.startTimer();
          
        },
        onShowHistory: function () {
            const username = localStorage.getItem("username");
            const scores = JSON.parse(localStorage.getItem(`scores_${username}`)) || [];
        
          
            scores.sort((a, b) => b - a); 

            let scoreText = scores.length > 0 ? scores.map((score, index) => `Oyun ${index + 1}: ${score}`).join("\n") : "Henüz skor yok.";
        
            Swal.fire({
                title: ` Oyuncu ${username}: Geçmiş Skorlar.`,
                text: scoreText,
                icon: "info",
                confirmButtonText: "Tamam"
            });
        }
,        
        
        showCards: function (cardCount, defaultSpan) {
            const oView = this.getView();
            const oCardContainer = oView.byId("cardContainer");
            oCardContainer.setVisible(true);
            oCardContainer.removeAllCards(); 
        
            const kartlar = [];
            const totalPairs = cardCount / 2; 
        
            for (let i = 0; i < totalPairs; i++) {
                const oCard = new com.smod.ux.customcontrol.custom.Card({
                    busy: false,
                 
                    description: "Bu bir Pokémon kartıdır.",
                    enabled: true,
                 
                });
                kartlar.push(oCard, oCard.clone()); 
            }
        
          
            const karilmisKartlar = this.karistir(kartlar);
        
     
            karilmisKartlar.forEach(oCard => {
                oCardContainer.addAggregation("cards", oCard);
            });
        
          
            oCardContainer.setDefaultSpan(defaultSpan);
            oCardContainer.invalidate(); 
        },
        
        karistir: function(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }
,        

    


            onBusCardClick: function(sChannel, sEvent, oData) {
         
                const clickedItem = oData?.clickedItem;
        
                if (this.firstCard) {
                    console.log(this.firstCard);
                    console.log(clickedItem);
        
                    if (this.firstCard.getImageSrc() === clickedItem.getImageSrc() &&  this.firstCard.sId !== clickedItem.sId ) {
                    

                        
                        console.log("Kartlar eşleşti! Açık kalacaklar.");
                        this.firstCard.setBusy(false);
                        clickedItem.setBusy(false);
                        
            
                        this.firstCard.$().addClass("flipped");
                        clickedItem.$().addClass("flipped");
                        this.firstCard.setProperty("isFlipped", true);
                        setTimeout(() => {
                            clickedItem.setProperty("isFlipped", true);
                        }, 700); 
            
                        this.firstCard.isMatched = true;
                        clickedItem.isMatched = true;
            
                       
                        this.matchedPairs++;
            
                        
                        if (this.matchedPairs === (this.cardCount / 2)) {
                            this.oTimer.stop();
                            setTimeout(() => {
                                MessageToast.show("Tebrikler! Tüm kartları eşleştirdiniz.");
                            }, 700); 
                
                          
                            const username = localStorage.getItem("username");
                            const elapsedTime = this.oTimer._timeElapsed;
                            let score;
            
                          
                            if (elapsedTime < 10) {
                                score = 100;
                            } else if (elapsedTime >= 10 && elapsedTime < 20) {
                                score = 75;
                            } else if (elapsedTime >= 20 && elapsedTime <= 30) {
                                score = 50;
                            } else {
                                score = 0; 
                            } 
                            setTimeout(() => {
                                Swal.fire({
                                    title: "Tebrikler!",
                                    text: `Oyuncu ${username}, tüm kartları eşleştirdiniz! Skorunuz: ${score}`,
                                    icon: "success",
                                    confirmButtonText: "Tamam"
                                });
                            }, 1000);
                            let previousScores = JSON.parse(localStorage.getItem(`scores_${username}`)) || []; 
                            previousScores.push(score); // Yeni skoru ekle
                            localStorage.setItem(`scores_${username}`, JSON.stringify(previousScores));
                            const ascore = localStorage.getItem(`score_${username}`);
                            console.log(ascore);
                        }
            
                        this.firstCard = null;
                    } else {
                       
                        console.log("Kartlar eşleşmedi! Kapalı olacaklar.");
                        this.openCards.push(this.firstCard, clickedItem);
                        setTimeout(() => {
                            if (this.firstCard) {
                    this.firstCard.$().removeClass("flipped");
                
                }
                            clickedItem.$().removeClass("flipped");
                            if (this.firstCard) {
                            this.firstCard.setBusy(false);}
                            clickedItem.setBusy(false);
                            this.firstCard = null;
                        }, 1000);
                    }
                } else {
                    
                    this.firstCard = clickedItem;
                    setTimeout(() => {
                        clickedItem.setBusy(false);
                    }, 5000);
                }
            }
            
    });
});
