var a1Answer;
var a2Answer;
var a3Answer;
var a4Answer;
var b1Answer;
var c1Answer;
var c2Answer;
var c3Answer;
var c4Answer;
var defineOptionsOrigin;
var result;
var resultB;
var resultC;


raptor.api.on("ready", function (event, frame) {
    frame.onload = function () {
        raptor.api.launch(frame.name);
        console.log("API ready");
    }
});


raptor.api.on("inboundReady", function (event, data) {
    console.log("inbound commands ready");
    console.log('Inbound Ready - start playing video');
    raptor.api.play();

        raptor.api.prefetchNodeByName("A-1");
        raptor.api.prefetchNodeByName("B-1");
        raptor.api.prefetchNodeByName("C-1");
});

//example of how to set video based on page button click
//var selectedRaptNode;

//$(".myButton").on('click', function () {
//    selectedRaptNode = "q1";
//    raptor.api.setNodeByName(selectedRaptNode)
//    raptor.api.play();

//    raptor.api.prefetchNodeByName("q2", "dynamicPlayerFrame")

//});
//raptor.api.on("inboundReady", function (event, data) {
//    console.log('Inbound Ready - start playing video');
//    raptor.api.play();
//});

raptor.api.on("userTimed", function (event, data) {
    switch (data.name) {
        case "start":
            console.log("Video start");
            break;
        case "A-5#1End":
            
            calculateResult();
            break;
        case "A-5#2End":

            calculateResult();
            break;
        case "A-5#3End":

            calculateResult();
            break;
        case "A-5#4End":

            calculateResult();
            break;
        case "B-6#1 (Sc B-7)End":
            calculateResultB();
            break;
        case "B-6#2 (Sc B-7)End":
            calculateResultB();
            break;
        case "B-6#3 (Sc B-7)End":
            calculateResultB();
            break;
        case "C-2#1 (Sc C-5)End":
            calculateResultC();
            break;
        case "C-2#2 (Sc C-5)End":
            calculateResultC();
            break;
        case "C-2#1 HelmetEnd":
            calculateResultC();
            break;
        case "C-2#2 HelmetEnd":
            calculateResultC();
            break;
    }
});

raptor.api.on("progress", function (event, data) {
    console.log("progress timed event happened: " + event.type);
    console.log("progress timed event happened: " + JSON.stringify(data));
});

raptor.api.on("clipStart", function (event, data) {
    console.log("clipStart event happened: " + event.type);
    console.log("clipstart event happened: " + JSON.stringify(data));

    prefetch(data);
});

function processJump(node) {
    raptor.api.setNodeByName(node)
    raptor.api.play();
    //prefetch(node);


};

