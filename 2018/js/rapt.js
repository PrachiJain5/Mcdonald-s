var default_inbound_frame = frames[0];

////////////////////////////////////////////////////////////////

var choice1 = "";
var choice2 = "";
var youChooseValue;



function outbound_callback(payload) {
    // any outbound events will fire this callback
    //console.log(JSON.stringify(payload));

    //added code
    if (payload.event === "flixmaster_attention" && payload.action.name) {
        // custom timed events are sent as attention events, but are different from the automatic attention events in that they have a name
        //console.log("1. custom timed event: " + payload.action.name);

        switch (payload.action.name) {
            case "scene_1":
                $(".header").html("Welcome");
                $("#overview").addClass("left_rail_selected");
                break;
            case "scene_2":
                $(".header").html("Welcome");
                break;
            case "scene_4":
                $(".header").html("You’re eligible for a new equity reward");
                $(".sub_header").html("<p>Equity rewards are reserved for management level associates as a way to recognize your leadership of strategic business priorities that drive our growth and long-term success.</p> <p>Equity rewards provide an opportunity for you to build long-term wealth based on the value of Premier stock.  It’s a new, and important, element of your total compensation at Premier, and aligns with the interests of our shareholders. </p><p>Choosing your equity reward is up to you. You can choose stock options or restricted stock. </p>");
                break;
            case "scene_5":
                $(".header").html("You choose: stock options or restricted stock ");
                $(".sub_header").html("<p>Stock options represent a right to buy shares in the future.</p><p> Restricted stock is company stock awarded to you. Shares are “restricted” because they have vesting requirements and can only be sold after they vest.</p><p> Both options differ in a couple of ways, including the potential value, how taxes are handled, and the inherent risk of either choice.</p> ");
                break;
            case "scene_6":
                $(".header").html("Your personal preferences");
                $(".sub_header").html("<p>Because equity rewards are a personal decision, it’s important to recognize your own confidence level and tolerance for risk.</p><p> Do you like taking chances or do you prefer to play it safe?</p>  ");
                break;
            case "scene_9":
                $(".header").html("Get help choosing");
                $(".sub_header").html("<p>There are tools and resources available to help you select the reward that fits your needs best. See the links across the bottom of the page to download a copy of the Decision Guide, use the Modeling Tool, and browse the FAQ.</p> <p>It’s also a good idea to consider your current financial situation and future goals, and to consult with your personal financial advisor before you make your choice.</p> ");
                $("#overview").removeClass("left_rail_selected").addClass("left_rail_complete");
                $("#value").addClass("left_rail_selected");
                break;
            case "scene_10":
                $(".header").html("How much you get ");
                $(".sub_header").html("<p>There are two factors that determine the number of stock options or restricted shares you receive.</p> <p>1.	The target value is based on your Annual Performance Review rating. </p><p>2.	The price, or cost, of Premier stock options and restricted stock on the grant date.</p><p>The cost of stock options is calculated using a number of complex variables. All companies who grant stock options must use standard methods to determine this cost.  </p><p>The cost of a share of restricted stock is based on the closing market price of Premier stock on the grant date. </p>");
                break;
            case "scene_11":
                $(".header").html("How much it’s worth ");
                $(".sub_header").html("<p>Stock options come with a potential upside, while restricted stock come with downside protection.</p><p>Figuring out how much stock options are worth is tricky because it’s based on future value. It’s the difference between the stock price on the grant date and when you decide to sell them in the future. You benefit when the company’s share price grows. </p><p>Restricted stock value is easier to determine because the numbers are available now. It’s the Premier share price on the grant date multiplied by the number of restricted shares you have. You won’t benefit as much if the share price grows, but if the share price goes down, they’re still worth something. </p><p>Do you prefer to push for more (stock options) or take it easy (restricted stock)? </p> ");
                break;
            case "scene_14":
                $(".header").html("Taxed as income ");
                $(".sub_header").html("Equity rewards are considered income, and therefore need to be taxed. You can decide when and how you’d like to pay your equity-related taxes, depending on which type of reward you choose.  ");
                $("#value").removeClass("left_rail_selected").addClass("left_rail_complete");
                $("#taxes").addClass("left_rail_selected");
                break;
            case "scene_15":
                $(".header").html("Tax considerations");
                $(".sub_header").html("<p>With stock options, taxes are deferred until you sell, at which point they will be withheld from your net proceeds. Taxes are based on the difference between the grant price and the sell price.</p><p>With restricted stock, taxes are based on the fair market value on the vesting date. Shares will be withheld to cover your tax liability. </p><p>Do you prefer to control the timing of taxes (stock options) or let someone else handle it for you (restricted stock)? </p>");

                break;
            case "scene_18":
                $(".header").html("Inherent risk ");
                $(".sub_header").html("<p>While there is an inherent amount of risk with either choice, one has more than the other. </p><p>With stock options, you only win if the company does well and the stock price goes up. </p><p>Restricted stock always has value because it’s based on the stock price today. </p>");
                $("#taxes").removeClass("left_rail_selected").addClass("left_rail_complete");
                $("#risk").addClass("left_rail_selected");
                break;
            case "scene_19":
                $(".header").html("Your risk tolerance");
                $(".sub_header").html("<p>You have to decide whether you’re willing to take on risk for a potentially higher value with stock options, or if you’re more comfortable with the guaranteed value of restricted stock. Do you prefer to take a chance (stock options) or play it safe (restricted stock)? </p><p>Do you prefer to take a chance (stock options) or play it safe (restricted stock)? </p>");
                break;
            case "scene_22":
                $(".header").html("");
                $(".sub_header").html("");
                $("#risk").removeClass("left_rail_selected").addClass("left_rail_complete");
                $("#choose").addClass("left_rail_selected");
                $(".table-container").show();
                break;

                //Button events



        }

    }
    if (payload.event === "flixmaster_attention" && !payload.action.name) {
        // default automatic attention events have no name
        //console.log("2. default attention event: " + payload.action.name);



        $("#resultText").html($("#first").val() + " " + $("#second").val());
    }
    if (payload.event === "player_action") {
        // default automatic attention events have no name
        if (payload.action.type == "pause") {
            //console.log("3. Player is paused.");


        } else {
            //console.log("4. Player is playing.");
        }
    }
    if (payload.event === "flixmaster_button_click") {
        // button click within the video
        ///console.log("5. You clicked " + payload.action);



        switch (payload.action) {

            case "pushForMore":
                $("#youChooseValue").html('Value: Push for more change <a onclick="swapChoiceValue(1)" href="javascript:void(0);">change</a>');
                $("#whatItMeansValue").html("You believe the Premier share price will grow and want to financially benefit from it, which is the premise of stock options");
                break;
            case "takeABreak":
                $("#youChooseValue").html('Value: Take it Easy <a onclick="swapChoiceValue(2)" href="javascript:void(0);">change</a>');
                $("#whatItMeansValue").html("You’re satisfied with the amount guaranteed through restricted stock");
                break;

            case "speedUp":
                $("#youChooseTaxes").html('Taxes: Speed Up <a onclick="swapChoiceTaxes(1)" href="javascript:void(0);">change</a>');
                $("#whatItMeansTaxes").html("You want the control of timing of your taxes, which you can do with stock options based on when you sell them ");
                break;
            case "slowToPace":
                $("#youChooseTaxes").html('Taxes: Slow to pace <a onclick="swapChoiceTaxes(2)" href="javascript:void(0);">change</a>');
                $("#whatItMeansTaxes").html("You’re comfortable with Premier handling your taxes for you by withholding shares to cover your tax liability when your restricted stock vest ");
                break;

            case "takeAChance":
                $("#youChooseRisk").html('Risk: Take a Chance <a onclick="swapChoiceRisk(1)" href="javascript:void(0);">change</a>');
                $("#whatItMeansRisk").html("You’re willing to take on more risk for a larger potential gain in the future, which is how stock options work ");
                break;
            case "playItSafe":
                $("#youChooseRisk").html('Risk: Play it Safe <a onclick="swapChoiceRisk(2)" href="javascript:void(0);">change</a>');
                $("#whatItMeansRisk").html("You’re not willing to take on more risk in pursuit of a higher reward, which is consistent with how restricted stock works");
                break;
        }

        //end added code
    }






}