function prefetch(data) {
    switch (data.clipname) {
        case 'A-1#1 (Sc A-2)':
            raptor.api.prefetchNodeByName("A-1#1 - A-2#1");
            raptor.api.prefetchNodeByName("A-1#1 - A-2#2");
            raptor.api.prefetchNodeByName("A-1#1 - A-2#3");
            raptor.api.prefetchNodeByName("A-1#2 - A-2#1");
            raptor.api.prefetchNodeByName("A-1#2 - A-2#2");
            raptor.api.prefetchNodeByName("A-1#2 - A-2#3");
            raptor.api.prefetchNodeByName("A-1#3 - A-2#1");
            raptor.api.prefetchNodeByName("A-1#3 - A-2#2");
            raptor.api.prefetchNodeByName("A-1#3 - A-2#3");
            break;
        case 'A-1#2 (Sc A-2)':
            raptor.api.prefetchNodeByName("A-1#1 - A-2#1");
            raptor.api.prefetchNodeByName("A-1#1 - A-2#2");
            raptor.api.prefetchNodeByName("A-1#1 - A-2#3");
            raptor.api.prefetchNodeByName("A-1#2 - A-2#1");
            raptor.api.prefetchNodeByName("A-1#2 - A-2#2");
            raptor.api.prefetchNodeByName("A-1#2 - A-2#3");
            raptor.api.prefetchNodeByName("A-1#3 - A-2#1");
            raptor.api.prefetchNodeByName("A-1#3 - A-2#2");
            raptor.api.prefetchNodeByName("A-1#3 - A-2#3");

            break;
        case 'A-1#3 (Sc A-2)':
            raptor.api.prefetchNodeByName("A-1#1 - A-2#1");
            raptor.api.prefetchNodeByName("A-1#1 - A-2#2");
            raptor.api.prefetchNodeByName("A-1#1 - A-2#3");
            raptor.api.prefetchNodeByName("A-1#2 - A-2#1");
            raptor.api.prefetchNodeByName("A-1#2 - A-2#2");
            raptor.api.prefetchNodeByName("A-1#2 - A-2#3");
            raptor.api.prefetchNodeByName("A-1#3 - A-2#1");
            raptor.api.prefetchNodeByName("A-1#3 - A-2#2");
            raptor.api.prefetchNodeByName("A-1#3 - A-2#3");

            break;
        case 'A-5#1End' || 'A-5#2End' || 'A-5#3End' || 'A-5#4End':
            raptor.api.prefetchNodeByName("A-6 Result");
            raptor.api.prefetchNodeByName("A-7 Result");
            raptor.api.prefetchNodeByName("A-8 Result");
            //raptor.api.prefetchNodeByName("A-9 Result");
            //raptor.api.prefetchNodeByName("A-10 Result");
            //raptor.api.prefetchNodeByName("A-11 Result");


            break;
        case 'C-3':
            raptor.api.prefetchNodeByName("C-2#1 - C-3#1");
            raptor.api.prefetchNodeByName("C-2#1 - C-3#2");
            raptor.api.prefetchNodeByName("C-2#2 - C-3#1");
            raptor.api.prefetchNodeByName("C-2#2 - C-3#2");


            break;

        case 'C-2#1 - C-3#1' || 'C-2#1 - C-3#2':
            raptor.api.prefetchNodeByName("C-2#1 (Sc C-5)");
            raptor.api.prefetchNodeByName("C-2#1 Helmet");

            break;
        case 'C-2#2 - C-3#1' || 'C-2#2 - C-3#2':
            raptor.api.prefetchNodeByName("C-2#2 (Sc C-5)");
            raptor.api.prefetchNodeByName("C-2#2 Helmet");

            break;




    }

}