function swapChoiceValue(value) {
    if (value == 1) {
        $("#youChooseValue").html('Value: Take it Easy <a onclick="swapChoiceValue(2)" href="javascript:void(0);">change</a>');
        $("#whatItMeansValue").html("You’re satisfied with the amount guaranteed through restricted stock");

    } else {
        $("#youChooseValue").html('Value: Push for more change <a onclick="swapChoiceValue(1)" href="javascript:void(0);">change</a>');
        $("#whatItMeansValue").html("You believe the Premier share price will grow and want to financially benefit from it, which is the premise of stock options");

    }
}

function swapChoiceTaxes(value) {
    if (value == 1) {
        $("#youChooseTaxes").html('Taxes: Slow to pace <a onclick="swapChoiceTaxes(2)" href="javascript:void(0);">change</a>');
        $("#whatItMeansTaxes").html("You’re comfortable with Premier handling your taxes for you by withholding shares to cover your tax liability when your restricted stock vest ");

    } else {
        $("#youChooseTaxes").html('Taxes: Speed Up <a onclick="swapChoiceTaxes(1)" href="javascript:void(0);">change</a>');
        $("#whatItMeansTaxes").html("You want the control of timing of your taxes, which you can do with stock options based on when you sell them ");

    }
}

function swapChoiceRisk(value) {
    if (value == 1) {
        $("#youChooseRisk").html('Risk: Play it Safe <a onclick="swapChoiceRisk(2)" href="javascript:void(0);">change</a>');
        $("#whatItMeansRisk").html("You’re not willing to take on more risk in pursuit of a higher reward, which is consistent with how restricted stock works");

    } else {
        $("#youChooseRisk").html('Risk: Take a Chance <a onclick="swapChoiceRisk(1)" href="javascript:void(0);">change</a>');
        $("#whatItMeansRisk").html("You’re willing to take on more risk for a larger potential gain in the future, which is how stock options work ");

    }
}

////////////////////////////////////////////////////////////////

function inbound_api_ready_callback(payload) {
    // when the inbound API is ready, it will fire this callback
    //console.log(JSON.stringify(payload));


    //nodes by name
    var nodes;
    window.flixmaster.nodesByName = {};
    nodes = window.flixmaster.api.nodes;
    for (i = 0; i < nodes.length; i++) {
        window.flixmaster.nodesByName[nodes[i].name] = nodes[i].id;
    }
    //end nodes by name
    var text = "";
    for (i = 0; i < flixmaster.api.nodes.length; i++) {
        text += flixmaster.api.nodes[i].id + " " + flixmaster.api.nodes[i].name + " " + flixmaster.api.nodes[i].start + "<br>";
    }
    //$("#videoArray").html(text);
    //alert(text);

}

////////////////////////////////////////////////////////////////	

flixmaster_init({
    outbound_callback: outbound_callback,
    inbound_api_ready_callback: inbound_api_ready_callback,
    default_inbound_frame: default_inbound_frame




});

////////////////////////////////////////////////////////////////