raptor.api.on("button", function (event, data) {
    switch (data.action) {
        case "home":
            console.log("You clicked home");
            processJump("Short Intro");
            break;
        case "pdf":
            console.log("You clicked pdf");
            window.open('pdf/2017-supplemental-medical-plan.pdf', '_blank');
            break;
        case "criticalIllness":
            console.log("You clicked Critical Illness");
            a1Answer = undefined;
            a2Answer = undefined;
            a3Answer = undefined;
            a4Answer = undefined;
            processJump("A-1");
            break;
        case "hospitalIndemnity":
            console.log("You clicked Hospital Indemnity");
            b1Answer = undefined;
            processJump("B-1");
            break;
        case "accident":
            console.log("You clicked Accident");
            c1Answer = undefined;
            c2Answer = undefined;
            c3Answer = undefined;
            c4Answer = undefined;
            processJump("C-1");
            break;
        case "A-1#1 (Sc A-2)":
            console.log("You clicked A-1#1 (Sc A-2)");
            a1Answer = 'A-1#1 (Sc A-2)';
            //processJump("A-1#1 (Sc A-2)");
            break;
        case "A-1#2 (Sc A-2)":
            console.log("You clicked A-1#2 (Sc A-2)");
            a1Answer = 'A-1#2 (Sc A-2)';
            //processJump("A-1#2 (Sc A-2)");
            break;
        case "A-1#3 (Sc A-2)":
            console.log("You clicked A-1#3 (Sc A-2)");
            a1Answer = 'A-1#3 (Sc A-2)';
            //processJump("A-1#3 (Sc A-2)");
            break;
        case "A-2#1":
            console.log("You clicked A-2#1");
            a2Answer = 'A-2#1';
            switch (a1Answer) {
                case "A-1#1 (Sc A-2)":
                    console.log("You clicked both A-1#1 (Sc A-2) and A-2#1");
                    processJump("A-1#1 - A-2#1");
                    break;
                case "A-1#2 (Sc A-2)":
                    console.log("You clicked both A-1#2 (Sc A-2) and A-2#1");
                    processJump("A-1#2 - A-2#1");
                    break;
                case "A-1#3 (Sc A-2)":
                    console.log("You clicked both A-1#3 (Sc A-2) and A-2#1");
                    processJump("A-1#3 - A-2#1");
                    break;
            }
            break;
        case "A-2#2":
            console.log("A-2#2");
            a2Answer = 'A-2#2';
            switch (a1Answer) {
                case "A-1#1 (Sc A-2)":
                    console.log("You clicked both A-1#1 (Sc A-2) and A-2#2");
                    processJump("A-1#1 - A-2#2");
                    break;
                case "A-1#2 (Sc A-2)":
                    console.log("You clicked both A-1#2 (Sc A-2) and A-2#2");
                    processJump("A-1#2 - A-2#2");
                    break;
                case "A-1#3 (Sc A-2)":
                    console.log("You clicked both A-1#3 (Sc A-2) and A-2#2");
                    processJump("A-1#3 - A-2#2");
                    break;
            }
            break;
        case "A-2#3":
            console.log("You clicked A-2#3");
            a2Answer = 'A-2#2';
            switch (a1Answer) {
                case "A-1#1 (Sc A-2)":
                    console.log("You clicked both A-1#1 (Sc A-2) and A-2#3");
                    processJump("A-1#1 - A-2#3");
                    break;
                case "A-1#2 (Sc A-2)":
                    console.log("You clicked both A-1#2 (Sc A-2) and A-2#3");
                    processJump("A-1#2 - A-2#3");
                    break;
                case "A-1#3 (Sc A-2)":
                    console.log("You clicked both A-1#3 (Sc A-2) and A-2#3");
                    processJump("A-1#3 - A-2#3");
                    break;
            }
            break;

        case "A-3#1":
            console.log("You clicked A-3#1");
            a3Answer = 'A-3#1';
            //processJump("A-3#1");
            break;
        case "A-3#2":
            console.log("You clicked A-3#2");
            a3Answer = 'A-3#2';
            //processJump("A-3#2");
            break;
        case "A-3#3":
            console.log("You clicked A-3#3");
            a3Answer = 'A-3#3';
            //processJump("A-3#3");
            break;

        case "A-4#1":
            console.log("You clicked A-4#1");
            a4Answer = 'A-4#1';

            calculateResultPreload()

            break;
        case "A-4#2":
            console.log("You clicked A-4#2");
            a4Answer = 'A-4#2';
            calculateResultPreload()


            break;
        case "A-5#1":
            console.log("You clicked A-5#1");
            //processJump("A-5#1");
            break;
        case "A-5#2":
            console.log("You clicked A-5#2");
            //processJump("A-5#2");
            break;
        case "A-5#3":
            console.log("You clicked A-5#3");
            //processJump("A-5#3");
            break;
        case "A-5#4":
            console.log("You clicked A-5#4");
            //processJump("A-5#4");
            break;
        case "B-1":
            console.log("You clicked B-1");
            b1Answer = 'B-1';
            resultB = 'B-8 Result';
            raptor.api.prefetchNodeByName(resultB);
            break;
        case "B-2":
            console.log("You clicked B-2");
            b1Answer = 'B-2';
            resultB = 'B-9 Result';
            raptor.api.prefetchNodeByName(resultB);
            break;
        case "B-3":
            console.log("You clicked B-3");
            b1Answer = 'B-3';
            resultB = 'B-10 Result';
            raptor.api.prefetchNodeByName(resultB);
            break;
        case "C-1#1":
            console.log("You clicked C-1#1");
            c1Answer = "C-1#1";
            break;
        case "C-1#2":
            console.log("You clicked C-1#2");
            c1Answer = "C-1#2";
            break;
        case "C-1#3":
            console.log("You clicked C-1#3");
            c1Answer = "C-1#3";
            break;
        case "C-2#1":
            console.log("You clicked C-2#1");
            c2Answer = "C-2#1";
            break;
        case "C-2#2":
            console.log("You clicked C-2#2");
            c2Answer = "C-2#2";
            break;
        case "C-3#1":
            console.log("You clicked C-3#1");
            c3Answer = "C-3#1";
            if (c2Answer == 'C-2#1' && c3Answer == 'C-3#1') {
                processJump("C-2#1 - C-3#1");
            } else if (c2Answer == 'C-2#2' && c3Answer == 'C-3#1') {
                processJump("C-2#2 - C-3#1");
            }
            break;
        case "C-3#2":
            console.log("You clicked C-3#2");
            c3Answer = "C-3#2";
            if (c2Answer == 'C-2#1' && c3Answer == 'C-3#2') {
                processJump("C-2#1 - C-3#2");
            } else if (c2Answer == 'C-2#2' && c3Answer == 'C-3#2') {
                processJump("C-2#2 - C-3#2");
            }
            break;
        case "C-4#1":
            console.log("You clicked C-4#1");
            c4Answer = "C-4#1";
            calculateResultPreloadC();

            if (c2Answer == 'C-2#1' && c3Answer == 'C-3#1') {
                processJump("C-2#1 Helmet");
            } else if (c2Answer == 'C-2#1' && c3Answer == 'C-3#2') {
                processJump("C-2#1 (Sc C-5)");
            } else if (c2Answer == 'C-2#2' && c3Answer == 'C-3#1') {
                processJump("C-2#2 Helmet");
            } else if (c2Answer == 'C-2#2' && c3Answer == 'C-3#2') {
                processJump("C-2#2 (Sc C-5)");
            }


            break;
        case "C-4#2":
            console.log("You clicked C-4#2");
            c4Answer = "C-4#2";
            calculateResultPreloadC();

            if (c2Answer == 'C-2#1' && c3Answer == 'C-3#1') {
                processJump("C-2#1 Helmet");
            } else if (c2Answer == 'C-2#1' && c3Answer == 'C-3#2') {
                processJump("C-2#1 (Sc C-5)");
            } else if (c2Answer == 'C-2#2' && c3Answer == 'C-3#1') {
                processJump("C-2#2 Helmet");
            } else if (c2Answer == 'C-2#2' && c3Answer == 'C-3#2') {
                processJump("C-2#2 (Sc C-5)");
            }

            break;
        case "Define Options":
            console.log("You clicked Define Options");
            defineOptionsOrigin = data.clipname;
            processJump("Define Options");
            break;
        case "Define Options Back":
            console.log("You clicked Define Options Back");
            processJump(defineOptionsOrigin);
            defineOptionsOrigin = undefined;
            break;
    }
});


function calculateResultPreload() {
    if (a2Answer == 'A-2#1' && a3Answer == 'A-3#1' && a4Answer == 'A-4#2') {
        
        raptor.api.prefetchNodeByName('A-6 Result');
        result = 'A-6 Result';
        return;
    } else if ((a2Answer == 'A-2#1' || a2Answer == 'A-2#2' || a2Answer == 'A-2#3') && (a3Answer == 'A-3#2' || a3Answer == 'A-3#3') && a4Answer == 'A-4#2') {
        raptor.api.prefetchNodeByName('A-7 Result');
        result = 'A-7 Result';
        return;
    } else if ((a2Answer == 'A-2#1' || a2Answer == 'A-2#2' || a2Answer == 'A-2#3') && (a3Answer == 'A-3#2' || a3Answer == 'A-3#3') && a4Answer == 'A-4#1') {
        raptor.api.prefetchNodeByName('A-8 Result');
        result = 'A-8 Result';
        return;
    } else if ((a2Answer == 'A-2#2' || a2Answer == 'A-2#3') && a3Answer == 'A-3#1' && a4Answer == 'A-4#2') {
        raptor.api.prefetchNodeByName('A-9 Result');
        result = 'A-9 Result';
        return;
    } else if ((a2Answer == 'A-2#2' || a2Answer == 'A-2#3') && a3Answer == 'A-3#1' && a4Answer == 'A-4#1') {
        raptor.api.prefetchNodeByName('A-10 Result');
        result = 'A-10 Result';
        return;
    } else if (a2Answer == 'A-2#1' && a3Answer == 'A-3#1' && a4Answer == 'A-4#1') {
        raptor.api.prefetchNodeByName('A-11 Result');
        result = 'A-11 Result';
        return;
    }

}


//function calculateResultPreloadC() {
//    if ((c1Answer == 'C-1#1' || c1Answer == 'C-1#3') && c4Answer == 'C-4#1') {

//        raptor.api.prefetchNodeByName('C-6 Result');
//        resultC = 'C-6 Result';
//        return;
//    } else if (c1Answer == 'C-1#2' && c4Answer == 'C-4#1') {
//        raptor.api.prefetchNodeByName('C-8 Result');
//        resultC = 'C-8 Result';
//        return;
//    } else if ((c1Answer == 'C-1#1' || c1Answer == 'C-1#3') && c4Answer == 'C-4#2') {
//        raptor.api.prefetchNodeByName('C-7 Result');
//        resultC = 'C-7 Result';
//        return;
//    } else if (c1Answer == 'C-1#2' && c4Answer == 'C-4#2') {
//        raptor.api.prefetchNodeByName('C-9 Result');
//        resultC = 'C-9 Result';
//        return;
//    } 

//}
function calculateResultPreloadC() {
    if (c1Answer == 'C-1#1' && c3Answer == 'C-3#1' && c4Answer == 'C-4#1') {

        raptor.api.prefetchNodeByName('C-6 Result');
        resultC = 'C-6 Result';
        return;
    } else if (c1Answer == 'C-1#2' && (c3Answer == 'C-3#1' || c3Answer == 'C-3#2') && c4Answer == 'C-4#1') {
        raptor.api.prefetchNodeByName('C-8 Result');
        resultC = 'C-8 Result';
        return;
    } else if ((c1Answer == 'C-1#1' || c1Answer == 'C-1#3') && (c3Answer == 'C-3#1' || c3Answer == 'C-3#2') && c4Answer == 'C-4#2') {
        raptor.api.prefetchNodeByName('C-7 Result');
        resultC = 'C-7 Result';
        return;
    } else if (c1Answer == 'C-1#2' && (c3Answer == 'C-3#1' || c3Answer == 'C-3#2') && c4Answer == 'C-4#2') {
        raptor.api.prefetchNodeByName('C-9 Result');
        resultC = 'C-9 Result';
        return;
    } else if (((c1Answer == 'C-1#1' && c3Answer == 'C-3#2') || (c1Answer == 'C-1#3' && (c3Answer == 'C-3#1' || c3Answer == 'C-3#2'))) && c4Answer == 'C-4#1') {
        raptor.api.prefetchNodeByName('C-10 Result');
        resultC = 'C-10 Result';
        return;
    }

}

//C1Answer == 'C-1#1' && c3Answer == 'C-3#2'
//C1Answer == 'C-1#3' && (c3Answer == 'C-3#1' || c3Answer == 'C-3#2')
//C4Answer == 'C-4#1'
//(((C1Answer == 'C-1#1' && c3Answer == 'C-3#2') || (C1Answer == 'C-1#3' && (c3Answer == 'C-3#1' || c3Answer == 'C-3#2'))) && C4Answer == 'C-4#1')


function calculateResult() {
    if (a2Answer == 'A-2#1' && a3Answer == 'A-3#1' && a4Answer == 'A-4#2') {
        processJump(result);
        return;
    } else if ((a2Answer == 'A-2#1' || a2Answer == 'A-2#2' || a2Answer == 'A-2#3') && (a3Answer == 'A-3#2' || a3Answer == 'A-3#3') && a4Answer == 'A-4#2') {
        processJump(result);
        return;
    } else if ((a2Answer == 'A-2#1' || a2Answer == 'A-2#2' || a2Answer == 'A-2#3') && (a3Answer == 'A-3#2' || a3Answer == 'A-3#3') && a4Answer == 'A-4#1') {
        processJump(result);
        return;
    } else if ((a2Answer == 'A-2#2' || a2Answer == 'A-2#3') && a3Answer == 'A-3#1' && a4Answer == 'A-4#2') {
        processJump(result);
        return;
    } else if ((a2Answer == 'A-2#2' || a2Answer == 'A-2#3') && a3Answer == 'A-3#1' && a4Answer == 'A-4#1') {
        processJump(result);
        return;
    } else if (a2Answer == 'A-2#1' && a3Answer == 'A-3#1' && a4Answer == 'A-4#1') {
        processJump(result);
        return;
    }

}
function calculateResultB() {
    processJump(resultB);
    console.log('Jumped to result ' + resultB);
}

function calculateResultC() {
    processJump(resultC);
    console.log('Jumped to result ' + resultC);
}
