/* jshint -W044 */
/* jshint -W099 */
/*
 Secondary JS file. Eveything which doesn't need to load on the signed out homepage should be in here.
 This file is post loaded on signed out homepage along with split-other
 */
/*


 /*
 TRAVEL ALERTS - RESULTS TABLE ROLLOVER
 Used on 7.0 template to highlight rows
 */

tocHandoff = null;
NRE = window.NRE || {};


FC.resultsTable = function (sel) {
    var tr = $(sel).find("tr");
    tr.bind("mouseover", function () {
        $(this).addClass("selected");
    });
    tr.bind("mouseout", function () {
        var checkbox = $(this).find(".alert input[type=checkbox]");
        if (checkbox.attr("checked") !== true) {
            $(this).removeClass("selected");
        }
    });
};
/* loads vendor page on another page and loads the post-handoff page 
 after checkout button is clicked on the basket page - NREOJPTEST-4575 */
FC.shoppingBasketHandOff = function () {

    var vendorNameDropDown = document.getElementById("provider");
    var selectedIndex = vendorNameDropDown.selectedIndex;
    var selectedVendorName = vendorNameDropDown.options[selectedIndex].value;
    if (selectedVendorName !== null && selectedVendorName !== "" && selectedVendorName !== "null") {
        window.location = fcPth.basketHandoff;
    }

};

FC.journeyChooser = (function (FC, $) {
    var process = {
        dropDown: $("#journey-chooser"),
        journeys: $(".journey-grid"),
        firstJourney: $(".journey0"),
        init: function () {
            var that = FC.journeyChooser;
            that.hideOthers(that.firstJourney);
            that.dropDown.on("change", $.proxy(that.onChange, that));
        },
        onChange: function () {
            var that = this;
            that.hideOthers($(".journey" + that.dropDown.val()));
        },
        hideOthers: function (toShow) {
            var that = FC.journeyChooser;
            that.journeys.not(toShow).hide();
            toShow.show();
        }
    };
    return process;
})(FC, $);

/*
 AB 11/08/2010 rewrite of accordianTable

 These are the accordions on the RHS of the HP and used across the site.

 CSS for this area can be optimised.

 */
FC.accordianTable = function ($parent) {
    /* start variable initialisation */
    var __$ = $;
    var __doc = document;
    var __isOldSafari = FC.vars.slowSafari;
    var __rEExpanded = /expanded/;
    var __$tgts = $parent.find('tr.accordian-header');
    var __tgt = "";
    var __$tgt = "";
    var __j = __$tgts.length;
    var __$arrowContainer = "";
    var __$tdA = "";
    var __$content = "";
    var __dF = __doc.createDocumentFragment();
    var __a = __doc.createElement("A");
    var __img = __doc.createElement("IMG");
    var __isExpanded;
    var __title = "";
    var __$anchor = "";

    /* end variable initialisation */

    /* start event handlers */
    var __onFocusHandler = function (e) {

        var __rEHlt = /hlt/;
        if (!__rEHlt.test(this.className)) {
            this.className += ' hlt';
        }
    };

    var __onBlurHandler = function (e) {
        this.className = this.className.replace(/ hlt/g, "");
    };

    var __onClickHandler = function (e) {
        // console.log('clicked');
        var __data = "";
        var __$this = "";
        var __rEExpanded = "";

        if (e.keyCode && e.keyCode !== 13) {
            return;
        }

        __$this = __$(this);
        __data = $.data(this, "vars");
        __rEExpanded = /expanded/;

        if (__rEExpanded.test(this.className)) {
            __data.img.alt = 'expand ' + __data.title + ' panel';
            //older versions of safari can't cope with sliding this element
            if (__isOldSafari || FC.hasLteIE8) {
                __data.$content.hide().removeClass('expanded-content');
            } else {
                __data.$content.slideUp(300).removeClass('expanded-content');
            }

            this.className = this.className.replace(/ expanded/g, "");
        } else {
            __data.img.alt = 'collapse ' + __data.title + ' panel';

            if (__isOldSafari || FC.hasLteIE8) {
                __data.$content.show().addClass('expanded-content');
            }
            else {
                __data.$content.slideDown(500).addClass('expanded-content');
            }

            this.className += ' expanded';
        }

        return false;
    };



    /* end event handlers */

    /* start node population */
    __img.width = "26";
    __img.height = "26";
    __img.src = fcPth.clrImg;
    __img.className = "sprite-main";
    __a.appendChild(__img);
    __a.href = "#";
    __dF.appendChild(__a);
    /* end node population */

    /* start process content */
    while (__j--) {
        __tgt = __$tgts[__j];
        __$tgt = __$(__tgt);

        __$arrowContainer = __$tgt.find('td.last');
        __$content = __$tgt.next('tr.acc-c').find('.exp-c');

        __title = __$tgt.find('td.first').text();

        __img.alt = (__rEExpanded.test(__tgt.className)) ? "collapse " + __title + " panel" : __img.alt = "expand " + __title + " panel";

        __$arrowContainer[0].innerHTML = "";
        __$arrowContainer[0].appendChild(__dF.cloneNode(true));

        __$anchor = __$arrowContainer.find('a');

        //(function () {
        __$tgt
            .bind('mouseover focusin', __onFocusHandler)
            .bind('mouseout focusout', __onBlurHandler)
            .bind('click', __onClickHandler)
            .bind('keypress', __onClickHandler);
        //})();

        $.data(__tgt, "vars", {
            title: __title,
            $arrowContainer: __$arrowContainer,
            img: __$anchor.find('img')[0],
            $content: __$content
        });
    }
    /* end process content */

    /* start clean-up */
    while (__dF.firstChild) {
        __dF.firstChild.innerHTML = "";
        __dF.removeChild(__dF.firstChild);
    }
    /* end clean-up */
};

/*
 KB function
 Used for generic content
 Needless support for Safari 2
 Selector: div.show-more
 Templates: NRE-6.2-Generic-content-B.shtml (4 hits)
 */
FC.showMore = function (sel) {
    $(sel).each(function () {
        var $this = $(this);
        $this.before('<a href="#" class="show-more-link">Find out more about topic</a>');
        function showMoreClick(__clicked) {
            var safriCheck = FC.vars.slowSafari;
            if ($(__clicked).next().hasClass('show-more-expanded')) {
                $(__clicked).removeClass('show-more-link-expanded');
                //older versions of safari can't cope with sliding this element
                if (safriCheck) {
                    $(__clicked).next().removeClass('show-more-expanded').hide();
                } else {
                    $(__clicked).next().removeClass('show-more-expanded').slideUp(200);
                }
            }
            else {
                $(__clicked).addClass('show-more-link-expanded');
                //older versions of safari can't cope with sliding this element
                if (safriCheck) {
                    $(__clicked).next().addClass('show-more-expanded').show();
                } else {
                    $(__clicked).next().addClass('show-more-expanded').slideDown(400);
                }
            }
        }
        $this.prev().bind('click', function (e) {
            showMoreClick(this);
            return false;
        }).bind('keypress', function (e) {
            if (e.keyCode === 13) {
                showMoreClick(this);
                return false;
            }
        });
    });
};
/*
 Some interactivity with the 1.1.4 template

 Some redundancy here

 */

FC.chooseTOC = function () {

    //This ID is not present so the following code is useless
    if ($('#operatorLogo').children().size() > 0) {

        $('div.ticket-provider').hide();
        $('div.ticket-provider-btn').hide();
        $('p.change-provider').append('<a href="#" class="arrowlink-dark">Buy from another ticket provider</a>');

    } else {
        $('p.change-provider').hide();
        $('div.ticket-provider').show();
    }

    //This selector is also not present
    $('p.change-provider a').bind('click', function () {
        $('p.change-provider').hide();
        $('div.ticket-provider').show();
        return false;
    });
    //Changes the TOC image
    //The selector is found in includes\jp-purchase-2.html
    $('select.sltProvider').change(function () {
        if ($(this).val() !== 'null') {
            var toc = ($(this).val()).split(' ').join('');
            if ($(this).parents(".basket").length === 0) {
                if ($(this).siblings('div.operator-price').length === 0) {
                    $(this).parent().siblings('div.operator-price').find('img').attr('src', fcPth.tocImgDir + '/logo-toc-' + toc.toLowerCase() + '.gif').attr('alt', toc);
                } else {
                    $(this).siblings('div.operator-price').find('img').attr('src', fcPth.tocImgDir + '/logo-toc-' + toc.toLowerCase() + '.gif').attr('alt', toc);
                }
            } else {
                $(this).parents('div.ticketProvider').find('img').attr('src', fcPth.tocImgDir + '/logo-toc-' + toc.toLowerCase() + '.gif').attr('alt', toc);
            }
            //var tocName = 'from ' + ($('select.sltProvider :selected').text());
            // if tocname is too long to fit into the button properly - truncate it and end with ellipses
            //if (tocName.length > 24) {
            //var myArray = tocName.split("");
            //var shortTocName = "";
            //for (i = 0; i < 22; i++) {
            //shortTocName = shortTocName + myArray[i];
            //}
            //shortTocName = shortTocName + "...";
            //tocName = shortTocName;
            //}

            //$('div.btnBuyNow strong').text(tocName);

        }
    });
};

/**
 * Function gets JSON data containing TOCs and populates
 * the <select> for providers.
 *
 * If the data specifies a preferred provider, the value
 * of the <select> is set accordingly and its 'change' event
 * triggered in order to update the corresponding logo.
 */

FC.ctfModule = (function (FC, $) {


    var process = {
        /**
         * Arrays for populating provider <select>
         * inbound/outbound needed to compare single ticket values
         */
        tocs: [],
        inbound: [],
        outbound: [],
        thirdParties: [],
        tpInbound: [],
        tpOutbound: [],
        /**
         * Data source for JSON response - used in process.getData()
         */
        //Dummy Data
        dataSourceS: fcPth.pvsUrl,
        dataSourceR: fcPth.pvrUrl,
        //From Thales
        //dataSource: 'http://ojp.nationalrail.co.uk/service/timesandfares/ajaxValidVendors?',

        /**
         * Get associated elements
         * Set the fare type (single + return or single + single)
         * Populate the providers <select> if a return journey
         * Bind click event to radio button labels
         */
        initialise: function (provider) {
            var that = this;

            this.$results = $(document.getElementById('ctf-results'));
            this.$outbound = $(document.getElementById('inboundFaresTable'));
            this.$inbound = this.$results.find('table:eq(0)');
            this.$trigger = this.$results.find('td.fare label');
            this.$providers = provider;

            this.getFareType();

            if (this.fareType === 'return') {
                this.processFare(null, this);
            }


        },
        doClick: function (e) {
            var that = this;
            that.getFareType();
            //alert(e.target.nodeName)
            if (e.target.nodeName.toLowerCase() === 'input') {
                //this.$providers = $(e.target.parentNode).parent().parent().parent().next("tr.faredets").find("div.f-" + FC.fareSwitcher.cTab + " select")
                that.processFare(e.target.parentNode, that);
                //console.log(e.target.parentNode.parentNode);

            } else {
                //this.$providers = $(e.target).parent().parent().parent().next("tr.faredets").find("div.f-" + FC.fareSwitcher.cTab + " select")
                that.processFare(e.target, that);

            }
        },
        /**
         * Determine whether the user is selecting a single + return journey
         * or two separate single tickets. This affects how we construct the
         * list of providers.
         */
        getFareType: function () {
            if (this.$results[0].className.match('single')) {
                if (this.$results.find('#ift').length > 0) {
                    this.fareType = "return";
                    this.tab = "sar";
                } else {
                    this.fareType = 'single';
                    this.tab = null;
                }
            } else {
                this.fareType = 'return';
                this.tab = "return";
            }
        },
        /**
         * Function acts as an initialise function and click event callback.
         * Gets either the event target's values or the last selected item's values.
         */
        processFare: function (target, that) {
            var $this = (target !== null) ? $(target) : that.$results.find('input:checked').filter(':last').parent(),
                params, query, whichJourn, paramsI, paramsO;

            if (that.fareType === 'single') {
                params = $this.siblings('.fare-breakdown').find('input:eq(0)').val().split('|');
                query = 'journeyId=' + params[13] + '&fareId=' + params[12] + "&cff=true";
            }
            else if (that.fareType === 'return') {
                whichJourn = $this.children('input').attr("name");
                //console.log($this.siblings('.fare-breakdown'));
                //console.log("which journey: " + whichJourn);
                if (whichJourn === fcPth.outFName || whichJourn === fcPth.outFName + "S") {
                    //console.log("outward");
                    paramsO = $this.siblings('.fare-breakdown').find('input').val().split('|');
                    if ($('#ift input:checked').length > 0) {
                        paramsI = $('#ift input:checked').parent().siblings('.fare-breakdown').find('input').val().split('|');
                    } else {
                        paramsI = [];
                    }

                } else {
                    //console.log("inward");
                    if ($('#oft input:checked').length > 0) {
                        paramsO = $('#oft input:checked').parent().siblings('.fare-breakdown').find('input').val().split('|');
                    } else {
                        paramsO = [];
                    }
                    paramsI = $this.siblings('.fare-breakdown').find('input').val().split('|');
                }
                if (paramsO.length > 0 && paramsI.length > 0) {
                    //console.log(paramsO[0] + " : " + paramsI[0]);
                    if (paramsO[0] !== paramsI[0]) {
                        if ((paramsO[0].match(/returnFare/gi) && paramsI[0].match(/singleFare/gi)) || (paramsI[0].match(/returnFare/gi) && paramsO[0].match(/singleFare/gi))) {
                            query = null;
                            this.unselectPreviousTab(whichJourn);
                        } else {
                            //console.log("should fire ajax now");
                            query = 'journeyId=' + paramsO[13] + '&fareId=' + paramsO[12] + "&rJourneyId=" + paramsI[13] + "&rFareId=" + paramsI[12] + "&cff=true";
                        }
                    } else {
                        //console.log("should fire ajax now");
                        query = 'journeyId=' + paramsO[13] + '&fareId=' + paramsO[12] + "&rJourneyId=" + paramsI[13] + "&rFareId=" + paramsI[12] + "&cff=true";
                    }

                } else {
                    //console.log("params where null")
                    query = null;
                }
            }

            if (query !== null) {
                that.journey = ($this.closest('#ift').length) ? 'inbound' : 'outbound';

                that.getData(query);
            }
        },
        unselectPreviousTab: function (whichSet) {
            //console.log("selections across tabs");
            if (this.tab === "return" && this.ticketType === "return") {
                if (whichSet === fcPth.outFName || whichSet === fcPth.outFName + "S") {
                    $("#ift").find("input[type=radio]:checked").prop("checked", false);

                } else {
                    $("#oft").find("input[type=radio]:checked").prop("checked", false);
                }
                //console.log("return tab");
            } else if (this.tab === "sar" && this.ticketType === "return") {
                //console.log("sar tab");
                if (whichSet === fcPth.outFName || whichSet === fcPth.outFName + "S") {
                    $("#ift").find("input[type=radio]:checked").prop("checked", false);

                } else {
                    $("#oft").find("input[type=radio]:checked").prop("checked", false);
                }
            }
        },
        /**
         * Function gets the query values from the other selected ticket.
         * Used when the user wants two single tickets.
         */
        getTicketValue: function ($elem, journey) {
            var $target = $elem.find('input:checked').filter(':eq(0)').parent('label'),
                params = $target.siblings('.fare-breakdown').find('input:eq(0)').val().split('|'),
                query = 'journeyId=' + params[13] + '&fareId=' + params[12] + "&cff=true";


            this.journey = journey;

            this.getData(query);
        },
        /**
         * Simple ajax request to the web service.
         * Data is passed to this.processData success callback.
         */
        getData: function (query) {
            var that = this;
            that.query = this.dataSourceS + query;
            //console.log("AJAX fired: " + this.dataSourceS + query);
            if (that.fareType === "single") {
                $.ajax({
                    url: this.dataSourceS + query,
                    dataType: 'json',
                    success: $.proxy(this.processData, this)
                });
            }
            else if (that.fareType === "return") {
                $.ajax({
                    url: this.dataSourceR + query,
                    dataType: 'json',
                    success: $.proxy(this.processData, this)
                });
            }
        },
        /**
         * Handle data response from the web service
         * Creates arrays depending on which type of ticket the user has
         * selected.
         */
        processData: function (data) {
            //console.log(data)
            var tocs = data.TOCs, prefIndex, prefName, prefTPIndex, prefTPName, thirdParties = [], tocArray = [], tpArray = [];

            if (tocs.length) {
                if (data.thirdPartyTOCs !== 'undefined') {


                    /*for(var i = 0, len = data.thirdPartyTOCs.length, t; i < len; i++){
                     thirdParties.push({name:"thirdParty",toc:[i]});
                     }*/
                    /**
                     * New requirement - 3rd party TOCs need to be visually
                     * separated within the dropdown. Combining the data here
                     * needs to change to account for this.
                     */
                    //tocs.push.apply(tocs,thirdParties);
                    thirdParties = data.thirdPartyTOCs;
                }
            }
            var i = 0;
            var t = "";
            var len = 0;
            for (i = 0, len = tocs.length, t; i < len; i++) {
                t = tocs[i];

                if (t.pref === '1') {
                    prefIndex = i;
                    prefName = t.name;
                }
                tocArray.push(t.name);
            }

            for (i = 0, len = thirdParties.length, t; i < len; i++) {
                t = thirdParties[i];
                tpArray.push(t.name);

                if (t.pref === '1') {
                    prefTPIndex = i;
                    prefTPName = t.name;
                }
            }

            //if (this.fareType === 'single') {
            //  if (this.journey === 'inbound') {
            //      this.inbound.length = 0;
            //      this.inbound = tocArray;
            //      this.tpInbound.length = 0;
            //      this.tpInbound = tpArray;
            //  } else {
            //      this.outbound.length = 0;
            //      this.outbound = tocArray;
            //      this.tpOutbound.length = 0;
            //      this.tpOutbound = tpArray;
            //  }
            //  this.createJourneys(prefIndex, prefName, prefTPIndex, prefTPName);
            //} else {
            this.tocs.length = 0;
            this.tocs = tocArray;
            this.thirdParties.length = 0;
            this.thirdParties = tpArray;
            this.populateSelect(prefIndex, prefTPIndex);
            //}
        },
        /**
         * Populate the provider <select> with the values
         * from this.tocs array
         */
        populateSelect: function (prefIndex, prefTPIndex) {

            var options = this.tocs.slice(0);
            var tpOptions = this.thirdParties.slice(0);

            options.sort();
            tpOptions.sort();



            this.$providers.empty();
            //jQuery.fragments = {};

            for (var i = 0, len = options.length, o; i < len; i++) {
                o = options[i];

                if (i === 0) {
                    this.$providers.append('<option value="null">Select train operator</option>');
                    this.$providers.append('<option value="' + o + '">' + o + '</option>');
                } else {
                    this.$providers.append('<option value="' + o + '">' + o + '</option>');
                }
            }

            if (tpOptions.length > 0) {
                this.$providers.append('<optgroup label="- - - - - - - - - - - - - -"> </optgroup>');
                this.$providers.append('<optgroup class="thirdParties" label="3rd Party Retailer"></optgroup>');
                var $tpProviders = this.$providers.find('.thirdParties');
                for (i = 0, len = tpOptions.length; i < len; i++) {
                    o = tpOptions[i];
                    this.$providers.append('<option value="' + o + '">' + o + '</option>');
                }
            }

            if (prefTPIndex || prefTPIndex === 0) {
                this.$providers.val(this.thirdParties[prefTPIndex]).change();
            }
            else if (prefIndex || prefIndex === 0) {
                this.$providers.val(this.tocs[prefIndex]).change();
            }

            else {
                this.$providers.val("null");
            }
        }
    };
    return process;
}(FC, $));

FC.ctfUpdateProviders = function ($elem) {

    /**
     * Initialise the module
     */
    //alert("hit this funtion")
    FC.ctfModule.initialise($('select.sltProvider'));
};
NRE.prefVendor = (function (FC, $, NRE) {
    var process = {
        addVendor: function (value) {
            var mainProvider = $('#provider');

            if (mainProvider.find('option[value="yourValue"]').length === 0) {
                mainProvider.append($("<option></option>").attr("value", value).text(value));
            }
        }
    };
    return process;
})(FC, $, NRE);

FC.prefVendorAjax = function (radio, provider) {
    var tocs = [],
        inbound = [],
        outbound = [],
        thirdParties = [],
        tpInbound = [],
        tpOutbound = [],
        //Dummy Data
        dataSourceS = fcPth.pvsUrl,
        dataSourceR = fcPth.pvrUrl;
    //From Thales
    //dataSource: 'http://ojp.nationalrail.co.uk/service/timesandfares/ajaxValidVendors?',


    function doClick(radio) {
        var item = {};
        var isReturn = "";
        item.$results = $(document.getElementById('ctf-results'));
        item.$outbound = $(document.getElementById('inboundFaresTable'));
        item.$inbound = item.$results.find('table:eq(0)');

        //item.$providers = provider;
        getFareType(item);

        //alert(radio.target.nodeName);
        if (radio.target.nodeName.toLowerCase() === 'input') {
            isReturn = $(radio.target.parentNode).parent().hasClass("return");

            if (isReturn) {
                item.$providers = $(radio.target.parentNode).parent().parent().parent().next("tr.faredets").find("div.f-return select");
            } else {
                item.$providers = $(radio.target.parentNode).parent().parent().parent().next("tr.faredets").find("div.f-single select");
            }
            if (provider !== null) {
                item.mainProvider = provider;
            } else {
                item.mainProvider = null;
            }
            item.radio = $(radio.target);
            processFare(radio.target.parentNode, item);

        } else {
            isReturn = $(radio.target).parent().hasClass("return");

            if (isReturn) {
                item.$providers = $(radio.target).parent().parent().parent().next("tr.faredets").find("div.f-return select");
            } else {
                item.$providers = $(radio.target).parent().parent().parent().next("tr.faredets").find("div.f-single select");
            }
            if (provider !== null) {
                item.mainProvider = provider;
            } else {
                item.mainProvider = null;
            }
            item.radio = $(radio.target).children("input");
            processFare(radio.target, item);

        }
    }

    function getFareType(item) {
        if (item.$results[0].className.match('single')) {
            if (item.$results.find('#ift').length > 0) {
                item.fareType = "return";
                item.tab = "sar";
            } else {
                item.fareType = 'single';
                item.tab = null;
            }
        } else {
            item.fareType = 'return';
            item.tab = "return";
        }
    }

    function processFare(target, item) {
        var $this = (target !== null) ? $(target) : item.$results.find('input:checked').filter(':last').parent(),
            params, query, whichJourn, paramsI, paramsO;
        var eleType = $this[0].nodeName.toLowerCase();
        var ticketType = 'single';

        if (item.fareType === 'single') {
            //if (NRE.basket.isSingleBasketAdd) {
            //    if (eleType === 'span') {
            //        params = $this.parent().parent().find('.fare-breakdown').find('input:eq(0)').val().split('|');
            //    } else {
            //        params = $this.parent().find('.fare-breakdown').find('input:eq(0)').val().split('|');
            //    }

            //} else {
            //params = $this.siblings('.fare-breakdown').find('input:eq(0)').val().split('|');
            params = NRE.fares.findJSON($this, 'fare', false);
            //}

            query = 'journeyId=' + params[0].journeyId + '&fareId=' + params[0].fareId + '&responseId=' + params[0].responseId;
        } else if (item.fareType === 'return') {
            whichJourn = $this.children('input').attr("name");
            if (whichJourn === fcPth.outFName || whichJourn === fcPth.outFName + "S") {
                //paramsO = $this.siblings('.fare-breakdown').find('input').val().split('|');
                paramsO = NRE.fares.findJSON($this, 'fare', false);
                if ($('#ift input:checked').length > 0) {
                    //paramsI = $('#ift input:checked').parent().siblings('.fare-breakdown').find('input').val().split('|');
                    paramsI = NRE.fares.findJSON($('#ift input:checked').parent(), 'fare', false);
                } else {
                    paramsI = [];
                }

            } else {
                if ($('#oft input:checked').length > 0) {
                    //paramsO = $('#oft input:checked').parent().siblings('.fare-breakdown').find('input').val().split('|');
                    paramsO = NRE.fares.findJSON($('#oft input:checked').parent(), 'fare', false);
                } else {
                    paramsO = [];
                }
                //paramsI = $this.siblings('.fare-breakdown').find('input').val().split('|');
                paramsI = NRE.fares.findJSON($this, 'fare', false);
            }

            if (paramsO.length > 0 && paramsI.length > 0) {
                if (paramsO[0] !== paramsI[0]) {
                    if ((paramsO[0].breakdownType.match(/returnFare/gi) && paramsI[0].breakdownType.match(/singleFare/gi)) || (paramsI[0].breakdownType.match(/returnFare/gi) && paramsO[0].breakdownType.match(/singleFare/gi))) {
                        query = null;
                        unselectPreviousTab(whichJourn, item);
                    } else {
                        query = 'journeyId=' + paramsO[0].journeyId + '&fareId=' + paramsO[0].fareId + "&rJourneyId=" + paramsI[0].journeyId + "&rFareId=" + paramsI[0].fareId + '&responseId=' + paramsO[0].responseId + '&rResponseId=' + paramsI[0].responseId;
                    }
                } else {
                    query = 'journeyId=' + paramsO[0].journeyId + '&fareId=' + paramsO[0].fareId + "&rJourneyId=" + paramsI[0].journeyId + "&rFareId=" + paramsI[0].fareId + '&responseId=' + paramsO[0].responseId + '&rResponseId=' + paramsI[0].responseId;
                }

            } else {
                query = null;
            }
        }

        if (query !== null) {
            item.journey = ($this.closest('#ift').length) ? 'inbound' : 'outbound';

            getData(query, item);
        }
    }

    function unselectPreviousTab(whichSet, item) {
        if (item.tab === "return" && item.ticketType === "return") {
            if (whichSet === fcPth.outFName) {
                $("#ift").find("input[type=radio]:checked").prop("checked", false);

            } else {
                $("#oft").find("input[type=radio]:checked").prop("checked", false);
            }
        } else if (item.tab === "sar" && item.ticketType === "return") {
            if (whichSet === fcPth.outFName) {
                $("#ift").find("input[type=radio]:checked").prop("checked", false);

            } else {
                $("#oft").find("input[type=radio]:checked").prop("checked", false);
            }
        }
    }

    function getData(query, item) {
        if (item.fareType === "single") {
            item.query = dataSourceS + query;
            $.ajax({
                url: dataSourceS + query,
                dataType: 'json',
                //success: $.proxy(that.processData, that)
                success: function (data) {
                    populateSelect(data, item);
                }
            });
        }
        else if (item.fareType === "return") {
            item.query = dataSourceR + query;
            $.ajax({
                url: dataSourceR + query,
                dataType: 'json',
                //success: $.proxy(that.processData, that)
                success: function (data) {
                    populateSelect(data, item);
                }
            });
        }
    }

    function processData(data, item) {
        //console.log(data)
        //var that = this;
        var tocs = data.TOCs, prefIndex, prefName, prefTPIndex, prefTPName, thirdParties = [], tocArray = [], tpArray = [];

        thirdParties = data.thirdPartyTOCs !== "undefined" ? data.thirdPartyTOCs : [];

        var i = 0;
        var len = 0;
        var t = "";
        for (i = 0, len = tocs.length, t; i < len; i++) {
            if (tocs[i].pref === '1') {
                prefIndex = i;
                prefName = tocs[i].name;
                break;
            }

        }

        for (i = 0, len = thirdParties.length, t; i < len; i++) {
            if (thirdParties[i].pref === '1') {
                prefTPIndex = i;
                prefTPName = thirdParties[i].name;
                break;
            }

        }

        item.tocs = tocs;
        item.thirdParties = thirdParties;
        populateSelect(prefIndex, prefTPIndex, item);

    }

    function buildProviders(item, options, tpOptions, prefTPIndex, prefIndex, theProvider) {
        theProvider.empty();

        //theProvider.unbind("change");
        FC.CtfChooseTOC(true);

        var provString = [];
        var o = "";
        var i = 0;
        var len = 0;
        var $tpProviders = null;
        //theProvider.after("<p class='lalalal'>" + item.query + "</p>")

        for (i = 0, len = options.length, o; i < len; i++) {
            o = options[i];

            if (i === 0) {
                provString.push('<option value="null">Select train operator</option>');
                provString.push('<option value="' + o + '">' + o + '</option>');
            } else {
                provString.push('<option value="' + o + '">' + o + '</option>');
            }
            o = null;
        }

        if (tpOptions.length > 0) {
            provString.push('<optgroup label="- - - - - - - - - - - - - -"> </optgroup>');
            provString.push('<optgroup class="thirdParties" label="3rd Party Retailer"></optgroup>');
            $tpProviders = item.$providers.find('.thirdParties');
            for (i = 0, len = tpOptions.length; i < len; i++) {
                o = tpOptions[i];
                provString.push('<option value="' + o + '">' + o + '</option>');
            }
        }

        theProvider.html(provString.join(""));
        provString = null;

        if (prefTPIndex || prefTPIndex === 0) {
            theProvider.val(item.thirdParties[prefTPIndex]).change();
        }
        else if (prefIndex || prefIndex === 0) {
            theProvider.val(item.tocs[prefIndex]).change();
        }
        else {
            theProvider.val("null");
        }



        $tpProviders = null;
        theProvider = null;


    }

    function populateSelect(data, item) {

        var tocs = data.TOCs,
            prefIndex,
            prefName,
            prefTPIndex,
            prefTPName,
            thirdParties = [],
            tocArray = [],
            tpArray = [];

        thirdParties = data.thirdPartyTOCs !== "undefined" ? data.thirdPartyTOCs : [];

        var i = 0;
        var len = 0;
        var t = "";
        for (i = 0, len = tocs.length, t; i < len; i++) {
            tocArray.push(tocs[i].name);
            if (tocs[i].pref === '1') {
                prefIndex = i;
                prefName = tocs[i].name;
            }

        }

        for (i = 0, len = thirdParties.length, t; i < len; i++) {
            tpArray.push(thirdParties[i].name);
            if (thirdParties[i].pref === '1') {
                prefTPIndex = i;
                prefTPName = thirdParties[i].name;
            }

        }

        item.tocs = tocArray;
        item.thirdParties = tpArray;


        var options = item.tocs.slice(0);
        var tpOptions = item.thirdParties.slice(0);

        options.sort();
        tpOptions.sort();

        buildProviders(item, options, tpOptions, prefTPIndex, prefIndex, item.$providers);
        if (item.mainProvider !== null) {
            buildProviders(item, options, tpOptions, prefTPIndex, prefIndex, item.mainProvider);
        }
        //jQuery.fragments = {};
        item = null;
        //jQuery.fragments = {};
        options = null;
        tpOptions = null;
    }

    doClick(radio);
};

FC.globalVendorChange = (function (FC, $) {
    var process = {
        init: function () {
            $("#ctf-results select.sltProvider").on("change", FC.globalVendorChange.doChange);
        },
        doChange: function (e) {
            var hiddenInput = $("#prefVendor");
            hiddenInput.val(e.target.value);
            if (e.target.id !== "provider") {
                var mainSelect = $("#provider");
                var otherSelect = $(".journey-summary-purchase .sltProvider");

                mainSelect.val(e.target.value);
                //otherSelects.val(e.target.value);
                FC.prefVendSelect.changeTOC(otherSelect);
                FC.prefVendSelect.changeTOC($(e.target));
                otherSelect = null;
                mainSelect = null;
            } else {
                var selectedFareDetails = $("#ctf-results").find("input[type=radio]:checked").parent().parent().parent().parent().next("tr.faredets");
                var select = selectedFareDetails.find("select");
                select.val(e.target.value);
                FC.prefVendSelect.changeTOC(select);
                selectedFareDetails = null;
                select = null;
            }
            hiddenInput = null;

        }
    };
    return process;


})(FC, $);

/**
 * Note: Copied 'chooseToc' and modified
 * CG: Added some micro-optimisations around selectors
 */
FC.CtfChooseTOC = function (rebind) {

    var $select = $('#provider');
    var $ticketProvider, $changeProvider;

    if (typeof rebind !== true) {
        if ($('div.my-account').length === 0) {
            $ticketProvider = $('div.ticket-provider');
            $changeProvider = $('p.change-provider').css('display', 'none');

            $changeProvider.find('a').on('click', function (e) {
                e.preventDefault();

                $changeProvider[0].style.display = 'none';
                $ticketProvider[0].style.display = 'block';

                return false;
            });
        }

    }

    /**
     * Change the TOC image on the select element's change event
     * The selector is found in includes\jp-purchase-2.html
     */
    $select.change(function () {

        var $this = $(this);
        var selectVal = $this.val();
        var $tocLogo = "";
        var toc = "";
        var tocLogo = "";
        var $thirdMsg = $("div.op-party-msg");

        if ($this.parents(".journey-summary-purchase").length > 0) {
            $tocLogo = $this.parents(".journey-summary-purchase").find('div.operator-price img');
        } else {
            $tocLogo = $this.siblings('div.operator-price').find('img');
        }

        if (selectVal !== 'null') {
            toc = selectVal;
            tocLogo = toc.indexOf(' ') > -1 ? toc.split(' ').join('') : toc;

            $tocLogo.attr({
                // 'src', '/redesign/default/images/vendor_logos/logo-toc-' + tocLogo.toLowerCase() + '.gif', (SWITCH FOR LIVE - NREOJPTEST-2774)
                'src': fcPth.tocImgDir + '/logo-toc-' + tocLogo.toLowerCase() + '.gif',
                'alt': toc
            }).show();

            if (selectVal.toLowerCase() === "thetrainline.com" || selectVal.toLowerCase() === "raileasy") {
                $thirdMsg.css("display", "block");
            } else {
                $thirdMsg.css("display", "none");
            }


        }
        else {
            $tocLogo.hide();
        }
        $this = null;
        selectVal = null;
        $tocLogo = null;
        toc = null;
        tocLogo = null;
        $thirdMsg = null;
        // jQuery.fragments = {};
    });
    $select = null;
    $ticketProvider = null;
    $changeProvider = null;
};

FC.prefVendSelect = (function (FC, $) {

    var process = {
        changeTOC: function ($select) {
            var selectVal = $select.val();
            var $tocLogo = "";
            var toc = "";
            var tocLogo = "";
            var $thirdMsg = $("div.op-party-msg");

            if ($select.parents(".journey-summary-purchase").length > 0) {
                $tocLogo = $select.parents(".journey-summary-purchase").find('div.operator-price img');
            } else {
                $tocLogo = $select.siblings('div.operator-price').find('img');
            }

            if (selectVal !== 'null') {
                toc = selectVal;
                tocLogo = toc.indexOf(' ') > -1 ? toc.split(' ').join('') : toc;

                $tocLogo.attr({
                    // 'src', '/redesign/default/images/vendor_logos/logo-toc-' + tocLogo.toLowerCase() + '.gif', (SWITCH FOR LIVE - NREOJPTEST-2774)
                    'src': fcPth.tocImgDir + '/logo-toc-' + tocLogo.toLowerCase() + '.gif',
                    'alt': toc
                }).show();

                if (selectVal.toLowerCase() === "thetrainline.com" || selectVal.toLowerCase() === "raileasy") {
                    $thirdMsg.css("display", "block");
                } else {
                    $thirdMsg.css("display", "none");
                }


            }
            else {
                $tocLogo.hide();
            }

            $select = null;
            selectVal = null;
            $tocLogo = null;
            toc = null;
            tocLogo = null;
            $thirdMsg = null;
            // jQuery.fragments = {};
        }
    };

    return process;
})(FC, $);
/*
 Opens the railcards panel in the accordian "Passenger Details" section on the 1.5 templates.
 */

FC.addRailcards = function () {
    var button = $(FC.vars.selectors.ADD_RAILCARDS);
    var lyr = $("div.rcards");

    function clickHandler(e) {
        lyr.css({
            "display": "block"
        });
        $("#rcards", lyr).focus();
        button.remove();
        return false;
    }

    button.bind("click", clickHandler);
};

/*
 CFF railcards
 Optimisation by AB
 Controls the railcards in the accordion and CFF templates
 */
FC.rcards = function () {

    var __FC = this;
    var __SEL = this.vars.selectors; // globals
    var __$lyr = $("div.rcards");
    var __$sel = __$lyr.find('select#rcards');
    var __$fieldset = __$lyr.find("fieldset");
    var __$button = $(__SEL.RAILCARD_BUTTON);
    var __height = 200;

    function initCardType(thisVal) {
        //Remove row if value is set to 0
        var minus = $("#field-" + thisVal + " .actions li:eq(1) a");
        var card = $("#field-" + thisVal + " input#card-" + thisVal);
        minus.bind("click", function () {
            if (card.val() === '0') {
                __$fieldset.find("div#field-" + thisVal).fadeOut(250, function () {
                    $(this).remove();
                });
            }
        });
    }

    if (__$fieldset.find('div.card').length) {
        $(__SEL.ADD_RAILCARDS).remove();

        __$lyr.css({ "display": "block" });

        __$fieldset.find('div.card').css({ "opacity": 1 });

        __$fieldset.find('div.card input').each(function () {
            FC.increment(this);
            var thisVal = this.id.split('-');
            initCardType(thisVal[1]);
        });
    }
    else {
        this.addRailcards();
    }

    // *** AB 02/08/2010 ***
    __$button.bind("click", function () { // first run at cleaning up string concat and append

        var __val = __$sel.val();
        var __str = ["<div id='field-",
            undefined,
            "' class='card'><div class='field clear'><label for='card-",
            undefined,
            "'>",
            undefined,
            "<span class='accessibility'> - enter number of passengers</span>:</label><div class='input-border'><input type='text' class='text' id='card-",
            undefined,
            "' value='1' name='numberOfEachRailcard'/></div></div><input type='hidden' name='railcardCodes' value='",
            undefined,
            "'/></div>"];
        //__df = document.createDocumentFragment(); // removed

        //Create the new photocard row
        if (__val !== "" && $("div#field-" + __val).length === 0) {
            __str[1] = __val;
            __str[3] = __val;
            __str[5] = __$sel.find("option:selected").text();
            __str[7] = __val;
            __str[9] = __val;

            //__df.innerHTML = __str.join(''); removed
            // __$fieldset.append("<div id='field-" + sel.val() + "' class='card'><div class='field clear'><label for='card-" + __val + "'>" + sel.find("option:selected").text() + "<span class='accessibility'> - enter number of passengers</span>:</label><div class='input-border'><input type='text' class='text' id='card-" + __val + "' value='1' /></div></div></div>");
            __$fieldset.append(__str.join(''));

            __FC.formBorders(__$fieldset); // parent value added

            //Add incrementer
            __FC.increment("#card-" + __val + "");

            __$fieldset.find("#field-" + __val).animate({ "opacity": 1 }, 250, function () {
                initCardType(__val);
            });

        }
        return false;
    });

};

/*
 Used on CFF - NRE-7.0-Farefind-results.shtml
 Logic for the TOCs at the top of the page and how they update the hidden inputs on this page.
 */
FC.tocs = function () {
    var tocs = $("div.TOC input");
    var labels = $("div.TOC label");

    tocs.bind("click keypress", function () {
        var current = this;

        if (current.checked) {
            tocs.parent().removeClass("selected");
            tocs.parent().removeClass("active");
            $(current).parent().addClass("selected");
            $(current).parent().addClass("active");
        }

    }).bind("keyup", function (e) {
        switch (e.keyCode) {
            case 9:
                $(this).parents('div.operators').find('input').css({
                    'left': '-3px'
                }).css({
                    'top': '0'
                });
                return;
            default:
                return;
        }
    }).bind("keydown", function (e) {
        switch (e.keyCode) {
            case 9:
                $(this).parents('div.operators').find('input').css({
                    'left': '-500em'
                }).css({
                    'top': 'auto'
                });
                return;
            default:
                return;
        }
    });

    labels.bind("mouseover", function () {
        $(this).parent().addClass("active");

    }).bind("mouseout", function () {

        if ($(this).parent().hasClass("selected") === false) {
            $(this).parent().removeClass("active");
        }

    }).bind("click", function () {

        tocs.parent().removeClass("selected");
        tocs.parent().removeClass("active");

        $(this).parent().addClass("selected");
        $(this).parent().addClass("active");

        $(this).parent().find("input").attr("checked", "checked");

        return false;
    });
};
/*
 Standard number inc
 Example on accordian passenger details form
 */
FC.increment = function (_id) {

    var id = $(_id);
    var label = id.parent().prev('label').text();

    //Test to see if there are incrementors already:
    if (id.parent().parent().find("ul").length === 0) {
        id.parent().after("<ul class='actions clear'><li><a href='#' class='increment-add'><img alt='Add " + label.replace(/:/, "") + "' class='sprite-main sprite-add' src='" + fcPth.clrImg + "' width='22' height='30' /></a></li><li><a href='#' class='increment-remove'><img alt='Remove " + label.replace(/:/, "") + "' class='sprite-main sprite-remove' src='" + fcPth.clrImg + "' width='22' height='30' /></a></li></ul>");
    }

    var field = id.parents("div.field");
    var input = $(field).find("input");
    var add = $(field).find("ul.actions li:eq(0) a");
    var minus = $(field).find("ul.actions li:eq(1) a");
    var currentVal;

    var count;

    //if the value is more than 0 then set the 'active' colour style
    if (id.val() === 0) {
        id.css({ "color": "#A2A2A2" });
    } else {
        id.css({ "color": "#404040" });
    }

    id.bind("blur", function () {
        if (!$(this).val()) {
            if (id.attr('id') === 'adults') {
                id.val(1);
            }
            else {
                id.val(0);
            }
            id.css({ "color": "#A2A2A2" });
        }
        else {
            if ($(this).val() === 0) {
                id.css({ "color": "#A2A2A2" });
            }

            else {
                if ($(this).val() > 8) {
                    id.val(8);
                }
                else {
                    id.css({ "color": "#404040" });
                }
            }
        }
    });

    add.unbind("click").bind("click", function () {
        count = 0;
        currentVal = input.val();
        if (currentVal !== "") {
            count = currentVal;
        }
        if (count < 8) {
            count++;
            id.val(count);
            id.css({ "color": "#404040" });
        }
        return false;

    });

    minus.unbind("click").bind("click", function () {
        count = 0;
        currentVal = input.val();
        if (currentVal !== "") {
            count = currentVal;
        }
        if (count > 0) {
            count--;
            id.val(count);
            id.css({
                "color": "#404040"
            });
        }
        if (count === 0) {
            id.css({
                "color": "#A2A2A2"
            });
        }
        return false;

    });
};
/*
 Expands/hides the nested tables in the 9.1 template
 Logic arround "slowSafari" can be removed as this browser is no longer supported
 Minor opt but still "each" function on DOMready
 */
FC.callingPoints = function (switched) {
    var isSwitched = switched;
    $(FC.vars.selectors.CALLING_POINTS).each(function () {
        var $this = $(this);
        if (isSwitched) {
            $this.prev().find('div.callingpointdesc').append($('<a></a>').attr('href', '#').addClass('callingpointplus').text('show calling points'));

            $this.prev().find('a.callingpointplus')
                .bind('click', function () {
                    var target = $(this).parents('tr').next().find('div.callingpointslide');
                    if (target.css('display') === 'none') {
                        $(this).text('hide calling points').removeClass('callingpointplus').addClass('callingpointminus');
                        if (FC.vars.slowSafari) {
                            target.show();
                        }
                        else {
                            target.slideDown(400);
                        }
                    }
                    else {
                        $(this).text('show calling points').removeClass('callingpointminus').addClass('callingpointplus');
                        if (FC.vars.slowSafari) {
                            target.hide();
                        }
                        else {
                            target.slideUp(400);
                        }
                    }
                    return false;
                }).bind('keypress', function (e) {
                switch (e.keyCode) {
                    case 9:
                    case 16:
                    case 18:
                    case 17:
                        return;
                    default:
                        var target = $(this).parents('tr').next().find('div.callingpointslide');
                        if (target.css('display') === 'none') {
                            $(this).text('hide calling points').removeClass('callingpointplus').addClass('callingpointminus');
                            if (FC.vars.slowSafari) {
                                target.show();
                            }
                            else {
                                target.slideDown(400);
                            }
                        } else {
                            $(this).text('show calling points').removeClass('callingpointminus').addClass('callingpointplus');
                            if (FC.vars.slowSafari) {
                                target.hide();
                            }
                            else {
                                target.slideUp(400);
                            }
                        }
                        return false;
                }
            });
        } else {
            $this.next().find('div.callingpointdesc').append($('<a></a>').attr('href', '#').addClass('callingpointplus').text('show calling points'));

            $this.next().find('a.callingpointplus').bind('click', function () {
                var target = $(this).parents('tr').prev().find('div.callingpointslide');
                if (target.css('display') === 'none') {
                    $(this).text('hide calling points').removeClass('callingpointplus').addClass('callingpointminus');
                    if (FC.vars.slowSafari) {
                        target.show();
                    }
                    else {
                        target.slideDown(400);
                    }
                }
                else {
                    $(this).text('show calling points').removeClass('callingpointminus').addClass('callingpointplus');
                    if (FC.vars.slowSafari) {
                        target.hide();
                    }
                    else {
                        target.slideUp(400);
                    }
                }
                return false;
            }).bind('keypress', function (e) {
                switch (e.keyCode) {
                    case 9:
                    case 16:
                    case 18:
                    case 17:
                        return;
                    default:
                        var target = $(this).parents('tr').prev().find('div.callingpointslide');
                        if (target.css('display') === 'none') {
                            $(this).text('hide calling points').removeClass('callingpointplus').addClass('callingpointminus');
                            if (FC.vars.slowSafari) {
                                target.show();
                            } else {
                                target.slideDown(400);
                            }
                        } else {
                            $(this).text('show calling points').removeClass('callingpointminus').addClass('callingpointplus');
                            if ($.browser.safari && $.browser.version < 523) {
                                target.hide();
                            } else {
                                target.slideUp(400);
                            }
                        }
                        return false;
                    //break;
                }
            });
        }
    });
};
/*
 The map on NRE-5.0-TOCs-map.shtml
 */
FC.routeMap = function ($img) {
    var rel;
    var src;

    $('ul.companies a').bind('mouseover focus', function () {
        rel = $(this).attr('rel');
        var alt = $(this).text();

        $img.attr({
            src: fcPth.rmImgDir + "/map-" + rel + ".jpg",
            alt: alt
        });
    });
};
/*
 Controls the form on the alerting template: NRE-6.7-TravelAlerts-Confirmation.shtml
 */
FC.smsOptions = function (sel) {
    var dayNames = $(".day-names");
    var opts = $(sel);
    var lyr = $(".more-options");
    var moreOptionCheckBox = lyr.find("input[type='checkbox']");


    function checkSelect() {
        var selectedOption = opts.children("option:selected");
        /* adding additional logic here for NREOJPTEST-2026 */
        if (opts.val() === 0) { //This journey only
            document.getElementById("alertActive").setAttribute("disabled", "disabled");
            $(".form-panel .weeks").html("one time"); //Set weeks text
            dayNames.html("for this journey"); //set days text
            moreOptionCheckBox.removeAttr("checked");
            lyr.css({ "display": "none" }); // hide more options
        } else if (opts.val() === 3) {
            lyr.css({ "display": "block" });
            checkDays();
            document.getElementById("alertActive").removeAttribute("disabled");
            $("#alertActive").change();
        } else {
            lyr.css({ "display": "none" });
            moreOptionCheckBox.removeAttr("checked");
            dayNames.html("every " + selectedOption.text());
            document.getElementById("alertActive").removeAttribute("disabled");
            $("#alertActive").change();
        }
    }
    checkSelect();
    opts.bind("change", function () {
        checkSelect();
    });

    $("#alertActive").bind("change", function () {

        var selectedOption = $(this).children("option:selected").val();
        var weekly = $(".form-panel .weeks");
        weekly.html(selectedOption);
    });
    function checkDays() {

        moreOptionCheckBox.bind("change", function () {
            var dayArray = [];

            $("input:checked").each(function () {
                var dayname = $(this).attr("name");
                dayArray.push(dayname);

            });

            if (dayArray.length >= 2) {
                var lastday = dayArray.pop();
                dayNames.html("every " + dayArray.join(", ") + " and " + lastday);
            }
            else {
                dayNames.html("every " + dayArray.join(", "));
            }
        });

    }
};
/*
 * Pocket Timetable
 * NRE-20.2-Pocket-timetable.shtml
 * PT = div.pocket-timetable
 * Note: this has thrown errors in IE6
 */
FC.PT = function ($PT) {

    //Stations
    var fromField = $("div.from div.field div.clear:first");
    var fromAdd = $("div.from a.add");
    var toField = $("div.to div.field div.clear:first");
    var toAdd = $("div.to a.add");
    var fromCount = $("input", "div.from").length;
    var toCount = $("input", "div.to").length;

    var removesFrom = $("span.remove-from");
    var removesTo = $("span.remove-to");


    //Station Picker
    sp.init();
    sp.addISet({ from: $("#fromList0")[0], useDLRLU: false, useGroups: true });
    sp.addISet({ from: $("#toList0")[0], useDLRLU: false, useGroups: true });
    sp.addISet({ from: $("#txtViaAvDest")[0], useGroups: true });
    sp.addISet({ from: $("#txtCallingStn")[0], useGroups: true });

    removesFrom.bind("click", function () {
        fromCount--;
        $("input", $($(this).parent().parent())).val('');
        $(this).parent().parent().attr("style", "display:none");
        return false;

    });

    removesTo.bind("click", function () {
        toCount--;
        $("input", $($(this).parent().parent())).val('');
        $(this).parent().parent().attr("style", "display:none");
        return false;

    });

    fromAdd.bind("click", function () {
        if (fromCount < 3) {
            var newFrom = fromField.clone();
            newFrom.addClass("morefrom");
            $('input', newFrom).attr("id", "fromList" + fromCount);
            $('input', newFrom).val($('input', newFrom)[0].defaultValue);
            $('label', newFrom).attr("for", "fromList" + fromCount);
            $('input', newFrom).attr("name", "fromList[" + fromCount + "].searchTerm");
            //$('span', newFrom)[0].className = "sp-icon-holder";
            $('.input-border', newFrom).css({
                'background': 'none'
            });
            $(newFrom).removeClass('invalid').addClass('valid');
            fromAdd.before(newFrom);
            if (sp) {
                sp.addISet({ from: $('input', newFrom)[0], useDLRLU: false, useGroups: true });
            }
            FC.formBorders(newFrom);  // parent value added
            FC.clearFields(newFrom);
            $('a.remove-station', newFrom).bind('click', function () {
                fromCount--;
                $(this).parent().remove();
                return false;
            });
            fromCount++;
        }
        return false;
    });


    toAdd.bind("click", function () {
        if (toCount < 3) {
            var newTo = toField.clone();
            newTo.addClass("moreto");
            $('input', newTo).attr("id", "toList" + toCount);
            $('input', newTo).val($('input', newTo)[0].defaultValue);
            $('label', newTo).attr("for", "toList" + toCount);
            $('input', newTo).attr("name", "toList[" + toCount + "].searchTerm");
            toAdd.before(newTo);
            if (sp) {
                sp.addISet({ from: $('input', newTo)[0], useDLRLU: false, useGroups: true });
            }
            FC.formBorders(newTo);  // parent value added
            FC.clearFields(newTo);
            $('a.remove-station', newTo).bind('click', function () {
                toCount--;
                $(this).parent().remove();
                return false;
            });
            toCount++;
        }
        return false;
    });


    var advSearchL = $("a.adv-search");
    var advSearchLimg = advSearchL.find('img');
    var advSearch = $("div.advanced-search");

    if ($('#jpState', 'div.pocket-timetable').val() === 'advanced') {
        advSearch.removeClass("search-closed").addClass("search-open");
        advSearchL.addClass("hide-search");
    }

    advSearchLimg[0].alt = "Click to show ";

    advSearchL.bind('click', function () {
        if (advSearchL.hasClass("hide-search")) {
            $('#jpState', 'div.pocket-timetable').val('');
            advSearchL.attr('aria-expanded', 'false');
            advSearch.removeClass("search-open").addClass("search-closed");
            advSearchL.removeClass("hide-search");
            advSearchLimg[0].alt = "Click to show ";
            return false;
        }
        else {
            $('#jpState', 'div.pocket-timetable').val('advanced');
            advSearchL.attr('aria-expanded', 'true');
            advSearch.removeClass("search-closed").addClass("search-open");
            //  callingPoints();
            advSearchL.addClass("hide-search");
            advSearchLimg[0].alt = "Click to hide ";
            return false;
        }
    });


    // advanced search options - pocket timetable - show/hide the calling points input box
    var pointTypeSelect = $('#sltIntCalling', 'div.pocket-timetable');
    var pointInput = $("#txtCallingStn", 'div.pocket-timetable');
    var addCallPointButton = $('div.btn-callingpoint', 'div.pocket-timetable');

    if (pointTypeSelect.val() !== "SHOW_SPECIFIC") {
        pointInput.attr('disabled', 'disabled');
        addCallPointButton.hide();
    }

    pointTypeSelect.bind("change", function () {
        var opt = ($(this).val());
        if (opt === "SHOW_SPECIFIC") {
            addCallPointButton.show();
            pointInput.removeAttr("disabled");
        }
        else {
            pointInput.attr('disabled', 'disabled');
            addCallPointButton.hide();
        }
    });

};
FC.fareSwitcher = (function () {
    var process = {
        switcher: $("th.fare .ctf-fare"),
        cTab: "single",
        oTab: "return",
        hasFS: false,
        //disableAutoSelect is to disable the autoselect on tab during unit tests so that unselected fare states can be properly tested. Can also be used through browser development console.
        disableAutoSelect: false,
        //test for multi button
        init: function () {
            var that = this;
            var tab = "";

            if (that.switcher.children("div").length > 1) {
                FC.fareSwitcher.hasFS = true;
                var tabs = that.switcher.find("a").click(that.switchFares).keyup(function (e) {
                    if (e.keyCode === 13) {
                        e.preventDefault();
                        that.switchFares(e);
                    }
                });
                // Dont use the return fares tab if it has class 'no-return'
                // PDW 2001-06-13: Or if <div id="ctf-results"> has a class of "single", as per JIRA ticket #2221 (http://www.thalesjira.co.uk/jira/browse/NREOJPTEST-2221)
                tab = tabs.eq(0).hasClass('no-return') || that.switcher.parents('#ctf-results').hasClass('single') ? tabs.eq(1) : tabs.eq(0);

                // RW: Switch to tab, but don't select the fare
                tab.trigger('click', [false]);
            } else {
                NRE.basket.tabBask();
            }

        },
        enableReturn: function () {
            var that = this;
            var returnTab = that.switcher.find("div.left a");
            returnTab.click(that.switchFares).keyup(function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    that.switchFares(e);
                }
            });
        },
        //switch
        switchFares: function (e, selectFare) {

            e.preventDefault();

            selectFare = selectFare === undefined ? true : selectFare;
            FC.moreFares.hideAllFares();
            FC.ctfSInfo.closeAll();
            //switch class
            var single = this.innerHTML.indexOf("Single") > 0;
            var $this = $(this);

            var tabSel = $this.parent();
            tabSel.addClass("selected").attr('aria-expanded', 'true');
            if (single) {
                $this.parent().prev("div.left").removeClass("selected").attr('aria-expanded', 'false');
            } else {
                $this.parent().next("div.right").removeClass("selected").attr('aria-expanded', 'false');
            }
            FC.fareSwitcher.cTab = single ? "single" : "return";
            FC.fareSwitcher.oTab = single ? "return" : "single";
            //switch fare column content
            if (single) {
                $("#ctf-results").removeClass("return").addClass("single");

            } else {
                $("#ctf-results").removeClass("single").addClass("return");
                if (selectFare) {
                    if ($(e.target).hasClass('no-return')) {
                        // There are no return fares available, so we need to reset the selected state
                        $('#ctf-results').find('table tr').removeClass('sel');
                    }
                }
            }
            // If the cheapest fare is not visible, don't highlight the fare cell that contains it (JIRA issue #2234 (http://www.thalesjira.co.uk/jira/browse/NREOJPTEST-2234))
            var cheapestFare = $('td.fare .cheapest').parent('.return, .single');
            if (cheapestFare.is(':visible')) {
                $('.has-cheapest-disabled').removeClass('has-cheapest-disabled').addClass('has-cheapest');
            }
            else {
                $('.has-cheapest').removeClass('has-cheapest').addClass('has-cheapest-disabled');
            }
            //selectFares should ordinarly run, except during some unit tests
            if (!FC.fareSwitcher.disableAutoSelect) {
                FC.fareSwitcher.selectFares(FC.fareSwitcher.cTab);
            }
            NRE.details.updateAllLinks();
            //NRE.basket.initSB();
            NRE.basket.tabBask();
        },
        updateTabs: function (retPrice, singPrice) {
            var that = this,
                tabCont = $("#ctf-results div.ctf-fare"),
                leftTab = tabCont.find("div.left"),
                rightTab = tabCont.find("div.right"),
                leftActive = leftTab.find("a").length > 0 ? true : false;

            rightTab.find("strong.ctf-pr").html("&pound;" + singPrice);

            if (leftActive) {
                leftTab.find("strong.ctf-pr").html("&pound;" + retPrice);
            } else {
                leftTab.html('<a href="#"><span class="accessibility">Buy tickets as</span> Return from <strong class="ctf-pr">&pound;' + retPrice + '</strong></a>');
            }

            //TODO reactivate tabs if necessry, bind the events
            //if (retPrices.length > 0 && !leftActive) {
            //Commented out to solve (dirty fix!) the issue of when reanabling the return tab, we don't have the fares for the other portion on the journey
            //that.enableReturn();
            //dirty fix below
            //NRE.earlierLaterAjax.replanJourney();
            //}
        },
        selectFares: function (tab) {
            var selectedContainers = '';
            var radiosToSelect = '';
            var faresToDeselct = '';

            if (tab === 'single') {
                selectedContainers = $('td.fare > div.single.default-select');
                faresToDeselct = $('td.fare > div.return input:checked');
            } else {
                selectedContainers = $('td.fare > div.return.default-select');
                faresToDeselct = $('td.fare > div.single input:checked');
            }

            faresToDeselct.each(function () {
                var $this = $(this);

                this.checked = false;
                $this.prop('checked', false);
            });

            radiosToSelect = selectedContainers.find('input[type=radio]');

            radiosToSelect.each(function () {
                var $this = $(this);
                if ($this.attr('disabled') !== true && $this.attr('disabled') !== 'disabled' && $this.parent().parent('.hidden').length === 0) {
                    $this.click();
                }

            });
        }
    };
    return process;
})(FC, $);
/*Accordian used on more fares*/

FC.setFaresAccordian = function (options) {
    //todo:optimise selectors
    var __SEL = FC.vars.selectors;
    var defaults = {
        wrapper: __SEL.FARES_ACCORDIAN,
        direction: '',
        content: __SEL.FARES_ACCORDIAN_CONTENT,
        trigger: __SEL.FARES_ACCORDIAN_TRIGGER,
        trigger_anchor: __SEL.FARES_ACCORDIAN_TRIGGER_ANCHOR,
        effectOpen: 'slideDown',
        effectClose: 'slideUp'

    };
    var opts = $.extend(defaults, options);
    var accordianContent = $(opts.content);
    if (opts.trigger) {
        //checks if trigger available
        if (opts.trigger) {
            var trigger = $(opts.trigger);
            trigger.each(function () {
                var $$ = $(this);
                //var triggerHtml = $$.html();
                //$$.html("<a href='#'>" + triggerHtml + "</a>");
                $$.find("h4").wrap('<a href="#" class="further-fares-trigger" aria-expanded="false" />');
            });
            //opens first accordian content option - todo: make open different options
            //openAccordianContent(trigger[0]);
            $(opts.trigger_anchor).bind("click", function (e) {
                //work on adding option for hover if wanted also?
                e.preventDefault();
                //if (!e.keyCode | e.keyCode == '13') {
                openAccordianContent(this);
                //return false;
                //}
            });
        }
    }

    function openAccordianContent(selectedTrigger) {
        var $trigger = $(selectedTrigger);
        var selectedOption = $trigger.siblings(opts.content);
        var otherItems = $(opts.content);
        var parent = $trigger.parent('li');
        //toggle functions
        if (!parent.hasClass("open")) {
            selectedOption.slideDown(400, function () {
                selectedOption.children().addClass("show");
            });
            parent.addClass("open");
            $trigger.attr('aria-expanded', 'true');
        }
        else {
            selectedOption.children().removeClass("show");
            selectedOption.slideUp();
            parent.removeClass("open");
            $trigger.attr('aria-expanded', 'false');
        }
    }
};
/*
 * Makes AJAX calls to the Fares JSON feed and injects results.
 * Found on the 1.5 templates when clicking on the More Fares link
 */

FC.ctfSInfo = (function () {
    var process = {
        otherOpen: "",
        othersOpen: false,
        fareDetTr: "",
        fareDetEle: "",
        areaOpen: function (mfares) {
            var that = this;
            that.fareDetTr = mfares.parent().parent().parent().parent().next("tr.faredets");
            that.fareDetEle = that.fareDetTr.find("div.fare-slide");
            that.fareDetTr.prev("tr").addClass("colorTr");
            that.fareDetTr.addClass("open");
            if (!that.othersOpen) {
                that.otherOpen = that.fareDetEle;
                that.othersOpen = true;
            } else {
                that.otherOpen.slideUp('slow');
                that.othersOpen = false;
            }
            that.fareDetEle.slideDown(400);
        },
        areaClose: function (mfares) {
            var that = this;
            //console.log("sliding up")
            that.fareDetTr = mfares.parent().parent().parent().parent().next("tr.faredets");
            that.fareDetEle = that.fareDetTr.find("div.fare-slide");
            that.fareDetEle.slideUp(400, function () {
                that.fareDetTr.removeClass("open");
                that.fareDetTr.prev("tr").removeClass("colorTr");
            });
            that.othersOpen = false;


        },
        closeAll: function () {
            var $tr = $("#ctf-results").find("tr.faredets.open"), that = this;
            var $div = $tr.find("div.fare-slide");
            $div.css("display", "none");
            $tr.removeClass("open");
            that.othersOpen = false;
            $tr.prev("tr").removeClass("colorTr");
        }

    };
    return process;
})(FC, $);
FC.moreFares = (function () {
    //more fares links
    var process = {
        $triggers: $('#ctf-results .more-fares a'),
        storedLink: '',
        storedIndex: '',
        parentDIV: '',
        init: function (newTriggers, newRow) {
            var that = this;
            var isAjax = newTriggers === null ? false : true;
            var triggersToBind = isAjax ? newTriggers : that.$triggers;
            var rowsToBind = isAjax ? newRow : $('#ctf-results');

            if (isAjax) {
                that.$triggers = $('#ctf-results .more-fares a');
            }

            //add click event
            triggersToBind.prepend('<span class="hidden">Show </span>');
            triggersToBind.bind('click keypress', function (e) {
                if (e.which === 13 || e.type === 'click') {
                    that.clickHandler(e);
                }
            });

            that.hideAll(newTriggers, newRow);
            //that = null;
        },
        hideAll: function (newTriggers, newRow) {
            var that = this;
            var isAjax = newTriggers === null ? false : true;
            var rowsToBind = isAjax ? newRow : $('#ctf-results');
            //listen fore close events
            rowsToBind.bind('HIDE_ALL', function (e, link) {
                that.hideFare(link, false);
                FC.ctfSInfo.closeAll();
            });
        },
        clickHandler: function (e) {
            var that = this;
            e.preventDefault();

            //switch done on p.more-fares
            if (e.target.parentNode.className.indexOf('more-fares') >= 0) {
                FC.ctfSInfo.closeAll();
                that.hideAllFares();
                // alert('showing fare');
                $(e.target).find('.hidden').html('Hide ');
                that.showFare(e.target);
                FC.ctfSInfo.areaOpen($(e.target));
            } else {
                $(e.target).find('.hidden').html('Show ');
                that.hideFare(e.target);
                FC.ctfSInfo.areaClose($(e.target));
            }

            return false;
        },
        /*Builds the container for the fares adds LOAD text in TargetHTML */
        showFare: function (link) {
            // alert('got to fare');
            var that = this;
            var parentP = link.parentNode;
            var parentTD = parentP.parentNode.parentNode;
            var index = 0;
            var targetHTML = '<div class="more-fares-list" aria-expanded="true"><!--<div class="more-fares-list-top"><div class="more-fares-list-top-right"></div></div>--><div class="shadow-right"><div class="inner"><div class="loading">Loading Fares</div></div></div></div>';

            //set link
            parentP.className = 'hide-fares';
            //link.innerHTML = 'Hide Fares';

            //set td
            parentTD.className += ' show-more-fares';
            that.parentDIV = parentP.parentNode;
            //inject HTML
            $(that.parentDIV).append(targetHTML);

            that.storedLink = link;
            //console.log('testestets  ' + index);

            that.storedIndex = index = that.$triggers.index(link);
            //console.log('testestets  ' + index);

            //call AJAX
            //alert('calling ajax');
            that.callAJAX(false);

            /*
             * Calls the AJAX after parsing the data contrained in the link
             */
            parentP = null;
            parentTD = null;
            targetHTML = null;


        },
        floatSorter: function (a, b) {
            return a.price - b.price;
        },
        parseJSON: function (json, b, c) {
            //alert('in parse')
            var that = this;
            var sortedArray = json.fares;
            var ul = ['<h3 class="hidden">More fares</h3><ul>'];
            var ulMore = [];
            var ulAllCheapest = [];
            var cheapFares = [];
            var i = 0;
            var tempTicketType = '';
            var len = sortedArray.length;
            var currentItem = '';
            var cheapObj = '';
            var id = '';
            var tempUl = '';
            var id2 = '';
            var currentJourneyBreakdown = $.parseJSON($(that.parentDIV).parent().find('script').html());
            var newBreakdown = '';
            var newVal = '';
            var responseId = '';
            var journeyId = '';
            var journeyType = '';

            if (sortedArray.length === 0 || currentJourneyBreakdown === null) {
                $(that.parentDIV).find('.loading').text('Sorry, no fares found.');
                return;
            }

            //using the original journeyID and responseID from the page fare rather than the radioValue in the feed for a purely template perspective as the dummy feeds are flat, the radioValue and responseIds don't relate to the fare the more fare request was performed on. So they end up being wrong, and the rest of the functions can't find the jsonBreakdown script tag as the radio value is incorrect. USing the values already on page, ensures that the journeyId and responseId are correct for that fare and retrieving it's jsonBreakdown. 

            for (i = 0; i < len; i++) {
                currentItem = sortedArray.shift();
                cheapObj = {};
                id = 'morefares-' + that.storedIndex + '-' + sortedArray.length;
                tempUl = [];
                id2 = 'morefares2-' + that.storedIndex + '-' + sortedArray.length;
                journeyId = currentJourneyBreakdown.jsonJourneyBreakdown.journeyId;
                responseId = currentJourneyBreakdown.jsonJourneyBreakdown.responseId;
                newBreakdown = currentItem.inputs[0];
                journeyType = newBreakdown.breakdownType.toLowerCase().indexOf('s') > -1 ? 's' : 'r';
                newVal = responseId + '-' + newBreakdown.fareId + '-' + journeyId + '-' + journeyType;


                if (json.isReturn) {
                    if (json.bindField.toLowerCase().indexOf('outward') > -1) {
                        id += 'returnFareOutward';
                    } else {
                        id += 'returnFareReturn';
                    }
                } else {
                    if (json.bindField.toLowerCase().indexOf('outward') > -1) {
                        id += 'faresingleFareOutward';
                    } else {
                        id += 'faresingleFareReturn';
                    }
                }

                id = id + responseId + journeyId;
                cheapObj.price = currentItem.price;
                cheapObj.ticketType = currentItem.ticketType;
                //build all html and store in temporary ul
                tempUl.push('<li class="clear">');
                tempUl.push('<label for="' + id + '">');
                if (parseInt(currentItem.price, 10) > -1) {
                    if (currentItem.inputs[0].breakdownType.indexOf('SingleFareOutward') > -1 || currentItem.inputs[0].breakdownType.indexOf('SingleFareInward') > -1) {
                        tempUl.push('<input id="' + id + '" name="' + json.bindField + 'S" type="radio" value="' + newVal + '"');
                    } else {
                        tempUl.push('<input id="' + id + '" name="' + json.bindField + '" type="radio" value="' + newVal + '"');
                    }
                    //if (json.isReturn) {
                    //  tempUl.push(' onclick="selectOutboundReturnFare(\'' + a.ticketPriceID + '\', \'' + id + '\')"');
                    //}
                    tempUl.push('>&nbsp;&pound;');
                    tempUl.push(currentItem.price);
                } else {
                    tempUl.push('Unavailable:');
                }
                tempUl.push('</label>');
                tempUl.push('<span class="fare-type tooltip"><a href="#" title="');
                tempUl.push(currentItem.tooltip);
                tempUl.push('">');
                tempUl.push(currentItem.ticketType);
                tempUl.push('</a></span>');
                tempUl.push('<span class="fare-breakdown">');
                while (currentItem.inputs.length) {
                    tempUl.push('<input type="hidden" value=\'' + $.stringify(currentItem.inputs.shift()) + '\'>');
                }
                tempUl.push('</span>');
                tempUl.push('</li>');
                //If previous item ticket type different to new item ticket type
                if (tempTicketType !== currentItem.ticketType) {
                    //grab all the cheapest fares
                    cheapObj.html = tempUl.join('');
                    ulAllCheapest.push(cheapObj);
                    cheapObj = null;
                    //if it's not the first fares accordian, close the ul and li
                    if (tempTicketType !== '') {
                        ulMore.push('</ul></li>');
                    }
                    //create a new ticketType accordian
                    ulMore.push('<li class="further-fares"><h4><img alt="" class="sprite-main fares-plus" src="' + fcPth.clrImg + '" width="11" height="11" />' + currentItem.ticketType + '<strong>from &pound;' + currentItem.price + '</strong></h4><ul>');
                    tempUl[1] = '<label for="' + id + '">';
                    ulMore.push(tempUl.join(''));
                } else {
                    ulMore.push(tempUl.join(''));
                }
                //set the ticketType so we know which was the previous ticketType
                tempTicketType = currentItem.ticketType;
                currentItem = null;
                cheapObj = null;
                id = null;
                tempUl = null;
                id2 = null;

            }
            //close the last accordian ul
            ulMore.push('</ul></li>');
            //sort out the cheapest 3 fares NREOJPTEST-2570
            ulAllCheapest.sort(that.floatSorter);
            //alert('done sorting');
            var MatPriceTemp = $(that.parentDIV).find('label').text().toLowerCase();
            var MatPrice = MatPriceTemp.replace(/\s/gi, '');
            MatPrice = MatPrice.replace('£', '');
            MatPrice = MatPrice.replace('&pound;', '');
            var MatType = $(that.parentDIV).find('span.fare-type').children('a').text().toLowerCase();
            if (ulAllCheapest.length > 0) {
                var amtToAdd = ulAllCheapest.length >= 5 ? 5 : ulAllCheapest.length;
                for (var x = 0; x < amtToAdd; x++) {
                    if (MatType === ulAllCheapest[x].ticketType.toLowerCase()) {
                        if (typeof ulAllCheapest[amtToAdd] !== 'undefined') {
                            amtToAdd += 1;
                        }
                    } else {
                        var replaceId = ulAllCheapest[x].html.replace(/morefares/g, 'cheapmorefares');
                        cheapFares.push(replaceId);
                    }
                }
                ulAllCheapest = null;
            }

            //alert('done the next bit')
            //add cheapest fares
            ul.push(cheapFares.join(''));
            //add the accordians to main list
            ul.push(ulMore.join(''));
            //Display UNAVILABLE for first class
            if (!json.firstAvailable) {
                ul.push('<li class="clear"><span class="unavailable">Unavailable:</span><span class="fare-type">First Class</span></li>');
            }

            //end list build
            ul.push('</ul>');

            //Add more fares
            //if (json.allAvailable) ul.push('<p class="see-all"><a href="#">See all fare options</a></p>');

            //inject HTML
            //alert("injecting")
            //alert($(that.parentDIV).find("div.shadow-right div.inner").length);
            // alert(ul.join(""));
            $(that.parentDIV).find('div.shadow-right div.inner').html(ul.join(''));
            //alert('finished injecting');
            //add accordian functionality
            //alert('reached end of function');
            FC.setFaresAccordian({});

            //reveal hidden fares
            $('p.see-all a', that.parentDIV).click(function (e) {
                e.preventDefault();
                //resend AJAX with extra parameter
                that.callAJAX(true);
            });
            // jQuery.fragments = {};

            //add the tooltip events
            FC.tooltip($(that.parentDIV).find('div.shadow-right div.inner span.tooltip'));
            //jQuery.fragments = {};
            i = null;
            tempTicketType = null;
            sortedArray = null;
            ul = null;
            ulMore = null;
            ulAllCheapest = null;

        },
        callAJAX: function (more) {
            //alert('in calling ajax')
            var that = this,
                dataStr = that.storedLink.href.toString().slice(that.storedLink.href.toString().lastIndexOf('?') + 1),
                url = FC.vars.paths.ALL_FARES_JSON;
            // console.log(dataStr);
            $.ajax({
                dataType: 'json',
                data: dataStr,
                url: url,
                error: function (a, b, c) {
                    $(that.parentDIV).find('.loading').text('Sorry, service error.');
                },
                success: function (json, b, c) {
                    //alert('going to parse');
                    that.parseJSON(json, b, c);
                }

            }); //end ajax
            dataStr = null;
            url = null;
        },
        /*Hide all open fare boxes on the page*/
        hideAllFares: function () {
            var that = this;
            that.$triggers.each(function () {
                that.hideFare(this, true);
            });
        },
        /* hides a single open moreFares box Selects the radio box and updates parent with that radio New radio has events attached allFare no longer used  */
        hideFare: function (link, allFare) {

            var parentP, escClick, that = this;
            if (typeof link !== 'undefined') {
                parentP = link.parentNode;
            } else {
                escClick = $('span.hide-fares a');
                if (escClick.length) {
                    parentP = escClick[0].parentNode;
                } else {
                    return false;
                }
            }
            var parentDIV = parentP.parentNode,
                parentTD = parentP.parentNode.parentNode,
                moreFaresDIV = $(parentTD).find('.more-fares-list');

            if (typeof link !== 'undefined') {
                that.mfLink(link);

                //hiding
                //link.innerHTML = 'More Fares';
            } else {
                that.mfLink(escClick[0]);
                //escClick.innerHTML = 'More Fares';
            }
            parentP.className = 'more-fares';
            parentTD.className = parentTD.className.replace(/show-more-fares/, '');

            if (moreFaresDIV.length) {
                moreFaresDIV.remove();
                //jQuery.fragments = {};
            }
            parentDIV = null;
            parentTD = null;
            moreFaresDIV = null;
            parentP = null;
            escClick = null;
        },
        /* Selects the radio box and updates parent with that radio New radio has events attached allFare no longer used    */
        selectFare: function (link, allFare) {
            var parentP, escClick, that = this;
            if (typeof link === 'undefined') {
                link = that.storedLink;
            }
            if (typeof link !== 'undefined') {
                parentP = link.parentNode;
            } else {
                escClick = $('span.hide-fares a');
                if (escClick.length) {
                    parentP = escClick[0].parentNode;
                } else {
                    return false;
                }
            }
            var parentDIV = parentP.parentNode,
                parentTD = parentP.parentNode.parentNode,
                moreFaresDIV = $(parentTD).find('.more-fares-list'),
                innerDiv = moreFaresDIV.find('div.shadow-right div.inner');


            if (moreFaresDIV.length) {
                innerDiv.html('<div class="loading">Loading Fares</div>');
                //jQuery.fragments = {};
            }

            if (typeof link !== 'undefined') {
                that.mfLink(link);

                //hiding
                //link.innerHTML = 'More Fares';
            } else {
                that.mfLink(escClick[0]);
                //escClick.innerHTML = 'More Fares';
            }
            parentDIV = null;
            parentTD = null;
            moreFaresDIV = null;
            parentP = null;
            escClick = null;

        },
        mfLink: function (link) {
            //var currentName = $(link).text('More fares').attr('name');
            var currentHref = link.href.toString().slice(link.href.toString().lastIndexOf('?') + 1);
            currentHref = currentHref.split('&');
            var _journeyId = currentHref[0],
                _journeyType = currentHref[1],
                _direction = currentHref[2],
                _fareType = currentHref[3],
                _responseId = currentHref[6],
                _id = $(link).attr('id'),
                newSelectedId = $('input:radio', link.parentNode.parentNode).attr('value').split('-')[1],
                newHref = '/service/timesandfares/moreFares?' + _journeyId + '&' + _journeyType + '&' + _direction + '&' + _fareType + '&currentlySelectedFareId=' + newSelectedId + '&id=' + _id + '&' + _responseId;

            ///service/timesandfares/moreFares?journeyId=1&direction=o&journeyType=s&fareType=nsfo&currentlySelectedFareId=2&id=1s
            $(link).attr('href', newHref);
            currentHref = null;
            _journeyId = null;
            _journeyType = null;
            _direction = null;
            _fareType = null;
            _id = null;
            newSelectedId = null;
            newHref = null;

        },
        refreshFares: function () {
            var that = this;
            that.selectFare();
            that.callAJAX();
            //that.callAJAX();
        }
    };
    return process;
}(FC, $));
NRE.basket = (function () {
    var process = {
        flexibleText: ' This fare is only valid on trains travelling between certain times.',
        restrictedText: ' This fare is only valid on the train(s) specified.',
        gsTipTitle: 'Groupsave discount applied',
        norcTipTitle: 'Railcard has not been applied as there is a cheaper ticket available shown here.',
        sLabel: null,
        sRadio: null,
        outSelected: false,
        inSelected: false,
        handoffDelay: 15000,
        returnName: 'returnFareReturn',
        prevSelected: null,
        //init is called on page load and by earlierLaterAjax
        init: function () {
            var that = this;
            var ctfResults = $('#ctf-results');
            var allRadios = ctfResults.find('input[type=radio]');
            var selectedRadios = ctfResults.find('input:checked');
            var isSingle = that.isSinglePage();
            var ctfCosts = $('#ctf-costs-p');
            var tocDropdown = $('#provider');

            that.initBaskets();
            that.addFocusRing(allRadios);

            //we don't want double bindings if this is run by earlierLaterAjax
            ctfResults.off();

            //as we've used .off() we need to add back in the more fares close trigger
            FC.moreFares.hideAll(null, null);

            selectedRadios.each(function () {
                that.sLabel = $(this).parent();
                that.sRadio = $(this);
                NRE.otherServices.addSingleLink($(this), true);

                if (isSingle) {
                    ctfCosts.hide();
                } else {
                    that.addSelectedCSS();
                    FC.prefVendorAjax({ target: this }, null);
                }
            });

            if (that.sRadio !== null) {
                FC.prefVendorAjax({ target: that.sRadio[0] }, tocDropdown);
            }

            that.swapNames();

            //catches enter key press on more fares only, all other key presses fall though
            ctfResults.on('keypress', function (e) {
                var target = $(e.target);
                var isMoreFares = false;
                if (e.keyCode === 13) {

                    isMoreFares = that.isMoreFares(target);
                    if (isMoreFares) {
                        that.onMoreFaresClick(e);
                        e.stopPropagation();
                        return false;
                    }
                }

            });

            //mousedown from more fares will fall through this function first time round, then run when explicitly triggered by onMoreFaresClick
            ctfResults.on('click', function (e, isMoreFaresTrigger) {
                var target = $(e.target);
                var targetNodeName = target[0].nodeName.toUpperCase();
                var isMoreFares = false;
                var that = NRE.basket;
                var targetParent = target.parent();
                var targetParentNodeName = targetParent[0].nodeName.toUpperCase();
                var targetType = target.attr('type');
                var enterTarget = [];
                var addToBasketClass = 'add-to-basket';
                var buyNowClass = 'buy-now';
                var singleClass = 'opsingle';

                if (e.keyCode === 13) {
                    enterTarget = that.findRadio(target[0]);
                    that.selectRadio(target[0]);

                    if (enterTarget.parent().hasClass(singleClass)) {
                        if (target.hasClass(addToBasketClass) || targetParent.hasClass(addToBasketClass)) {
                            that.onAddBasketClick(e);
                        } else if (target.hasClass(buyNowClass) || targetParent.hasClass(buyNowClass)) {
                            that.onBuyClick(e);
                        }
                    }
                } else {

                    if (targetNodeName === 'INPUT' && targetType === 'radio') {
                        isMoreFares = that.isMoreFares(target);
                        if (!isMoreFares) {
                            that.onFareClick(e, isMoreFaresTrigger);
                        }
                    }

                    if ((targetNodeName === 'SPAN' && (targetParentNodeName === 'BUTTON' || targetParentNodeName === 'INPUT')) || targetNodeName === 'BUTTON' || (targetNodeName === 'INPUT' && targetType === 'submit')) {
                        if (target.hasClass(buyNowClass) || targetParent.hasClass(buyNowClass)) {
                            that.onBuyClick(e);
                        } else if (target.hasClass(addToBasketClass) || targetParent.hasClass(addToBasketClass)) {
                            that.onAddBasketClick(e);
                        }
                    }
                }
            });

            //this will catch a more fares mousedown or arrow and escape key usage. Clicks on CTF matrix will fall through
            ctfResults.on('mousedown keyup', function (e) {
                var target = $(e.target);
                var that = NRE.basket;
                var moreFares = $('div.more-fares-list');
                var isMoreFares = that.isMoreFares(target);
                var escapeTargetDiv = target.parents('td > div');
                var anyRadiosSelected = moreFares.find('input[type=radio]:checked');
                var ctfResults1 = $('#ctf-results');
                var targetNodeName = target[0].nodeName.toUpperCase();

                //find mouse clicks on more fares
                if (typeof e.keyCode === 'undefined') {
                    if (isMoreFares && (targetNodeName === 'INPUT' || targetNodeName === 'LABEL')) {
                        that.onMoreFaresClick(e);
                    }
                } else {
                    //keypress. If escape key on more fares run the following
                    if (e.keyCode === 27 && isMoreFares) {

                        if (anyRadiosSelected.length > 0) {
                            that.onMoreFaresClick(e);
                        }

                        ctfResults1.trigger('HIDE_ALL', [escapeTargetDiv.find('.hide-fares a')[0], false]);
                    }
                }
            });

        },
        //returns a boolean for if current page is single journey
        isSinglePage: function () {
            var that = this;
            var returnResultsPanel = $('#ift');
            var isSingle = true;

            if (returnResultsPanel.length > 0) {
                isSingle = false;
            }

            return isSingle;
        },
        //adds selected state an removes from other fares in the same panel
        addSelectedCSS: function () {
            var that = this;
            var currentLabel = that.sLabel;
            var others = currentLabel.parent().parent().parent().parent().find('label');
            var singleClass = 'opsingle';
            var returnClass = 'opreturn';
            var returnSelectedClass = 'opreturnselected';

            if (currentLabel.hasClass(singleClass) === false) {
                others.each(function () {
                    this.className = this.className.replace(/selected/gi, '');
                });

                currentLabel.removeClass(returnClass).addClass(returnSelectedClass);
            }
        },
        //returns true or false depending on whether the element is a child of more-fares
        isMoreFares: function (element) {
            var isMoreFares = false;

            if (element.parents('.shadow-right').length > 0) {
                isMoreFares = true;
            }

            return isMoreFares;
        },
        //adds the focus ring events
        addFocusRing: function (elem) {
            elem.on('focus', function () {
                var $that = $(this);
                $that.parent().css('outline', '2px solid orange');
                $that = null;
            });

            elem.on('blur', function () {
                var $that = $(this);
                $that.parent().css('outline', '');
                $that = null;
            });
        },
        //returns restriction string. Used in writeRestrictionString
        writeRestrictionString: function (i, ticketType, ticketRestrictionText, length) {
            var addText = '';
            var that = this;
            var incrementI = i + 1;
            var ticketString = 'Ticket ';
            var flexibleVal = 'FLEXIBLE';
            var restrictedVal = 'RESTRICTED';

            if (length > 1) {
                addText = addText + ticketString + incrementI + ': ';
            }

            if (ticketType === flexibleVal) {
                addText = addText + ticketRestrictionText + that.flexibleText;
            }
            else if (ticketType === restrictedVal) {
                addText = addText + ticketRestrictionText + that.restrictedText;
            } else {
                addText = addText + ticketRestrictionText;
            }

            return addText;
        },
        //returns ticket details html. Inserts the returned restriction string, builds html and returns text item, loops through multi farebreakdown. Used in popTD.
        insertTicketDetails: function (ticketDetailsElement, fareBreakdown) {
            var that = this;
            var $h5 = ticketDetailsElement.find('h5');
            var fareBreakdownLength = fareBreakdown.length;
            var textItem = [];
            var p = null;
            var $p = null;
            var i = 0;
            var newText = '';
            var ticketDetailsHtmlStart = '<p class="ti';
            var ticketDetailsHtmlEnd = '"></p>';
            var lastTicketDetailsElement = 'p:last';
            var newTicketDetailsElement = 'p.ti';


            if (ticketDetailsElement.find('p').length > 0 && fareBreakdown.length !== 0) {
                ticketDetailsElement.find('p').remove();
            }

            ticketDetailsElement.show();

            for (i = 0; i < fareBreakdownLength; i++) {
                newText = '';

                if (i === 0) {
                    $h5.after(ticketDetailsHtmlStart + i + ticketDetailsHtmlEnd);
                } else {
                    ticketDetailsElement.find(lastTicketDetailsElement).after(ticketDetailsHtmlStart + i + ticketDetailsHtmlEnd);
                }

                $p = ticketDetailsElement.find(newTicketDetailsElement + i);

                newText = that.writeRestrictionString(i, fareBreakdown[i].nreFareCategory, fareBreakdown[i].fareRouteDescription, fareBreakdownLength);

                textItem.push(newText);
                $p.html(newText);
            }

            $p = null;
            $h5 = null;
            fareBreakdownLength = null;
            newText = null;

            return textItem;
        },
        //builds the ticket details html, inserts it, and shows/hides the out and return
        popTD: function (radio) {
            var that = this;
            var fareBreakdown = NRE.fares.findJSON(radio, 'fare', false);
            var clickedElementContainer = radio.parents('td > div');
            var fareInfo = NRE.fares.getInfo(fareBreakdown, clickedElementContainer, true, true, false, false);
            var slider = NRE.fares.findSlider(radio);
            var $selectedElement = '';
            var $otherElement = '';
            var ticketDetailsElementClass = '';
            var otherTicketDetailsElementClass = '';

            ticketDetailsElementClass = fareInfo.isOutbound ? 'td-out' : 'td-ret';
            otherTicketDetailsElementClass = ticketDetailsElementClass === 'td-out' ? 'td-ret' : 'td-out';

            $selectedElement = slider.find('div.' + ticketDetailsElementClass);
            $otherElement = slider.find('div.' + otherTicketDetailsElementClass);

            $selectedElement.show();
            $otherElement.hide();

            //populate the ticket details
            $selectedElement.find('p').remove();
            $otherElement.find('p').remove();

            if (fareBreakdown[0] !== null) {
                that.insertTicketDetails($selectedElement, fareBreakdown);
            }


        },
        //sets the fare information panels based on the 
        tabBask: function () {
            var that = this;
            var ctfResults = $('#ctf-results');
            ctfResults.find('div.f-' + FC.fareSwitcher.oTab).hide();
            ctfResults.find('div.f-' + FC.fareSwitcher.cTab).show();
        },
        //enables/disables the top and bottom buttons based on the values of inSelected and outSelected (should not be called for single journeys)
        setButtonState: function () {
            var that = this;
            var topButtons = $('#ctf-cf button');
            var botButtons = $('#ctf-costs button');
            var disabledClass = 'buyDis';

            if (that.outSelected && that.inSelected) {
                topButtons.each(function () {
                    var $that = $(this);
                    $that[0].removeAttribute('disabled');
                    $that.removeClass(disabledClass);
                });
                botButtons.each(function () {
                    var $that = $(this);
                    $that[0].removeAttribute('disabled');
                    $that.removeClass(disabledClass);
                });

            } else {
                topButtons.attr('disabled', true);
                topButtons.addClass(disabledClass);
                botButtons.attr('disabled', true);
                botButtons.addClass(disabledClass);
            }
        },
        //adds an S to radio button names on hidden tab only if return journey and the selected radio aren't on the hidden tab
        swapNames: function () {
            var that = this;
            var ctfResults = $('#ctf-results');
            var otherTabRadios = ctfResults.find('div.' + FC.fareSwitcher.oTab + ' input[type=radio]');
            var currentTabRads = ctfResults.find('div.' + FC.fareSwitcher.cTab + ' input[type=radio]');
            var currentRadioName = '';
            var selectedTab = null;
            var outwardName = 'outward.option';
            var inwardName = 'returning.option';

            if (that.sRadio !== null) {
                selectedTab = that.sRadio.parent().parent('div').hasClass('return') ? 'return' : 'single';
                currentRadioName = that.sRadio.attr('name');

                if (currentRadioName !== outwardName && currentRadioName !== inwardName) {

                    currentTabRads.each(function () {
                        var $that = $(this);
                        var newName = $that.attr('name').replace('S', '');

                        $that.attr('name', newName);
                        $that = null;
                        newName = null;
                    });

                    otherTabRadios.each(function () {
                        var $that = $(this);
                        var curName = $that.attr('name');
                        var newName = curName + 'S';

                        if (curName.indexOf('S') === -1) {
                            $that.attr('name', newName);
                        }

                        $that = null;
                        newName = null;
                    });

                    that.deselectRadios();
                } else {
                    if (otherTabRadios.length > 0 && FC.fareSwitcher.oTab !== selectedTab) {
                        if (typeof otherTabRadios.attr('name') !== 'undefined') {
                            if (otherTabRadios.attr('name').indexOf('S') === -1 && FC.fareSwitcher.hasFS) {
                                otherTabRadios.each(function () {
                                    var $that = $(this);
                                    var newName = $that.attr('name') + 'S';

                                    $that.attr('name', newName);

                                    $that = null;
                                    newName = null;
                                });

                                that.deselectRadios();
                            }
                        }
                    }
                }

            }
        },
        //deselects and radios with an 'S' in the name attribute
        deselectRadios: function () {
            var otherRadios = $('input[name*="S"]');

            otherRadios.each(function () {
                var $that = $(this);
                $that.prop('checked', false);
                this.checked = false;
            });
        },
        //returns string url for use on the fare type
        buildFareInfoLink: function (fareBreakdown) {
            var fareLink = fcPth.advInfoUrl;

            if (fareBreakdown !== null) {
                //additional data for link added 30.3.2011 with coversation with Daniel Lees at THALES
                if (fareBreakdown.ticketTypeCode !== '') {
                    fareLink += '&ticketTypeCode=' + fareBreakdown.ticketTypeCode;
                }
                if (fareBreakdown.ticketRestriction !== '') {
                    fareLink += '&ticketRestriction=' + fareBreakdown.ticketRestriction;
                }
            }
            fareLink += '&callingPage=' + window.location.pathname.toString();
            return fareLink;
        },
        //returns a float string, formated to 2 decimal places. Adds the outbound and inbound (if present or selected)
        grandTotal: function (fareInfoObject) {
            var grandTotal = 0;
            var that = this;

            if (fareInfoObject.isReturnJourney && fareInfoObject.isSingleAsReturn) {

                grandTotal = grandTotal + parseFloat(that.fareAdder(fareInfoObject.outboundFare));
                grandTotal = grandTotal + parseFloat(that.fareAdder(fareInfoObject.inboundFare));

            } else if ((fareInfoObject.isReturnJourney && !fareInfoObject.isSingleAsReturn) || !fareInfoObject.isReturnJourney) {

                grandTotal = grandTotal + parseFloat(that.fareAdder(fareInfoObject.outboundFare));

            }

            return grandTotal.toFixed(2);
        },
        //returns a float string, formatted to 2 decimal places. Loops through the provided multi farebreakdown. Used by grandTotal. 
        fareAdder: function (fareBreakdown) {
            var i = 0;
            var iLen = fareBreakdown.length;
            var total = 0;

            if (fareBreakdown[i] !== null) {
                if (typeof fareBreakdown[i].ticketPrice !== 'undefined') {
                    for (i = 0; i < iLen; i++) {
                        total = parseFloat(total) + parseFloat(fareBreakdown[i].ticketPrice);
                    }
                }
            }

            return total.toFixed(2);
        },
        //returns a boolean on whether a railcar is needed. Used by buildBasketItem.
        needRailcard: function () {
            var needsRailcard = false;

            if ($('th.fare .small-print').text().indexOf('railcard') > -1) {
                needsRailcard = true;
            }

            return needsRailcard;
        },
        //writes and individual basket line item. Used by basketDisplay.
        buildBasketItem: function (fareBreakdown, isSliderBasket) {
            var that = this;
            var fareInformationLink = that.buildFareInfoLink(fareBreakdown);
            var needsRailcard = that.needRailcard();
            var price = parseFloat(fareBreakdown.ticketPrice);
            //set default railcard variables to groupsave
            var tempFareTicketType = '';
            var fareTicketTypeCSS = '';
            var railcardTipTitle = that.gsTipTitle;
            var railcardTipClass = 'group-save';
            var railcardTipText = 'GroupSave discount applied';
            var railcardHtmlPart = '"><span class="rcNum">' + fareBreakdown.numberOfTickets + '</span> x <span class="rcType">' + fareBreakdown.railcardName + '</span>';
            var railcardPriceString = '- &pound;<span class="rcPNum">' + parseFloat(fareBreakdown.discount).toFixed(2) + '</span>';
            var htmlString = '<tr class="miniBasketFare"><td><span class="type">';

            tempFareTicketType = fareBreakdown.fareTicketType;
            tempFareTicketType = tempFareTicketType.toLowerCase();
            if(tempFareTicketType.indexOf('travelcard') !== -1){
                fareTicketTypeCSS = 'class="ic-trvlcrd"';
            }
            else{
                fareTicketTypeCSS = '';
            }

            if (isSliderBasket) {
                if ((needsRailcard && fareBreakdown.railcardName !== '')|| fareBreakdown.railcardName === 'GroupSave') {
                    price = parseFloat(fareBreakdown.ticketPrice) + parseFloat(fareBreakdown.discount);
                }

                if (needsRailcard && fareBreakdown.railcardName === '') {
                    railcardTipTitle = that.norcTipTitle;
                    railcardTipClass = 'no-rc';
                    railcardTipText = 'Railcard not applied';
                    railcardPriceString = '&nbsp;';
                }

                if (fareBreakdown.railcardName === 'GroupSave' || (needsRailcard && fareBreakdown.railcardName === '')) {
                    railcardHtmlPart = ' tooltip"><a class="' + railcardTipClass + '" href="#" tip-title="' + railcardTipTitle + '">' + railcardTipText + '</a>';
                }


                htmlString = htmlString + '<span class="fNum">' + fareBreakdown.numberOfTickets + '</span> x <span class="fPass">' + fareBreakdown.passengerType + '</span> - <a ' + fareTicketTypeCSS + ' href="' + fareInformationLink + '">' + fareBreakdown.fareTicketType +'</a></span></td><td class="price">&pound;<span class="fPNum">' + price.toFixed(2) + '</span></td>';




                if (fareBreakdown.railcardName !== '' || (needsRailcard && fareBreakdown.railcardName === '')) {

                    htmlString = htmlString + '</tr><tr class="miniBasketRailcard"><td><span class="type' + railcardHtmlPart + '</span></td><td class="price">' + railcardPriceString + '</td>';
                }

                if (needsRailcard && fareBreakdown.railcardName === 'GroupSave') {

                    railcardTipTitle = that.norcTipTitle;
                    railcardTipClass = 'no-rc';
                    railcardTipText = 'Railcard not applied';
                    railcardPriceString = '&nbsp;';
                    railcardHtmlPart = ' tooltip"><a class="' + railcardTipClass + '" href="#" tip-title="' + railcardTipTitle + '">' + railcardTipText + '</a>';

                    htmlString = htmlString + '</tr><tr class="miniBasketRailcard"><td><span class="type' + railcardHtmlPart + '</span></td><td class="price">' + railcardPriceString + '</td>';

                }
            } else {

                htmlString = htmlString + '<strong>' + fareBreakdown.numberOfTickets + ' x ' + fareBreakdown.passengerType + '</strong> - <a '+ fareTicketTypeCSS + ' href="' + fareInformationLink + '">' + fareBreakdown.fareTicketType + '</a></span>';

                if (fareBreakdown.railcardName !== '') {
                    htmlString = htmlString + '<span class="type"> (' + fareBreakdown.railcardName + ') </span><strong class="saving">Saving &pound;' + parseFloat(fareBreakdown.discount).toFixed(2) + '</strong>';
                }

                htmlString = htmlString + '</td><td class="price">&pound;' + price.toFixed(2) + '</td>';

            }

            htmlString = htmlString + '</tr>';

            return htmlString;
        },
        //shows and hides relevent tbody, adds the total, inserts basket line item html
        basketDisplay: function (fareInfoObject, isSelectedFare, fareInfoBasket, isSliderBasket) {
            //default values are set for outbound and isSliderBasket === false;
            var that = this;
            var basketHtml = '';
            var otherBasketHtml = '';
            var basketTotal = that.grandTotal(fareInfoObject);
            var noneSelectedBasketBody = fareInfoBasket.find('tbody.miniBasketNone');
            var selectedBasketBody = '';
            var otherBasketBody = '';
            var i = 0;
            var iLen = fareInfoObject.outboundFare[0] !== null ? fareInfoObject.outboundFare.length : 0 ;
            var o = 0;
            var oLen = fareInfoObject.inboundFare[0] !== null ? fareInfoObject.inboundFare.length : 0;
            var currentBreakdown = fareInfoObject.outboundFare;
            var otherBreakdown = fareInfoObject.inboundFare;
            var placeholderText = 'Please select return journey';
            var outwardPlaceholderText = 'Please select outward journey';
            var totalPriceSpan = fareInfoBasket.parent().find('.ticket-total .price');
            var isInboundReturn = fareInfoObject.isReturnJourney && fareInfoObject.isSingleAsReturn === false && fareInfoObject.isOutbound === false;
            var basketSingleFare = fareInfoBasket.find('tbody.miniBasketSingleFare');
            var basketSingleFareOutward = fareInfoBasket.find('tbody.miniBasketSingleFareOutward');
            var basketsingleFareReturn = fareInfoBasket.find('tbody.miniBasketSingleFareReturn');
            var basketReturnFare = fareInfoBasket.find('tbody.miniBasketReturnFare');
            var totalElement = '.ticket-total .price';
            var subTotalElement = 'tr.sub-total';
            var itemRow = 'tr.miniBasketFare';
            var singleReturnClass = 'miniBasketSingleFareReturn';
            var returnClass = 'miniBasketReturnFare';
            var isUsedClass = 'isUsed';
            var railcardRow = 'tr.miniBasketRailcard';

            if (!fareInfoObject.isOutbound) {
                iLen =  fareInfoObject.inboundFare[0] !== null ? fareInfoObject.inboundFare.length : 0;
                currentBreakdown = fareInfoObject.inboundFare;
                oLen = fareInfoObject.outboundFare[0] !== null ? fareInfoObject.outboundFare.length : 0;
                otherBreakdown = fareInfoObject.outboundFare;
                placeholderText = outwardPlaceholderText;
            }

            noneSelectedBasketBody.hide();

            //set the variable values and hide not used baskets
            if (!fareInfoObject.isReturnJourney && fareInfoObject.isOutbound) {
                //single journey and so single fare

                for (i = 0; i < iLen; i++) {
                    basketHtml = basketHtml + that.buildBasketItem(fareInfoObject.outboundFare[i], isSliderBasket);
                }

                selectedBasketBody = basketSingleFare;
                basketSingleFareOutward.hide();
                basketsingleFareReturn.hide();
                basketReturnFare.hide();

                if (isSliderBasket) {
                    totalPriceSpan = selectedBasketBody.find(totalElement);
                }

            } else {
                //return journey

                if (fareInfoObject.isSingleAsReturn) {
                    //Single as Return
                    basketReturnFare.hide();
                    basketSingleFare.hide();
                } else {
                    //Return
                    basketsingleFareReturn.hide();
                    basketSingleFareOutward.hide();
                    basketSingleFare.hide();
                }

                //setting selectedBasketBody and otherBasketBody as neccessary
                if (fareInfoObject.isSingleAsReturn && fareInfoObject.isOutbound) {
                    //single as return outbound
                    selectedBasketBody = basketSingleFareOutward;
                    otherBasketBody = basketsingleFareReturn;

                } else if (fareInfoObject.isSingleAsReturn && !fareInfoObject.isOutbound) {
                    //single as return inbound
                    selectedBasketBody = basketsingleFareReturn;
                    otherBasketBody = basketSingleFareOutward;
                } else if (!fareInfoObject.isSingleAsReturn && fareInfoObject.isOutbound) {
                    //return outbound
                    selectedBasketBody = basketReturnFare;
                } else {
                    //return inbound
                    selectedBasketBody = basketReturnFare;
                }

                //generate basket line items
                for (i = 0; i < iLen; i++) {
                    basketHtml = basketHtml + that.buildBasketItem(currentBreakdown[i], isSliderBasket);
                }

                //for singles as returns, write in the other basket, only if the other fare is selected
                if (fareInfoObject.isSingleAsReturn && otherBreakdown[0] !== null) {
                    for (o = 0; o < oLen; o++) {
                        otherBasketHtml = otherBasketHtml + that.buildBasketItem(otherBreakdown[o], isSliderBasket);
                    }
                    otherBasketBody.find(itemRow).remove();
                    otherBasketBody.find(railcardRow).remove();
                    otherBasketBody.find(subTotalElement).before(otherBasketHtml);
                    otherBasketBody.show();
                }

                //if other fare is not selected, show the placeholder text and it's not an inbound return
                if (otherBreakdown[0] === null && isInboundReturn === false) {
                    //if the other fare is not selected, then add the placeholder text, again excluding inbound returns
                    noneSelectedBasketBody.show();
                    noneSelectedBasketBody.find('th').text(placeholderText);
                }

            }

            //write in the basket items only if the fare is single, for return journeys and not inbound returns
            if (fareInfoObject.isReturnJourney === false || (fareInfoObject.isReturnJourney && isInboundReturn === false)) {
                selectedBasketBody.find(itemRow).remove();
                selectedBasketBody.find(railcardRow).remove();
                selectedBasketBody.find(subTotalElement).before(basketHtml);
                selectedBasketBody.show();

                //if it's a fare info basket and a return journey, we may need to find the other basket tbody to write in the total (as it appears last)
                if (isSliderBasket && fareInfoObject.isReturnJourney) {

                    //if we're populating the return journey or return ticket, we can use the selected basket tbody
                    if (selectedBasketBody.hasClass(singleReturnClass) || selectedBasketBody.hasClass(returnClass)) {
                        selectedBasketBody.find(totalElement).html('&pound;' + basketTotal);
                    } else {
                        //else we're populating the outbound single so need to use the return basket tbody
                        otherBasketBody.find(totalElement).html('&pound;' + basketTotal);
                    }
                } else {
                    //we have a single fare & single journey (totalPriceSpan was reset for singles above) or bottom basket (use totalPriceSpan default)
                    totalPriceSpan.html('&pound;' + basketTotal);
                }
            }

            //if it's a single basket or a return journey where we have 2 fares selected
            if (fareInfoObject.isReturnJourney === false || isSelectedFare) {
                fareInfoBasket.addClass(isUsedClass);
            } else {
                //also hiding the tbody on the inbound return as well as non-selected fares but this is not neccessary as it's never visible, just easier to write a single else clause
                fareInfoBasket.hide();
            }

            //reinit the tooltips
            if (selectedBasketBody !== '') {
                FC.tooltip(selectedBasketBody.find('.tooltip'));
            }

            if (otherBasketBody !== '') {
                FC.tooltip(otherBasketBody.find('.tooltip'));
            }
        },
        //either shows or hides the toc dropdown, logo, labels and title in the provided fare information slider
        showHideBasket: function (slider, isHide) {
            var $fareSumTitle = slider.find('h5.sum');
            var $pvLabel = slider.find('label.prov');
            var $pvSelect = slider.find('select');
            var $tocLogo = slider.find('div.operator-price');
            var miniBasket = slider.find('table.minibasket');

            if (isHide) {
                miniBasket.removeClass('isUsed');
                miniBasket.hide();
                $pvLabel.hide();
                $pvSelect.hide();
                $tocLogo.hide();
                $fareSumTitle.hide();
            } else {
                miniBasket.addClass('isUsed');
                miniBasket.show();
                $pvLabel.show();
                $pvSelect.show();
                $tocLogo.show();
                $fareSumTitle.show();
            }
        },
        //grabs all radios, loops through them all calling basketDisplay and popTD for all slider baskets, hides non-selected baskets on return journeys, calls basketDisplay for bottom basket, calls prefVendorAjax for all singles and selected return/SAR fares. Should only be used once to set up the page on load
        initBaskets: function () {
            var that = this;
            var fareRadios = $('td.fare > div > label input');
            var selectedOutboundRadio = $('#oft td.fare > .' + FC.fareSwitcher.cTab + ' > label input:checked');
            var outboundFareBreak = NRE.fares.findJSON(selectedOutboundRadio, 'fare', false);
            var outboundFareInfoObject = NRE.fares.getInfo(outboundFareBreak, selectedOutboundRadio, true, true, false, false);
            var otherOutboundSelectedRadio = $('#oft td.fare label input:checked');
            var otherOutboundFareBreak = [[]];
            var otherOutboundFareInfoObject = {};
            var bottomBasket = $('#minibasket-table');
            var fareInfoBasketClass = 'table.minibasket';
            var tocDropdown = $('#provider');

            //if the outbound radio is selected on the current tab, write in the basket
            if (selectedOutboundRadio.length > 0) {
                that.basketDisplay(outboundFareInfoObject, true, bottomBasket, false);
            } else {
                //else the selected radio is on the other tab
                otherOutboundFareBreak = NRE.fares.findJSON(otherOutboundSelectedRadio, 'fare', false);
                otherOutboundFareInfoObject = NRE.fares.getInfo(otherOutboundFareBreak, otherOutboundSelectedRadio, true, true, false, false);
                that.basketDisplay(otherOutboundFareInfoObject, true, bottomBasket, false);
            }

            fareRadios.each(function () {
                var $that = $(this);
                var breakdown = NRE.fares.findJSON($that, 'fare', false);
                var fareInfoObject = NRE.fares.getInfo(breakdown, $that, true, true, false, false);
                var isInboundReturn = fareInfoObject.isReturnJourney === true && fareInfoObject.isOutbound === false && fareInfoObject.isSingleAsReturn === false;
                var isOutboundReturn = fareInfoObject.isReturnJourney === true && fareInfoObject.isOutbound === true && fareInfoObject.isSingleAsReturn === false;
                var fareInformationSlider = NRE.fares.findSlider($that);
                var fareBasket = fareInformationSlider.find(fareInfoBasketClass);
                var isSelected = $that[0].checked;
                var isCheapest = $that.parent().parent().parent().parent().hasClass('has-cheapest');

                //only hide the basket on unselected fares for return journeys
                if (FC.fareSwitcher.hasFS && isSelected === false) {
                    that.showHideBasket(fareInformationSlider, true);
                }

                //only call prefVendorAjax for Singles and selected returns
                if (!FC.fareSwitcher.hasFS || isSelected) {
                    FC.prefVendorAjax({ target: $that[0] }, null);
                }

                //only do the following if it's not the inbound return
                if (isInboundReturn === false) {
                    that.basketDisplay(fareInfoObject, isSelected, fareBasket, true);
                    that.popTD($that);
                }

                if (isOutboundReturn === true && isSelected === true) {
                    that.ajaxValidInboundFares(fareInfoObject, 0, isCheapest, $that);
                }
            });

            //if it's a return journey and the outbound fare is selected, call prefVendorAjax
            if (FC.fareSwitcher.hasFS) {
                if (selectedOutboundRadio.length > 0) {
                    FC.prefVendorAjax({ target: selectedOutboundRadio[0] }, tocDropdown);
                }
            }

            //If the page loads with the single tab selected on returns, then we need to trigger a button price update. We only need to do this on singles as returns will trigger ajaxProcess, which in turn triggers a button update
            if (FC.fareSwitcher.cTab === 'single' && outboundFareInfoObject.isReturnJourney === true) {
                var grandTotal = that.grandTotal(outboundFareInfoObject);
                that.setButtonPrice(grandTotal, false);
            }


        },
        //returns a Jquery Radio button. Takes button, span, label or radio, plain old javascript style
        findRadio: function (target) {
            var targetType = target.nodeName.toUpperCase();
            var targetRadio = [];
            var $target = $(target);

            switch (targetType) {
                case 'BUTTON':
                    targetRadio = $target.parent().children('label').find('input[type=radio]');
                    break;
                case 'SPAN':
                    if ($target.parent()[0].nodeName.toUpperCase() === 'BUTTON') {
                        targetRadio = $target.parent().parent().children('label').find('input[type=radio]');
                    } else {
                        targetRadio = $target.parent().find('input[type=radio]');
                    }
                    break;
                case 'INPUT':
                    targetRadio = $target;
                    break;
                case 'LABEL':
                    targetRadio = $target.find('input[type=radio]');
                    break;
            }

            return targetRadio;
        },
        //takes a plain old javascript style button or a span, and sets the adjacent radio button to be selected 
        selectRadio: function (target) {
            var targetRadio = NRE.basket.findRadio(target);

            targetRadio[0].checked = true;
            targetRadio.prop('checked', true);
        },
        // updates the text on the buy now buttons at top and bottom
        setButtonPrice: function (price, isCheapest) {
            var buttonVal = isCheapest ? 'Buy cheapest for ' + fcPth.uniPound : 'Buy now for ' + fcPth.uniPound;

            if ($.browser.msie && $.browser.version.substr(0, 1) < 7 && $.browser.version.substr(0, 2).indexOf('.') !== -1) {
                $('#ctf-cf input.b-y, #buyNowFooter').val(buttonVal + price);
            } else {
                $('#ctf-cf button.b-y span, #buyNowFooter span').html(buttonVal + price);
            }
        },
        //disables all the inbound return fares
        disableInboundFares: function () {
            var radiosToDisable = $('#ift td.fare .return > label > input');

            radiosToDisable.each(function () {
                var $that = $(this);

                if (this.checked === true) {
                    NRE.basket.prevSelected = $that;
                    this.checked = false;
                    $that.prop('checked', false);
                }

                $that.prop('disabled', true);
                $that.hide();
                $that.parent().hide();
            });

            NRE.otherServices.removeLinks($('td.fare > div.return-only'));
        },
        //runs on validInboundFares ajax fail, updates baskets, buy now button text and sets top and bottom button states, is also called by ajaxFaresSuccess
        ajaxProcess: function (isCheapest, selectedOutRadio) {
            var that = NRE.basket;
            //var hasSelected = false;
            var slider = NRE.fares.findSlider(selectedOutRadio);
            var sliderBasket = slider.find('table.minibasket');
            var fareBreakdown = NRE.fares.findJSON(selectedOutRadio, 'fare', false);
            var fareInfoObject = {};
            var fareInfoObject1 = {};
            var grandTotal = '0.00';

            fareInfoObject = NRE.fares.getInfo(fareBreakdown, selectedOutRadio, 'breakdownAndRadio', true, false, false);
            grandTotal = that.grandTotal(fareInfoObject);
            that.outSelected = fareInfoObject.outboundFare[0] !== null;
            that.inSelected = fareInfoObject.inboundFare[0] !== null;

            that.setButtonPrice(grandTotal, isCheapest);

            that.finalUpdate(fareInfoObject, sliderBasket, slider);
        },
        //runs on validInboundFares ajax success, renables valid inbound fares, updates baskets, buy now button text and sets top and bottom button states
        ajaxFaresSuccess: function (data, isCheapest, selectedOutRadio) {
            var that = NRE.basket;
            var i = 0;
            var iLen = data.payload.length;
            var f = 0;
            var fLen = 0;
            var radio = $();
            var fareBreakdownContainer = $();
            var currentFare = null;

            that.disableInboundFares();


            for (i = 0; i < iLen; i++) {
                radio = $('#' + that.returnName + data.payload[i].jsonJourneyBreakdown.responseId + data.payload[i].jsonJourneyBreakdown.journeyId);

                if (radio.length > 0) {

                    radio.show();
                    radio.parent().show();
                    radio.removeAttr('disabled');
                    radio.parent().parent().removeClass('hidden');

                    NRE.fares.updateJson(radio, 'fareIdOnly', data.payload[i]);

                    if (that.prevSelected !== null) {
                        if (radio.attr('id') === that.prevSelected.attr('id')) {
                            radio.prop('checked', true);
                            radio[0].checked = true;
                        }
                    }
                }
            }

            that.ajaxProcess(isCheapest, selectedOutRadio);
        },
        //calls disableInboundFares, build validInboundFares ajax url and initialises ajax call
        ajaxValidInboundFares: function (fareInfoObject, grandTotal, isCheapest, selectedOutRadio) {
            var that = this;
            var url = fcPth.validInboundFares + fareInfoObject.outboundFare[0].fareId + '/' + fareInfoObject.outboundFare[0].responseId;

            $.ajax({
                url: url,
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    NRE.basket.ajaxFaresSuccess(data, isCheapest, selectedOutRadio);
                },
                error: function () { NRE.basket.ajaxProcess(isCheapest, selectedOutRadio); }
            });
        },
        //Triggers calls to external functions FC.prefVendorAjax, NRE.otherServices.addSingleLink, NRE.details.updateSingleLink. Triggers basketDisplay and showBasket.
        finalUpdate: function (fareInfoObject, sliderBasket, slider) {
            var that = NRE.basket;
            var otherFareInfo = null;
            var otherFareInfo1 = null;
            var otherSliderBasket = NRE.fares.findSlider(fareInfoObject.radio);
            var otherFareInfoBasket = otherSliderBasket.find('table.minibasket');
            var otherFarebreakdown = null;
            var otherFarebreakdown1 = null;
            var bottomBasket = $('#minibasket-table');
            var deleteOutwardOtherServicesOnly = false;

            that.setButtonState();
            that.basketDisplay(fareInfoObject, true, bottomBasket, false);


            that.basketDisplay(fareInfoObject, true, sliderBasket, true);
            that.showHideBasket(slider, false);

            //only set the other slider basket if both fares are selected
            if (that.inSelected && that.outSelected) {

                if (fareInfoObject.isOutbound) {
                    otherFarebreakdown = fareInfoObject.inboundFare;

                    FC.prefVendorAjax({ target: fareInfoObject.radio[0] }, null);
                } else {
                    otherFarebreakdown = fareInfoObject.outboundFare;

                    //if (fareInfoObject.isSingleAsReturn) {
                    FC.prefVendorAjax({ target: fareInfoObject.radio[0] }, null);
                    //}
                }

                //if this is being triggered from an inbound return we do not want to remove on and outbounds return we don't want to remove the inbounds as well
                if (fareInfoObject.isOutbound === false && fareInfoObject.isReturnJourney === true && fareInfoObject.isSingleAsReturn === false) {
                    deleteOutwardOtherServicesOnly = true;
                }

                otherFareInfo = NRE.fares.getInfo(otherFarebreakdown, fareInfoObject.radio, true, true, false, false);
                NRE.otherServices.addSingleLink(fareInfoObject.radio, true, deleteOutwardOtherServicesOnly);
                NRE.details.updateSingleLink(otherFarebreakdown, fareInfoObject.radio, otherFareInfo.isReturnJourney);

                //if it's single as return, we fully update the other basket
                if (fareInfoObject.isSingleAsReturn) {
                    that.basketDisplay(otherFareInfo, true, otherFareInfoBasket, true);
                }

                //if it's inbound return, we only hide the noneSelected TR. we do this by passing in the inbound fareinfo object but specifying the outbound slider basket
                if (fareInfoObject.isReturnJourney && fareInfoObject.isOutbound === false && fareInfoObject.isSingleAsReturn === false) {
                    that.basketDisplay(fareInfoObject, true, otherFareInfoBasket, true);
                }
            }

            if (fareInfoObject.isReturnJourney) {
                NRE.details.updateAllLinks();
            }
        },
        //runs on fare click.  If it's an outbound return, triggers  ajaxValidInboundFares else it trigger finalUpdate. If it's triggered by a moreFares mousedown, additionally calls popTD.
        onFareClick: function (e, isMoreFareTrigger) {
            var that = this;
            var isTriggeredFromMoreFares = typeof isMoreFareTrigger === 'undefined' ? false : isMoreFareTrigger;
            var selectedRadio = that.findRadio(e.target);
            var breakdown = NRE.fares.findJSON(selectedRadio, 'fare', false);
            var fareInfo = NRE.fares.getInfo(breakdown, selectedRadio, true, true, false, false);
            var grandTotal = that.grandTotal(fareInfo);
            var isCheapest = selectedRadio.parent().parent().parent().parent().hasClass('has-cheapest');
            var selectedFareBreakdowns = fareInfo.isOutbound ? fareInfo.outboundFare : fareInfo.inboundFare;
            var slider = NRE.fares.findSlider(selectedRadio);
            var isReturn = fareInfo.isSingleAsReturn === false ? true : false;
            var sliderBasket = slider.find('table.minibasket');
            var slidersToHide = null;
            var isOutboundReturn = fareInfo.isReturnJourney && fareInfo.isOutbound && isReturn;
            var tocDropdown = $('#provider');
            var outSliderStart = '#oft div.f-';
            var inSliderStart = '#ift div.f-';

            if (selectedRadio[0].checked === false) {
                selectedRadio[0].checked = true;
                selectedRadio.prop('checked', true);
            }

            that.sLabel = selectedRadio.parent();
            that.sRadio = selectedRadio;

            that.swapNames();

            FC.prefVendorAjax({ target: selectedRadio[0] }, tocDropdown);

            if (!isOutboundReturn) {
                that.setButtonPrice(grandTotal, isCheapest);
            }

            //if it's coming from more fares we need to update ticket details and slider basket
            if (isTriggeredFromMoreFares) {
                that.popTD(selectedRadio);
            }

            //if it's single
            if (fareInfo.isReturnJourney === false) {
                if (isTriggeredFromMoreFares) {
                    NRE.otherServices.removeLinks(selectedRadio.parent().parent());
                    NRE.otherServices.addSingleLink(selectedRadio, false);
                    NRE.details.updateSingleLink(selectedFareBreakdowns, selectedRadio, fareInfo.isReturnJourney);
                    that.basketDisplay(fareInfo, true, sliderBasket, true);
                }
            } else {
                //return journey
                NRE.otherServices.addSingleLink(selectedRadio, true);
                NRE.details.updateSingleLink(selectedFareBreakdowns, selectedRadio, fareInfo.isReturnJourney);
                FC.prefVendorAjax({ target: selectedRadio[0] }, null);
                that.addSelectedCSS();

                that.outSelected = fareInfo.outboundFare[0] !== null;
                that.inSelected = fareInfo.inboundFare[0] !== null;

                //update the bottom basket now if we don't need to wait for the ajax response from valid inbound fares
                if (!isOutboundReturn) {
                    that.finalUpdate(fareInfo, sliderBasket, slider);

                } else {
                    //we need to run the ajax functions first
                    that.ajaxValidInboundFares(fareInfo, grandTotal, isCheapest, selectedRadio);
                }

                if (fareInfo.isOutbound) {
                    slidersToHide = $(outSliderStart + FC.fareSwitcher.cTab).not(slider);
                } else {
                    slidersToHide = $(inSliderStart + FC.fareSwitcher.cTab).not(slider);
                }

                slidersToHide.each(function () {
                    that.showHideBasket($(this), true);
                });
            }
        },
        //selected the relevant fare, changes the form target and triggers the postpurchase page load
        onBuyClick: function (e) {
            var vendorValue = $(e.target).closest('tr').next().find('.f-single select').val();

            var globalSelect = $('#provider');
            var hiddenVendor = $('#prefVendor');

            NRE.prefVendor.addVendor(vendorValue);
            globalSelect.val(vendorValue);
            hiddenVendor.val(vendorValue);

            NRE.basket.selectRadio(e.target);

            $('#form1').attr('target', 'tocHandoff');

            setTimeout(loadHandoff, NRE.basket.handoffDelay);
        },
        //selected the relevant fare and changes the form target
        onAddBasketClick: function (e) {
            NRE.basket.selectRadio(e.target);

            $('#form1').attr('target', '_self');
        },
        //runs on mousedown on morefares. Moves selected fare into ctf matrix and refreshes more fares
        onMoreFaresClick: function (e) {
            var target = $(e.target);
            var targetNodeName = target[0].nodeName.toUpperCase();
            var liContent = null;
            var childrenToInsert = null;
            var targetDiv = target.parents('td > div');
            var tipText = '';
            var that = NRE.basket;
            var isSingle = false;
            var breakdownSpan = null;
            var breakdownInput = null;
            var breakdownInputToJSON = null;
            var newBreakdownJSON = [];
            var i = 0;
            var iLen = 0;
            var newForAttr = '';

            if (targetNodeName === 'LABEL') {
                target = target.children('input[type=radio]');
                targetNodeName = 'INPUT';
            }

            //Find the radio button
            liContent = target.parent('label').parent('li');
            childrenToInsert = liContent;

            //set the tooltip text
            tipText = liContent.find('.tooltip-top').text();

            //set is single
            if(targetDiv.children('label').hasClass('opsingle')){
                isSingle = true;
            }


            //we need to keep track of special class which denotes that this journey has a different responseId to the one on the script tag
            if (targetDiv.children('label').find('input[type=radio]')[0].className.indexOf('responseId-') > -1) {
                childrenToInsert.find('input[type=radio]').addClass(targetDiv.children('label').find('input[type=radio]')[0].className);
            }

            //remove old content
            targetDiv.children('span.fare-type').remove();
            targetDiv.children('span.fare-breakdown').remove();
            targetDiv.children('label').remove();
            targetDiv.children('p').remove();

            childrenToInsert.find('input[type=radio]').attr('checked', 'true');

            //if it's a single we need to add the class
            if (isSingle) {
                childrenToInsert.find('label').addClass('opsingle');
            } else {
                childrenToInsert.find('label').addClass('opreturn');
            }


            //move selected item from More Fares into main matrix
            targetDiv.find('h4.accessibility').after(childrenToInsert.html());

            newForAttr = targetDiv.find('label').eq(0).attr('for').replace('morefares', 'mFares');

            targetDiv.find('input[type=radio]')[0].id = targetDiv.find('input[type=radio]')[0].id.toString().replace('morefares', 'mFares');
            targetDiv.find('label').eq(0).attr('for', newForAttr);

            that.addFocusRing(targetDiv.find('input[type=radio]').first());



            if (targetDiv.find('.add-to-basket').length) {
                targetDiv.find('label').after(targetDiv.find('.add-to-basket'));
            }

            if (targetDiv.find('.buy-now').length) {
                targetDiv.find('label').after(targetDiv.find('.buy-now'));
            }

            //add the new farebreakdown to the script object and remove the farebreakdown


            breakdownSpan = targetDiv.find('> span.fare-breakdown');
            breakdownInput = breakdownSpan.find('input');
            iLen = breakdownInput.length;
            newBreakdownJSON = [];

            for (i = 0; i < iLen; i++) {
                newBreakdownJSON.push($.parseJSON($(breakdownInput[i]).val()));
            }

            NRE.fares.updateJson(targetDiv, 'fare', newBreakdownJSON);

            breakdownSpan.remove();

            //trigger a more fares click so all the baskets update
            targetDiv.find('input[type=radio]').first().trigger('click', [true]);

            //refresh the fares list to remove the newly selected fare and add the old selected fare to the more fares list
            FC.moreFares.refreshFares();


        }
    };
    return process;
})(FC, $);
//usage
/*
 use {{dataname}}, also accepts dot notation so {{dataname.nextleveldown}}. There is no limitation to the depth of the object.

 Use partials if you need to loop through an array of objects.

 For partials in template, put the following where the partial is be rendered {{<changesTooltip\.changes}} (dot notation must be ascaped). The partial must refer to an array of either objects or other arrays in your data. Partials are passed to the templater function in the fourth parameter as an array of objects:

 [{template: 'your html string', partialName: "changesTooltip\\.changes"}, {template: 'your html string', partialName: "changesTooltip\\.changes"}]

 Note that the dot notation must be double escaped.

 If you are using a partial to loop through an array of arrays, the partial template can use {{i}} to write in the content of that array index.

 {{#applyAlt}} can be used in partials, will write in the word 'alt' on alternating rows, used for alternating row colours

 There are some additional helpers for performing some basic formatting, useful for converting data to css class names:

 {{dataname#tolower}} - will convert string to lower case
 {{dataname#tolowerstrip}} - will convert string to lower case and remove spaces
 {{dataname#tolowerunder}} - will convert string to lower case, remove spaces and punctuation
 */
FC.templater = function (template, data, parent, partials) {
    var html = template, partialCache = [];
    var a = (parent) ? parent + '.' : '';
    var b = (parent) ? parent + '\\.' : '';
    var hasPartial = false;
    var partialItem = '';
    var partialDelimiter = '';
    function writePartial(objectName, thePartial, objectPartial) {
        partialCache = [];
        var prop = new RegExp('{{i}}', 'g'),
            altProp = new RegExp('{{#applyAlt}}', 'g'),
            parthtml = '',
            altClass = '';
        for (var x = 0, xLen = objectPartial.length; x < xLen; x++) {
            if (typeof objectPartial[x] === 'string') {
                parthtml = thePartial.template;
                if (parthtml.match(prop)) {
                    parthtml = parthtml.replace(prop, objectPartial[x]);
                    if (parthtml.match(altProp)) {
                        altClass = x % 2 === 0 ? '' : 'alt';
                        parthtml = parthtml.replace(altProp, altClass);
                    }
                    partialCache.push(parthtml);
                }
            } else {
                parthtml = thePartial.template;
                if (parthtml.match(altProp)) {
                    altClass = x % 2 === 0 ? 'alt' : '';
                    parthtml = parthtml.replace(altProp, altClass);
                }
                partialCache.push(FC.templater(parthtml, objectPartial[x]));
            }
            if (x !== xLen-1 && typeof thePartial.delimeter !== 'undefined') {
                partialCache.push(thePartial.delimeter);
            }
        }
        var partialReplace = new RegExp('{{<' + objectName + '}}', 'g');
        html = html.replace(partialReplace, partialCache.join(''));
        partialCache = null;
        partialReplace = null;
    }

    for (var name in data) {
        if (typeof name === 'string') {
            var property = new RegExp('{{' + b + name + '}}', 'g');
            var strippedString = '';
            if (typeof data[name] === 'object') {
                if (Object.prototype.toString.call(data[name]) === '[object Array]') {
                    //console.log(name + 'I found an array: ' + data[name]);
                    hasPartial = false;
                    partialItem = '';
                    if (typeof partials !== 'undefined') {
                        for (var x = 0, xLen = partials.length; x < xLen; x++) {
                            if (partials[x].partialName === b + name) {
                                hasPartial = true;
                                partialItem = partials[x];
                                break;
                            }
                        }
                        if (hasPartial) {
                            writePartial(b + name, partialItem, data[name]);
                        }
                    }
                }
                else {
                    html = FC.templater(html, data[name], a + name, partials);
                }
            } else {
                if (html.match(property)) {
                    html = html.replace(property, data[name]);
                }
                //does it have a tolower modifier
                var modifierProp = new RegExp('{{' + b + name + '#tolower}}', 'g');
                if (html.match(modifierProp)) {
                    html = html.replace(modifierProp, data[name].toLowerCase());
                }
                modifierProp = new RegExp('{{' + b + name + '#tolowerstrip}}', 'g');
                if (html.match(modifierProp)) {
                    strippedString = data[name].toLowerCase().replace(/[^\w]/g, '');
                    html = html.replace(modifierProp, strippedString);
                }
                modifierProp = new RegExp('{{' + b + name + '#tolowerstripunder}}', 'g');
                if (html.match(modifierProp)) {
                    strippedString = data[name].toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
                    html = html.replace(modifierProp, strippedString);
                }
                modifierProp = new RegExp('{{' + b + name + '#cleanstrict}}', 'g');
                if (html.match(modifierProp)) {
                    strippedString = NRE.utilities.cleanStringStrict(data[name]);
                    html = html.replace(modifierProp, strippedString);
                }
                modifierProp = new RegExp('{{' + b + name + '#cleanfloat}}', 'g');
                if (html.match(modifierProp)) {
                    strippedString = NRE.utilities.cleanFloat(data[name]);
                    html = html.replace(modifierProp, strippedString);
                }
                modifierProp = new RegExp('{{' + b + name + '#cleannumber}}', 'g');
                if (html.match(modifierProp)) {
                    strippedString = NRE.utilities.cleanNumber(data[name]);
                    html = html.replace(modifierProp, strippedString);
                }
                modifierProp = null;
            }
            property = null;
        }
    }
    return html;

};
FC.cleanTemplate = function (template) {
    var unmatchedData = new RegExp('{{(.*?)}}', 'g'),
        found = template.match(unmatchedData),
        cleanTemplate = '';
    if (found !== null) {
        NRE.utilities.safeConsole('The following data was not matched: ' + found);
        cleanTemplate = template.replace(unmatchedData, '');
    } else {
        cleanTemplate = template;
    }
    return cleanTemplate;
};
/// <reference path="basket.js" />
NRE.earlierLaterAjax = (function (NRE,FC,$) {
    var process = {
        callAjaxNo: 0,
        type: '',
        noType: 0,
        lastDirect: '',
        ajaxUrl: '',
        direction: '',
        isOut: true,
        isEarlier: true,
        tableTU: null,
        rowCount: 0,
        cheapFare: null,
        cheapFarePrice: null,
        cheapType: null,
        otherSing: null,
        ssUrl: null,
        fareHTML: null,
        radioToSelect: null,
        isCancelled: false,
        //does what is says on the tin, converts a string, with or without a pound sign to a number
        stringToNum: function (priceStr) {
            var numCost = 0;
            var noPound = '';
            if (typeof priceStr === 'undefined') {
                return 0;
            }
            noPound = priceStr.toString().replace(/[£]|[&pound;]|[\u00A3]/gi, '');
            try {
                numCost = parseFloat(noPound);
            }
            catch (e) {
                numCost = 0;
            }

            return numCost;
        },
        //add the AJAX call url to the a tags on the page
        manipHrefs: function () {
            ///service/timesandfares/moreTrains?outbound=true&earlier=true
            var laterLinks = $('#ctf-results span.ctf-later a');
            var earlierLinks = $('#ctf-results span.ctf-earlier a');

            laterLinks.each(function () {
                var $that = $(this);
                var href = $that.attr('href').split('/')[3];
                switch (href) {
                    case 'laterOutbound':
                        $that.attr('data-ajaxUrl', '/service/timesandfares/moreTrains?outbound=true&earlier=false');
                        break;
                    case 'laterInbound':
                        $that.attr('data-ajaxUrl', '/service/timesandfares/moreTrains?outbound=false&earlier=false');
                        break;
                }
                $that = null;
                href = null;
            });

            earlierLinks.each(function () {
                var $that = $(this);
                var href = $that.attr('href').split('/')[3];
                switch (href) {
                    case 'earlierOutbound':
                        $that.attr('data-ajaxUrl', '/service/timesandfares/moreTrains?outbound=true&earlier=true');
                        break;
                    case 'earlierInbound':
                        $that.attr('data-ajaxUrl', '/service/timesandfares/moreTrains?outbound=false&earlier=true');
                        break;
                }
                $that = null;
                href = null;
            });
            earlierLinks = null;
            laterLinks = null;
        },
        //main initialisation function
        init: function () {
            var that = this;
            var aTags = $('div.ctf-bar a');
            that.fareHTML = $('.faredets:first')[0].innerHTML;
            aTags.bind('click', function (e) {
                that.doClick(e, that);
            });
            that.manipHrefs();
            aTags = null;
        },
        //not entirely sure the following function is being used at all
        callAjax: function () {
            var that = this;
            that.callAjaxNo++;
            that.ajax();
        },
        //generic function for getting parameters from a URL
        getParam: function (key, url) {
            var keysValues = url.split(/[\?&]+/);
            var i = 0;
            var keyValue = '';
            for (i = 0; i < keysValues.length; i++) {
                keyValue = keysValues[i].split('=');
                if (keyValue[0] === key) {
                    return keyValue[1];
                }
            }
        },
        //puts the spinner in the page
        addSpinner: function () {
            var that = this;
            var spinnerHTML = '<tr id="ajaxWait"><td colspan="9" class="ajaxWait"><span class="ajaxText">Getting more trains for you, please wait</span> <img id="loadingImg" src="' + fcPth.ldImg + '" /></td></tr>';

            if (that.type.indexOf('earlier') > -1) {
                that.tableTU.prepend(spinnerHTML);
            } else {
                that.tableTU.append(spinnerHTML);
            }
            spinnerHTML = null;
        },
        //removes the spinner from the page
        removeSpinner: function () {
            $('#ajaxWait').remove();
        },
        //logic for putting the alternate colours on the table rows after the ajax results has been inserted
        styleRows: function (uTable) {
            var tableRows = uTable.find('tr.mtx');
            var that = this;
            that.rowCount = tableRows.length;
            tableRows.each(function (index) {
                var $that = $(this);
                var rowType = index % 2;
                if (index === 0) {
                    $that.addClass('first');
                }
                if ((index + 1) === that.rowCount) {
                    $that.addClass('last');
                }
                if (rowType === 0) {
                    $that.removeClass('alt');
                } else {
                    $that.addClass('alt');
                }
                $that = null;
                rowType = null;
            });
            tableRows = null;
        },
        //main triggering funtion
        doClick: function (e, context) {
            e.preventDefault();
            var that = context;
            var direction = '';
            var isEarlier = '';
            var parentOfRemoved = '';
            var trsToRemove = '';
            var ajaxTrsToRemove = '';
            that.ajaxUrl = $(e.target).attr('data-ajaxUrl');
            that.ssUrl = $(e.target).attr('href');
            //work out the direction & type of call (earlier or later)
            direction = that.getParam('outbound', that.ajaxUrl);
            if (direction !== '') {
                that.isOut = (direction === 'true');
            }
            isEarlier = that.getParam('earlier', that.ajaxUrl);
            if (isEarlier !== '') {
                that.isEarlier = (isEarlier === 'true');

            }
            if (that.isEarlier && that.isOut) {
                that.type = 'earlierOutbound';
            } else if (that.isEarlier && !that.isOut) {
                that.type = 'earlierInbound';
            } else if (!that.isEarlier && that.isOut) {
                that.type = 'laterOutbound';
            } else if (!that.isEarlier && !that.isOut) {
                that.type = 'laterInbound';
            }
            //that.type = that.isEarlier ? 'earlier' : 'later';
            that.direction = that.isOut ? 'outbound' : 'return';
            if (that.type.indexOf('Outbound') > -1) {
                that.tableTU = $('#ctf-results #oft > tbody');
            } else {
                that.tableTU = $('#ctf-results #ift > tbody');
            }


            that.radioToSelect = that.isOut ? $('#oft').find('input[type=radio]').filter(':checked') : $('#ift').find('input[type=radio]').filter(':checked');

            that.callAjaxNo++;
            that.noType++;
            //console.log(that);
            if (that.lastDirect !== that.direction) {
                that.noType = 1;
                that.callAjaxNo = 1;
                ajaxTrsToRemove = that.isOut ? $('#ift').find('tr.ajaxRow') : $('#oft').find('tr.ajaxRow');
                trsToRemove = that.isOut ? $('#oft').find('tbody tr') : $('#ift').find('tbody tr');
                parentOfRemoved = ajaxTrsToRemove.parent();
                ajaxTrsToRemove.remove();
                trsToRemove.remove();
                parentOfRemoved.each(function () {
                    var $that = $(this);
                    that.styleRows($that);
                    $that = null;
                });
                window.location = that.isOut ? '#outwardJump' : '#returnJump';
                that.addSpinner();
                that.ajax();
            } else if (that.noType >= 5) {
                //console.log('more than 5 sets of results');
                //that.noType = 1;
                //that.callAjaxNo = 1;
                //$('#ctf-results').find('tr.ajaxRow').remove();
                //that.writeNewRows(data, context);
                //window.location = $(e.target).attr('href');
                that.replanJourney();
            } else {
                trsToRemove = that.isOut ? $('#oft').find('tbody tr') : $('#ift').find('tbody tr');
                trsToRemove.remove();
                window.location = that.isOut ? '#outwardJump' : '#returnJump';
                that.addSpinner();
                that.ajax();
            }

            ajaxTrsToRemove = null;
            trsToRemove = null;
            parentOfRemoved = null;
            direction = '';
            isEarlier = '';

        },
        //will trigger a serverside journey plan, can be used for edge cases that ajax cannot handle
        replanJourney: function () {
            var that = this;
            if (that.ssUrl !== null) {
                window.location = that.ssUrl;
            }
        },
        //update travel card filter in header
        updateTc: function (htmlItem, data) {
            var that = this;
            var ftext = htmlItem.find('a span:first-child');
            var fprice = htmlItem.find('a span.ctf-price span');
            var fpriceNo = that.stringToNum(data.faresTravelcardCheapestPrice);
            var fpriceNoExist = that.stringToNum(fprice.text());

            if (data.showingTravelcardPrices && (fpriceNo > 0 && fpriceNo < fpriceNoExist && fpriceNo < 900000)) {
                ftext.text('without Travelcard');
                fprice.html('&pound;' + fpriceNo.toFixed(2));
            } else if ((data.showingTravelcardPrices === false) && (fpriceNo > 0 && fpriceNo < fpriceNoExist && fpriceNo < 900000)) {
                ftext.text('with Travelcard');
                fprice.html('&pound;' + fpriceNo.toFixed(2));
            }
        },
        //update first class filter in header, if needed fired updateTc to do the travelcards
        updateFilters: function (data) {
            var filterItem = $('#ctf-so');
            var fsItem = filterItem.find('li.ctf-first');
            var tcItem = filterItem.find('li.ctf-card');
            var wtcItem = filterItem.find('li.ctf-no-card');
            var that = this;
            var ftext = '';
            var fprice = '';
            var priceIsNan = '';
            var fpriceNo = '';
            var fpriceNoExist = '';

            if (fsItem.length > 0) {
                ftext = fsItem.find('span:first-child');
                fprice = fsItem.find('span.ctf-price span');
                priceIsNan = isNaN(data.faresPromotionCheapestPrice);
                fpriceNo = that.stringToNum(data.faresPromotionCheapestPrice);
                fpriceNoExist = that.stringToNum(fprice.text());

                if (data.faresPromotionStatus.toUpperCase() === 'FIRST' && (fpriceNo > 0 && fpriceNo < fpriceNoExist && fpriceNo < 900000)) {
                    ftext.text('First class');
                    fprice.html('&pound;' + fpriceNo.toFixed(2));
                }
                if (data.faresPromotionStatus.toUpperCase() === 'STANDARD' && (fpriceNo > 0 && fpriceNo < fpriceNoExist && fpriceNo < 900000)) {
                    ftext.text('Standard class');
                    fprice.html('&pound;' + fpriceNo.toFixed(2));
                }
                ftext = null;
                fprice = null;
            }

            if (tcItem.length > 0) {
                that.updateTc(tcItem, data);
            }

            if (wtcItem.length > 0) {
                that.updateTc(wtcItem, data);
            }

            filterItem = null;
            fsItem = null;
            tcItem = null;
            wtcItem = null;
        },
        //finds the cheapest single fare in the opposite direction to the ajax call, so a total fare can be calculated
        findOtherSing: function (cont) {
            var that = this;
            var singleConts = cont.find('div.single').has('span.fare-breakdown input');
            var pricesArray = [];
            var osNum = -1;
            var minVal = 0;
            var j = 0;
            var jLen = 0;

            singleConts.each(function () {
                var breaks = $(this).find('span.fare-breakdown input');
                var totalFare = 0;
                breaks.each(function () {
                    var breakSplit = this.value.split('|');
                    totalFare += that.stringToNum(breakSplit[5]);
                    breakSplit = null;
                });

                pricesArray.push(totalFare);
                breaks = null;
            });

            //for (var x = 0, xLen = singleArray.length; x < xLen; x++) {
            //    pricesArray.push(that.stringToNum(singleArray[x][5]));
            //}
            minVal = Math.min.apply(Math, pricesArray);
            jLen = pricesArray.length;
            for (j = 0; j < jLen; j++) {
                if (pricesArray[j] === minVal) {
                    osNum = j;
                    break;
                }
            }
            return { osNum: osNum, prices: pricesArray, minVal: minVal, containers: cont.has('div.single span.fare-breakdown input'), singleCont: singleConts };
        },
        //works out whether the new cheapest is fare in the AJAX response is cheaper than the current cheapest fare indicated on the page
        cheapestFare: function (farePrice, isSingle, direct) {
            var that = this;
            var cheapCont = null;
            var cheapBreaks = null;
            var cheapPrice = 0;
            var isNewCheapest = false;
            var newTotal = 0;
            var oldCheapest = null;
            var inbound = null;

            that.otherSing = null;
            //have we already picked out the current cheapest fare, if not, get them.
            if (that.cheapFare === null) {
                cheapCont = $('#ctf-results td.has-cheapest');
                cheapBreaks = cheapCont.find('input[type=hidden]');
            }
            if (that.cheapFarePrice === null) {
                that.cheapFarePrice = 0;
                cheapBreaks.each(function () {
                    var split = this.value.split('|');
                    that.cheapFarePrice += that.stringToNum(split[5]);
                });

            }
            if (that.cheapType === null) {
                if (cheapBreaks.length === 2) {
                    that.cheapType = 'SAR';
                } else {
                    that.cheapType = 'NORMAL';
                }
            }
            if (isSingle) { //is this a single or single as returns
                //return portion of journey
                if (direct.indexOf('returning') > -1) {
                    if (that.cheapType === 'SAR') {
                        oldCheapest = that.findOtherSing($('#oft td.fare'));
                        newTotal = farePrice + oldCheapest.minVal;
                        that.otherSing = oldCheapest.minVal;
                    } else {
                        //current cheapest fare is a return, need to get the other part of the single
                        oldCheapest = that.findOtherSing($('#oft td.fare'));
                        newTotal = farePrice + oldCheapest.minVal;
                        that.otherSing = oldCheapest.minVal;

                    }
                } else {//outbound portion of journey
                    if (that.cheapType === 'SAR') {
                        oldCheapest = that.findOtherSing($('#ift td.fare'));
                        newTotal = farePrice + oldCheapest.minVal;
                        that.otherSing = oldCheapest.minVal;

                    } else {
                        //current cheapest fare is a return, need to get the other part of the single
                        inbound = $('#ift td.fare');
                        if (inbound.length > 0) {
                            oldCheapest = that.findOtherSing(inbound);
                            newTotal = farePrice + oldCheapest.minVal;
                            that.otherSing = oldCheapest.minVal;
                        }
                        inbound = null;
                    }
                }
            } else {
                if (direct.indexOf('returning') > -1) {
                    newTotal = 'skip';
                } else {
                    newTotal = farePrice;
                }
            }
            if (newTotal < that.cheapFarePrice) {
                cheapCont.find('div.cheapest').remove();
                cheapCont.removeClass('has-cheapest');
                that.cheapFarePrice = newTotal;
                if (oldCheapest !== null) {
                    if (oldCheapest.osNum !== -1) {
                        //{ osNum: osNum, prices: pricesArray, minVal: minVal, containers: conts, singleCont: singleConts};
                        if ((FC.fareSwitcher.cTab === 'single' && !isSingle) || (FC.fareSwitcher.cTab === 'return' && isSingle)) {
                            $(oldCheapest.containers[oldCheapest.osNum]).addClass('has-cheapest-disabled');
                        } else if ((FC.fareSwitcher.cTab === 'single' && isSingle) || (FC.fareSwitcher.cTab === 'return' && !isSingle)) {
                            $(oldCheapest.containers[oldCheapest.osNum]).addClass('has-cheapest');
                        }
                        $(oldCheapest.singleCont[oldCheapest.osNum]).prepend('<div class="cheapest">cheapest fare</div>');
                    }
                }
                that.cheapFare = null;
                that.cheapType = null;
                return true;
            } else {
                return false;
            }

            cheapCont = null;
            cheapBreaks = null;
            cheapPrice = null;
            isNewCheapest = null;
            newTotal = null;
            //otherSingle = null;
            oldCheapest = null;
        },
        //ajax call successful
        successFunction: function (data, context) {
            //console.log(data);
            var that = context;
            var url = '';

            if (data.status.toLowerCase() === 'ok') {
                that.writeNewRows(data, context);
            } else if (data.status.toLowerCase().indexOf('redirect') > -1) {
                url = data.status.split(':')[1];

                window.location = url;
            } else {
                that.removeSpinner();
                FC.modalPopup('Something went wrong', data.status);
            }
        },
        //wirte the mode iconns
        writeDlrluIcon: function (iconData, crsCode) {
            var strArray = [];
            switch (iconData) {
                case 'dlr':
                    strArray.push('<span class="ic ic-dlr">DLR</span>');
                    break;
                case 'lu':
                    strArray.push('<span class="ic ic-tube">Tube</span>');
                    break;
                case 'dlrlu':
                    strArray.push('<span class="ic ic-dlrlu">DLR &amp; Tube</span>');
                    break;
                default:
                    strArray.push('[<abbr>',
                        crsCode,
                        '</abbr>]');
            }
            return strArray.join('');
        },
        //write the contents of the status tooltip, which is actually in a table row
        writeStatusTip: function (fareRow) {
            var statusArray = [];
            var that = this;
            var bulletins = fareRow.activeBulletins;
            var x = 0;
            var xlen = bulletins.length;

            statusArray.push('<tr class="status alt ajaxRow ajaxNo', that.callAjaxNo, '"><td colspan="1"></td><td colspan="8"><div class="statustext">');

            for (x = 0; x < xlen; x++) {
                statusArray.push('<div class="notedesc"><h4>Service status</h4><p>', bulletins[x].title, '</p>');

                if (bulletins[x].url !== '') {
                    statusArray.push('<a href="', bulletins[x].url, '" class="arrowlink-dark outdent"><img alt="" class="sprite-main" src="', fcPth.clrImg, '" width="13" height="10">More details</a>');
                }

                if (bulletins[x].description !== '') {
                    statusArray.push('<p>', bulletins[x].description, '</p>');
                }
                statusArray.push('</div>');
            }
            switch (fareRow.statusHoverInformation) {
                case 'SERIOUSLY_DISRUPTED':
                    statusArray.push('<div class="disruptiondesc">',
                        '<h4 class="title">Seriously Disrupted</h4>',
                        '<p>This service is seriously disrupted.</p>',
                        '</div>');
                    that.isCancelled = false;
                    break;
                case 'BROKEN':
                    statusArray.push('<div class="disruptiondesc">',
                        '<h4 class="title">Seriously Disrupted</h4>',
                        '<p>There are problems reported at',
                        fareRow.suppressedStationName,
                        ' station. Please click &lsquo;Find Alternative Trains&rsquo; for current alternative services to help you complete your journey.</p>',
                        '<a href="/service/timesandfares/alternative" class="arrowlink-dark outdent"><img alt="" class="sprite-main" src="',
                        fcPth.clrImg,
                        '" width="13" height="10" />Find alternative trains</a>',
                        '</div>');
                    that.isCancelled = false;
                    break;
                case 'BROKEN_UNREPAIRABLE':
                    statusArray.push('<div class="disruptiondesc">',
                        '<h4 class="title">Seriously Disrupted</h4>',
                        '<p>There are problems reported at ',
                        fareRow.suppressedStationName,
                        ' station. You can call 08457 484950 for more information or re-plan your journey using an alternative station.</p>',
                        '</div>');
                    that.isCancelled = false;
                    break;
                case 'CANCELLED':
                    statusArray.push('<div class="disruptiondesc">',
                        '<h4 class="title">Cancelled</h4>',
                        //if $(fareRow.displayableLegs) > 1}
                        //<p>Part of this journey is cancelled. Please click 'Find Alternative Trains' for current alternative services to help you complete your journey.</p>
                        //else
                        '<p>This train is cancelled. Please click &lsquo;Find Alternative Trains&rsquo; for current alternative services to help you complete your journey.</p>',
                        '<a href="/service/timesandfares/alternative" class="arrowlink-dark outdent"><img alt="" class="sprite-main" src="',
                        fcPth.clrImg,
                        '" width="13" height="10" />Find alternative trains</a>',
                        '</div>');
                    that.isCancelled = true;
                    break;
                case 'MISSED_CONNECTION':
                    statusArray.push('<div class="disruptiondesc">',
                        '<h4 class="title">Disrupted</h4>',
                        '<p>This service is disrupted and you may not meet your connection.</p>',
                        '<a href="/service/timesandfares/alternative" class="arrowlink-dark outdent"><img alt="" class="sprite-main" src="',
                        fcPth.clrImg,
                        '" width="13" height="10" />Find alternative trains</a>',
                        '</div>');
                    that.isCancelled = false;
                    break;
                case 'DELAYED':
                    statusArray.push('<div class="notedesc">',
                        '<h4 class="title">Journey Delayed</h4>',
                        //if test="${fn:length(fareRow.displayableJourney.displayableLegs) > 1}"
                        //   <p>Part of this journey is delayed.</p>
                        // else
                        '<p>This journey is delayed.</p>',
                        '</div>');
                    that.isCancelled = false;
                    break;
                case 'VSTP':
                    statusArray.push('<div class="disruptiondesc vstp">',
                        '<h4 class="title">Amended timetable</h4>',
                        '<p>This service is not part of the normal timetable and may only be running on the date shown.</p>',
                        '</div>');
                    that.isCancelled = false;
                    break;
                case 'BUS_AND_VSTP':
                    statusArray.push('<div class="disruptiondesc vstp">',
                        '<h4 class="title">Amended timetable</h4>',
                        '<p>This service is not part of the normal timetable and may only be running on the date shown.</p>',
                        '</div>',
                        '<div class="disruptiondesc bus">',
                        '<h4 class="title">Bus service</h4>',
                        '<p>All or part of this journey will be made by bus.</p>',
                        '</div>');
                    that.isCancelled = false;
                    break;
                case 'DELAYED_AND_VSTP':
                    statusArray.push('<div class="notedesc">',
                        '<h4 class="title">Journey Delayed</h4>',
                        //if ${fn:length(fareRow.displayableJourney.displayableLegs) > 1}
                        //'<p>Part of this journey is delayed.</p>',
                        //else
                        '<p>This journey is delayed.</p>',
                        '</div>',
                        '<div class="disruptiondesc bus">',
                        '<h4 class="title">Amended timetable</h4>',
                        '<p>This service is not part of the normal timetable and may only be running on the date shown.</p>',
                        '</div>');
                    that.isCancelled = false;
                    break;
                case 'BUS':
                    statusArray.push('<div class="disruptiondesc bus">',
                        '<h4 class="title">Bus service</h4>',
                        '<p>All or part of this journey will be made by bus.</p>',
                        '</div>');
                    that.isCancelled = false;
                    break;
                case 'SINGLE_WALK_LEG':
                    statusArray.push('<div class="disruptiondesc bus">',
                        '<h4 class="title">Walking</h4>',
                        '<p>Passengers should make their own way between these stations, the journey returned is based on the estimated walking time.</p>',
                        '</div>');
                    that.isCancelled = false;
                    break;
            }
            statusArray.push('</div>',
                '</td>',
                '<td colspan="1"></td>',
                '</tr>');
            return statusArray.join('');
        },
        //puts the correct status icon in the column
        writeStatus: function (fareRow) {
            var strArray = [];
            var statusRow = [];
            var that = this;
            var statusProperties = {
                'GREEN_TICK': { 'cssclass': 'on-time', 'width': '15', 'height': '15', 'hasTip': false },
                'AMBER_TRIANGLE': { 'cssclass': 'late', 'width': '20', 'height': '16', 'hasTip': true },
                'RED_TRIANGLE': { 'cssclass': 'disrupted', 'width': '18', 'height': '15', 'hasTip': true },
                'BLUE_TRIANGLE': { 'cssclass': 'bus', 'width': '20', 'height': '16', 'hasTip': true },
                'SINGLE_LEG_WALK': { 'cssclass': 'bus', 'width': '20', 'height': '16', 'hasTip': true }
            };
            var currentStatusProperties = '';

            switch (fareRow.status) {
                case 'AMBER_TRIANGLE':
                case 'RED_TRIANGLE':
                case 'BLUE_TRIANGLE':
                case 'SINGLE_LEG_WALK':
                    currentStatusProperties = statusProperties[fareRow.status];
                    strArray.push('<div class="journey-status journey-status-' + currentStatusProperties.cssclass + '"><div class="statustip tooltip"><a class="status" href="#"><img alt="" class="sprite-main" src="' + fcPth.clrImg + '" width="' + currentStatusProperties.width + '" height="' + currentStatusProperties.cssclass + '">' + fareRow.statusMessage + '</a></div>');
                    statusRow = that.writeStatusTip(fareRow);
                    break;
                default:
                    strArray.push('<div class="journey-status journey-status-on-time"><p><img alt="" class="sprite-main" src="' + fcPth.clrImg + '" width="15" height="15">' + fareRow.statusMessage + '</p>');
                    that.isCancelled = false;
                    break;

            }
            if (fareRow.showAlternatives) {
                strArray.push('<p><a class="alternate" href="#" title="Find alternate trains">Alternative trains</a></p>');
            }
            strArray.push('</div>');
            return { statusHtml: strArray.join(''), statusRow: statusRow };
        },
        //changes the date in the headers of the tables
        changeOJPDate: function (date, bindfield) {
            var splitDate = date.split(' ');
            var dateItem = bindfield.indexOf('outward') > -1 ? $('#ctf-results h3.outward') : $('#ctf-results h3.return');
            var dateHtml = [];
            var fullDays = { 'Mon': 'Monday', 'Tue': 'Tuesday', 'Wed': 'Wednesday', 'Thu': 'Thursday', 'Fri': 'Friday', 'Sat': 'Saturday', 'Sun': 'Sunday' };
            var fullMonths = { 'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April', 'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August', 'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December' };
            var startString = bindfield.indexOf('outward') > -1 ? 'Outward' : 'Return';

            dateHtml.push('<span class="unb">', startString, ' </span><span class="accessibility">journey on </span><abbr title="', fullDays[splitDate[0]], '">', splitDate[0], '</abbr> ', splitDate[1], '<abbr title="', fullMonths[splitDate[2]], '"> ', splitDate[2], '</abbr>');

            dateItem.html(dateHtml.join(''));

            splitDate = null;
            dateItem = null;
            dateHtml = null;
            fullDays = null;
            fullMonths = null;

        },
        //adds a next day indicator row into the table
        writeNextDay: function (dateToWrite) {
            if (dateToWrite === null) {
                return '<tr class="ajaxRow day-heading"><th scope="rowgroup" colspan="10"><p>{{departureDate}}</p></th></tr>';
            } else {
                return '<tr class="ajaxRow day-heading"><th scope="rowgroup" colspan="10"><p>' + dateToWrite + '</p></th></tr>';
            }
        },
        //function to update the fares in the other fares matrix. This is for return tickets where an earlier later requests cause off-peak returns ticket to become available where they weren't before. We only update returns.
        updateOtherMatrix: function (data) {
            var that = this;
            var otherFares = data.otherDirectionFareRows;
            var currentFare = null;
            var clickedOutbound = that.direction === 'outbound' ? true : false;
            var otherFaresTrs = clickedOutbound ? $('#ift tr.mtx') : $('#oft tr.mtx');
            var otherDetailsLinks = otherFaresTrs.find('td.info a');
            var otherFareHtml = otherFaresTrs.find('td.fare');
            var otherReturnHtml = otherFaresTrs.find('td.fare div.return');
            var otherSingleHtml = otherFaresTrs.find('td.fare div.single');
            var otherFareLabel = otherReturnHtml.find('label.opreturnselected, label.opreturn');
            var otherFareRadio = otherFareLabel.find('input:radio');
            var otherFareType = otherReturnHtml.find('.fare-type');
            var otherMoreFares = otherReturnHtml.find('.more-fares a, .hide-fares a');
            var count = otherFares.length;
            var i = 0;
            var retCheapest = null;
            var singCheapest = null;
            var input = null;
            var idVal = null;
            var fareBreak = null;
            var currentFareValue = null;
            var hasFareIdChanged = false;
            var isInboundReturn = false;
            var mFaresFareType = '';
            var newRadioValue = '';
            var moreFaresResponseId = 0;
            var currentResponseId = null;

            for (i = 0; i < count; i++) {

                hasFareIdChanged = false;

                isInboundReturn = $(otherFareHtml[i]).parents('#ift').length > 0 ? true : false;

                if (typeof otherDetailsLinks[i] === 'undefined') {
                    break;
                }

                currentFare = otherFares[i];
                moreFaresResponseId = currentFare.responseId;

                hasFareIdChanged = that.hasFareChanged(otherFareRadio[i], currentFare);

                if (hasFareIdChanged === true) {
                    retCheapest = currentFare.cheapestReturnFare ? currentFare.cheapestReturnFare.cheapestJourneyFare : false;
                    singCheapest = currentFare.cheapestSingleFare ? currentFare.cheapestSingleFare.cheapestJourneyFare : false;

                    otherDetailsLinks[i].href = currentFare.detailsLink;


                    //the clickedOutbound is set by what direction the user clicked earlier later on. These are the functions we want to run if the other direction being updated here in this function is the outbound (meaning the user triggered the earlier later reques from inbound) 
                    if (clickedOutbound === false) {
                        //update the price and ticket type
                        that.updateOtherFareContent(otherFareLabel[i], otherFareType[i], currentFare);

                    }

                    NRE.fares.updateJson($(otherFareRadio[i]), 'fareIdOnly', currentFare, true);

                    if (typeof currentFare.cheapestReturnFare === 'undefined') {


                        // unchecks when that particular return fare is no longer available.
                        $(otherFareRadio[i]).prop('checked', false);
                        $(otherFareLabel[i]).removeClass('opreturnselected').addClass('opreturn');
                        $(otherFareLabel[i]).parent().addClass('hidden');
                    } else {
                        // Edge case where ajax returned responseId and responseId in the radio value does not match.
                        // If this ever happens then Thales should fix
                        newRadioValue = currentFare.cheapestReturnFare.radioValue.split('-');
                        if (currentFare.responseId.toString() !== newRadioValue[0]) {
                            moreFaresResponseId = newRadioValue[0];
                            NRE.utilities.safeConsole('ajax responseId mismatch: ' + newRadioValue[0] + ' ' + currentFare.responseId);
                        }
                    }

                    //the clickedOutbound is set by what direction the user clicked earlier later on. These are the functions we want to run if the other direction being updated here in this function is the outbound (meaning the user triggered the earlier later reques from inbound) 
                    if (clickedOutbound === false) {
                        //update the more fares link (as the request url may have changed)
                        idVal = currentFare.cheapestReturnFare ? currentFare.cheapestReturnFare.radioValue.split('-')[1] : '';
                        fareBreak = currentFare.cheapestReturnFare ? currentFare.cheapestReturnFare.fareBreakdowns[0] : '';
                        currentResponseId = otherFareRadio[i].value.split('-')[0];
                        if (fareBreak.breakdownType === 'SingleFare') {
                            mFaresFareType = 'nsfo';
                        } else if (fareBreak.breakdownType === 'SingleFareOutward' || fareBreak.breakdownType === 'SingleFareInward') {
                            mFaresFareType = 'sfo';
                        } else if (fareBreak.breakdownType === 'ReturnFare') {
                            mFaresFareType = 'rfo';
                        }

                        otherMoreFares[i].href = '/service/timesandfares/moreFares?journeyId=' + currentFare.journeyId + '&direction=o&journeyType=r&fareType=' + mFaresFareType + '&currentlySelectedFareId=' + fareBreak.fareId + '&id=' + idVal + 'r&responseId=' + currentResponseId;
                    }

                    that.resetCheapestFare(otherFareHtml[i], otherReturnHtml[i], otherSingleHtml[i], retCheapest, singCheapest, isInboundReturn);

                    NRE.basket.popTD($(otherFareRadio[i]));

                    FC.prefVendorAjax({ target: otherFareRadio[i] }, null);
                }

            }

            if (!clickedOutbound) {
                otherFaresTrs.find('.has-cheapest, .has-cheapest-disabled').find('input:checked').click();
            }
        },
        //determines whether fareId, journeyId or responseId has changed and returns an obect. Used by updateOtherMatrix.
        hasFareChanged: function (otherFareRadio, currentFare) {

            var that = this;
            var clickedOutbound = that.direction === 'outbound' ? true : false;

            var currentFareValue = null;
            var originalFareId = 0;
            var hasFareIdChanged = false;

            if (otherFareRadio) {
                currentFareValue = otherFareRadio.value.split('-'); //4-5-1-r
                originalFareId = parseInt(currentFareValue[1], 10);
            }

            if (originalFareId !== 0 && isNaN(originalFareId) !== true && typeof currentFare.cheapestReturnFare !== 'undefined') {
                if (originalFareId !== currentFare.cheapestReturnFare.fareBreakdowns[0].fareId) {
                    hasFareIdChanged = true;
                }
            } else if (originalFareId !== 0 && isNaN(originalFareId) !== true && typeof currentFare.cheapestReturnFare === 'undefined') {
                hasFareIdChanged = true;
            } else if ((originalFareId === 0 || isNaN(originalFareId) === true) && typeof currentFare.cheapestReturnFare !== 'undefined') {
                hasFareIdChanged = true;
            }

            return hasFareIdChanged;

        },
        //updates the price, ticket type and tooltip html. Used by updateOtherMatrix.
        updateOtherFareContent: function (otherFareLabel, otherFareType, currentFare) {
            var newFareType = null;


            $(otherFareLabel).find('.label-text')[0].innerHTML = currentFare.cheapestReturnFare ? '&pound;' + currentFare.cheapestReturnFare.totalPrice : '';

            $(otherFareType).empty();

            newFareType = document.createElement('A');
            newFareType.href = '#';
            newFareType.setAttribute('tip-title', currentFare.cheapestReturnFare ? currentFare.cheapestReturnFare.tooltipText : '');
            newFareType.innerHTML = currentFare.cheapestReturnFare ? currentFare.cheapestReturnFare.ticketCategory : '';

            otherFareType.appendChild(newFareType);

            FC.tooltip($(otherFareType));
        },
        //removes any existing cheapest fare indicators on supplied html objects and re-adds them if they are the cheapest. Used by updateOtherMatrix.
        resetCheapestFare: function (otherFareHtml, otherReturnHtml, otherSingleHtml, retCheapest, singCheapest, isInboundReturn) {
            $(otherFareHtml).removeClass('has-cheapest').removeClass('has-cheapest-disabled');

            if ((FC.fareSwitcher.cTab === 'single' && retCheapest) || (FC.fareSwitcher.cTab === 'return' && singCheapest)) {
                $(otherFareHtml).addClass('has-cheapest-disabled');
            }
            else if ((FC.fareSwitcher.cTab === 'return' && retCheapest) || (singCheapest && FC.fareSwitcher.cTab === 'single')) {
                if (isInboundReturn === false) {
                    $(otherFareHtml).addClass('has-cheapest');
                }
            }

            $(otherFareHtml).find('.cheapest').remove();

            if (retCheapest) {
                if (isInboundReturn === false) {
                    $(otherReturnHtml).prepend('<div class="cheapest">cheapest fare</div>');
                }
            } else if (singCheapest) {
                $(otherSingleHtml).prepend('<div class="cheapest">cheapest fare</div>');
            }
        },
        //BEGINNING OF AUGMENTDATA FUNCTIONS
        //returns an object which returns the duration as accessible html strings, strings of individual hour and minutes and the hours and minutes as ints
        durationString: function (duration) {
            var durationArray = [];
            var durationStr = '';
            var durHours = '';
            var durMins = '';
            var durationHoursInt = '';
            var durationMinInt = '';
            //build accessible duration string
            durationArray = duration.split(' ');
            durHours = durationArray[0].replace(/h/gi, '');
            durMins = durationArray[1].replace(/m/gi, '');
            durationStr = durHours + '<abbr title="hours">h</abbr> ' + durMins + '<abbr title="minutes">m</abbr>';
            durationHoursInt = parseInt(durHours, 10);
            durationMinInt = parseInt(durMins, 10);


            return { durationStr: durationStr, durHours: durHours, durMins: durMins, durHoursInt: durationHoursInt, durMinsInt: durationMinInt };
        },
        //returns the html for the next day marker if the ajax results cross 2 days 
        htmlNextDay: function (i, dateCompare, currentDate, lastDate, bindField) {
            var resultHtml = '';
            var that = this;
            var isNextDay = false;

            if (i === 0) {
                if (currentDate !== dateCompare) {
                    if (that.isEarlier) {
                        that.changeOJPDate(currentDate, bindField);
                    } else {
                        resultHtml = that.writeNextDay(currentDate);
                    }
                    isNextDay = true;
                }
            } else {
                if (currentDate !== lastDate) {
                    resultHtml = that.writeNextDay(currentDate);
                    isNextDay = true;
                }
            }

            return { resultHtml: resultHtml, isNextDay: isNextDay };
        },
        //returns the new radio id
        newId: function (fareItem, isOutbound, i) {
            var radioVal = '';
            var firstFareBreak = '';
            var newId = '';
            var radioId = '';

            if (typeof fareItem !== 'undefined') {

                if (fareItem.fareBreakdowns.length > 0) {
                    radioVal = fareItem.radioValue.split('-');
                    firstFareBreak = fareItem.fareBreakdowns[0];

                    switch (firstFareBreak.breakdownType) {
                        case 'SingleFare':
                        case 'SingleFareOutward':
                            radioId = 'faresingleFareOutward';
                            break;
                        case 'SingleFareInward':
                            radioId = 'faresingleFareReturn';
                            break;
                        case 'ReturnFare':
                            if (isOutbound) {
                                radioId = 'returnFareOutward';
                            } else {
                                radioId = 'returnFareReturn';
                            }
                            break;
                    }

                    newId = radioId + radioVal[0] + radioVal[2];

                }
            } else {
                newId = 'invalidFare' + i;
            }

            return newId;

        },
        //returns the new value for the radio. Although this is present in the JSON results, we build it this way in case a journey does not have any fares. As the fare breakdown is retrieved using the journeyId and responseId split from the radio value, these values are still present even when there isn't a valid fare
        newValue: function (fareItem, type, journeyId, responseId) {
            var result = '';
            var valueEnd = type === 'single' ? 's' : 'r' ;

            if (typeof fareItem !== 'undefined') {
                result = fareItem.radioValue;
            } else {
                result = responseId + '--' + journeyId + '-' + valueEnd;
            }

            return result;
        },
        //returns first, last, next-day and ajaxRow into a string for use in the class of the tr
        rowClass: function (rowType, i, len, ajaxRow, isNextDay) {
            var result = '';
            var that = this;
            //See what class the row needs to have

            //if it's the first row add the first row class
            if (rowType === 0 && that.type.indexOf('earlier') > -1 && i === 0) {
                result = ' first';
            }

            //if it's the last row add the last class
            if (i === len - 1 && (that.type.indexOf('later') > -1)) {
                result = result + ' last';
            }
            //add the next day class if row is next day
            if (isNextDay) {
                result = result + ' next-day';
            }

            //if it's an ajax row and not one of the original results add the ajax row class
            if (ajaxRow === true) {
                result = result + ' ajaxRow';
            }

            return result;
        },
        //returns accessible html for the platform if a platform is present, otherwise an empty string
        htmlPlatform: function (platform, direction) {
            var result = '';
            var titleStr = direction === 'out' ? 'Departs from' : 'Arrives at';
            if (platform !== '') {
                result = '<span class="ctf-plat" title="' + titleStr + ' Platform ' + platform + '">Platform ' + platform + '</span>';
            }

            return result;
        },
        //returns the html for changes cell if changes are present
        htmlChanges: function (changes) {
            var result = changes;
            if (changes > 0) {
                result = '<div class="changestip tooltip"><a href="#" class="changestip-link">' + changes + '</a></div>';
            }

            return result;
        },
        //returns a string for the cheapest fare css class
        cheapestCss: function (retCheapest, singCheapest) {
            var result = '';
            if ((FC.fareSwitcher.cTab === 'single' && retCheapest) || (FC.fareSwitcher.cTab === 'return' && singCheapest)) {
                result = ' has-cheapest-disabled';
            }
            else if ((FC.fareSwitcher.cTab === 'return' && retCheapest) || (singCheapest && FC.fareSwitcher.cTab === 'single')) {
                result = result + ' has-cheapest';
            }

            return result;
        },
        //returns a string for use in the css class of the td.fare 
        fareCss: function (newId, radioVal, iWithCheapest, i, isSingle, itemIsReturn, isReturnJourney) {
            var result = '';
            var that = this;
            if (newId === 'returnFareReturn' + radioVal[0] + radioVal[2]) {
                result = ' return-only';
            }

            if (isSingle === true && isReturnJourney) {
                result = ' ' + itemIsReturn;
            }

            if (iWithCheapest === i && isReturnJourney === true) {
                result = result + ' default-select';
            }

            if (that.isCancelled || radioVal[1] === '') {
                result = result + ' hidden';
            }

            return result;
        },
        //returns html for cheapest fare banner
        htmlCheapest: function (hasCheapest) {
            var result = '';

            if (hasCheapest) {
                result = '<div class="cheapest">cheapest fare</div>';
            }

            return result;
        },
        //returns htmls and builds link for more fares/other fares
        htmlMFares: function (isOutbound, idVal, fareBreak, journeyId, responseId) {
            var result = '';
            var direction = isOutbound === true ? 'o' : 'r';
            var fareType = '';

            if (fareBreak.breakdownType === 'SingleFare') {
                fareType = 'nsfo';
            } else if (fareBreak.breakdownType === 'SingleFareOutward' || fareBreak.breakdownType === 'SingleFareInward') {
                fareType = 'sfo';
            } else if (fareBreak.breakdownType === 'ReturnFare') {
                fareType = 'rfo';
            }

            if (isOutbound === true || (isOutbound === false && fareBreak.breakdownType === 'SingleFareInward')) {
                result = '<span class="more-fares"><a href="/service/timesandfares/moreFares?journeyId=' + journeyId + '&amp;direction=' + direction + '&amp;journeyType=r&amp;fareType=' + fareType + '&amp;currentlySelectedFareId=' + fareBreak.fareId + '&amp;id=' + idVal + 'r' + '&amp;responseId=' + responseId + '" id="' + idVal + 'r">Other tickets</a></span>';
            }

            return result;
        },
        //returns the html for the ticket type tool
        htmlTooltip: function (isOutbound, fareBreak, ticketCategory, firstClass, isReturnJourney, tooltipText, isSingle) {
            var result = '';
            var firstClassText = firstClass === true ? 'First Class' : '';

            if (isOutbound === true || isSingle === true) {
                result = '<span class="fare-type tooltip"><a href="#" tip-title="' + fareBreak.fareTicketType + tooltipText + fareBreak.fareRouteDescription + '">' + firstClassText + ticketCategory + '</a></span>';
            }

            return result;
        },
        //END OF AUGMENT DATA FUNCTIONS
        //add strings, html and css classes to the fare item, and returns the item
        augmentData: function (data, i, len, idNo) {
            var that = this;
            var item = data.fareRows[i];
            var isOutbound = item.bindField.indexOf('outward') > -1;
            var duration = that.durationString(item.duration);
            var statusObject = that.writeStatus(item);
            var returnFareBreak = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
            var singleFareBreak = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
            var returnTooltipText = '';
            var singleTooltipText = '';
            var ticketCategoryReturn = '';
            var ticketCategorySingle = '';
            var rowType = that.type.indexOf('earlier') > -1 ? i % 2 : idNo % 2;
            var retCheapest = false;
            var singCheapest = false;
            var iWithCheapest = that.findCheapestFare(data);
            var idVal = '';
            var idValSing = '';
            var dateCompare = isOutbound ? data.departureDate : data.returnDate;
            var lastDate = i === 0 ? '' : data.fareRows[i - 1].departureDate;
            var nextDayObject = that.htmlNextDay(i, dateCompare, item.departureDate, lastDate, item.bindField);
            var formattedPrice = '';


            if (typeof item.cheapestReturnFare !== 'undefined') {
                returnFareBreak = item.cheapestReturnFare.fareBreakdowns[0];
                returnTooltipText = item.cheapestReturnFare.tooltipText;
                ticketCategoryReturn = item.cheapestReturnFare.ticketCategory;
                retCheapest = item.cheapestReturnFare ? item.cheapestReturnFare.cheapestJourneyFare : false;
                idVal = item.cheapestReturnFare.radioValue.split('-')[1];

                if (isOutbound) {
                    formattedPrice = '&pound;' + item.cheapestReturnFare.totalPrice;
                }
            }

            if (typeof item.cheapestSingleFare !== 'undefined') {
                singleFareBreak = item.cheapestSingleFare.fareBreakdowns[0];
                singleTooltipText = item.cheapestSingleFare.tooltipText;
                ticketCategorySingle = item.cheapestSingleFare.ticketCategory;
                singCheapest = item.cheapestSingleFare ? item.cheapestSingleFare.cheapestJourneyFare : false;
                idValSing = item.cheapestSingleFare.radioValue.split('-')[1];
            }

            item.htmlNextDay = nextDayObject.resultHtml;
            item.isNextDay = nextDayObject.isNextDay;
            item.isOutbound = isOutbound;
            item.htmlDuration = duration.durationStr;
            item.newId = that.newId(item.cheapestReturnFare, item.isOutbound, i);
            item.newIdSing = that.newId(item.cheapestSingleFare, item.isOutbound, i);
            item.newValue = that.newValue(item.cheapestReturnFare, 'return', item.journeyId, item.responseId);
            item.newValueSing = that.newValue(item.cheapestSingleFare, 'single', item.journeyId, item.responseId);
            item.hours = duration.durHours;
            item.mins = duration.durMins;
            item.hoursInt = duration.durHoursInt;
            item.minsInt = duration.durMinsInt;
            item.htmlRowClass = that.rowClass(rowType, i, len, item.ajaxRow, nextDayObject.isNextDay);
            item.callAjaxNo = that.callAjaxNo;
            item.typeIconOut = that.writeDlrluIcon(item.originStationType.toLowerCase(), item.originCRS);
            item.htmlDepPlatform = that.htmlPlatform(item.departurePlatform, 'out');
            item.typeIconIn = that.writeDlrluIcon(item.destinationStationType.toLowerCase(), item.destinationCRS);
            item.clrImg = fcPth.clrImg;
            item.htmlArrPlatform = that.htmlPlatform(item.arrivalPlatform, 'in');
            item.htmlChanges = that.htmlChanges(item.changes);
            item.cheapestCss = that.cheapestCss(retCheapest, singCheapest);
            item.htmlStatus = statusObject.statusHtml;
            item.returnCss = that.fareCss(item.newId, item.newValue.split('-'), iWithCheapest, i, false, item.isReturn, data.isReturnJourney);
            item.htmlRetCheapest = that.htmlCheapest(retCheapest);
            item.htmlMFaresReturn = that.htmlMFares(isOutbound, idVal, returnFareBreak, item.journeyId, item.responseId);
            item.htmlTooltipReturn = that.htmlTooltip(isOutbound, returnFareBreak, ticketCategoryReturn, item.firstClass, data.isReturnJourney, returnTooltipText, false);
            item.singleCss = that.fareCss(item.newIdSing, item.newValueSing.split('-'), iWithCheapest, i, true, item.isReturn, data.isReturnJourney);
            item.htmlSingCheapest = that.htmlCheapest(singCheapest);
            item.htmlMFaresSingle = that.htmlMFares(isOutbound, idValSing, singleFareBreak, item.journeyId, item.responseId);
            item.htmlTooltipSingle = that.htmlTooltip(isOutbound, singleFareBreak, ticketCategorySingle, item.firstClass, data.isReturnJourney, singleTooltipText, true);
            item.labelCss = data.isReturnJourney === true ? 'opreturn' : 'opsingle';
            item.htmlSingleButtons = data.isReturnJourney === false ? '<button class="b-y buy-now"><span>Buy now</span></button><button href="#" class="icon-only not-IE6 add-to-basket" style="display: inline;" name="addToBasket"><span>Add to basket</span></button><!--[if IE 6]><span class="b-y lrg add-to-basket"><input type="submit" class="" value="Add to basket" /></span><![endif]-->' : '';
            item.htmlStatusRow = statusObject.statusRow;
            item.formattedPrice = formattedPrice;

            return item;
        },
        //removes data that was added in augmment data to keep object in memory smaller
        tidyData: function (item) {
            item.htmlNextDay = null;
            item.isNextDay = null;
            item.isOutbound = null;
            item.htmlDuration = null;
            item.newId = null;
            item.newIdSing = null;
            item.newValue = null;
            item.newValueSing = null;
            item.hours = null;
            item.mins = null;
            item.htmlRowClass = null;
            item.callAjaxNo = null;
            item.typeIconOut = null;
            item.htmlDepPlatform = null;
            item.typeIconIn = null;
            item.clrImg = null;
            item.htmlArrPlatform = null;
            item.htmlChanges = null;
            item.cheapestCss = null;
            item.htmlStatus = null;
            item.returnCss = null;
            item.htmlRetCheapest = null;
            item.htmlMFaresReturn = null;
            item.htmlTooltipReturn = null;
            item.singleCss = null;
            item.htmlSingCheapest = null;
            item.htmlMFaresSingle = null;
            item.htmlTooltipSingle = null;
            item.labelCss = null;
            item.htmlSingleButtons = null;
            item.htmlStatusRow = null;
            item.formattedPrice = null;
            item.hoursInt = null;
            item.minsInt = null;
        },
        //finds the cheapes fare in the data and returns the array index
        findCheapestFare: function (data) {
            var x = 0;
            var len = data.fareRows.length;
            var currentFareX = 0;
            var foundCheapestFare = false;
            var isReturnJourney = data.returnDate === '' ? false : true;
            var iWithCheapest = 0;
            //find the cheapestfare
            for (x = 0; x < len; x++) {
                currentFareX = data.fareRows[x];
                if (typeof currentFareX.cheapestReturnFare !== 'undefined' && isReturnJourney === true) {
                    if (currentFareX.cheapestReturnFare.cheapestJourneyFare === true) {
                        iWithCheapest = x;
                        foundCheapestFare = true;
                        break;
                    }
                }

                if (typeof currentFareX.cheapestSingleFare !== 'undefined' && foundCheapestFare === false) {
                    if (currentFareX.cheapestSingleFare.cheapestJourneyFare === true) {
                        iWithCheapest = x;
                        foundCheapestFare = true;
                        break;
                    }
                }
            }

            return iWithCheapest;
        },
        //builds the html for the individual rows
        ctfRowHtml: function (data, context) {
            var that = context;
            var escapedBindfield = '';
            var noCurrentRadios = '';
            var idNo = 0;
            var currentFare = null;
            var allPartials = [];
            var statusArray = [];
            var mainTemplate = [];
            var changesTemp = [];
            var firstFareBreakRet = '';
            var firstFareBreakSing = '';
            var i = 0;
            var len = data.fareRows.length;
            var htmlStr = [];
            var finalStr = '';
            var fareDetailsHtml = '';

            for (i = 0; i < len; i++) {
                escapedBindfield = data.fareRows[i].bindField.replace(/\./gi, '\\.');
                noCurrentRadios = $('#ctf-results input[name=' + escapedBindfield + ']').length;
                idNo = noCurrentRadios + i + 1;
                currentFare = data.fareRows[i];
                allPartials = [];
                statusArray = [];
                mainTemplate = [];
                changesTemp = [];
                firstFareBreakRet = '';
                firstFareBreakSing = '';

                currentFare = that.augmentData(data, i, len, idNo, 'main');

                if (data.isReturnJourney) {
                    if (typeof currentFare.cheapestReturnFare !== 'undefined') {
                        if (currentFare.cheapestReturnFare.fareBreakdowns.length > 0) {
                            firstFareBreakRet = currentFare.cheapestReturnFare.fareBreakdowns[0];
                        }

                    }
                }

                if (typeof currentFare.cheapestSingleFare !== 'undefined') {
                    if (currentFare.cheapestSingleFare.fareBreakdowns.length > 0) {
                        firstFareBreakSing = currentFare.cheapestSingleFare.fareBreakdowns[0];
                    }
                }


                //is the fare on the next day? if so write in the separator


                //START TEMPLATE BUILDING

                var fareBreakdonTemplate = '{"breakdownType":"{{breakdownType}}","fareTicketType": "{{fareTicketType}}","ticketRestriction": "{{ticketRestriction}}","fareRouteDescription": "{{fareRouteDescription}}","fareRouteName": "{{fareRouteName}}","passengerType": "{{passengerType}}","railcardName": "{{railcardName}}","ticketType": "{{ticketType}}","ticketTypeCode": "{{ticketTypeCode}}","fareSetter": "{{fareSetter}}","fareProvider": "{{fareProvider}}","tocName": "{{tocName}}","tocProvider": "{{tocProvider}}","fareId": {{fareId#cleannumber}},"numberOfTickets": {{numberOfTickets#cleannumber}},"fullFarePrice": {{fullFarePrice#cleanfloat}},"discount": {{discount#cleanfloat}},"ticketPrice": {{ticketPrice#cleanfloat}},"cheapestFirstClassFare": {{cheapestFirstClassFare#cleanfloat}},"nreFareCategory": "{{nreFareCategory}}","redRoute": {{redRoute}}}';

                allPartials.push({ template: fareBreakdonTemplate, partialName: 'cheapestSingleFare\\.fareBreakdowns', delimeter: ',' });
                allPartials.push({ template: fareBreakdonTemplate, partialName: 'cheapestReturnFare\\.fareBreakdowns' , delimeter: ','});

                mainTemplate.push('{{htmlNextDay}}<tr class="mtx{{htmlRowClass}} ajaxNo{{callAjaxNo}}"><td class="dep">{{departureTime}}</td><td class="from">{{origin}} {{typeIconOut}} {{htmlDepPlatform}}</td><td class="to"><span class="arrow"><img height="26" width="12" src="{{clrImg}}" class="sprite-main" alt="">{{destination}} {{typeIconIn}} {{htmlArrPlatform}}</td><td class="arr">{{arrivalTime}}</td><td class="dur">{{htmlDuration}}</td><td class="chg">{{htmlChanges}}</td><td class="info"><a href="{{detailsLink}}"><span class="accessibility">More </span>Details<span class="accessibility"> on the {{departureTime}} service from {{origin}} to {{destination}}</span></a></td><td class="status">{{htmlStatus}}</td><td class="fare{{cheapestCss}}"><script  type="application/json" id="jsonJourney-{{responseId#cleannumber}}-{{journeyId#cleannumber}}">{"jsonJourneyBreakdown": {"departureStationName": "{{origin}}","departureStationCRS": "{{originCRS}}","arrivalStationName": "{{destination}}","arrivalStationCRS": "{{destinationCRS}}","statusMessage": "{{statusMessage}}","departureTime": "{{departureTime}}","arrivalTime": "{{arrivalTime}}","durationHours": {{hoursInt}},"durationMinutes": {{minsInt}}, "changes": {{changes#cleannumber}},"journeyId": {{journeyId#cleannumber}},"responseId": {{responseId}},"statusIcon":"{{status}}","hoverInformation": "{{statusHoverInformation}}"},"singleJsonFareBreakdowns": [{{<cheapestSingleFare\.fareBreakdowns}}], "returnJsonFareBreakdowns":[{{<cheapestReturnFare\.fareBreakdowns}}]}</script>');

                //build return fare
                if (data.isReturnJourney) {
                    mainTemplate.push('<div class="return clear{{returnCss}}">{{htmlRetCheapest}}<h4 class="accessibility">Return Fare</h4>');


                    mainTemplate.push('<label id="returnFareLabel" class="opreturn" for="{{newId}}" tabindex="0"><input type="radio" id="{{newId}}" name="{{bindField}}" value="{{newValue}}"><span class="label-text">{{formattedPrice}}</span><span class="accessibility">Buy this fare</span></label>{{htmlTooltipReturn}}{{htmlMFaresReturn}}');

                    mainTemplate.push('</div>');

                }
                //build single fare or 2 singles as return
                mainTemplate.push('<div class="single clear{{singleCss}}">{{htmlSingCheapest}}<h4 class="accessibility">Single Fare</h4>');

                mainTemplate.push('<label class="{{labelCss}}" for="{{newIdSing}}" tabindex="0"><input type="radio" id="{{newIdSing}}" name="{{bindField}}" value="{{newValueSing}}"><span class="label-text">&pound;{{cheapestSingleFare.totalPrice}}</span><span class="accessibility">Buy this fare</span></label>{{htmlSingleButtons}}{{htmlTooltipSingle}}{{htmlMFaresSingle}}');

                mainTemplate.push("</div></td></tr>");

                //add in the changes tooltip if needed
                if (currentFare.changes > 0) {
                    changesTemp = [];

                    mainTemplate.push('<tr class="changes"><td colspan="10"><div class="changestext"><table cellspacing="0" cellpadding="0" border="1" summary="{{changesTooltip.summary}}" class="innertable"><thead><tr class=""><th><span class="accessibility">Travel by</span></th><th>Leaving</th><th class="from">From</th><th class="to">To</th><th>Arriving</th></tr></thead><tbody>{{<changesTooltip\.changes}}');

                    changesTemp.push('<tr class="{{#applyAlt}}"><td><img class="sprite-mode sprite-{{travelMode#tolowerstripunder}}" src="', fcPth.clrImg, '" width="25" height="24" alt="{{travelMode}}" /></td><td>{{departureTime}}</td><td class="origin">{{originStation}} [<abbr>{{originStationCrsCode}}</abbr>]</td><td class="destination"><span class="arrow"><img alt="" class="sprite-main" src="', fcPth.clrImg, '" width="12" height="26" />{{destinationStation}} [<abbr>{{destinationStationCrsCode}}</abbr>]</span></td><td>{{arrivalTime}}</td></tr>');
                    //push a new partial template
                    allPartials.push({ template: changesTemp.join(''), partialName: 'changesTooltip\\.changes' });
                    mainTemplate.push('</tbody></table></div></td></tr>');
                    changesTemp = null;
                }

                mainTemplate.push('{{htmlStatusRow}}');

                finalStr = mainTemplate.join('');
                htmlStr.push(FC.templater(finalStr, currentFare, null, allPartials));
                //copy a fare details slider
                htmlStr.push('<tr class="faredets');

                if (currentFare.ajaxRow) {
                    htmlStr.push(' ajaxRow');
                }

                fareDetailsHtml = that.fareHTML.toString();

                fareDetailsHtml = fareDetailsHtml.replace(/sltRtnProviderOutward[0-9][0-9]/gi, 'sltRtnProviderOutward' + currentFare.responseId + currentFare.journeyId);
                fareDetailsHtml = fareDetailsHtml.replace(/sltSingProviderOutward[0-9][0-9]/gi, 'sltSingProviderOutward' + currentFare.responseId + currentFare.journeyId);

                htmlStr.push(' ajaxNo' + that.callAjaxNo + '">' + fareDetailsHtml + '</tr>');

                //this will catch the instance where all the earlier trains returned by the JSON service are on the previous day
                //we should only do this if it is earlier, isNextDay is still false, the fare is the last fare in the result, it's the first
                //ajax call and then fare date is different to the query date. Note that this *won't* handle where there are exactly 5 trains
                //a day, I wasn't sure how to handle that edge case so I've left it.
                if (that.isEarlier && !currentFare.isNextDay && i === len - 1 && currentFare.departureDate !== data.departureDate && that.callAjaxNo === 1) {
                    htmlStr.push(that.writeNextDay(data.departureDate));
                }

                //remove the augmented data which is now no longer needed
                that.tidyData(currentFare);

                noCurrentRadios = null;
                idNo = null;
                //firstFareBreak = null;
                mainTemplate = null;
                allPartials = null;
                statusArray = null;
                currentFare = null;
            }

            return htmlStr;
        },
        //writes the html into the page and attaches the events
        writeNewRows: function (data, context) {
            var htmlStr = [];
            var that = context;
            var fullstr = '';
            var newTableRows = '';
            var tableRows = '';
            var newFareSelected = '';

            data.isReturnJourney = data.returnDate === '' ? false : true;
            that.updateFilters(data);

            try {

                //loops through all the data and builds the html
                htmlStr = that.ctfRowHtml(data, context);


            } catch (e) {
                if (data.fareRows.length === 0) {
                    htmlStr = ['<tr id="ajaxWait"><td colspan="9" class="ajaxWait"><span class="ajaxText">No fares available</span> </td></tr>'];
                } else {
                    htmlStr = ['<tr id="ajaxWait"><td colspan="9" class="ajaxWait"><span class="ajaxText">Sorry, there has been a error. Please try again.</span> </td></tr>'];
                }

                NRE.utilities.safeConsole(e);
            }

            if (htmlStr.length === 0) {
                htmlStr = ['<tr id="ajaxWait"><td colspan="9" class="ajaxWait"><span class="ajaxText">No fares available</span> </td></tr>'];
            }

            fullstr = FC.cleanTemplate(htmlStr.join(''));
            that.removeSpinner();


            //choose where we add the new rows
            switch (that.type) {
                case 'earlierOutbound':
                case 'earlierInbound':
                    that.tableTU.find('tr.first').removeClass('first');
                    that.tableTU.prepend(fullstr);
                    break;
                case 'laterOutbound':
                case 'laterInbound':
                    that.tableTU.find('tr.last').removeClass('last');
                    that.tableTU.append(fullstr);
                    break;
            }

            newTableRows = that.tableTU.find('tr.ajaxNo' + that.callAjaxNo);

            //do the update to the other direction, if needed, here
            if (data.otherDirectionFareRows.length !== 0) {
                that.updateOtherMatrix(data);
            }
            $("#ctf-results select.sltProvider").off();

            //we need to catch instances where the earlier later ajax response returns the currently selected fare with a different response id, which means the radio stored in NRE.basket.sRadio no longer exists. This is a rare edge case, but if we don't handle this, the code break in prefVendorAjax and various other places
            if ($('#' + NRE.basket.sRadio[0].id).length === 0 && $('.fare input:checked').length === 0) {
                newFareSelected = $('.has-cheapest input[type=radio]');

                if (newFareSelected.length > 0) {
                    newFareSelected.prop('checked', true);
                    newFareSelected[0].checked = true;
                }
            }

            FC.globalVendorChange.init();
            //do the changes toolip
            FC.tooltip(newTableRows.find('div.tooltip'));
            //do the ticket type tootip
            FC.tooltip(newTableRows.find('span.tooltip'));
            //tooltipsfor statuses
            //FC.tooltip(newTableRows.find('div.statustip'));
            //attach more fares
            FC.moreFares.init(newTableRows.find('.more-fares a'), newTableRows);
            //populate ticket details;
            NRE.basket.init(newTableRows);
            //sort out the alternate row styling;
            that.styleRows(that.tableTU);
            NRE.basket.tabBask();



            //Update First class button
            that.updateFirstClass(data);

            //Update Cheapest fare buttons
            if (data.otherDirectionFareRows === '') {
                $('#ctf-cf .b-y span').html('Buy now for &pound;' + data.singleTab);
                $('#fare-switcher .ctf-pr').html('&pound;' + data.singleTab);
            }
            if (data.isReturnJourney) {
                FC.fareSwitcher.updateTabs(data.returnTab, data.singleTab);
            }

            //Do we need to trigger the returnoutbound ajax functions?

            //try {
            //    if (typeof pageLoadSelectedFare !== 'undefined' && pageLoadSelectedFare !== '' && pageLoadSelectedFare !== null && typeof responseId !== 'undefined' && responseId !== null) {
            //        selectOutboundReturnFare(pageLoadSelectedFare, null, responseId);
            //    } else {
            //        disableAllInboundFares();
            //    }
            //} catch (err) {
            //    if (typeof console !== 'undefined') {
            //        console.log(err);
            //    }
            //}

            if (data.isReturnJourney) { //select fare previously selected
                if (that.radioToSelect.length > 0) {
                    $('input[value="' + that.radioToSelect[0].value + '"]').trigger('click');
                }
            }

            NRE.otherServices.removeLinks($('.fare > div.single'));
            NRE.otherServices.buildAllLinks($('.fare > div.single'));
            FC.fareSwitcher.selectFares(FC.fareSwitcher.cTab);

            that.lastDirect = that.type.indexOf('Outbound') > -1 ? 'outbound' : 'return';
            htmlStr = null;
            fullstr = null;
            newTableRows = null;
            that.tableTU = null;
            tableRows = null;
        },
        //updates the first class promo
        updateFirstClass: function (data) {
            //Update First class button
            var num = parseFloat(data.faresPromotionCheapestPrice, 10).toFixed(2);
            var returnVal = parseFloat(data.returnTab, 10).toFixed(2);
            var singleVal = parseFloat(data.singleTab, 10).toFixed(2);
            var fares = data.fareRows.length;
            var $upsell = $('#ctf-results').find('.firstUpsell');
            var limit = $upsell.data('limit');
            var showUpsell = false;
            var tab = "";
            var i = 0;
            var mins = 0;
            var val = 0;
            var fixed = 0;
            var string = '';

            if (data.faresPromotionCheapestPrice !== "" && data.faresPromotionStatus === "FIRST" && data.faresPromotionCheapestPrice < 900000) {

                $('#ctf-so .ctf-first .ctf-price span').html('&pound;' + num);

                $upsell.empty();

                //update first class upsell
                for (i = 0; i < fares; i++) {
                    mins = (data.fareRows[i].duration.split(" ")[0].split("h")[0] * 60) + data.fareRows[i].duration.split(" ")[1].split("m")[0];

                    if (mins > limit) {
                        showUpsell = true;
                    }
                }


                if (showUpsell) {
                    if (data.isReturnJourney) {
                        tab = (returnVal > singleVal) ? singleVal : returnVal;
                    } else {
                        tab = singleVal;
                    }

                    val = num - tab;
                    fixed = val.toFixed(2);
                    string = $('<p><strong>Long journey?</strong> <a href="/service/timesandfares/switchfarespromotion">Why not upgrade to First Class from +&pound;' + fixed + '</a><span class="arrow"></span></p>');

                    $upsell.append(string);
                }


            }
        },
        //if there is an ajax error, like a server 404 0r 500
        errorFunction: function (data, context) {
            //redirect to nre error page
            window.location = fcPth.errorPage;
        },
        //the actual ajax call
        ajax: function () {
            var that = this;
            $.ajax({
                dataType: 'json',
                url: fcPth.earlLater + '?outbound=' + that.isOut + '&earlier=' + that.isEarlier,
                //url: that.ajaxUrl,
                success: function (data) {
                    that.successFunction(data, that);
                },
                error: function (data) {
                    that.errorFunction(data, that);
                }
            });
        }
    };
    return process;
})(NRE, FC, $);
FC.basketCFF = function () {
    var ThalesFareId;

    function clickHandler(e, keyTarg, isUpDown, callType) {

        //console.log("key target: "+keyTarg);

        var $target = (keyTarg !== null) ? keyTarg : $(e.target),
            multiTicket = false, fares, fareArray = [];

        /**
         * Check if the clicked element is an input or label
         */
        if (e.target.nodeName.toLowerCase() === "input" || e.target.nodeName.toLowerCase() === "label" || e.which === 27) {
            FC.ctfModule.doClick(e);
            if (e.target.nodeName.toLowerCase() === "input" || e.which === 27) {
                if ($target.parents("label").parent()[0].nodeName === "LI") {
                    fares = $target.parents("label").parent().find(".fare-breakdown input");
                } else {
                    fares = $target.parents("label").parent().find("span.fare-breakdown:first input");
                    //console.log(fares);
                }

            } else {
                if ($target.parent()[0].nodeName === "LI") {
                    fares = $target.parent().find(".fare-breakdown input");
                } else {
                    fares = $target.parent().find("span.fare-breakdown:first input");
                    //console.log(fares);
                }
            }

            var outwardFareSetter = '', tocSetter;

            //if (!$target.parent().parent().hasClass("return-only")) {

            fares.each(function (i) {
                /**
                 * fareArray is and array created from the value of a hidden field
                 * within '.fare-breakdown'. Its values are, in part, used to
                 * determine which provider logo to display under "Tickets".
                 *
                 * SEE: Changes default toc logo
                 */
                fareArray = this.value.split("|");

                var $basket = $(".cff #minibasket-table");

                var fareInfoLink = "";

                //multiticket (TODO)
                multiTicket = typeof fareArray[7] !== 'undefined' && fareArray[7] === 'true';

                //Set KB link
                switch (fareArray[3]) {
                    case FC.vars.links.ADVANCE_INFO:
                        fareInfoLink = fcPth.advInfoUrl;
                        break;
                    case FC.vars.links.ANYTIME_INFO:
                        fareInfoLink = fcPth.anyInfoUrl;
                        break;
                    case FC.vars.links.OFF_PEAK_INFO:
                        fareInfoLink = fcPth.opInfoUrl;
                        break;
                    default:
                        fareInfoLink = fcPth.advInfoUrl;
                        break;
                }


                //Used to determine if quick buy button is offered
                if (outwardFareSetter === '') {
                    // check if we've got a fare setter to use and that it's not an invalid fare
                    if (typeof fareArray[10] !== 'undefined' && fareArray[10] !== 'null' && typeof fareArray[7] !== 'undefined' && fareArray[7] === 'false') {
                        outwardFareSetter = fareArray[10];
                    }
                }

                if (typeof fareArray[10] !== 'undefined' && fareArray[10] !== '' && typeof fareArray[7] !== 'undefined' && fareArray[7] === 'false' && outwardFareSetter === fareArray[10]) {
                    $('a.view-summary').css({
                        "display": "inline"
                    });
                    $('span.view-summary').css({
                        "display": "inline"
                    });

                    //KE 090914
                    //FC.viewSummary();

                } else {
                    $('a.view-summary').css({
                        "display": "none"
                    });
                    $('span.view-summary').css({
                        "display": "none"
                    });

                    var anchor = $('a.view-summary').eq($('a.view-summary').index(this)),
                        id = anchor.attr('data-formid'),
                        form = $('#' + id),
                        buttons = $("button[type=submit]", form);

                    if (FC.hasIE6) {
                        buttons = $("input[type=submit]", form);
                    }

                    buttons.unbind('click');
                }


                //additional data for link added 30.3.2011 with coversation with Daniel Lees at THALES
                if (fareArray[8] !== '') {
                    fareInfoLink += "&ticketTypeCode=" + fareArray[8];
                }
                if (fareArray[9] !== '') {
                    fareInfoLink += "&ticketRestriction=" + fareArray[9];
                }
                fareInfoLink += "&callingPage=" + window.location.pathname.toString();

                //Build the table row
                // is TravelCard
                var tempFareTicketType;
                var fareTicketTypeCSS = '';
                tempFareTicketType = fareArray[3].toLowerCase();
                if(tempFareTicketType.indexOf('travelcard') !== -1){
                    fareTicketTypeCSS = 'class="ic-trvlcrd"';
                }
                var fareStr = '<tr class="miniBasketFare"><td><strong>' + fareArray[1] + ' x ' + fareArray[2] + '</strong> - <a ' + fareTicketTypeCSS + ' href="' + fareInfoLink + '">' + fareArray[3] + '</a>';
                //railcard?
                if (fareArray[4] !== '') {
                    fareStr += '<span class="type">(' + fareArray[4] + ')</span>';
                }
                //discount
                if (fareArray[6] !== '') {
                    fareStr += '<strong class="saving">Saving &pound;' + fareArray[6] + '</strong>';
                }
                //price and close
                fareStr += '</td><td class="price">&pound;' + fareArray[5] + '</td></tr>';


                var ticketDetails = $("div.ticket-details");

                //hide all results table, reshown in SWITCH.
                if ($target.parent().parent().hasClass("return-only") && fareArray[0] === "ReturnFare") {

                } else {
                    //console.log("hiding basket 2")
                    $basket.find('tbody').hide();
                }
                ThalesFareId = fareArray[12];
                switch (fareArray[0]) {
                    case "SingleFare":
                        //empty previous results
                        if (i === 0) {
                            $basket.find('tbody.miniBasketSingleFare tr.miniBasketFare').remove();
                        }
                        //hide msg (should be hidden already)
                        $basket.find('tbody.miniBasketNone').hide();
                        //add fare str to table
                        $basket.find('tbody.miniBasketSingleFare tr.sub-total').before(fareStr);
                        //show table
                        $basket.find('tbody.miniBasketSingleFare').show();
                        //ticket details
                        ticketDetails.find("p.td-ret").hide();
                        ticketDetails.find("span.td-rname-out").text(fareArray[15]);
                        if (fareArray[16] === "FLEXIBLE") {
                            ticketDetails.find("span.td-rdesc-out").text("ROUTE OF TICKET " + fareArray[15] + " - " + fareArray[14] + " This fare is only valid on trains travelling between certain times.");
                        }
                        else if (fareArray[16] === "RESTRICTED") {
                            ticketDetails.find("span.td-rdesc-out").text("ROUTE OF TICKET " + fareArray[15] + " - " + fareArray[14] + " This fare is only valid on the train(s) specified.");
                        } else {
                            ticketDetails.find("span.td-rdesc-out").text("ROUTE OF TICKET " + fareArray[15] + " - " + fareArray[14]);
                        }
                        break;
                    case "SingleFareOutward":
                        //empty prev results
                        if (i === 0) {
                            $basket.find('.miniBasketSingleFareOutward tr.miniBasketFare').remove();
                        }
                        //check for return journeys and update messagingm, or show the current results
                        if ($basket.find('tbody.miniBasketSingleFareReturn tr.miniBasketFare').length === 0) {
                            $basket.find('tbody.miniBasketNone').show().find("th").text('Please select return journey'); //no returns set, show msg
                        } else { //show the completed table
                            $basket.find('tbody.miniBasketSingleFareReturn').show();
                        }
                        //show table & inject fare info
                        $basket.find('tbody.miniBasketSingleFareOutward').show().find("tr.sub-total").before(fareStr);
                        //ticketdetails
                        ticketDetails.find("p.td-ret").show();
                        ticketDetails.find("span.td-rname-out").text(fareArray[15]);
                        if (fareArray[16] === "FLEXIBLE") {
                            ticketDetails.find("span.td-rdesc-out").text("ROUTE OF TICKET " + fareArray[15] + " - " + fareArray[14] + " This fare is only valid on trains travelling between certain times.");
                        }
                        else if (fareArray[16] === "RESTRICTED") {
                            ticketDetails.find("span.td-rdesc-out").text("ROUTE OF TICKET " + fareArray[15] + " - " + fareArray[14] + " This fare is only valid on the train(s) specified.");
                        } else {
                            ticketDetails.find("span.td-rdesc-out").text("ROUTE OF TICKET " + fareArray[15] + " - " + fareArray[14]);
                        }
                        break;
                    case "SingleFareReturn":
                        //empty prev results
                        if (i === 0) {
                            $basket.find('.miniBasketSingleFareReturn tr.miniBasketFare').remove();
                        }
                        //check for return journeys and update messagingm, or show the current results
                        if ($basket.find('tbody.miniBasketSingleFareOutward tr.miniBasketFare').length === 0) {
                            $basket.find('tbody.miniBasketNone').show().find("th").text('Please select outward journey');
                        } else { //need to show one of these
                            $basket.find('tbody.miniBasketSingleFareOutward').show();
                        }
                        //show table & inject fare info
                        $basket.find('tbody.miniBasketSingleFareReturn').show().find("tr.sub-total").before(fareStr);
                        //ticketdetails
                        ticketDetails.find("p.td-ret").show();
                        ticketDetails.find("span.td-rname-ret").text(fareArray[15]);
                        if (fareArray[16] === "FLEXIBLE") {
                            ticketDetails.find("span.td-rdesc-ret").text("ROUTE OF TICKET " + fareArray[15] + " - " + fareArray[14] + " This fare is only valid on trains travelling between certain times.");
                        }
                        else if (fareArray[16] === "RESTRICTED") {
                            ticketDetails.find("span.td-rdesc-ret").text("ROUTE OF TICKET " + fareArray[15] + " - " + fareArray[14] + " This fare is only valid on the train(s) specified.");
                        } else {
                            ticketDetails.find("span.td-rdesc-ret").text("ROUTE OF TICKET " + fareArray[15] + " - " + fareArray[14]);
                        }
                        break;
                    case "ReturnFare":
                        //show table and add fareStr
                        if (!$target.parent().parent().hasClass("return-only")) {
                            if (i === 0) {
                                $basket.find('.miniBasketReturnFare .miniBasketFare').remove();
                            }
                            $basket.find('.miniBasketReturnFare').show().find('tr.sub-total').before(fareStr);
                            //ticketdetails
                            ticketDetails.find("p.td-ret").show();
                            ticketDetails.find("span.td-rname-out").text(fareArray[15]);
                            if (fareArray[16] === "FLEXIBLE") {
                                ticketDetails.find("span.td-rdesc-out").text("ROUTE OF TICKET " + fareArray[15] + " - " + fareArray[14] + " This fare is only valid on trains travelling between certain times.");
                            }
                            else if (fareArray[16] === "RESTRICTED") {
                                ticketDetails.find("span.td-rdesc-out").text("ROUTE OF TICKET " + fareArray[15] + " - " + fareArray[14] + " This fare is only valid on the train(s) specified.");
                            } else {
                                ticketDetails.find("span.td-rdesc-out").text("ROUTE OF TICKET " + fareArray[15] + " - " + fareArray[14]);
                            }
                        } else {
                            ticketDetails.find("p.td-ret").show();
                            ticketDetails.find("span.td-rname-ret").text(fareArray[15]);
                            if (fareArray[16] === "FLEXIBLE") {
                                ticketDetails.find("span.td-rdesc-ret").text("ROUTE OF TICKET " + fareArray[15] + " - " + fareArray[14] + " This fare is only valid on trains travelling between certain times.");
                            }
                            else if (fareArray[16] === "RESTRICTED") {
                                ticketDetails.find("span.td-rdesc-ret").text("ROUTE OF TICKET " + fareArray[15] + " - " + fareArray[14] + " This fare is only valid on the train(s) specified.");
                            } else {
                                ticketDetails.find("span.td-rdesc-ret").text("ROUTE OF TICKET " + fareArray[15] + " - " + fareArray[14]);
                            }
                        }
                        //ticketdetails

                        break;
                }
                tocSetter = fareArray[11];
            });
            // END: each function


            //scan prices
            var gt = 0;

            $("table#minibasket-table").find("tbody").each(function () {
                var t = 0;

                if (this.style.display !== "none") {
                    var $this = $(this);
                    t = 0;
                    $this.find(".miniBasketFare .price").each(function () {
                        t += parseFloat(this.innerHTML.slice(1));
                    });
                    $this.find("tr.sub-total td.price").html('&pound;' + t.toFixed(2));
                    gt += t;

                }
            });
            //set grand total

            $("table#minibasket-table").parent().find(".ticket-total .price").html('&pound;' + gt.toFixed(2));
            //console.log('this one');

            //set BUY NOW button
            //Note: IE6 was not properly encoding the chars
            var container = $(e.target).parent().parent().parent();
            var buttonVal = (container.parent().hasClass('has-cheapest')) ? 'Buy cheapest for ' + fcPth.uniPound : 'Buy now for '+fcPth.uniPound;

            if ($.browser.msie) {
                if ($.browser.version.substr(0, 1) < 7 && $.browser.version.substr(0, 2).indexOf(".") !== -1) {
                    $("#buyNowHead1.b-y input, #buyNowFoot.b-y-lrg input").val(buttonVal + gt.toFixed(2));
                } else {
                    $("#buyNowHead.b-y span, #buyNowFoot.b-y-lrg span").html(buttonVal + gt.toFixed(2));
                }
            } else {
                $("#buyNowHead.b-y span, #buyNowFoot.b-y-lrg span").html(buttonVal + gt.toFixed(2));
            }

            //set/hide multi ticket message
            //TODO: not sure what this does
            $('.ticket-total .multiple-ticket').remove();
            if (multiTicket) {
                $('.ticket-total .total').after('<p class="note multiple-ticket" style="clear:both;">You need to buy multiple tickets for this journey</p>');
            }
            multiTicket = false;

            //Hide more fares if the input is within a li (moew fares list only)
            //and inject new content to overwrite old.
            //tooltip is lost on re-injection
            //old IF : if(e.target.parentElement.parentElement.nodeName.toLowerCase() === "li") {
            if (e.target.nodeName.toLowerCase() === "input" || e.target.nodeName.toLowerCase() === "label" || e.which === 27) {
                var radioItemId;
                if (isUpDown !== "updown") {
                    selFare($target, e, callType);
                } else {
                    var fareArr1 = fares[0].value.split("|");
                    //console.log(fareArr1);
                    //console.log(callType);
                    var selTargParent;
                    if ($target[0].nodeName.toUpperCase() === "LABEL") {
                        selTargParent = $target.parent();
                        radioItemId = $target.children("input");
                    } else {
                        selTargParent = $target.parent().parent();
                        radioItemId = $target;
                    }
                    //if (callType === "normal" && fareArr1[0] === "ReturnFare") {
                    //    selectOutboundReturnFare(ThalesFareId, radioItemId.attr("id"), ThalesResponseId);
                    //} else if (fareArray[0][16].toUpperCase() === "FLEXIBLE") {
                    //    NRE.otherServices.addSingleLink(radioItemId, true);
                    //} else if (callType === "normal") {
                    //    var currentConts = $("." + selTargParent.attr("class").replace(" ", "."));
                    //    //NRE.otherServices.removeLinks(currentConts);
                    //}
                    selFare($target, e, callType);
                }
            }
            //set row color
            $target.parents("table").find("tr").removeClass("sel");
            $target.parents("tr").addClass("sel");

            /**
             * Change default toc logo
             * Removed - will be using JSON data to change provider list (09/05/2012)
             * Reinstated - see FC.ctfUpdateProviders for new functionality in development (14/05/2012)
             * Removed Again - will be using JSON data to change provider list...again (12/06/2012)

             if (typeof tocSetter !== "undefined") {
            var tocImg = $('div.operator-price img');
            var tocSetterImg = tocSetter.indexOf(" ") > -1 ? tocSetter.split(' ').join('') : tocSetter;
            if (tocSetter === "") {
            $('p.change-provider a').click();
            tocImg.hide();
            } else {
            tocImg.attr({
            // 'src': '/redesign/default/images/vendor_logos/logo-toc-' + tocSetterImg + '.gif',
            'src': 'images/logo-toc-' + tocSetterImg + '.gif',
            'alt': tocSetter
            }).show();
            
            $('select.sltProvider').val(tocSetter);
            }
            }*/


        } //end input IF

    }

    function selFare(selTarg, selEvent, callType) {
        var fareArray = [];
        var outFares = "";
        var currentConts = null;
        // alert("selFare function");
        //is the change coming from more fares - which is not used on CFF therefore ignore this if statement
        if (selTarg.parents(".shadow-right").length) {
            var liContent;
            var childrenToInsert;
            var targetDiv = selTarg.parents("td > div");
            var radioItemId;

            //targetDiv.find("label").removeClass("mfsel");
            //targetDiv.find("label").children("input:disabled").removeAttr("disabled");

            if (selEvent.target.nodeName.toLowerCase() === "input" || selTarg[0].nodeName.toLowerCase() === "input") {
                liContent = selTarg.parent("label").parent("li");
                childrenToInsert = liContent.children();
                radioItemId = selTarg;
            } else {
                liContent = selTarg.parent("li");
                childrenToInsert = liContent.children();
                radioItemId = selTarg.children("input");
                //liContent.children("label").addClass("mfsel");
                //liContent.children("label").children("input").attr("disabled", "disabled");
            }
            var tipText = liContent.find(".tooltip-top").text();


            //remove old content
            targetDiv.children("span.fare-type").remove();
            targetDiv.children("span.fare-breakdown").remove();
            targetDiv.children("label").remove();
            targetDiv.children("p").remove();

            var fareBreak = childrenToInsert.find("input[type='hidden']");

            if (typeof fareBreak !== "undefined") {
                fareArray = [];
                for (var i = 0; i < fareBreak.length; i++) {
                    fareArray.push(fareBreak[i].value.split("|"));
                }

            }

            targetDiv.find("h4.accessibility").after(childrenToInsert);
            if (callType === "normal" && fareArray[0][0] === "ReturnFare") {
                selectOutboundReturnFare(ThalesFareId, radioItemId.attr("id"));
            } else if (fareArray[0][16].toUpperCase() === "FLEXIBLE") {
                //FC.AddAltButton(radioItemId, true);
            } else if (callType === "normal") {
                currentConts = null;

                if (radioItemId.attr("id").indexOf("returnFareReturn") > -1) {
                    currentConts = $("div.return.return-only");
                } else if (radioItemId.attr("id").indexOf("returnFareOutward") > -1) {
                    currentConts = $("div.return.clear");
                } else if (radioItemId.attr("id").indexOf("faresingleFareOutward") > -1) {
                    currentConts = $("div.single.clear.false");
                } else if (radioItemId.attr("id").indexOf("faresingleFareReturn") > -1) {
                    currentConts = $("div.single.clear.true");
                }
                //NRE.otherServices.removeLinks(currentConts);
            }
            //console.log(targetDiv.hasClass("return") = " 6264");
            NRE.details.updateSingleLink(fareArray, targetDiv, targetDiv.hasClass("return"));
            //check it
            targetDiv.find("input").eq(0).attr("checked", "true"); //should send click event
            if (selEvent.keyCode === 27 || selEvent.keyCode === 13) {
                targetDiv.find("input").eq(0).focus();
            }
            //hide more fares
            //if (selEvent.target.nodeName.toLowerCase() === "input") {
            $("#ctf-results").trigger("HIDE_ALL", [targetDiv.find(".hide-fares a")[0], false]);

            // Init tooltip.
            FC.tooltip(targetDiv.find('.tooltip:first'));

            //}
        }
        //change coming from main page
        else {

            var selTargParent;
            var toCheck;
            var altButtontarg = "";
            //handle label click on main page NREOJPTEST-2776
            if (selTarg[0].nodeName.toUpperCase() === "LABEL") {
                selTargParent = selTarg.parent();
                toCheck = selTarg.children("input");
            } else {
                selTargParent = selTarg.parent().parent();
                toCheck = selTarg;
            }
            if (selTargParent.attr("class").indexOf("return clear") > -1 || selTargParent.attr("class").indexOf("single clear") > -1 || selTargParent.attr("class").indexOf("single") > -1 || selTargParent.attr("class").indexOf("single clear true") > -1 || selTargParent.attr("class").indexOf("single clear false") > -1) {
                altButtontarg = selTargParent.attr("class").replace(/ /g, ".");
                var fareBreakMain = selTargParent.find("input[type='hidden']");
                if (fareBreakMain.length > 0) {
                    fareArray = [];
                    for (var z = 0; z < fareBreakMain.length; z++) {
                        fareArray.push(fareBreakMain[z].value.split("|"));
                    }
                }

                if (selTarg[0].nodeName.toUpperCase() === "LABEL") {
                    if (selTarg.children("input").attr("id").indexOf("FareOutward") > -1 || selTarg.children("input").attr("id").indexOf("faresingle") > -1) {
                        outFares = $("div." + altButtontarg);
                        //NRE.otherServices.removeLinks(outFares);
                    }
                } else {
                    if (selTarg.attr("id").indexOf("FareOutward") > -1 || selTarg.attr("id").indexOf("faresingle") > -1) {
                        outFares = $("div." + altButtontarg);
                        //NRE.otherServices.removeLinks(outFares);
                    }
                }
                if (callType === "normal" && fareArray[0][0] === "ReturnFare") {
                    toCheck.attr("checked", "true");
                    //selectOutboundReturnFare(ThalesFareId, toCheck.attr("id"), ThalesResponseId);
                } else if (fareArray[0][16].toUpperCase() === "FLEXIBLE") {
                    toCheck.attr("checked", "true");
                    //FC.AddAltButton(selTarg, true);
                } else if (callType === "normal") {
                    currentConts = $("." + selTargParent.attr("class").replace(/ /g, "."));
                    toCheck.attr("checked", "true");
                    //NRE.otherServices.removeLinks(currentConts);
                }
            }
        }

        NRE.details.updateAllLinks();
    }


    var ctfResults = $("#ctf-results");

    ctfResults
        .bind("mousedown", function (e) {
            if (e.which === 1) {

                //$(e.target).trigger('click.toc');
                clickHandler(e, null, null, "normal");
            }
        })
        .find('input[type=radio]:checked')//removed :first so that it scoops up the return single on a journey with two singles NREOJPTEST-2343
        .each(function () {
            // On page load, we want to update the mini basket based on selection
            // NREOJPTEST-2204


            clickHandler.call(ctfResults[0], { target: this }, null);
        });


    ctfResults.bind("keypress", function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            clickHandler(e, null, null, "normal");
        }
    });

    ctfResults.bind("keyup", function (e) {
        if (e.keyCode === 40 || e.keyCode === 38) {
            clickHandler(e, null, "updown", "normal");
        } else if (e.keyCode === 27) {
            var escTarget = $(e.target);
            var escTargetDiv = escTarget.parents("td > div");
            escTargetDiv.find("input").eq(0).focus();
            var anySel = $("div.more-fares-list").find('input[type=radio]:checked');
            if (anySel.length > 0) {
                clickHandler(e, anySel, null, "normal");
            } else {
                $("#ctf-results").trigger("HIDE_ALL", [escTargetDiv.find(".hide-fares a")[0], false]);
            }
        }
    });


};
function constructRouteMapLinkLi(fareArray, callingPage, isOutbound) {
    //JSP will add element with id routeMapEnabled if a JMX param is set to enable the Route Map.
    var routeMapEnabled = $.find("#routeMapEnabled");
    if (routeMapEnabled.length) {
        var routeMapUrl = "/service/routemapping/showroutemap";
        routeMapUrl += "?journeyId=" + fareArray[0].journeyId;
        routeMapUrl += "&fareId=" + fareArray[0].fareId;
        routeMapUrl += "&callingPage=" + callingPage;
        routeMapUrl += "&responseId=" + fareArray[0].responseId;
        routeMapUrl += "&isOutboundJourneySelected=" + isOutbound;

        return '<li><a class="other-valid-routes-link" href="' + routeMapUrl + '">Other valid routes</a></li>';
    }
    else {
        return "";
    }
}
//Note that otherServices is not currently used on the CFF page
NRE.otherServices = (function () {
    var process = {
        flexibleText: 'Other services you can travel on',
        flexibleAlt: 'Click to see other services you can travel on.',
        restrictedText: 'Ticket valid for this service only',
        restrictedAlt: 'Click to see journey ticket is valid for.',
        generateHtml: function (isFlexible, isRedRoute) {
            var that = this;
            var result = { link: '', sliderLink: '' };
            var linkText = '';
            var altText = '';
            var disabledClass = '';
            var restrictedClass = '';

            if (isRedRoute) {
                linkText = that.restrictedText;
                altText = that.restrictedText;
            } else {
                if (isFlexible) {
                    linkText = that.flexibleText;
                    altText = that.flexibleAlt;
                } else {
                    linkText = that.restrictedText;
                    altText = that.restrictedAlt;
                }
            }

            if (isRedRoute) {
                disabledClass = ' disabled';
            }

            if (!isFlexible  || (isFlexible && isRedRoute)) {
                restrictedClass = ' valid-only';
            }

            result.link = '<p class="alttrains other-services' + restrictedClass + '"><a class="other-fares-popup-link' + disabledClass + '" href="#" title="' + altText + '">' + linkText + '</a></p>';

            result.sliderLink = '<div class="alttrains other-services'+restrictedClass+' clear"><ul class="horizontal other-valid-routes-link-ul"><li><a class="other-fares-popup-link'+disabledClass+'" href="#" title="'+altText+'">'+linkText+'</a></li></ul></div>';

            return result;
        },
        attachEvents: function (fareCont, fareSlideCont, isAdvance, isRedRoute, journeyBreak) {
            var otherServicesLink = fareCont.find('a.other-fares-popup-link');
            var otherServicesSliderLink = fareSlideCont.find('a.other-fares-popup-link');

            otherServicesLink.off();
            otherServicesSliderLink.off();

            if (isRedRoute) {
                otherServicesLink.on('click', function (e) {
                    e.preventDefault();
                });
                otherServicesSliderLink.on('click', function (e) {
                    e.preventDefault();
                });
            } else {
                otherServicesLink.on('click', function (e) {
                    FC.altTrains(e, isAdvance, journeyBreak);
                });
                otherServicesSliderLink.on('click', function (e) {
                    FC.altTrains(e, isAdvance, journeyBreak);
                });
            }
        },
        addMapLink: function (isRedRoute, htmlString, fareArray, callingPage, isOutbound) {
            var result = htmlString;
            var routeMapHtml = '';

            if (isRedRoute === false && fareArray[0] !== null) {
                routeMapHtml = constructRouteMapLinkLi(fareArray, callingPage, isOutbound);

                result = htmlString.replace('</ul></div>', routeMapHtml + '</ul></div>');
            }

            return result;
        },
        generateUrl: function (outbound, inbound, isOutbound, callingPage) {
            var result = '?';
            var outboundJourneyId = '';
            var outboundFareId = '';
            var outboundResponseId = '';
            var inboundJourneyId = '';
            var inboundFareId = '';
            var inboundResponseId = '';

            if (outbound[0] !== null) {
                outboundFareId = outbound[0].fareId;
                outboundJourneyId = outbound[0].journeyId;
                outboundResponseId = outbound[0].responseId;
            }
            if (inbound[0] !== null) {
                inboundFareId = inbound[0].fareId;
                inboundJourneyId = inbound[0].journeyId;
                inboundResponseId = inbound[0].responseId;
            }


            if (outbound[0] !== null) {
                if (typeof outbound[0].fareId !== 'undefined') {
                    result = result + 'outboundJourneyId=' + outboundJourneyId;
                    result = result + '&outboundFareId=' + outboundFareId;
                    result = result + '&outboundResponseId=' + outboundResponseId;
                }
            }

            if (outbound[0] !== null && inbound[0] !== null) {
                if ((typeof outbound[0].fareId !== 'undefined' && typeof inbound[0].fareId !== 'undefined')) {
                    result = result + '&';
                }
            }

            if (inbound[0] !== null) {
                if (typeof inbound[0].fareId !== 'undefined') {
                    result = result + 'inboundJourneyId=' + inboundJourneyId;
                    result = result + '&inboundFareId=' + inboundFareId;
                    result = result + '&inboundResponseId=' + inboundResponseId;
                }
            }

            result = result + '&isOutboundJourneySelected=' + isOutbound;

            result = result + '&dataSource=' + callingPage;

            return result;
        },
        getCallingPage: function () {
            var result = '';
            var isCtf = $('#ctf');
            var isCtfDetails = $('#ctf-details');
            var isCff = $('.cff');

            if (isCtf.length > 0 || isCtfDetails.length > 0) {
                result = 'jp';
            }

            if (isCff.length > 0) {
                result = 'cff';
            }

            return result;
        },
        addSingleLink: function (clickedElement, removeFares, removeOutwardOnly) {
            var that = this;
            var callingPage = that.getCallingPage();

            var fareBreakdown = null;
            var journeyBreakdown = null;
            var clickedElementContainer = clickedElement.parents("td > div");
            var fareInfo = null;
            var linksHtml = '';
            var fareSlider = NRE.fares.findSlider(clickedElement);
            var sliderLinkHtml = null;
            var linkUrl = '';
            var elementId = '';
            var shouldRemoveOutwardOnly = typeof removeOutwardOnly === 'undefined' ? false : removeOutwardOnly;


            fareBreakdown = NRE.fares.findJSON(clickedElement, 'fare', false);
            journeyBreakdown = NRE.fares.findJSON(clickedElement, 'journey', false);
            fareInfo = NRE.fares.getInfo(fareBreakdown, clickedElementContainer, true, true, false, false);


            linksHtml = that.generateHtml(fareInfo.isFlexible, fareInfo.isRedRoute);
            sliderLinkHtml = that.addMapLink(fareInfo.isRedRoute, linksHtml.sliderLink, fareBreakdown, callingPage, fareInfo.isOutbound);
            linkUrl = that.generateUrl(fareInfo.outboundFare, fareInfo.inboundFare, fareInfo.isOutbound, callingPage);


            linksHtml.link = linksHtml.link.replace('#', linkUrl);
            sliderLinkHtml = sliderLinkHtml.replace('#', linkUrl);

            if (removeFares && clickedElement.length > 0) {
                elementId = clickedElement[0].id.toUpperCase();
                if(elementId.indexOf('RETURNFARERETURN') > -1){
                    that.removeLinks($("td.fare > div.return-only"));
                } else if (elementId.indexOf('RETURNFAREOUTWARD') > -1) {
                    if (shouldRemoveOutwardOnly === false) {
                        that.removeLinks($("td.fare > div.return.clear"));
                    } else {
                        that.removeLinks($("td.fare > div.return.clear").not('.return-only'));
                    }
                } else if (elementId.indexOf("SINGLEFAREINWARD") > -1 || elementId.indexOf("SINGLEFARERETURN") > -1) {
                    that.removeLinks(clickedElementContainer);
                    that.removeLinks($("div.single.clear.false"));
                    that.buildAllLinks($("div.single.clear.false"));
                } else if (elementId.indexOf("SINGLEFAREOUTWARD") > -1) {
                    that.removeLinks($("div.single.clear.true"));
                    that.removeLinks(clickedElementContainer);
                    that.buildAllLinks($("div.single.clear.true"));
                }
            }

            clickedElementContainer.append(linksHtml.link);
            fareSlider.append(sliderLinkHtml);

            clickedElementContainer.addClass("has-alt-trains");
            fareSlider.addClass("has-alt-trains");

            that.attachEvents(clickedElementContainer, fareSlider, fareInfo.isAdvance, fareInfo.isRedRoute, journeyBreakdown);


        },
        buildAllLinks: function (targChild) {
            //condition to catch edge case where there are no single fares available on a journey ie travelcard switch
            if ($('#fare-switcher .right > a').length !== 0 || (FC.fareSwitcher.hasFS === false && $('#fare-switcher .center').length > 0)) {
                targChild.each(function () {
                    var that = NRE.otherServices;
                    var targetDiv = $(this);
                    var fareRadio = targetDiv.find("input[type='radio']");

                    that.addSingleLink(fareRadio, false);

                });
            }
        },
        removeLinks: function (container) {
            container.each(function () {
                var $this = $(this);
                var thebutton = $this.find('.alttrains');
                var slider = NRE.fares.findSlider($this.find('input[type=radio]'));
                var sliderButtonArea = slider.find('.alttrains');
                thebutton.remove();
                $this.removeClass("has-alt-trains");
                sliderButtonArea.remove();
                slider.removeClass("has-alt-trains");
            });
        }
    };
    return process;
})(NRE, $);
/*
 Inject the print button in the gray lozenge at the top of the page
 This should be done via CSS to avoid a reflow events
 */
FC.printButton = function () {
    $('#ctf-h-nav')
        .find('.ctf-prtn')
        .click(function () {
            try {
                window.print();
            } catch (e) {
            }
            return false;
        });
};
/*
 This is the old print function taken back in to support
 */
FC.printButtonOld = function () {
    $(".multi-button ul").prepend("<li class='first'><a class='print' href='javascript:window.print()'><span class='border'><span class='image'>Print</span></span></a></li>");

};

NRE.printButton = (function ($, FC) {
    var process = {
        init: function () {
            $('.print-button').on('click', function () {
                try {
                    window.print();
                } catch (e) {
                    return false;
                }
                return false;
            });
        }
    };
    return process;
})($, FC);

NRE.printButton.init();
/*
 Controls form behavior for buttons and "view summary" links on 1.1.3 tempaltes
 It's important for the backend rather than UI
 */
FC.viewSummary = function ($parent) {

    var anchor = $parent.eq($parent.index(this)),
        id = anchor.attr('data-formid'),
        form = $('#' + id),
        buttons = $("button[type=submit]", form);

    if (FC.hasIE6) {
        buttons = $("input[type=submit]", form);
    }

    // view-summary links : show and attach click event handler to submit form
    if (form.length) {
        $parent.click(function () {
            $("#jp-button-pressed").attr("name", "buttonPressed");
            $("#jp-button-pressed").val(this.value);
            form.submit();
            return false;
        });

        /* Add click event to buy now button */
        buttons.click(function (e) {
            e.preventDefault();
            form.attr("target", "_blank");
            $("#jp-button-pressed").attr("name", "buttonPressed");
            $("#jp-button-pressed").val("buy");
            form.submit();
            form.attr("target", "");
            $("#jp-button-pressed").attr("name", "");
            $("#jp-button-pressed").val("");
        });

    }

};
/*
 Scroll down to the in page JP on the 1.5 templates and open the accordian
 */
FC.editJourneyLink = function ($link) {
    $link.click(function (e) {
        var $n2 = $("#num2");
        if (!$n2.hasClass("expanded")) {
            $n2.click();
        }
    });
};
FC.editPassLink = function ($link) {
    $link.click(function (e) {
        var $n2 = $("#num3");
        if (!$n2.hasClass("expanded")) {
            $n2.click();
        }
    });
};
/*
 the next three function start the LDB for each major template
 */
FC.initLTLDB = function ($ldb) {
    lt.init({
        homepage: false,
        /*SWITCH FOR LIVE*/
        //url:"/service/ldb/liveTrainsJson",
        url: fcPth.ltUrl,
        rows: 10,
        ajaxData: {
            departing: true,
            liveTrainsFrom: $ldb.find("#train-from").val(),
            liveTrainsTo: $ldb.find("#train-to").val(),
            serviceId: $serviceId
        }
    }, $ldb);
};
FC.initLTLDD = function ($ldd) {
    lt.initLDD({
        homepage: false,
        /*SWITCH FOR LIVE*/
        //url: "/service/ldbdetailsJson",
        url: fcPth.ltDepUrl,
        ajaxData: {
            departing: true,
            liveTrainsFrom: "",
            liveTrainsTo: "",
            serviceId: $serviceId
        }
    }, $ldd);
};
/*
 Reveals a message after clicking on "Other Cheap Fares" on the 1.5 templates
 */
FC.otherCheapFaresReveal = function ($link) {
    $link.bind("click", function () {
        $('#ctf-ocfr').toggle();
        var $expandedVal = $('#ctf-ocfr').attr('aria-expanded');
        if ($expandedVal === 'false') {
            $('#ctf-ocfr').attr('aria-expanded', 'true');
        } else {
            $('#ctf-ocfr').attr('aria-expanded', 'false');
        }
        return false;
    });
};
/*
 share this page hover menu on Service Disruption  NRE-3.1-Service-Disruptions.shtml
 Static Content  - NRE-6.1-Generic-content-A.shtml
 Station Information pages - NRE-2.2.1-stations-template.shtml
 Train times and fares  NRE-1.1-Journey-Planner.shtml
 LDB Results - NRE-9.1-LiveTrains-details.shtml
 Season ticket Calculator - NRE-20.3-Season-Ticket-calculator.shtml
 PYOT - NRE-20.2-Pocket-timetable.shtml

 */
FC.shareMenu = function ($share) {
    var __shareMenu = $("#share-menu");
    var __isMenuShowing = false;
    var __menuTimeOut;
    var __shareName = $("#share-details");
    var __shareMenuLinks = __shareMenu.children("a");
    var __emailLink = __shareMenu.children("a.email");
    var __emailArea = $("#share-page-by-email");
    var __emailClose = __emailArea.children("a.share-close");


    //$share.children("a.shareicon").remove();
    $share.find("span.sharelink").replaceWith("<a href='#' class='sharelink'>Share<img src=" + fcPth.clrImg + " alt='' width='11' height='8' class='sprite-main share-open' /></a>");
    //$share.addClass("js");

    function showMenu(e) {
        clearTimeout(__menuTimeOut);
        if (!__isMenuShowing) {
            __emailArea.hide();
            __isMenuShowing = true;
            //__isMenuAnimating = true;
            __shareMenu.show();
            __shareName.show();
            __shareMenuLinks.show();
            $share.addClass("open");
        }
    }

    function hideMenu(e) {
        if (__isMenuShowing) {
            __shareMenu.blur();
            __shareMenu.hide();
            $share.removeClass("open");
            __isMenuShowing = false;
        }
    }

    function hideMenuMouse(e) {
        __menuTimeOut = setTimeout(hideMenu, 300);
    }

    function hideMenuKeyboard(e) {
        __menuTimeOut = setTimeout(hideMenu, 200);
    }

    function showEmailForm(e) {
        __shareMenuLinks.hide();
        __shareName.hide();
        __emailArea.show();
        return false;
    }

    function hideEmailForm(e) {
        __emailArea.hide();
        return false;
    }

    $share.bind("focusin", showMenu);
    $share.bind("mouseenter", showMenu);
    $share.children("a.sharelink").bind("click", function () {
        return false;
    });
    __shareMenu.bind("mouseenter", showMenu);
    $share.bind("focusout", hideMenuKeyboard);
    $share.bind("mouseleave", hideMenuMouse);
    __shareMenuLinks.each(function () {
        var __this = $(this);
        __this.bind("mouseenter", function () {
            __shareName.text(__this.text());
        });
        __this.bind("mouseleave", function () {
            __shareName.text(" ");
        });
        __this.bind("focusin", function () {
            __shareName.text(__this.text());
        });
        __this.bind("focusout", function () {
            __shareName.text(" ");
        });

    });

    __emailLink.bind("click", showEmailForm);
    __emailClose.bind("click", hideEmailForm);
};
FC.ppShare = function ($emailButton) {

    function showEmail(e) {
        e.preventDefault();
        $emailButton.hide();
        $("#share-pp-email").show();
    }
    $emailButton.bind("click", showEmail);


};
//Ticket Summary form
/*
 *   13.3 - May '14
 *   
 */
FC.ticketSummary = function ($elem) {
    // console.log("this will happen");
    var $adultSelect = $elem.find("#passengerAdults"),
        $childrenSelect = $elem.find("#passengerChildren");

};
//Add Fares
/*
 * ETW - Dec '10
 * Reveals JP Passenger section on the two 0.0 templates.
 */
/*This functions doesn't appear to be used*/
FC.addFares = function ($hiddenArea) {
    var revealButton = $("#add-fares-show");
    var hiddenArea = $hiddenArea;
    var animationType = "fast";

    //reveal
    function reveal(e) {

        FC.rePositionHomeAd();

        e.preventDefault();

        function showHiddenArea() {
            hiddenArea.fadeIn(function () {
                FC.positionHomeAd();
            });
            hiddenArea.parent().css("height", "auto");
        }

        //hide the button
        if (e.noFocus) {
            revealButton.parent().hide();
            hiddenArea.show();
        } else {
            revealButton.parent().fadeOut(animationType);
            hiddenArea.parent().animate({ "height": 110 }, showHiddenArea);
            $("#adults").focus();
        }



        //position the GO button
        $(".button-holder > button").css("bottom", $(".advanced-search-h").css("display") === "block" ? 2 : 20);

        if (document.getElementById("jpState")) {
            document.getElementById("jpState").value = document.getElementById("jpState").value.slice(0, 2) + "1";
        }

    }

    //Activate button on DOMReady
    revealButton.addClass("active").attr("title", "Fares shown will be based on 1 adult, 0 children. Click here to change.");


    //state check
    if (document.getElementById("jpState") && document.getElementById("jpState").value.charAt(2) === "1") {
        reveal({
            "preventDefault": function () {
            }, "noFocus": true
        });
    }



    //Click event
    revealButton.click(reveal);



    //setup rcards
    //cache

    var addButton = $("#rcards-holder .rcards-add").eq(FC.hasIE6 ? 1 : 0); /* Fix for two submits in DOM in IE6 */
    var holder = $("#rcards-holder ul");
    //event

    addButton.click(function (e) {

        var select = document.getElementById("rcards");
        var name = select.options[select.selectedIndex].innerHTML;
        var id = "rcard-" + select.value.toString();
        var html = '<li><label for="x">y</label>' +
            '<select name="numberOfEachRailcard" id="x">' +
            '<option value="0">0</option><option value="1" selected="selected">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option>' +
            '</select>' +
            '<input type="hidden" name="railcardCodes" value="' + select.value.toString() + '" />' +
            '</li>';

        //don't submit the form
        e.preventDefault();



        //check if the select is empty
        if (select.value.toString() === "" || document.getElementById(id)) {
            $(select).parent().css("background-color", "red");
            return false;
        }

        //replace
        html = html.replace(/x/g, id);
        html = html.replace(/y/, name);

        //add 2 dom
        holder.append(html);
        holder.addClass("active");

        FC.positionHomeAd();

    });


};
FC.spSix = function ($yourBox) {
    sp.init();
    sp.addISet({
        from: document.getElementById("prtxtFrom"),
        to: document.getElementById("prtxtTo"),
        useUStats: false,
        useNlc: true
    });

};
// Click handler for a link which opens popup
//Post purchase pages use this functionality
FC.altTrains = function (e, isAdvance, jB) {
    var dataType, dataUrl, ajaxData, link, moreLink, $resultsTableRow, popup, isReturnJourney;
    var __doc = document;
    var __docStyle = __doc.body.style;
    var advanceTicket = typeof isAdvance !== "undefined" ? isAdvance : false;
    var journeyBreakdown = '';
    var journeyBreakArray = [];

    if (typeof jB !== 'undefined') {
        if (typeof jB.departureStationName !== "undefined") {
            journeyBreakdown = jB;
        } else {
            journeyBreakdown = false;
        }
    } else {
        journeyBreakdown = false;
    }

    popup = $("div.other-fares-popup");

    function init(e, otherTickets, advanceTicket, journeyBreakdown) {
        // //console.info('FC.altTrains.init', e);
        e.preventDefault();
        var link = "";
        var $link = "";

        if (!$(e.target).is("a")) {
            link = $(e.target).parent()[0];
        } else {
            link = e.target;
        }
        $link = $(link);
        //$resultsTableRow = $('tr.alt.sel'); // notice that it may need to be modified for selector "selected"
        $resultsTableRow = $link.parent().parent().parent().parent();
        if($resultsTableRow.hasClass("exp-content")){
            $resultsTableRow = $resultsTableRow.parent().prev();
        }
        if ($resultsTableRow.hasClass("f-return") || $resultsTableRow.hasClass("f-single")) {
            $resultsTableRow = $resultsTableRow.parent().parent().parent().prev();
        }
        isReturnJourney = $resultsTableRow.find('td.fare label.opreturn, td.fare label.opreturnselected').length ? true : false;
        dataType = link.className;
        moreLink = otherTickets;
        if (advanceTicket) {
            dataType = "advance";
        } else {
            if (dataType === "") {
                if (link.paparentElement) {
                    dataType = link.parentElement.className;
                } else {
                    dataType = link.parentNode.className;
                }
            }
        }

        changeMessage(advanceTicket);

        switch (dataType) {
            // Link which opens up popup was clicked
            case "other-fares-popup-link":
                if ($(".basket.post-handoff").length > 0) {
                    dataUrl = FC.vars.paths.PP_ALT_INIT;
                } else if ($('.ticket-info').length > 0) {
                    dataUrl = fcPth.wctAltInitUrl;
                }
                else {
                    dataUrl = FC.vars.paths.ALT_INIT;
                }

                ajaxData = link.href.toString().slice(link.href.toString().lastIndexOf("?") + 1);
                ajaxAltTrains();
                break;

            // "Earlier trains" link in popup was clicked
            case "ctf-earlier":
                if ($(e.target).closest('.other-fares-popup').length) {
                    break;
                }
                // //console.info('FC.altTrains case:ctf-earlier');
                dataUrl = FC.vars.paths.ALT_ELTRAINS;
                ajaxData = link.href.toString().slice(link.href.toString().lastIndexOf("?") + 1);
                ajaxAltEL(); // never called
                break;

            // "Later trains" link in popup was clicked
            case "ctf-later":
                if ($(e.target).closest('.other-fares-popup').length) {
                    break;
                }
                // //console.info('FC.altTrains case:ctf-later');
                dataUrl = FC.vars.paths.ALT_ELTRAINS;
                ajaxData = link.href.toString().slice(link.href.toString().lastIndexOf("?") + 1);
                ajaxAltEL(); // never called
                break;
            case "advance":
                if (typeof journeyBreakdown.departureStationName !== 'undefined') {
                    var detailsLink = $resultsTableRow.find("td.info a").length > 0 ? $resultsTableRow.find("td.info a").attr("href") : false;

                    var fakeResult = {
                        "responseStatusArray": [
                            {
                                "responseStatus": "Ok",
                                "selectedJourneyIndex": 0
                            }
                        ],
                        "journeyInformation": [
                            {
                                "journeyInformation": {
                                    "isValid": true,
                                    "departureStationName": journeyBreakdown.departureStationName,
                                    "departureStationCrs": journeyBreakdown.departureStationCRS,
                                    "arrivalStationName": journeyBreakdown.arrivalStationName,
                                    "arrivalStationCrs": journeyBreakdown.arrivalStationCRS,
                                    "departureTime": journeyBreakdown.departureTime,
                                    "arrivalTime": journeyBreakdown.arrivalTime,
                                    "durationHours": journeyBreakdown.durationHours,
                                    "durationMins": journeyBreakdown.durationMinutes,
                                    "changes": journeyBreakdown.changes,
                                    "statusIcon": journeyBreakdown.statusIcon,
                                    "statusMessage": journeyBreakdown.statusMessage,
                                    "statusMessageHoverInformation": journeyBreakdown.statusMessageHoverInformation,
                                    "detailsLink": detailsLink
                                }
                            }]
                    };
                    addAlt(fakeResult, null, null, true);
                }
                break;
            default:
                break;
        }



        //if ($(e.target).parents(".journey-details-panel").length === 0) {
        //initPopupContent();
        //}

    }

    // Rewrites data from results table to popup (data which is not included in JSON)
    // Binds events inside popup
    function initPopupContent(journeyInfo) {

        var $popupInfoHeader = popup.find('.ofp-info');
        var $labelClone;
        var $ctaOtherTickets = popup.find('.other-services [type=submit]');
        var $ctaBuy = popup.find('#ctf-cf [type=submit]');
        var $earlierBtn = popup.find('.ctf-earlier a');
        var $laterBtn = popup.find('.ctf-later a');
        var buyPrice = "";
        var buyPriceTemp = "";
        var ticketType = "";
        var platText = "";
        var fBreak = "";
        var fBreakVal = "";
        var isDetailsPage = false;
        var total = "";
        //{"departureStationName": "London Kings Cross","departureStationCRS": "KGX","arrivalStationName": "Poppleton","arrivalStationCRS": "POP","statusMessage": null,"departureTime": "22:22","arrivalTime": "22:22","durationHours": 2,"durationMinutes": 22,"changes": 2,"journeyId": 1,"responseId": 4,"statusIcon":"GREEN_TICK","hoverInformation": null},
        //London Euston|EUS|10:20|Manchester Piccadilly|MAN|12:28|2|8|0|GREEN_TICK||
        var departureStationName = journeyBreakdown.departureStationName;
        var departureStationCRS = journeyBreakdown.departureStationCRS;
        var arrivalStationName = journeyBreakdown.arrivalStationName;
        var arrivalStationCRS = journeyBreakdown.arrivalStationCRS;
        var breakdownToUse = NRE.fares.breakdownNames.s;
        var fareTicketTypeCSS = "";
        var tempFareTicketType = "";
        var ticketTypeText = "";

        if ($(e.target).parents(".summary-page").length > 0) {
            //$popupInfoHeader.find(".ofp-info-inner").css('display','none');
        }

        if ($(e.target).parents(".summary-page").length !== 0) {
            $popupInfoHeader.find(".ofp-info-inner").css('display', 'none');
            $popupInfoHeader.find(".ofp-info-inner").html($(e.target).next(".popup-content").find(".ofp-info-inner").html());
        } else {
            // From
            platText = $resultsTableRow.find(".from .ctf-plat").text();
            $popupInfoHeader.find('p.from').html(departureStationName + ' [<abbr>' + departureStationCRS + '</abbr>]<span class="ctf-plat" title="Departs from ' + platText + '">' + platText + '</span>');

            // To
            platText = $resultsTableRow.find(".to .ctf-plat").text();
            $popupInfoHeader.find('p.to').html('<span class="arrow"><img height="26" width="12" src="' + fcPth.clrImg + '" class="sprite-main" alt="">' + arrivalStationName + ' [<abbr>' + arrivalStationCRS + '</abbr>]<span class="ctf-plat" title="Departs from ' + platText + '">' + platText + '</span></span>');

            // Single ticket price
            if (!isReturnJourney) {
                breakdownToUse = NRE.fares.breakdownNames.s;
                $popupInfoHeader.find('p.price-return').hide().empty();

                // Price is not wrapped with SPAN so need to take whole LABEL
                // and remove unnecessary elements before grabbing text
                $labelClone = $resultsTableRow.find('label.opsingle').clone();
                $labelClone.find('.accessibility').remove();
                buyPrice = $labelClone.text();
                ticketType = $(e.target).parent().siblings(".fare-type").find("a").text();
                fBreakVal = $resultsTableRow.find('td.fare script');
                if (fBreakVal.length === 0) {
                    fBreakVal = $('#jsonJourney');
                }
                fBreak = $.parseJSON(fBreakVal.html());

                if (ticketType === "") {
                    ticketType = $resultsTableRow.find("td.fare .fare-type a").first().text();
                }
                //this condition is used for post-purchase pages & details pages
                if (ticketType === "") {

                    if (fBreak !== null) {
                        //if (typeof fBreak[NRE.fares.breakdownNames.s] === 'undefined' && typeof fBreak[NRE.fares.breakdownNames.r] === 'undefined') {
                        //    breakdownToUse = 'jsonFareBreakdowns';
                        //    isDetailsPage = true;
                        //}
                        isDetailsPage = true;

                        if (fBreak[NRE.fares.breakdownNames.s].length > 0) {
                            breakdownToUse = NRE.fares.breakdownNames.s;
                        } else {
                            breakdownToUse = NRE.fares.breakdownNames.r;
                        }
                        ticketType = fBreak[breakdownToUse][0].fareTicketType;
                        buyPrice = fcPth.uniPound + fBreak[breakdownToUse][0].ticketPrice.toFixed(2);
                    }

                }

                $popupInfoHeader.find('p.price-single').empty().html(
                    buyPrice + '<span>' + ticketType + '</span>'
                ).show();

                if ($(e.target).parent().siblings(".fare-type").find("a").text() === 'Anytime') {
                    $('.anytime-ticket-text').css('display', 'none');
                }
            }

            // Return ticket price
            else {
                //buyPrice = $resultsTableRow.find('td.fare label[class^=opreturn]').first().text();
                //buyPrice = $("#buyNowFooter:not(.buyDis) span").text().replace("Buy now for", "");
                if ($("#ctf-results").hasClass("single")) {
                    $labelClone = $resultsTableRow.find('td.fare .single label.[class^=opreturn]').first().clone();
                    breakdownToUse = NRE.fares.breakdownNames.s;
                } else {
                    $labelClone = $resultsTableRow.find('td.fare .return label.[class^=opreturn]').first().clone();
                    breakdownToUse = NRE.fares.breakdownNames.r;
                }
                ticketType = $(e.target).parent().siblings(".fare-type").find("a").text();
                if (ticketType === "") {
                    ticketType = $resultsTableRow.find("td.fare .fare-type a").first().text();
                }

                //this condition is used for post-purchase pages & details pages
                if (ticketType === "") {
                    isDetailsPage = true;

                    if (fBreak[NRE.fares.breakdownNames.s].length > 0) {
                        breakdownToUse = NRE.fares.breakdownNames.s;
                    } else {
                        breakdownToUse = NRE.fares.breakdownNames.r;
                    }
                }


                $labelClone.find('.accessibility').remove();
                buyPrice = $labelClone.text();
                buyPriceTemp = buyPrice.replace(/\s/g, "");
                fBreakVal = $resultsTableRow.find('td.fare script');
                fBreak = $.parseJSON(fBreakVal.html());
                //if (fBreak !== null) {
                //    if (typeof fBreak[NRE.fares.breakdownNames.s] === 'undefined' && fBreak[NRE.fares.breakdownNames.r] === 'undefined') {
                //        breakdownToUse = 'jsonFareBreakdowns';
                //    }
                //}


                if (buyPriceTemp === "") {
                    if (fBreak !== null) {
                        if (fBreak[breakdownToUse].length > 0) {
                            if (fBreak[breakdownToUse].length >= 2) {
                                total = 0;
                                for (var i = 0, iLen = fBreak[breakdownToUse].length; i < iLen; i++) {
                                    var counter = parseFloat(fBreak[breakdownToUse][i].ticketPrice);
                                    total = total + counter;
                                }
                            } else {
                                total = parseFloat(fBreak[breakdownToUse][0].ticketPrice);
                            }

                            buyPrice = fcPth.uniPound + total.toFixed(2);
                        }
                    }
                }

                tempFareTicketType = fBreak[breakdownToUse][0].fareTicketType;
                ticketTypeText = tempFareTicketType;
                tempFareTicketType = tempFareTicketType.toLowerCase();
                if(tempFareTicketType.indexOf('travelcard') !== -1){
                    fareTicketTypeCSS = 'class="ic-trvlcrd"';
                }
                else{
                    fareTicketTypeCSS = '';
                }

                $popupInfoHeader.find('p.price-return').empty().html(
                    // Rewrite price from results table
                    buyPrice + '<span ' + fareTicketTypeCSS + ' >' + ticketTypeText + '</span>'
                ).show();
                $popupInfoHeader.find('p.price-single').hide().empty();
            }

            if (fBreak !== null) {
                var flexMessage = popup.find(".other-services-heading p");
                if (fBreak[breakdownToUse][0].fareTicketType.toLowerCase().lastIndexOf("anytime") > -1) {
                    flexMessage.hide();
                } else {
                    flexMessage.show();
                }
            }


            // "Back to other tickets" CTA closes popup and triggers click on "Other tickets"
            $ctaOtherTickets.unbind('click');
            $ctaOtherTickets.bind('click', function (e) {
                e.preventDefault();
                popup.find('.close-button').trigger('click');
                // Delay to help user notice the animation
                setTimeout(function () {
                    $resultsTableRow.find('td.fare .more-fares a').trigger('click');
                }, 150);
                //console.log('hit');
            });

            // "Buy" CTA closes popup and triggers click on "Buy" in the results table
            if ($ctaBuy.length === 0) {
                $ctaBuy.val('Buy for ' + buyPrice);
            } else {
                $ctaBuy.find('span').empty().text('Buy for ' + buyPrice);
            }
            if ($("#buyNowFooter").length > 0 && $labelClone) {
                if (($("#buyNowFooter").hasClass("buyDis") && isReturnJourney) || (!$labelClone.hasClass("opreturnselected") && isReturnJourney)) {
                    $ctaBuy.addClass("buyDis");
                    $ctaBuy.attr("disabled", true);

                } else {
                    $ctaBuy.removeClass("buyDis");
                    $ctaBuy[0].removeAttribute("disabled");
                }
            } else if (isDetailsPage) {
                $ctaBuy.addClass("buyDis");
                $ctaBuy.attr("disabled", true);

            }
        }
        $ctaBuy.unbind('click');
        $ctaBuy.bind('click', function (e) {
            //e.preventDefault();
            popup.find('.close-button').trigger('click');
            $resultsTableRow.find('td.fare label').trigger('click');
        });

        // "Earlier" button - custom handler will be added
        //$earlierBtn.unbind('click');

        // "Later" button - custom handler will be added
        //$laterBtn.unbind('click');

    }

    // Fetches JSON results based on params passed in ajaxData (params from anchor href attribute)
    function ajaxAltTrains() {
        //journeyId=1&fareType=rfo
        // //console.info('FC.altTrains.ajaxAltTrains', {url: dataUrl, data: ajaxData});
        $.ajax({
            dataType: "json",
            url: dataUrl,
            data: ajaxData,
            success: addAlt,
            error: errorAlt
        });
    }
    // ajaxAltEl not used - 11/16
    function ajaxAltEL() {
        // //console.info('FC.altTrains.ajaxAltEl', {url: dataUrl, data: ajaxData});
        $.ajax({
            dataType: "json",
            url: dataUrl,
            data: ajaxData,
            success: addAlt,
            error: errorAlt
        });
    }

    function errorAlt(result) {
        // popup.replaceWith("<p>Sorry, there has been an error. Please try again</p>")
        errorPopup(result.responseStatusArray[0].responseStatus);
    }


    // JSON results were fetched. Time to populate them in popup
    function addAlt(result, status, xhr, isAdvance) {
        // //console.info('FC.altTrains.addAlt', result);
        var isAd = typeof isAdvance !== "undefined" ? isAdvance : false;
        if (result.responseStatusArray[0].responseStatus.toUpperCase() === "OK") {

            if (popup) {
                populateOtherServicesPopupResults(result.journeyInformation, isAd, result.responseStatusArray[0].selectedJourneyIndex);
            }
            //            try {
            //                e.preventDefault();
            //            } catch (e) {
            //
            //            }

            var otherFares = $(FC.vars.selectors.OTHER_FARES);
            FC.otherFaresPopup(otherFares, true, moreLink);
            initPopupContent(result.journeyInformation[0].journeyInformation);


            // Init tooltip.
            //NREOJPTEST-2889
            FC.tooltip(popup.find('.tooltip'));
            //confirmAction();
            return;
        } else {
            errorPopup(result.responseStatusArray[0].responseStatus);
        }
    }

    var onYesClickHandler = function (e) {
        if (FC.hasLteIE6) {
            $("iframe.hideSelect").remove();
            __docStyle.height = "auto";
            __docStyle.width = "auto";
            __doc.documentElement.style.overflow = "";
        }

        $("div.other-fares-popup").hide();
        $("div.overlay").remove();
        $('.utility-bar,.u-menu').css('z-index', '200');
        $("div.otherFaresContainer").css("visibility", "hidden");
        return false;
    };

    function errorPopup(errorMessage) {
        var callback = "";
        var __rEMac = /mac/, __rEFF = /firefox/;
        var __uA = navigator.userAgent.toLowerCase();


        var popup = $("div.other-fares-popup");
        popup.find("#ctf-results1").hide();

        if ($('.errormessage').length < 1) {
            popup.append("<div class='errormessage'><p>" + errorMessage + "</p></div>");
        }


        var height = popup.outerHeight(),
            width = popup.outerHeight(),
            nie6Top, //top = $(window).scrollTop() - Math.round(height / 2) + 40,
            left = Math.round(popup.outerWidth() / 2);

        if (FC.hasLteIE6) {//if IE 6
            //  __docStyle.height = "100%";
            __docStyle.width = "100%";
            //$(window).scrollTop();
            //__doc.documentElement.style.overflow = "hidden";
            //NREOJPTEST-2890
            //top = "-" + $("body .otherFaresContainer").offset().top;
            var overlayHeight = $(document).height();
            var overlayWidth = $(window).width();

            if ($('iframe.hideSelect').length === 0) {//iframe to hide select elements in ie6
                $("body .otherFaresContainer").prepend('<iframe class="hideSelect"></iframe><div class="overlay overlayBG"></div>');
                var theOver = $("body .otherFaresContainer").find("div.overlay");
                theOver.width(overlayWidth);
                theOver.height(overlayHeight);
                var overOffset = theOver.offset();
                theOver.css({
                    top: '-' + overOffset.top + 'px',
                    left: '-' + overOffset.left + 'px'
                });
            }
        } else {//all others
            var winHie = ($(window).height() - popup.outerHeight()) / 2;
            //console.log($(window).scrollTop());
            if ($("#form1").length > 0) {
                nie6Top = $(window).scrollTop() - $("#form1").offset().top + 40;
            }else{
                nie6Top = $(window).scrollTop() + 40;
            }
            if (!document.getElementById("overlay")) {
                $("body .otherFaresContainer").prepend('<div id="overlay" class="overlay"></div>');
            }
        }

        var overlay = $("#overlay");

        if (__rEMac.test(__uA) && __rEFF.test(__uA)) {
            overlay.addClass("overlayMacFFBGHack"); //use png overlay so hide flash
        }
        else {
            overlay.addClass("overlayBG"); //use background and opacity
        }


        popup.prepend('<a class="close-button" href="#">Close</a>');

        //Use the escape key to close the window
        $(document).keyup(function (e) {
            if (e.keyCode === "27") {
                onYesClickHandler();
            }
        });

        // Adjust the positioning
        if (FC.hasLteIE6) {
            $(window).scrollTop(0);
            var ie6Top = popup.offset().top;
            var ie6Width = (($(window).width() - popup.outerWidth()) / 2) - 10;
            ie6Top -= 50;
            popup.css({
                marginTop: '-' + ie6Top + 'px',
                marginLeft: ie6Width + 'px'
            });
        } else {
            popup.css({
                marginLeft: '-' + left + 'px',
                marginTop: nie6Top + 'px'
            });
        }
        $("div.otherFaresContainer").css("visibility", "visible");
        $('.utility-bar,#ad-top,.u-menu').css('z-index', '0');
        popup.show();

        popup.find("a.close-button").bind('click', { callback: callback }, onYesClickHandler).focus();
    }

    // Renders results table in popup
    function populateOtherServicesPopupResults(resultsData, isAd, startIndex) {
        // //console.info('FC.altTrains.populateOtherServicesPopupResults', resultsData);
        var $popupTable = popup.find('#ctf-results1 table'),
            $popupTbody = $popupTable.find('tbody'),
            $earlierBtn = popup.find('.ctf-earlier a'),
            $laterBtn = popup.find('.ctf-later a');

        // Paging params
        var journeysPerPage = 5,
            startScreenIndexFrom = startIndex, //Index of the first initially shown yourney. TODO: it probably should point to clicked yourney
            currIndexFrom = startScreenIndexFrom,
            currIndexTo = currIndexFrom + journeysPerPage - 1,
            maxIndex = resultsData.length - 1;

        // Counts new indexes of currently presented results
        var updateIndexes = function (dir) {
            // The first call
            if (dir === 'init') {
                // Start index exceeds total length
                if (startScreenIndexFrom > maxIndex) {
                    console.error('`startScreenIndexFrom` (' + startScreenIndexFrom + ') is higher than maximal (' + maxIndex + ').');
                }

                // There's enough journeys to show a full page
                if (startScreenIndexFrom + journeysPerPage - 1 <= maxIndex) {
                    currIndexTo = startScreenIndexFrom + journeysPerPage - 1;
                }
                // There's fewer journeys than a full page count
                else {
                    currIndexTo = maxIndex;
                }
            }

            // Earlier yourneys
            else if (dir === 'earlier') {
                // There's enough journeys to show a full page
                if (currIndexFrom - journeysPerPage >= 0) {
                    currIndexFrom = currIndexFrom - journeysPerPage;
                    currIndexTo = currIndexFrom + journeysPerPage - 1;
                }
                // There's fewer journeys than a full page count
                else {
                    currIndexTo = currIndexFrom - 1;
                    currIndexFrom = 0;
                }
            }

            // Later yourneys
            else if (dir === 'later') {
                // There's enough journeys to show a full page
                if (currIndexTo + 1 + journeysPerPage <= maxIndex) {
                    currIndexFrom = currIndexTo + 1;
                    currIndexTo = currIndexFrom + journeysPerPage - 1;
                }
                // There's fewer journeys than a full page count
                else {
                    currIndexFrom = currIndexTo + 1;
                    currIndexTo = maxIndex;
                }
            }
        };

        // (De)Activates Earlier/Later buttons
        var updateNavButtonsState = function () {

            // Earlier button
            if (currIndexFrom === 0) {
                $earlierBtn.css({ visibility: 'hidden' }).attr('tabindex', '-1');
            }
            else {
                $earlierBtn.css({ visibility: '' }).removeAttr('tabindex');
            }

            // Later button
            if (currIndexTo === maxIndex) {
                $laterBtn.css({ visibility: 'hidden' }).attr('tabindex', '-1');
            }
            else {
                $laterBtn.css({ visibility: '' }).removeAttr('tabindex');
            }
        };

        // Takes a subset of JSON data (provided by a paging mechanism) and renders journeys in the table
        var renderPartialResults = function (dataToRender) {
            // //console.info('FC.altTrains.populateOtherServicesPopupResults.renderPartialResults');
            var tbodyInner = '';

            // Takes string in format 'Sat Jun 07 05:57:00 BST 2014'
            // and returns '05:57' or false on error

            var formatTime = function (date) {
                try {
                    if (isAd) {
                        return date;
                    } else {
                        var parts = date.split(' ');
                        return parts[3].substr(0, 5);
                    }
                }
                catch (e) {
                    console.error('`departureTime` parsing failed');
                    return '';
                }
            };

            // Iterates through each journey and renders a table row
            $(dataToRender).each(function (index, journeyObj) {

                ////console.info(index, journeyObj.journeyInformation);
                var statusClass = "";
                var imgWidth = "15";
                var tr = '<tr><td class="empty-padding">&nbsp;</td>';
                var journeyStatusText = journeyObj.journeyInformation.statusMessage;

                if (journeyStatusText === null || journeyStatusText === 'null') {
                    journeyStatusText = '';
                }

                // Departure
                tr += '<td class="dep">' + formatTime(journeyObj.journeyInformation.departureTime) + '</td>';

                // From
                tr += '<td class="from">';
                tr += journeyObj.journeyInformation.departureStationName + ' [' + journeyObj.journeyInformation.departureStationCrs + ']'; // platform and ino if tube or not is not available in JSON
                tr += '</td>';

                // To
                tr += '<td class="to"><span class="arrow"><img height="26" width="12" src="' + fcPth.clrImg + '" class="sprite-main" alt="">';
                tr += journeyObj.journeyInformation.arrivalStationName + ' ' + ' [<abbr>' + journeyObj.journeyInformation.arrivalStationCrs + '</abbr>]';
                tr += '</span></td>';

                // Arrival
                tr += '<td class="arr">' + formatTime(journeyObj.journeyInformation.arrivalTime) + '</td>';

                // Duration
                tr += '<td class="dur">';
                tr += journeyObj.journeyInformation.durationHours + '<abbr title="hour' + (journeyObj.journeyInformation.durationHours > 1 ? 's' : '') + '">h</abbr>' + ' ';
                tr += journeyObj.journeyInformation.durationMins + '<abbr title="minute' + (journeyObj.journeyInformation.durationMins > 1 ? 's' : '') + '">m</abbr>' + ' ';
                tr += '<div class="chngs">' + journeyObj.journeyInformation.changes + ' Chg</div>';
                tr += '</td>';

                // Changes
                //tr += '<td class="chg"></td>';

                // Info
                if (journeyObj.journeyInformation.detailsLink !== false) {
                    tr += '<td class="info"><a href="' + journeyObj.journeyInformation.detailsLink + '" title="More details on this service">Details</a></td>';
                } else {
                    tr += '<td class="info"></td>';
                }

                // Status

                switch (journeyObj.journeyInformation.statusIcon) {
                    case "GREEN_TICK":
                        statusClass = "journey-status-on-time";
                        break;
                    case "AMBER_TRIANGLE":
                        statusClass = "journey-status-late";
                        imgWidth = "20";
                        break;
                    case "RED_TRIANGLE":
                        statusClass = "journey-status-disrupted";
                        imgWidth = "20";
                        break;
                    case "BLUE_TRIANGLE":
                        statusClass = "journey-status-bus";
                        imgWidth = "20";
                        break;
                    case "SINGLE_LEG_WALK":
                        statusClass = "journey-status-bus";
                        imgWidth = "20";
                        break;
                    default:
                        statusClass = "journey-status-on-time";
                        break;
                }

                tr += '<td class="status"><div class="journey-status '+ statusClass +'"><p><img alt="" class="sprite-main" src="'+ fcPth.clrImg +
                    '" width="'+imgWidth+'" height="16" />' + journeyStatusText + '</p></div></td>';

                // Validity
                tr += '<td class="validity">';
                if (journeyObj.journeyInformation.isValid) {
                    tr += '<img width="16" height="16" alt="valid" class="sprite-main valid" src="' + fcPth.clrImg + '"><span>valid</span>';
                }
                else {
                    tr += '<img width="16" height="16" alt="invalid" class="sprite-main invalid" src="' + fcPth.clrImg + '"><span>not valid</span>';
                }

                tr += '<td class="empty-padding">&nbsp;</td></tr>';

                tbodyInner += tr + '\n';
            });

            $popupTbody.empty().append($(tbodyInner));

            // Helper classes on rows
            $popupTbody.find('tr:first').addClass('first');
            $popupTbody.find('tr:last').addClass('last');
            $popupTbody.find('tr:odd').addClass('alt');
        };

        // Earlier/Later buttons events
        var bindNavButtons = function () {
            $earlierBtn.unbind('click');
            $earlierBtn.bind('click', function (e) {
                e.preventDefault();
                gotoPage('earlier');
            });

            $laterBtn.unbind('click');
            $laterBtn.bind('click', function (e) {
                e.preventDefault();
                gotoPage('later');
            });
        };

        // Main function to request earlier/later results
        var gotoPage = function (dir) {
            // //console.info('FC.altTrains.populateOtherServicesPopupResults.gotoPage', dir);
            updateIndexes(dir);
            updateNavButtonsState();
            renderPartialResults(resultsData.slice(currIndexFrom, currIndexTo + 1));

        };

        var initOServices = function () {
            bindNavButtons();
            gotoPage('init');
        };

        initOServices();

    }


    function changeMessage(isAdvance) {
        var msgOne = popup.find(".other-services-heading h3");

        if (isAdvance) {
            msgOne.text("This ticket is valid for this service only.");
        } else {
            msgOne.text("Other services that are valid with your ticket.");

        }
    }


    init(e, $(e.target).parent().siblings(".more-fares"), advanceTicket, journeyBreakdown);
};

FC.otherFaresPopup = function (otherFares, newButtons, moreLink) {
    // //console.info('FC.otherFaresPopup', arguments);
    var __doc = document;
    var    __$ = $;
    var __docStyle = __doc.body.style;
    var __rEFixed = /fixed/;
    var __uA = navigator.userAgent.toLowerCase();
    var buttons = otherFares;
    var journeyBreakdown = [];
    var fareBreakdown = [];


    if (!newButtons) {
        try {
            buttons.unbind("click");
        } catch (e) {
        }
        buttons.each(function (i) {
            var $that = $(this);
            getBreakdown($that, "journey-breakdown");
            getBreakdown($that, "fare-breakdown");
            changeButton($that, i);
        });

    }

    if (moreLink) {
        $(".other-tickets-back").bind("click", function (e) {
            e.preventDefault();
            onYesClickHandler();
            // console.log('triggering more click', moreLink);
            moreLink.find("a").click();
        });
    }

    var onYesClickHandler = function (e) {
        // //console.info('FC.otherFaresPopup.onYesClickHandler', e);
        if (FC.hasLteIE6) {
            $("iframe.hideSelect").remove();
            __docStyle.height = "auto";
            __docStyle.width = "auto";
            __doc.documentElement.style.overflow = "";
        }

        $("div.other-fares-popup").hide();
        $("div.overlay").remove();
        $('.utility-bar,.u-menu').css('z-index', '200');
        $("div.otherFaresContainer").css("visibility", "hidden");
        return false;
    };

    var confirmAction = function (callback) {
        // //console.info('FC.otherFaresPopup.confirmAction', callback);
        var __rEMac = /mac/, __rEFF = /firefox/;

        try {
            var popup = $("div.other-fares-popup");
            popup.find("#ctf-results1").show();
            popup.find(".errormessage").remove();

            var height = popup.outerHeight(),
                width = popup.outerHeight(),
                nie6Top, //top = $(window).scrollTop() - Math.round(height / 2) + 40,
                left = Math.round(popup.outerWidth() / 2) - 15;

            if (FC.hasLteIE6) {//if IE 6
                //  __docStyle.height = "100%";
                __docStyle.width = "100%";
                //$(window).scrollTop();
                //__doc.documentElement.style.overflow = "hidden";
                //NREOJPTEST-2890
                //top = "-" + $("body .otherFaresContainer").offset().top;
                var overlayHeight = $(document).height();
                var overlayWidth = $(window).width();

                if ($('iframe.hideSelect').length === 0) {//iframe to hide select elements in ie6
                    $("body .otherFaresContainer").prepend('<iframe class="hideSelect"></iframe><div class="overlay overlayBG"></div>');
                    var theOver = $("body .otherFaresContainer").find("div.overlay");
                    theOver.width(overlayWidth);
                    theOver.height(overlayHeight);
                    var overOffset = theOver.offset();
                    theOver.css({
                        top: '-' + overOffset.top + 'px',
                        left: '-' + overOffset.left + 'px'
                    });
                }
            } else {//all others
                var winHie = ($(window).height() - popup.outerHeight()) / 2;
                if ($("#form1").length > 0) {
                    nie6Top = $(window).scrollTop() - $("#form1").offset().top + 40;
                } else {
                    nie6Top = $(window).scrollTop() + 40;
                }
                if (!document.getElementById("overlay")) {
                    $("body .otherFaresContainer").prepend('<div id="overlay" class="overlay"></div>');
                }
            }

            var overlay = $("#overlay");

            if (__rEMac.test(__uA) && __rEFF.test(__uA)) {
                overlay.addClass("overlayMacFFBGHack"); //use png overlay so hide flash
            } else {
                overlay.addClass("overlayBG"); //use background and opacity
            }

            if ($('.close-button').length < 1) {
                popup.prepend('<a class="close-button" href="#">Close</a>');
            }

            //Use the escape key to close the window
            $(document).keyup(function (e) {
                if (e.keyCode === "27") {
                    onYesClickHandler();
                }
            });


            // Adjust the positioning
            if (FC.hasLteIE6) {
                $(window).scrollTop(0);
                var ie6Top = popup.offset().top;
                var ie6Width = (($(window).width() - popup.outerWidth()) / 2) - 10;
                ie6Top -= 50;
                popup.css({
                    marginTop: '-' + ie6Top + 'px',
                    marginLeft: ie6Width + 'px'
                });
            } else {
                popup.css({
                    marginLeft: '-' + left + 'px',
                    marginTop: nie6Top + 'px'
                });
            }
            $("div.otherFaresContainer").css("visibility", "visible");
            $('.utility-bar,#ad-top,.u-menu').css('z-index', '-1');
            popup.show();

            popup.find("a.close-button").bind('click', { callback: callback }, onYesClickHandler);
        }
        catch (e) {
        }
        return false;
    };

    function getBreakdown(curButton, type) {
        var breakDown = "";
        var isPPS = $(".basket.post-handoff").length > 0 ? true : false;
        var isPH = $("#postPurchaseNonBasket").length > 0 ? true : false;
        var isDetails = $('#ctf-details').length > 0 && $("#postPurchaseNonBasket").length === 0 ? true : false;
        var fareBreakdownToUse = NRE.fares.breakdownNames.s;
        var isReturnTicket = false;
        if (curButton.length > 0) {
            if (isPPS === true || isPH === true || isDetails === true) {
                if (isDetails) {
                    breakDown = $.parseJSON($('#jsonJourney').html());
                } else if(isPH){
                    breakDown = $.parseJSON($(curButton[0]).parent().parent().parent().parent().parent().find('script').html());
                } else {
                    breakDown = $.parseJSON($(curButton[0]).parent().find('script').html());
                }

                if (breakDown[NRE.fares.breakdownNames.s].length > 0) {
                    fareBreakdownToUse = NRE.fares.breakdownNames.s;
                } else {
                    fareBreakdownToUse = NRE.fares.breakdownNames.r;
                }
            } else {
                isReturnTicket = curButton.parent().parent().hasClass('return');
                if (isReturnTicket === true) {
                    fareBreakdownToUse = NRE.fares.breakdownNames.r;
                }
                breakDown = $.parseJSON($(curButton[0]).parent().parent().parent().find('script').html());
            }
            if (breakDown.length !== null) {
                if (type === "journey-breakdown") {
                    journeyBreakdown = breakDown.jsonJourneyBreakdown;
                } else {
                    fareBreakdown = breakDown[fareBreakdownToUse];
                }
            }
        }
    }

    function changeButton(curButton, arrNo) {
        var isRedRoute = false;
        var isAdvance = false;
        var fB = [];
        var isPPS = $(".basket.post-handoff").length > 0 ? true : false;
        var imgHeight = "16";
        var imgWidth = "16";

        if (isPPS) {
            imgHeight = "44";
            imgWidth = "44";
        }

        if (fareBreakdown.length > 0) {
            if (typeof fareBreakdown[arrNo] !== "undefined") {
                fB = fareBreakdown[arrNo];
            } else {
                fB = fareBreakdown[0];
            }
            isRedRoute = fB.redRoute;
            isAdvance = fB.fareTicketType.toUpperCase().indexOf("ADVANCE") !== -1 ? true : false;
        }

        if (isRedRoute) {
            if ($(".summary-page").length > 0) {
                curButton.html('<img height="' + imgHeight + '" width="' + imgWidth + '" src="' + fcPth.clrImg + '" class="sprite-main" alt="">Ticket valid for this service only');
            } else {
                curButton.text("Ticket valid for this service only");
            }
            curButton.addClass("disabled");
            if (isPPS) {
                curButton.parent().removeClass("hidden");
            }
            curButton.removeClass("hidden");
            curButton.bind("click", function (e) {
                e.preventDefault();
            });
        }
        else if (isAdvance) {
            if ($(".summary-page").length > 0) {
                curButton.html('<img height="' + imgHeight + '" width="' + imgWidth + '" src="' + fcPth.clrImg + '" class="sprite-main" alt="">Ticket valid for this service only');
            } else {
                curButton.text("Ticket valid for this service only");
            }
            curButton.removeClass("hidden");
            if (isPPS) {
                curButton.parent().removeClass("hidden");
            }
            curButton.bind("click", { bJb: journeyBreakdown }, function (e) {
                e.preventDefault();
                FC.altTrains(e, true, e.data.bJb);
            });
        }
        else {
            curButton.removeClass("hidden");
            if (isPPS) {
                curButton.parent().removeClass("hidden");
            }
            curButton.bind("click", { bJb: journeyBreakdown }, function (e) {
                e.preventDefault();
                FC.altTrains(e, false, e.data.bJb);
            });
        }
    }

    if (newButtons === true) {
        confirmAction();
    }
};
//ADVANCED SEARCH
/*
 * ETW - Only called once - Minor opt.
 * candidate for more opt as this is a key page.
 * Should be merged with AddJourney as they appear to share alot of code.
 */

/*KE - advancedSearch and addJourney used by
 * NRE-1.3.1-TrainTracker.shtml
 * NRE-1.1.1-Journey-Planner-Train-times.shtml
 * NRE-1.1.3-Journey-Planner-Ticket-return-as-singles-no-return-fare.shtml
 * NRE-1.1.3-Journey-Planner-Ticket-return.shtml
 * NRE-1.1.3-Journey-Planner-Ticket-single.shtml
 * All CTF pages
 */
FC.advancedSearch = function ($adHolder) {

    var adSearch = $adHolder.find(FC.vars.selectors.AD_SEARCH);
    var adButton = $(FC.vars.selectors.AD_SEARCH_BUTTON);
    var adHolder = $adHolder;
    var remButton = $(FC.vars.selectors.REM_SEARCH_BUTTON);
    var subButton = $(FC.vars.selectors.SEARCH_SUBMIT_BUTTON);

    adButton.addClass("active").attr("title", "");
    remButton.addClass("active").attr("title", "");

    var subButtonBottom = subButton.css('bottom');

    if (!FC.hasIE) {
        adHolder.css({
            "opacity": 0
        });
    } else {
        $('div.advanced-search-p', adHolder).css({
            "visibility": "hidden"
        });
    }

    adButton.bind("click", function (e) {
        e.preventDefault();
        openAdvanced();
        return false;
    });

    function justShowAdvanced() {
        adButton.parent().hide();
        adHolder.show();
        remButton.unbind('click').bind("click", function () {
            closeAdvanced();
            return false;
        });
        //$('div.advanced-search-p a.hide-search').focus();
    }

    function remOut(ele) {
        //var ele = e.currentTarget;
        ele.addClass("noout");
        ele.bind("blur", function (ele) {
            $(this).removeClass("noout");
            $(this).unbind("blur");
        });
    }

    function openAdvanced() {

        FC.rePositionHomeAd();

        if (FC.hasIE) {
            adButton.css({
                "visibility": "hidden"
            });
            adButton.parent().hide(400);
            subButton.animate({
                "bottom": "2px"
            }, 600);
            adHolder.slideDown(600, function () {
                $('div.advanced-search-p', $(this)).css({
                    "visibility": "visible"
                });
                remButton.unbind('click').bind("click", function () {
                    closeAdvanced();
                    return false;
                });
                remOut($('div.advanced-search-p a.hide-search'));
                $('div.advanced-search-p a.hide-search').focus();

                FC.positionHomeAd();

            });
        } else {
            subButton.animate({
                "bottom": "2px"
            }, 250);
            adButton.parent().animate({
                "opacity": 0
            }, 250, function () {
                $(this).hide(400);
                adHolder.slideDown(600, function () {
                    $(this).animate({
                        "opacity": 1
                    }, 250, function () {
                        remButton.unbind('click').bind("click", function () {
                            closeAdvanced();
                            return false;
                        });
                        remOut($('div.advanced-search-p a.hide-search'));
                        $('div.advanced-search-p a.hide-search').focus();
                        FC.positionHomeAd();

                    });
                });
            });
        }
        if (document.getElementById("jpState")) {
            document.getElementById("jpState").value = document.getElementById("jpState").value.slice(0, 1) + "1" + document.getElementById("jpState").value.slice(2, 3);
        }
        spVia();

    }

    function closeAdvanced() {

        FC.rePositionHomeAd();

        /* etw, add button logic for new section, if show then don't go back to the top */
        if ($("#add-fares").css("display") === "block") {
            subButtonBottom = 20;
        }

        if (FC.vars.slowSafari) {
            adButton.parent().show();
            adHolder.hide();
            adButton.unbind('click').bind("click", function () {
                openAdvanced();
                return false;
            });
            $('ul.jpActions a.adv-search').focus();
            remOut($('ul.jpActions a.adv-search'));

            FC.positionHomeAd();

        }
        else
        if (FC.hasIE) {
            adHolder.find('.advanced-search-p').css({
                "visibility": "hidden"
            });
            adButton.parent().show(400, function () {
                adButton.css({
                    "visibility": "visible"
                });
            });
            subButton.animate({
                "bottom": subButtonBottom
            }, 600);
            adHolder.slideUp(600, function () {
                adButton.unbind('click').bind("click", function () {
                    openAdvanced();
                    return false;
                });
                $('ul.jpActions a.adv-search').focus();
                remOut($('ul.jpActions a.adv-search'));

                FC.positionHomeAd();

            });
        }
        else {
            adHolder.animate({
                "opacity": 0
            }, 250, function () {
                adButton.parent().show(400);
                $(this).slideUp(600, function () {
                    subButton.animate({
                        "bottom": subButtonBottom
                    }, 250);
                    adButton.parent().animate({
                        "opacity": 1
                    }, 250, function () {
                        adButton.unbind('click').bind("click", function () {
                            openAdvanced();
                            return false;
                        });
                        $('ul.jpActions a.adv-search').focus();
                        remOut($('ul.jpActions a.adv-search'));

                        FC.positionHomeAd();

                    });
                });
            });
        }
        if (document.getElementById("jpState")) {
            document.getElementById("jpState").value = document.getElementById("jpState").value.slice(0, 1) + "0" + document.getElementById("jpState").value.slice(2, 3);
        }
    }


    if (document.getElementById("jpState") && document.getElementById("jpState").value.charAt(1) === "1") {
        if (!FC.hasIE) {
            adButton.parent().css({
                "opacity": 0
            });
            adHolder.css({
                "opacity": 1
            });
        }
        else {
            $('div.advanced-search-p', adHolder).css({
                "visibility": "visible"
            });
        }
        justShowAdvanced();
    }
};

//JP ADD RETURN JOURNEY
/*
 * Minimal opt. candidate for more opt as this is a key page.
 */
FC.addJourney = function () {

    var ret = $("div.journey-planner div.return");
    var type = "showhide";
    var ulStr = '<ul class="actions clear"><li><a href="#" class="remove-journey"><img alt="" class="sprite-main" src="' + fcPth.clrImg + '" width="22" height="30" />Remove return journey</a></li></ul>';

    if ($.find("div.return-prepend").length) {
        ret.prepend($(ulStr));
    } else {
        ret.append($(ulStr));
    }

    var add = $(FC.vars.selectors.ADD_JOURNEY);
    var removeRet = $("div.journey-planner a.remove-journey");
    var subButton = $(FC.vars.selectors.SEARCH_SUBMIT_BUTTON);
    var subButtonBottom = subButton.css('bottom');
    var slowerTrainsCheckboxInAccordion = $(".jp-acc .slower-trains");

    add.addClass("active").attr("title", "");
    removeRet.addClass("active").attr("title", "");

    if (!FC.hasIE) {
        ret.css({
            "opacity": 0
        });
    } else {
        ret.children().css({
            "visibility": "hidden"
        });
    }

    ret.hide();

    add.bind("click", function (e) {
        e.preventDefault();
        openReturn();
    });

    function updateZoom() {
        subButton.css({
            "zoom": "0"
        });
        subButton.css({
            "zoom": "1"
        });
    }

    function remOut(ele) {
        //var ele = e.currentTarget;
        ele.addClass("noout");
        ele.bind("blur", function (ele) {
            $(this).removeClass("noout");
            $(this).unbind("blur");
        });
    }

    function justShow() {
        if (type === "showhide") {
            add.parent().hide();
            ret.show();
            removeRet.unbind('click').bind("click", function () {
                closeReturn();
                return false;
            });
            //$('a.remove-journey').focus();
        }
        else {
            ret.show();
            add.attr("class", "remove-journey").empty().append("Remove return journey").unbind('click').bind("click", function () {
                closeReturn();
                return false;
            });
            add.parent().css({
                "opacity": 1
            });
            //$('a.remove-journey').focus();
        }
    }

    function resetValues() {
        $('select', ret).each(function () {
            this.selectedIndex = 0;
        });
        $('input', ret).each(function () {
            $(this).val('dd/mm');
        });
    }

    function openReturn() {

        FC.rePositionHomeAd();

        FC.journeyDates(true);
        if (FC.vars.slowSafari) {
            justShow();
        } else if (FC.hasIE) {
            add.css({ "visibility": "hidden" });
            if (type === "showhide") {
                $('a.date-picker-control', ret).css({ "visibility": "hidden" });
                add.parent().hide(400, function () {
                    ret.slideDown(400, function () {
                        ret.addClass('return-open'); // Add class to allow space to be added above the 'Remove return journey control' so that the slower trains checkbox can appear above it. Only used when the Journey Planner appears within the accordian on template 1.1.3
                        ret.children().css({
                            "visibility": "visible"
                        });
                        ret.find('a.date-picker-control').css({
                            "visibility": "visible"
                        });
                        removeRet.unbind('click').bind("click", function () {
                            closeReturn();
                            return false;
                        });
                        updateZoom();
                        $('a.remove-journey').focus();
                        remOut($('a.remove-journey'));
                        FC.positionHomeAd();

                    });
                    slowerTrainsCheckboxInAccordion.animate({ 'top': '-3em' }, 400); // Move “Include slower trains? checkbox above the “Remove return journey? control, but only when the Journey Planner is used within the accordian on template 1.1.3



                });
            } else {
                $('a.date-picker-control', ret).css({ "visibility": "hidden" });
                ret.slideDown(400, function () {
                    ret.addClass('return-open'); // Add class to allow space to be added above the “Remove return journey control? so that the slower trains checkbox can appear above it. Only used when the Journey Planner appears within the accordian on template 1.1.3
                    ret.children().css({ "visibility": "visible" });
                    $('a.date-picker-control', ret).css({ "visibility": "visible" });
                    add.attr("class", "remove-journey").empty().append("Remove return journey").unbind('click').bind("click", function () {
                        closeReturn();
                        return false;
                    });
                    add.css({ "visibility": "visible" });
                    updateZoom();
                    $('a.remove-journey').focus();
                    remOut($('a.remove-journey'));
                    FC.positionHomeAd();

                });
                slowerTrainsCheckboxInAccordion.animate({ 'top': '-3em' }, 400); // Move “Include slower trains? checkbox above the “Remove return journey? control, but only when the Journey Planner is used within the accordian on template 1.1.3



            }
        } else {
            ret.stop();
            add.parent().animate({ "opacity": 0 }, 250, function () {
                if (type === "showhide") {
                    $(this).hide(400, function () {
                        ret.show(400, function () {
                            ret.addClass('return-open'); // Add class to allow space to be added above the “Remove return journey control? so that the slower trains checkbox can appear above it. Only used when the Journey Planner appears within the accordian on template 1.1.3
                            ret.animate({ "opacity": 1 }, 250, function () {
                                removeRet.unbind('click').bind("click", function () {
                                    closeReturn();
                                    return false;
                                });
                                $('a.remove-journey').focus();
                                remOut($('a.remove-journey'));
                                FC.positionHomeAd();

                            });
                        });
                        slowerTrainsCheckboxInAccordion.animate({ 'top': '-3em' }, 400); // Move “Include slower trains? checkbox above the “Remove return journey? control, but only when the Journey Planner is used within the accordian on template 1.1.3



                    });
                } else {
                    ret.show(400, function () {
                        ret.addClass('return-open'); // Add class to allow space to be added above the “Remove return journey control? so that the slower trains checkbox can appear above it. Only used when the Journey Planner appears within the accordian on template 1.1.3
                        ret.animate({ "opacity": 1 }, 250, function () {
                            add.attr("class", "remove-journey").empty().append("Remove return journey").unbind('click').bind("click", function () {
                                closeReturn();
                                return false;
                            });
                            add.parent().animate({ "opacity": 1 }, 250);
                            $('a.remove-journey').focus();
                            remOut($('a.remove-journey'));
                            FC.positionHomeAd();

                        });
                        slowerTrainsCheckboxInAccordion.animate({ 'top': '-3em' }, 400); // Move “Include slower trains? checkbox above the “Remove return journey? control, but only when the Journey Planner is used within the accordian on template 1.1.3



                    });
                }
            });
        }
        //$('#jpState').val($('#jpState').val().replace('single', 'return'));
        if (document.getElementById("jpState")) {
            document.getElementById("jpState").value = "1" + document.getElementById("jpState").value.slice(1);
        }
    }

    function closeReturn() {

        FC.rePositionHomeAd();

        FC.journeyDates();
        if (FC.vars.slowSafari) {
            ret.removeClass('return-open'); //Remove class used to leave space for the slower trains checkbox on template 1.1.3 (see comments above)
            ret.hide();
            slowerTrainsCheckboxInAccordion.animate({ 'top': '0' }, 400); //Move slower trains checkbox back down to its normal position (see comments above)
            if (type === "showhide") {
                add.parent().show();
                add.unbind('click').bind("click", function () {
                    openReturn();
                    return false;
                });
                updateZoom();
                resetValues();
                $('a.add-journey').focus();
                remOut($('a.add-journey'));
                FC.positionHomeAd();

            }
            else {
                add.attr("class", "add-journey").empty().append("Add a return journey").unbind('click').bind("click", function () {
                    openReturn();
                    return false;
                });
                updateZoom();
                resetValues();
                $('a.add-journey').focus();
                remOut($('a.add-journey'));
                FC.positionHomeAd();

            }
        }
        else
        if (FC.hasIE) {
            ret.removeClass('return-open'); //Remove class used to leave space for the slower trains checkbox on template 1.1.3 (see comments above)
            ret.children().css({
                "visibility": "hidden"
            });
            ret.find('.date-picker-control').css({
                "visibility": "hidden"
            });
            ret.slideUp(400, function () {
                if (type === "showhide") {
                    add.parent().show(400, function () {
                        add.css({
                            "visibility": "visible"
                        });
                        $('a.add-journey').focus();
                        remOut($('a.add-journey'));
                    });
                    add.unbind('click').bind("click", function () {
                        openReturn();
                        return false;
                    });
                    updateZoom();
                    resetValues();

                    FC.positionHomeAd();

                }
                else {
                    add.attr("class", "add-journey").empty().append("Add a return journey").unbind('click').bind("click", function () {
                        openReturn();
                        return false;
                    });
                    updateZoom();
                    resetValues();
                    $('a.add-journey').focus();
                    remOut($('a.add-journey'));
                    FC.positionHomeAd();

                }
            });
            slowerTrainsCheckboxInAccordion.animate({ 'top': '0' }, 400); //Move slower trains checkbox back down to its normal position (see comments above)
        }
        else {
            ret.stop();
            ret.animate({
                "opacity": 0
            }, 250, function () {
                ret.removeClass('return-open'); //Remove class used to leave space for the slower trains checkbox on template 1.1.3 (see comments above)
                ret.hide(400, function () {
                    if (type === "showhide") {
                        add.parent().show(400, function () {
                            $(this).animate({
                                "opacity": 1
                            }, 250);
                            $('a.add-journey').focus();
                            remOut($('a.add-journey'));
                        });
                        add.unbind('click').bind("click", function () {
                            openReturn();
                            return false;
                        });
                        resetValues();

                        FC.positionHomeAd();

                    }
                    else {
                        add.parent().animate({
                            "opacity": 0
                        }, 250, function () {
                            add.attr("class", "add-journey").empty().append("Add a return journey").unbind('click').bind("click", function () {
                                openReturn();
                                return false;
                            });
                            add.parent().animate({
                                "opacity": 1
                            }, 250);
                            $('a.add-journey').focus();
                            remOut($('a.add-journey'));
                        });
                        resetValues();

                        FC.positionHomeAd();

                    }

                });
                slowerTrainsCheckboxInAccordion.animate({ 'top': '0' }, 400); //Move slower trains checkbox back down to its normal position (see comments above)
            });
        }
        //$('#jpState').val($('#jpState').val().replace('return', 'single'));
        if (document.getElementById("jpState")) {
            document.getElementById("jpState").value = "0" + document.getElementById("jpState").value.slice(1);
        }
    }

    if (document.getElementById("jpState") && document.getElementById("jpState").value.charAt(0) === "1") {
        if (!FC.hasIE) {
            add.parent().css({
                "opacity": 0
            });
            ret.css({
                "opacity": 1
            });
        }
        else {
            ret.children().css({
                "visibility": "visible"
            });
        }
        justShow();
    }

};
/*
 * Side tabs on homepage and my account

 Should be removed for HP project and moved to functions.other where performance isn't so much of an issue.
 */

FC.myAccTabs = function ($parent) {

    var __doc = document, __$ = $,
        __docStyle = __doc.body.style,
        __$ul = $parent.children('ul'),
        __$li = __$ul.children('li'),
        __$content = __$li.find('div.side-tab-content'),
        __j = __$content.length, __h,
        __$confirmContent,
        __rEFixed = /fixed/,
        __isFixed = !!__rEFixed.test($parent[0].className),
        __liHeight = 0, __hasChanged, __liLength = __$li.length,
        __uA = navigator.userAgent.toLowerCase(),
        __listHeight,
        // methods
        onYesClickHandler = function (e) {
            if (FC.hasLteIE6) {
                $("iframe.hideSelect").remove();
                __docStyle.height = "auto";
                __docStyle.width = "auto";
                __doc.documentElement.style.overflow = "";
            }

            $("div.modal-popup").remove();
            $("div.overlay").remove();
            e.data.callback(true); // ??????
            return false;
        },
        onNoClickHandler = function (e) {
            if (FC.hasLteIE6) {
                $("iframe.hideSelect").remove();
                __docStyle.height = "auto";
                __docStyle.width = "auto";
                __doc.documentElement.style.overflow = "";
            }

            $("div.modal-popup").remove();
            $("div.overlay").remove();
            e.data.callback(false);
            return false;
        },
        ClickHandler = function (e) {
            if (FC.hasLteIE6) {
                $("iframe.hideSelect").remove();
                __docStyle.height = "auto";
                __docStyle.width = "auto";
                __doc.documentElement.style.overflow = "";
            }

            $("div.modal-popup").remove();
            $("div.overlay").remove();
            e.data.callback(false);
            return false;
        },
        confirmAction = function (callback) {

            var __rEMac = /mac/, __rEFF = /firefox/;

            try {
                if (FC.hasLteIE6) {//if IE 6
                    __docStyle.height = "100%";
                    __docStyle.width = "100%";
                    __doc.documentElement.style.overflow = "hidden";
                    if ($('iframe.hideSelect').length === 0) {//iframe to hide select elements in ie6
                        $("body").append('<iframe class="hideSelect"></iframe><div class="overlay"></div><div class="box-8 box-8-short modal-popup" role="alertdialog" aria-labelledby="dialog1Title" aria-describedby="dialog1Desc"><div class="b8-t"><div class="b8-tr">&nbsp;</div></div><div class="b8-m"><div class="b8-p clear"><h3 class="sifr" id="dialog1Title">Are you sure you want to proceed?</h3><p class="popup-text" id="dialog1Desc"></p></div></div><div class="b8-b"><div class="b8-br">&nbsp;</div></div></div>');
                    }
                } else {//all others
                    if (!document.getElementById("overlay")) {
                        $("body").append('<div class="overlay"></div><div class="box-8 box-8-short modal-popup" role="alertdialog" aria-labelledby="dialog1Title" aria-describedby="dialog1Desc"><div class="b8-t"><div class="b8-tr">&nbsp;</div></div><div class="b8-m"><div class="b8-p clear"><h3 class="sifr" id="dialog1Title">Are you sure you want to proceed?</h3><p class="popup-text" id="dialog1Desc"></p></div></div><div class="b8-b"><div class="b8-br">&nbsp;</div></div></div>');
                    }
                }

                var overlay = $("div.overlay"),
                    popup = $("div.modal-popup");

                if (__rEMac.test(__uA) && __rEFF.test(__uA)) {
                    overlay.addClass("overlayMacFFBGHack"); //use png overlay so hide flash
                }
                else {
                    overlay.addClass("overlayBG"); //use background and opacity
                }

                $("p.popup-text").text(FC.vars.messages.CONFIRM_ACTION);

                popup.find("div.b8-p").append('<div class="buttons clear"><a class="b-b popup-no" href="#"><span>No</span></a><a class="b-b popup-yes" href="#"><span>Yes</span></a></div>');

                $("a.popup-yes").bind('click', { callback: callback }, onYesClickHandler).focus();
                //KE 090914 what is the onNoclickHandler meant to do????
                $("a.popup-no").bind('click', { callback: callback }, onNoClickHandler);

                // Adjust the positioning
                var height = popup.outerHeight(),
                    width = popup.outerHeight(),
                    top = $(window).scrollTop() - Math.round(height / 2),
                    left = Math.round(popup.outerWidth() / 2);

                popup.css({ marginLeft: '-' + left + 'px' });

                if (FC.hasLteIE6) {
                    $(window).scrollTop(0);
                } else {
                    popup.css({ marginTop: top + 'px' });
                }
            }
            catch (e) {
            }
        },
        changeTab = function (__this) {
            var __j = __liLength, __charAt, __liJ, __listHeight = "";
            while (__j--) {
                __liJ = __$li[__j];
                __liJ.className = __liJ.className.replace(/ selected/g, "");
            }
            __this[0].parentNode.parentNode.className += ' selected';

            if (__isFixed) {
                __listHeight = __$ul.height() - 40;
                if (FC.hasIE6) {
                    __listHeight = __$ul.height() - 66; /*NREOJPTEST - 1969*/
                }
                __this.parent().siblings('div.side-tab-container').find('div.side-tab-content').height(__listHeight);


            } else {
                __listHeight = __this.parent().siblings('div.side-tab-container').height() - 52;
                __$ul.height(__listHeight);
            }
        },
        clickHandler = function () {

            var __$this = $(this), __inputs, __selects, __select, __k, __input,
                __rESelected = /selected/, __rEConfirm = /confirmChange/,
                __liSelected = (function () {
                    var __j = __liLength, __sel;
                    while (__j--) {
                        if ((__sel = __$li[__j]) && __rESelected.test(__sel.className)) {
                            return __sel;
                        }
                    }
                })();

            if (__rEConfirm.test(__liSelected.className)) { // check if the form has been changed and alert before the user leaves
                __hasChanged = false;

                __inputs = __liSelected.getElementsByTagName('input');
                if (__inputs) {
                    __k = __inputs.length;
                    while (__k--) {
                        __input = __inputs[__k];
                        if (__input.type === 'radio') {
                            if (__input.checked !== __input.defaultChecked) {
                                __hasChanged = true;
                                break;
                            }
                        } else if (__input.value !== __input.defaultValue) {
                            __hasChanged = true;
                            break;
                        }
                    }
                }

                if (!__hasChanged) {
                    __selects = __liSelected.getElementsByTagName("select");
                    if (__selects) {
                        __k = __selects.length;
                        while (__k--) {
                            __select = __selects[__k];
                            if (!__select.options[__select.selectedIndex].defaultSelected) {
                                __hasChanged = true;
                                break;
                            }
                        }
                    }
                }

                if (__hasChanged) {
                    confirmAction(function (r) {
                        var __m, __i = 0;
                        if (r) {
                            if (__inputs) {
                                __k = __inputs.length;
                                while (__k--) {
                                    __input = __inputs[__k];
                                    if (__input.type === 'radio') {
                                        __input.checked = __input.defaultChecked;
                                    }
                                    else {
                                        __input.value = __input.defaultValue;
                                    }
                                }
                            }

                            if (__selects || (__selects = __liSelected.getElementsByTagName("select"))) {
                                __k = __selects.length;
                                while (__k--) {
                                    __select = __selects[__k];
                                    __m = __select.length;
                                    for (; __i < __m; __i++) {
                                        if (__select.options[__i].defaultSelected) {
                                            __select.options[__i].selected = "selected";
                                            break;
                                        }
                                    }
                                }
                            }

                            changeTab(__$this);
                        }
                    });
                } else {
                    changeTab(__$this);
                }
            } else {
                changeTab(__$this);
            }
            return false;
        };

    // init
    __$li.find('div.tab a').unbind().bind('click', clickHandler);

    if (__isFixed) { // ????? should be hard-coded height
        while (__j--) {
            __h = $(__$content[__j]).height();
            if (__h > __liHeight) {
                __liHeight = __h;
            }
        }

        if (__$ul.height() < __liHeight) {
            __$ul.height(__liHeight);
        }
        else {
            __listHeight = __$ul.height() - 40;
            __j = __$content.length;
            while (__j--) {
                $(__$content[__j]).height(__listHeight);
            }
        }
    } else {
        __$(__$li[0]).find('div.tab a').trigger('click');
    }


    __$confirmContent = __$li.filter('.confirmChange').find('div.side-tab-content');
    __$confirmContent.find('div.error-message a').unbind();
    __$confirmContent.find('button').unbind();

    // RW: NREOJPTEST-1969
    // KE: NREOJPTEST-2609
    if (window.location.href.indexOf("st=") > -1 && $parent.hasClass("my-account")) {
        var url = window.location.href, urlArr = url.slice(url.indexOf('?') + 1).toLowerCase().split("&"), vars = [], hash, urlTab;
        for (var i = 0; i < urlArr.length; i++) {
            hash = urlArr[i].split('=');
            if (hash.length > 1) {
                var cleanHash0 = hash[0].replace(/[^-a-z]/ig, '');
                var cleanHash1 = hash[1].replace(/[^-a-z]/ig, '');
                vars.push(cleanHash0);
                vars[cleanHash0] = cleanHash1;
            }
        }
        urlTab = vars.length > 0 ? vars.st : "notset";
        switch (urlTab) {
            case "overview ":
                __$li.find('div.tab a').eq(0).trigger('click');
                break;
            case "alerts":
                __$li.find('div.tab a').eq(1).trigger('click');
                break;
            case "stations":
                __$li.find('div.tab a').eq(2).trigger('click');
                break;
            case "journeys":
                __$li.find('div.tab a').eq(3).trigger('click');
                break;
            case "pockettimetables":
                __$li.find('div.tab a').eq(4).trigger('click');
                break;
            case "sitepreferences":
                __$li.find('div.tab a').eq(5).trigger('click');
                break;
            case "personaldetails":
                __$li.find('div.tab a').eq(6).trigger('click');
                break;
            default:
                __$li.find('div.tab a').eq(0).trigger('click');
                break;
        }
    } else {
        __$li.find('div.tab a').eq(0).trigger('click');
    }
};
FC.CFFAllDay = function () {
    var jpVal, jpVal1;
    function disInput(elem, cont) {
        var elemtag = elem.get(0).tagName.toLowerCase();
        cont.find(".times").addClass("dis");


        if (elemtag === "input" || elemtag === "select") {
            elem.attr('disabled', true);
        } else {
            elem.addClass("dis");
        }
    }

    function enInput(elem, cont) {
        var elemtag = elem.get(0).tagName.toLowerCase();
        cont.find(".times").removeClass("dis");
        if (elemtag === "input" || elemtag === "select") {
            elem.attr('disabled', false);
        } else {
            elem.removeClass("dis");
        }
    }

    function addWrapper(container) {
        //inject div over the top of the return fields for better user experience
        //- clicking on div enables return, don't have to click on checkbox
        //resorted to div due to cross-browser detection of clicks on disabled form inputs
        container[0].style.position = 'relative';
        container.append('<div id="retWrapper' + container.attr("id") + '" class="rWrapOnShort"></div>');
    }

    function enableTime(container) {
        container.find("div.times").find("select").each(function () {
            enInput($(this), container);
        });
        container.find("div.times").find("label").each(function () {
            enInput($(this), container);
        });
        if (container.attr("id") === "jp-out") {
            FC.setJPState(0, 3);
            outW[0].className = 'rWrapOffShort';
        } else {
            FC.setJPState(0, 4);
            inW[0].className = 'rWrapOffShort';
        }

    }

    function disableTime(container) {
        container.find("div.times").find("select").each(
            function () {
                disInput($(this), container);
            });
        container.find("div.times").find("label").each(
            function () {
                disInput($(this), container);
            });
        if (container.attr("id") === "jp-out") {
            FC.setJPState(1, 3);
            outW[0].className = 'rWrapOnShort';
            outW[0].style.height = $("#jp-out").height();
        } else {
            FC.setJPState(1, 4);
            inW[0].className = 'rWrapOnShort';
            inW[0].style.height = $("#jp-in").height();
        }

        //retW[0].className = 'rWrapOn';
        //retW[0].style.height = retI.height();
    }

    function switchState(container) {

        var cont = container.parent();
        var chkBox = cont.find("div.chk-ad input");

        if (chkBox.is(":checked")) {
            enableTime(cont);
            chkBox.removeAttr('checked');
        }
        else {
            disableTime(cont);
            chkBox.attr('checked', 'checked');
        }
        container.removeClass("dis");
    }

    addWrapper($("#jp-in"));
    addWrapper($("#jp-out"));
    var inW = $("#retWrapperjp-in");
    var outW = $("#retWrapperjp-out");

    var jpState = $("#jpState");
    if (jpState) {
        jpVal = jpState.val().slice(3, 4);
        jpVal1 = jpState.val().slice(4, 5);

        if (jpVal === "1" || jpVal === 1) {
            disableTime($("#jp-out"));
            $("#allDay").prop("checked", true);
        } else {
            enableTime($("#jp-out"));
        }
        if (jpVal1 === "1" || jpVal1 === 1) {
            disableTime($("#jp-in"));
            $("#allDayRet").prop("checked", true);
        }
        else {
            enableTime($("#jp-in"));
        }
    }



    inW.bind('click', function () {
        switchState($(this));
    });

    outW.bind('click', function () {
        switchState($(this));
    });


    $("div.chk-ad input").click(function (e) {
        var chk = $(this);
        //alert(retchk.is(":checked"));


        var cont = chk.parent().parent().parent();
        if (chk.is(":checked")) {
            disableTime(cont);
        } else {
            enableTime(cont);
            cont.find("div.rWrapOnShort").addClass('accessibility');
        }
    });
};
FC.CFFedit = function (cffheader) {
    var editButton = cffheader.find("#ctf-h-nav a"),
        buyNow = $("#buyNowHead"),
        buyNowIE6 = $("#buyNowHead1"),
        addBasket = $("#cff-add-basket"),
        addBasketIE6 = $("#cff-add-basket-2"),
        editHolder = cffheader.find("#ctf-h-nav"),
        editArea = cffheader.find("#jp"),
        cffSum = cffheader.find("#ctf-cf"),
        canButton = cffheader.find("#cancel");

    function showEdit() {
        editHolder.fadeOut();
        buyNow.fadeOut('slow');
        addBasket.fadeOut('slow');
        if (buyNowIE6.length > 0) {
            buyNowIE6.fadeOut('slow');
        }
        if (addBasketIE6.length > 0) {
            addBasketIE6.fadeOut('slow');
        }
        cffSum.fadeOut('slow', function () {
            editArea.slideDown();
        });

    }

    function hideEdit() {
        editArea.slideUp('slow', function () {
            editHolder.fadeIn();
            cffSum.fadeIn();
            buyNow.fadeIn();
            addBasket.fadeIn();
            if (buyNowIE6.length > 0) {
                buyNowIE6.fadeIn('slow');
            }
            if (addBasketIE6.length > 0) {
                addBasketIE6.fadeIn('slow');
            }
        });

    }

    editButton.click(function (e) {
        e.preventDefault();
        showEdit();

    });

    canButton.click(function (e) {
        e.preventDefault();
        hideEdit();
    });
};
NRE.details = (function (NRE, $) {
    var process = {
        updateSingleLink: function (fareBreakdown, targetElement, isReturnJourney) {
            var newLink = this.buildLink(fareBreakdown, targetElement, isReturnJourney);
            this.updateLink(targetElement, newLink);
        },
        buildLink: function (fareBreakdown, targetElement, isReturnJourney) {
            var that = this;
            var fareInfo = null;
            var linkStr = '';
            var callingPage = that.getCallingPage();
            var isCFF = false;
            var outboundFareId = '';
            var outboundJourneyId = '';
            var outboundResponseId = '';
            var inboundFareId = '';
            var inboundJourneyId = '';
            var inboundResponseId = '';
            var outboundJourneyBreakdown = '';
            var inboundJourneyBreakdown = '';
            var radioToUse = $();

            if (callingPage === 'cff') {
                isCFF = true;
                linkStr = fcPth.detLinkCFF + '?';
            } else {
                linkStr = fcPth.detLink + '?';
            }

            if (isCFF) {
                fareInfo = NRE.fares.getInfo(fareBreakdown, targetElement, false, true, true, true);
                if (fareInfo.outboundFare[0].length > 0) {
                    outboundFareId = fareInfo.outboundFare[0][12];
                    outboundJourneyId = fareInfo.outboundFare[0][13];
                    outboundResponseId = fareInfo.outboundFare[0][17];
                }
                if (fareInfo.inboundFare[0].length > 0) {
                    inboundFareId = fareInfo.inboundFare[0][12];
                    inboundJourneyId = fareInfo.inboundFare[0][13];
                    inboundResponseId = fareInfo.inboundFare[0][17];
                }
            } else {
                //fareBreakdown, element, isFullResult, getMultipleBreakdowns, cff, getArray
                fareInfo = NRE.fares.getInfo(fareBreakdown, targetElement, false, true, false, false);
                //the next two if statements are for unavailable fares
                if ((isReturnJourney === true && fareInfo.outboundFare[0] === null) || (isReturnJourney === false && fareInfo.outboundFare[0] === null)) {

                    if (fareInfo.isOutbound === true) {
                        radioToUse = targetElement.find('input[type=radio]').eq(0);
                    } else {
                        radioToUse = fareInfo.radio;
                    }

                    outboundJourneyBreakdown = NRE.fares.findJSON(radioToUse, 'journey', false);

                    //if we get an array back from the above variable assignment then journeyJson wasn't found. If we get an object, we're good
                    if (typeof outboundJourneyBreakdown[0] === 'undefined') {
                        fareInfo.outboundFare[0] = {};
                        fareInfo.outboundFare[0].fareId = '';
                        fareInfo.outboundFare[0].journeyId = outboundJourneyBreakdown.journeyId;
                        fareInfo.outboundFare[0].responseId = outboundJourneyBreakdown.responseId;
                    }
                }

                if (isReturnJourney === true && fareInfo.inboundFare[0] === null) {

                    if (fareInfo.isOutbound === true) {
                        radioToUse = fareInfo.radio;
                    } else {
                        radioToUse = targetElement.find('input[type=radio]').eq(0);
                    }

                    inboundJourneyBreakdown = NRE.fares.findJSON(radioToUse, 'journey', false);

                    if (typeof inboundJourneyBreakdown[0] === 'undefined') {
                        fareInfo.inboundFare[0] = {};
                        fareInfo.inboundFare[0].fareId = '';
                        fareInfo.inboundFare[0].journeyId = inboundJourneyBreakdown.journeyId;
                        fareInfo.inboundFare[0].responseId = inboundJourneyBreakdown.responseId;
                    }
                }


                if (fareInfo.outboundFare[0] !== null) {
                    outboundFareId = fareInfo.outboundFare[0].fareId;
                    outboundJourneyId = fareInfo.outboundFare[0].journeyId;
                    outboundResponseId = fareInfo.outboundFare[0].responseId;
                }
                if (fareInfo.inboundFare[0] !== null) {
                    inboundFareId = fareInfo.inboundFare[0].fareId;
                    inboundJourneyId = fareInfo.inboundFare[0].journeyId;
                    inboundResponseId = fareInfo.inboundFare[0].responseId;
                }
            }

            if (fareInfo.outboundFare[0] !== null) {
                if (fareInfo.outboundFare[0].length > 0 || typeof fareInfo.outboundFare[0].fareId !== 'undefined') {
                    linkStr = linkStr + 'outboundJourneyId=' + outboundJourneyId;
                    linkStr = linkStr + '&outboundFareId=' + outboundFareId;
                    if (!isCFF) {
                        linkStr = linkStr + '&outboundResponseId=' + outboundResponseId;
                    }
                }
            }

            if (fareInfo.outboundFare[0] !== null && fareInfo.inboundFare[0] !== null) {
                if ((fareInfo.outboundFare[0].length > 0 && fareInfo.inboundFare[0].length > 0) || (typeof fareInfo.outboundFare[0].fareId !== 'undefined' && typeof fareInfo.inboundFare[0].fareId !== 'undefined')) {
                    linkStr = linkStr + '&';
                }
            }

            if (fareInfo.inboundFare[0] !== null) {
                if (fareInfo.inboundFare[0].length > 0 || typeof fareInfo.inboundFare[0].fareId !== 'undefined') {
                    linkStr = linkStr + 'inboundJourneyId=' + inboundJourneyId;
                    linkStr = linkStr + '&inboundFareId=' + inboundFareId;
                    if (!isCFF) {
                        linkStr = linkStr + '&inboundResponseId=' + inboundResponseId;
                    }
                }
            }

            linkStr = linkStr + '&isOutboundJourneySelected=' + fareInfo.isOutbound;

            return linkStr;

        },
        updateLink: function (targetElement, linkStr) {
            var detLink = targetElement.parent().siblings('td.info').find('a');
            detLink.attr('href', linkStr);
        },
        getCallingPage: function () {
            var result = '';
            var isCtf = $('#ctf');
            var isCtfDetails = $('#ctf-details');
            var isCff = $('.cff');

            if (isCtf.length > 0 || isCtfDetails.length > 0) {
                result = 'jp';
            }

            if (isCff.length > 0) {
                result = 'cff';
            }

            return result;
        },
        updateAllLinks: function () {
            var switcher = $('th.fare .ctf-fare');
            var selTab = '';
            var type = '';
            var allFares = '';
            var isRet = false;
            var isCff = $('#cff-header').length > 0;
            if (switcher.children('div').length > 1 || isCff) {

                selTab = switcher.children('div.selected');
                if (selTab.hasClass('right') || selTab.hasClass('center') || (isCff && $('td.fare > div.single').length > 0)) {
                    type = 'single';
                } else {
                    type = 'return';
                }


                allFares = $('td.fare div.' + type);

                allFares.each(function () {
                    var that = $(this);
                    var fareInfo = NRE.fares.findJSON(that, 'fare', false);
                    var fArray = [null];
                    var fBreaks = that.find("span.fare-breakdown input");
                    if (type === 'return') {
                        isRet = that.hasClass('return-only');
                    } else {
                        isRet = that.hasClass('true');
                    }

                    if (isCff) {
                        fArray = [];
                        for (var i = 0; i < fBreaks.length; i++) {
                            fArray.push(fBreaks[i].value.split("|"));
                        }
                    } else {
                        fArray = fareInfo;
                    }
                    //console.log(isRet+' 8925');
                    NRE.details.updateSingleLink(fArray, that, isRet);
                });
            }
        }
    };
    return process;

})(NRE, $);

FC.RecFnd = function ($div) {
    var $changeLinks = $div.find('.pre-filled a');

    $changeLinks.click(function () {
        var $this = $(this);

        $this.parents('.pre-filled').hide();
        $this.parents('.field').find('.change-field').show('fast');

        return false;
    });
};
FC.StnsEasy = function ($el) {
    var $link = $el.find('a'),
        clickHandler = function (e) {
            window.location = $link[0].href;
            return false;
        };

    $el.on('click', clickHandler);
};
FC.tvfForm = function ($el) {
    var $radios = $el.find("input[type='radio']"),
        $input = $el.find("#txtFor"),
        changeHandler = function (e) {
            var id = e.target.id;

            $input[0].value = "";

            switch (id) {
                case "fullname":
                    $input[0].maxLength = 50;
                    break;
                case "char3":
                    $input[0].maxLength = 3;
                    break;
                case "char2":
                    $input[0].maxLength = 2;
                    break;
            }
        };

    changeHandler({ target: $radios.filter(":checked")[0] });

    $radios.on('change', changeHandler);

};
FC.errorSkipFocus = function ($par) {
    var $focusItems = $par.find('a');

    $focusItems.on('click keypress', function () {
        var targetId = "#" + this.href.split('#')[1];

        if (targetId !== '#undefined') {
            $(targetId).focus();
            return false;
        }
    });

};
FC.regPanel = function ($par) {
    var $name = $par.find('#txtFirstName');

    $name.focus();
};
FC.revealPlanJourney = function ($elem) {
    var __expandedString = "expanded";
    // $(".jp-no-right").slideUp(1000);
    // $elem.removeClass(__expandedString);
    $elem.find(".jp-header .cta button").off("click").on("click", function (e) {
        e.preventDefault();
        var $jpHeader = $elem.find(".jp-header");
        var $jpNoRight = $elem.find(".jp-no-right");


        if ($jpHeader.hasClass(__expandedString)) {
            $jpNoRight.slideUp(300);
            $jpHeader.removeClass(__expandedString);
            // $jpHeader.find("h2").fadeIn(300);
            $elem.removeClass(__expandedString);
        } else {
            $jpNoRight.slideDown(300, function () {
                $jpHeader.addClass(__expandedString);
            });
            // $jpHeader.find("h2").fadeOut(300, function(){
            // });
            $elem.addClass(__expandedString);
        }
    });
};
NRE.fares = (function () {
    var process = {
        fBreakdownLength: 18,
        jBreakdownLength: 12,
        scriptName: 'jsonJourney-',
        breakdownNames: { 'r': 'returnJsonFareBreakdowns', 's': 'singleJsonFareBreakdowns' },
        elAjaxBreakdownNames: { 'r': 'cheapestReturnFare', 's': 'cheapestSingleFare' },
        journeyBreakdown: 'jsonJourneyBreakdown',
        isObject: function (toTest) {
            var result = false;
            var type = Object.prototype.toString.call(toTest).toLowerCase();

            if (type === '[object object]') {
                result = true;
            }

            return result;

        },
        isOutbound: function (element) {
            var parentIsOutboundTable = null;

            if (element.length > 0) {
                if (element.parents("table#oft").length > 0) {
                    parentIsOutboundTable = true;
                } else {
                    parentIsOutboundTable = false;
                }
            }
            return parentIsOutboundTable;
        },
        isReturnJourney: function (fareBreakdown) {
            var firstParam = '';
            var isFareBreakdownObject = NRE.fares.isObject(fareBreakdown[0]);
            var result = null;

            if (isFareBreakdownObject) {
                if (fareBreakdown[0] !== null) {
                    firstParam = fareBreakdown[0].breakdownType.toUpperCase();
                }
            } else {
                if (typeof fareBreakdown[0] !== 'undefined') {
                    if (fareBreakdown[0] !== null) {
                        if (typeof fareBreakdown[0][0] !== 'undefined') {
                            firstParam = fareBreakdown[0][0].toUpperCase();
                        }
                    }
                }
            }

            if (firstParam.indexOf('RETURN') > -1 || firstParam.indexOf('OUTWARD') > -1 || firstParam.indexOf('INWARD') > -1) {
                result = true;
            } else {
                result = false;
            }

            return result;
        },
        isRedRoute: function (fareBreakdown) {
            var redRouteParam = '';
            var isFareBreakdownObject = NRE.fares.isObject(fareBreakdown[0]);
            var result = null;

            if (isFareBreakdownObject) {
                if (fareBreakdown[0] !== null) {
                    result = fareBreakdown[0].redRoute;
                }
            } else {
                if (typeof fareBreakdown[0] !== 'undefined') {
                    if (fareBreakdown[0] !== null) {
                        if (typeof fareBreakdown[0][7] !== 'undefined') {
                            redRouteParam = fareBreakdown[0][7].toUpperCase();
                        }
                    }
                }

                if (redRouteParam === 'TRUE') {
                    result = true;
                } else {
                    result = false;
                }
            }

            return result;
        },
        isFlexible: function (fareBreakdown) {
            var offPeakParam = '';
            var isFareBreakdownObject = NRE.fares.isObject(fareBreakdown[0]);
            var result = null;

            if (isFareBreakdownObject) {
                if (fareBreakdown[0] !== null) {
                    offPeakParam = fareBreakdown[0].nreFareCategory.toUpperCase();
                }
            } else {
                if (typeof fareBreakdown[0] !== 'undefined') {
                    if (fareBreakdown[0] !== null) {
                        if (typeof fareBreakdown[0][16] !== 'undefined') {
                            offPeakParam = fareBreakdown[0][16].toUpperCase();
                        }
                    }
                }
            }

            if (offPeakParam === 'FLEXIBLE' || offPeakParam === 'OPEN' || offPeakParam === 'FLEXIBLE_TRAVELCARD' || offPeakParam === 'OPEN_TRAVELCARD') {
                result = true;
            } else {
                result = false;
            }

            return result;
        },
        isAdvance: function (fareBreakdown) {
            var advanceParam = '';
            var isFareBreakdownObject = NRE.fares.isObject(fareBreakdown[0]);
            var result = null;

            if (isFareBreakdownObject) {
                if (fareBreakdown[0] !== null) {
                    advanceParam = fareBreakdown[0].nreFareCategory.toUpperCase();
                }
            } else {
                if (typeof fareBreakdown[0] !== 'undefined') {
                    if (fareBreakdown[0] !== null) {
                        if (typeof fareBreakdown[0][16] !== 'undefined') {
                            advanceParam = fareBreakdown[0][16].toUpperCase();
                        }
                    }
                }
            }

            if (advanceParam === 'RESTRICTED') {
                result = true;
            } else {
                result = false;
            }

            return result;
        },
        isSaR: function (fareBreakdown) {
            var fareType = '';
            var isFareBreakdownObject = NRE.fares.isObject(fareBreakdown[0]);
            var result = null;

            if (isFareBreakdownObject) {
                if (fareBreakdown[0] !== null) {
                    fareType = fareBreakdown[0].breakdownType.toUpperCase();
                }
            } else {
                if (typeof fareBreakdown[0] !== 'undefined') {
                    if (fareBreakdown[0] !== null) {
                        if (typeof fareBreakdown[0][0] !== 'undefined') {
                            fareType = fareBreakdown[0][0].toUpperCase();
                        }
                    }
                }
            }

            if (fareType === 'SINGLEFAREOUTWARD' || fareType === 'SINGLEFAREINWARD') {
                result = true;
            } else {
                result = false;
            }

            return result;
        },
        isMulti: function (fareBreakdown) {
            var multi = '';

            if (typeof fareBreakdown[0] === 'undefined' || fareBreakdown[0] === null) {
                multi = false;
            } else {
                if (fareBreakdown[0].constructor === Array) {
                    multi = true;
                } else {
                    multi = false;
                }
            }

            return multi;
        },
        isReturnContainer: function (element) {
            var elementNodeName = null;
            var result = null;

            if (typeof element[0] !== 'undefined') {
                elementNodeName = element[0].nodeName.toUpperCase();
            } else {
                elementNodeName = '';
            }

            if (elementNodeName === 'INPUT') {
                result = element.parent().parent().hasClass('return');
            } else if (elementNodeName === 'DIV') {
                result = element.hasClass('return');
            }

            return result;
        },
        normalise: function (breakdown) {
            var that = this;
            var isMultiArray = that.isMulti(breakdown);
            var multiDimensionalArray = null;

            if (isMultiArray) {
                multiDimensionalArray = breakdown;
            } else if (breakdown.length === that.fBreakdownLength || breakdown.length === that.jBreakdownLength) {
                multiDimensionalArray = [];
                multiDimensionalArray.push(breakdown);
            } else {
                multiDimensionalArray = [[]];
            }

            return multiDimensionalArray;
        },
        convertToArray: function (str, normalise) {
            var that = this;
            var newArray = str.split('|');
            var doNormalisation = true;

            if (typeof normalise !== 'undefined') {
                doNormalisation = normalise;
            }

            if (doNormalisation) {
                return that.normalise(newArray);
            } else {
                return newArray;
            }
        },
        findBreakdown: function (element, type, returnArray, fetchMultipleBreakdowns) {
            var that = this;
            var result = null;
            var foundElement = [];
            var foundElementValue = null;
            var foundElementArray = null;
            var elementNodeName = null;
            var elementClassName = '';
            var doMultipleBreakdownGet = false;
            var i = 0;
            var foundElementLength = 0;

            if(typeof fetchMultipleBreakdowns !== 'undefined'){
                doMultipleBreakdownGet = fetchMultipleBreakdowns;
            }


            if (typeof element[0] !== 'undefined') {
                elementNodeName = element[0].nodeName.toUpperCase();
            } else {
                elementNodeName = '';
            }

            if (type === 'fare') {
                elementClassName = 'fare-breakdown';
            } else if (type === 'journey') {
                elementClassName = 'journey-breakdown';
            }

            switch (elementNodeName) {
                case 'INPUT':
                    foundElement = element.parent().siblings('span.' + elementClassName).find('input');
                    break;
                case 'LABEL':
                    foundElement = element.siblings('span.' + elementClassName).find('input');
                    break;
                case 'DIV':
                    foundElement = element.find('span.' + elementClassName +' > input');
                    break;
                default:
                    foundElement = [];
                    break;
            }

            foundElementLength = foundElement.length;

            if (returnArray) {
                if (foundElementLength > 0) {
                    foundElementValue = foundElement.val();
                } else {
                    foundElementValue = '';
                }

                foundElementArray = that.convertToArray(foundElementValue);

                if (type === 'fare' && doMultipleBreakdownGet && foundElementLength > 1) {
                    for (i = 1; i < foundElementLength; i++) {
                        foundElementArray.push(that.convertToArray(foundElement.eq(i).val(), false));
                    }
                }

                result = that.normalise(foundElementArray);

                //clean up empty array
                if (result[0][0] === '' && result[0].length === 1) {
                    result = [[]];
                }
            } else {
                result = foundElement;
            }

            return result;
        },
        mapObjectToBreakdown: function (type, obj) {
            var fareInfo = 'singleJsonFareBreakdowns';
            var jsonBreakdown = obj.jsonJourneyBreakdown;
            var fareObjects = [];
            var i = 0;
            var iLen = 0;
            var result = [];
            var item = null;

            if (type === 'r') {
                fareInfo = 'returnJsonFareBreakdowns';
            }

            fareObjects = obj[fareInfo];
            if (fareObjects === null) {
                fareObjects = [[]];
            }
            iLen = fareObjects.length;

            for (i = 0; i < iLen; i++) {
                item = fareObjects[i];

                if (item.length !== 0) {
                    result.push([
                        item.breakdownType,
                        item.numberOfTickets.toString(),
                        item.passengerType,
                        item.fareTicketType,
                        item.railcardName,
                        parseFloat(item.ticketPrice).toFixed(2),
                        parseFloat(item.discount).toFixed(2) === '0.00' ? '' : parseFloat(item.discount).toFixed(2),
                        item.redRoute.toString(),
                        item.ticketTypeCode,
                        item.ticketRestriction,
                        item.fareProvider,
                        item.tocProvider,
                        item.fareId.toString(),
                        jsonBreakdown.journeyId.toString(),
                        item.fareRouteDescription,
                        item.fareRouteName,
                        item.nreFareCategory,
                        jsonBreakdown.responseId.toString()
                    ]);
                }
            }

            if (result.length === 0) {
                result = [[]];
            }

            return result;
        },
        mapObjectToJourney: function (obj) {
            var breakdown = obj.jsonJourneyBreakdown;

            return [[
                breakdown.departureStationName,
                breakdown.departureStationCRS,
                breakdown.departureTime,
                breakdown.arrivalStationName,
                breakdown.arrivalStationCRS,
                breakdown.arrivalTime,
                breakdown.durationHours.toString(),
                breakdown.durationMinutes.toString(),
                breakdown.changes.toString(),
                breakdown.statusIcon,
                breakdown.hoverInformation === null ? '' : breakdown.hoverInformation,
                ''
            ]];
        },
        findJSON: function (element, type, returnArray) {
            var that = this;
            var result = null;
            var foundElement = [];
            var foundElementValue = null;
            var foundElementArray = null;
            var elementNodeName = null;
            var elementClassName = '';
            var i = 0;
            var iLen = 0;
            var foundElementLength = 0;
            var chosenRadio = null;
            var chosenRadioValue = null;
            var splitRadioValue = [];
            var scriptName = '';
            var jsonBreakdown = null;
            var journeyBreakdown = null;

            if (typeof element !== 'undefined') {
                if (typeof element[0] !== 'undefined') {
                    elementNodeName = element[0].nodeName.toUpperCase();
                } else {
                    elementNodeName = '';
                }
            } else {
                elementNodeName = '';
            }

            switch (elementNodeName) {
                case 'INPUT':
                    chosenRadio = element;
                    break;
                case 'LABEL':
                    chosenRadio = element.find('input[type=radio]');
                    break;
                case 'DIV':
                    chosenRadio = element.find('> label > input[type=radio]');
                    break;
            }

            if(chosenRadio !== null){
                chosenRadioValue = chosenRadio.val();
            }

            if (chosenRadioValue !== null) {
                splitRadioValue = chosenRadioValue.split('-');
                if (splitRadioValue.length > 0) {
                    if (chosenRadio[0].className.indexOf('responseId-') > -1) {
                        scriptName = that.scriptName + chosenRadio[0].className.split('-')[1] + '-' + splitRadioValue[2];
                    } else {
                        scriptName = that.scriptName + splitRadioValue[0] + '-' + splitRadioValue[2];
                    }
                    jsonBreakdown = $.parseJSON($('#' + scriptName).html());
                }
            }


            if (returnArray) {
                if (jsonBreakdown !== null && type === 'fare') {
                    result = that.mapObjectToBreakdown(splitRadioValue[3], jsonBreakdown);
                } else if (jsonBreakdown !== null && type === 'journey') {
                    result = that.mapObjectToJourney(jsonBreakdown);
                }

                if (jsonBreakdown === null) {
                    result = [[]];
                }

                //clean up empty array
                if (result[0][0] === '' && result[0].length === 1) {
                    result = [[]];
                }
            } else {
                if (jsonBreakdown !== null && type === 'fare') {
                    result = jsonBreakdown[that.breakdownNames[splitRadioValue[3]]];
                    journeyBreakdown = jsonBreakdown[that.journeyBreakdown];

                    if (typeof result !== 'undefined') {
                        iLen = result.length;

                        if (result.length !== 0) {
                            for (i = 0; i < iLen; i++) {
                                result[i].journeyId = journeyBreakdown.journeyId;
                                result[i].responseId = journeyBreakdown.responseId;
                            }
                        } else {
                            result = [null];
                        }
                    } else {
                        result = [null];
                    }

                } else if (jsonBreakdown !== null && type === 'journey') {
                    result = jsonBreakdown[that.journeyBreakdown];
                }

                if (jsonBreakdown === null) {
                    return [null];
                }
            }

            return result;
        },
        findSlider: function (element) {
            var that = this;
            var result = [];
            var foundElement = [];
            var elementClassName = '';
            var breakdownArray = that.findJSON(element, 'fare', false);
            var isReturn = that.isReturnJourney(breakdownArray);
            var isSaR = that.isSaR(breakdownArray);

            if (isReturn) {
                if (isSaR) {
                    elementClassName = 'single';
                } else {
                    elementClassName = 'return';
                }
            } else {
                elementClassName = 'single';
            }

            result = element.parent().parent().parents('tr').next('tr').find('.fare-slide .f-' + elementClassName);

            return result;
        },
        getInfo: function (fareBreakdown, element, isFullResult, getMultipleBreakdowns, cff, getArray) {
            var that = this;
            var isOutbound = that.isOutbound(element);
            var isReturnJourney = null;
            var outboundFare = [[]];
            var inboundFare = [[]];
            var isAdvance = null;
            var isRedRoute = null;
            var isSingleAsReturn = null;
            var isFlexible = null;
            var originalFare = null;
            var fetchMultipleBreakdowns = false;
            var result = null;
            var otherSelected = null;
            var radio = $();
            var isCff = false;
            var returnArray = true;


            if (typeof getMultipleBreakdowns !== 'undefined') {
                fetchMultipleBreakdowns = getMultipleBreakdowns;
            }

            if (typeof getArray !== 'undefined') {
                returnArray = getArray;
            }

            if (typeof cff !== 'undefined') {
                isCff = cff;
            }

            if (returnArray === true) {
                originalFare = that.normalise(fareBreakdown);
                result = { outboundFare: [[]], inboundFare: [[]], isReturnJourney: null, isOutbound: null };
            } else {
                originalFare = fareBreakdown;
                outboundFare = [null];
                inboundFare = [null];
                result = { outboundFare: [null], inboundFare: [null], isReturnJourney: null, isOutbound: null };
            }

            isReturnJourney = that.isReturnJourney(originalFare);

            if (isOutbound !== null) {
                if (isOutbound) {
                    outboundFare = originalFare;
                    otherSelected = that.getOtherSelected(element, 'breakdownAndRadio', isCff, returnArray);
                    inboundFare = otherSelected.breakdown;
                    radio = otherSelected.radio;
                    isReturnJourney = that.isReturnJourney(outboundFare);
                } else {

                    otherSelected = that.getOtherSelected(element, 'breakdownAndRadio', isCff, returnArray);
                    outboundFare = otherSelected.breakdown;
                    radio = otherSelected.radio;
                    inboundFare = originalFare;
                    isReturnJourney = that.isReturnJourney(inboundFare);
                }
            }

            if (isFullResult) {
                isAdvance = that.isAdvance(originalFare);
                isRedRoute = that.isRedRoute(originalFare);
                isSingleAsReturn = that.isSaR(originalFare);
                isFlexible = that.isFlexible(originalFare);

                result = { outboundFare: outboundFare, inboundFare: inboundFare, isReturnJourney: isReturnJourney, isOutbound: isOutbound, isAdvance: isAdvance, isRedRoute: isRedRoute, isSingleAsReturn: isSingleAsReturn, isFlexible: isFlexible, radio: radio };
            } else {
                result = { outboundFare: outboundFare, inboundFare: inboundFare, isReturnJourney: isReturnJourney, isOutbound: isOutbound, radio: radio };
            }

            return result;


        },
        getOtherSelected: function (element, type, cff, getArray) {
            var that = this;
            var isOutbound = that.isOutbound(element);
            var otherTable = null;
            var result = null;
            var ticketType = null;
            var fetchMultipleBreakdowns = false;
            var selectedRadio = $();
            var isCff = false;
            var returnArray = true;

            if (typeof cff !== 'undefined') {
                isCff = cff;
            }

            if (typeof getArray !== 'undefined') {
                returnArray = getArray;
            }

            if (element.length === 0) {
                result = [[]];
            }else{
                if (that.isReturnContainer(element)) {
                    ticketType = 'return';
                } else {
                    ticketType = 'single';
                }

                if (isOutbound) {
                    otherTable = $('#ift');
                } else {
                    otherTable = $('#oft');
                }

                selectedRadio = otherTable.find('.' + ticketType + ' > label > input:checked');

                if (type === 'breakdown') {
                    if (isCff) {
                        result = that.findBreakdown(selectedRadio, 'fare', true);
                    } else {
                        result = that.findJSON(selectedRadio, 'fare', returnArray);
                    }

                } else if (type === 'breakdownAndRadio') {
                    result = { breakdown: [[]], radio: selectedRadio };
                    if (isCff) {
                        result.breakdown = that.findBreakdown(selectedRadio, 'fare', true);
                    } else {
                        result.breakdown = that.findJSON(selectedRadio, 'fare', returnArray);
                    }
                }
            }

            return result;
        },
        updateJson: function (element, type, suppliedData, isELAjax) {
            //var breakdownJSONScriptTag = targetDiv.parent().find('script');
            //var breakdownJSON = $.parseJSON(breakdownJSONScriptTag.html());
            var that = this;
            var breakdownJSONScriptTag = null;
            var breakdownJSON = null;
            var JSONToReplace = NRE.fares.breakdownNames.s;
            var earlierLaterAjaxData = NRE.fares.elAjaxBreakdownNames.s;
            var elementType = element.length > 0 ? element[0].tagName.toLowerCase() : null;
            var i = 0;
            var iLen = 0;
            var isObjectData = that.isObject(suppliedData);
            var newDataJourney = null;
            var newDataFare = [];
            var radioElement = null;
            var currentResponseId = null;
            var currentJourneyId = null;
            var hasResponseIdChanged = false;
            var hasJourneyIdChanged = false;
            var hasJourneyOrReponseIdChanged = false;
            var currentFareId = null;
            var hasFareIdChanged = false;
            var newFareId = null;
            var isEarlierLaterAjax = typeof isELAjax === 'undefined' ? false : isELAjax;
            var newEarlierLaterResponseId = '';
            var earlierLaterRadioValue = '';

            if (elementType !== null) {
                switch (elementType) {
                    case 'input':
                        breakdownJSONScriptTag = element.parent().parent().parent().find('script');
                        radioElement = element;
                        break;
                    case 'label':
                        breakdownJSONScriptTag = element.parent().parent().find('script');
                        radioElement = element.find('input[type=radio]').eq(0);
                        break;
                    case 'div':
                        breakdownJSONScriptTag = element.parent().find('script');
                        radioElement = element.find('input[type=radio]').eq(0);
                        break;
                }

                breakdownJSON = $.parseJSON(breakdownJSONScriptTag.html());

                if (radioElement.val().split('-')[3] === 'r') {
                    JSONToReplace = NRE.fares.breakdownNames.r;
                    earlierLaterAjaxData = NRE.fares.elAjaxBreakdownNames.r;
                }

                if (type === 'journey' || type === 'both') {
                    if (typeof suppliedData.responseId !== 'undefined') {
                        newDataJourney = suppliedData;
                    } else {
                        if (typeof suppliedData.jsonJourneyBreakdown !== 'undefined') {
                            newDataJourney = suppliedData.jsonJourneyBreakdown;
                        }
                    }

                }

                if (type === 'fare' || type === 'both' || type === 'fareIdOnly') {

                    if (isObjectData === false && isEarlierLaterAjax === false) {
                        newDataFare = suppliedData;

                    } else {
                        if (isEarlierLaterAjax === true) {
                            if (typeof suppliedData[earlierLaterAjaxData] !== 'undefined') {
                                newDataFare = suppliedData[earlierLaterAjaxData].fareBreakdowns;
                                earlierLaterRadioValue = suppliedData[earlierLaterAjaxData].radioValue.split('-');

                                if (suppliedData.responseId.toString() !== earlierLaterRadioValue[0]) {
                                    newEarlierLaterResponseId = earlierLaterRadioValue[0];
                                }
                            }
                        } else {
                            if (typeof suppliedData[JSONToReplace] !== 'undefined') {
                                newDataFare = suppliedData[JSONToReplace];
                            }
                        }
                    }
                }

                if (newDataFare.length > 0) {
                    if (newDataFare[0] !== null && breakdownJSON !== null) {
                        currentFareId = breakdownJSON[JSONToReplace][0].fareId;


                        if (currentFareId !== newDataFare[0].fareId) {
                            hasFareIdChanged = true;
                            newFareId = newDataFare[0].fareId;

                        }

                        breakdownJSON[JSONToReplace] = newDataFare;
                    }
                }

                if (newDataJourney !== null && breakdownJSON !== null) {
                    currentResponseId = breakdownJSON.jsonJourneyBreakdown.responseId;
                    currentJourneyId = breakdownJSON.jsonJourneyBreakdown.journeyId;

                    if (currentResponseId !== newDataJourney.responseId && type !== 'fareIdOnly') {
                        hasResponseIdChanged = true;
                        breakdownJSON.jsonJourneyBreakdown.responseId = newDataJourney.responseId;
                    }

                    if (currentJourneyId !== newDataJourney.journeyId && type !== 'fareIdOnly') {
                        hasJourneyIdChanged = true;
                        breakdownJSON.jsonJourneyBreakdown.journeyId = newDataJourney.journeyId;
                    }

                    if (hasJourneyIdChanged === true || hasResponseIdChanged === true) {
                        hasJourneyOrReponseIdChanged = true;
                    }
                }

                if (hasJourneyOrReponseIdChanged === true && type !== 'fareIdOnly') {
                    that.updateJsonScriptId(breakdownJSONScriptTag, newDataJourney.responseId, newDataJourney.journeyId);
                    that.updateRadioValue(radioElement, newDataJourney.responseId, newDataJourney.journeyId, newFareId);
                } else if (hasFareIdChanged === true) {
                    that.updateRadioValue(radioElement, null, null, newFareId);
                }

                if (isEarlierLaterAjax === true && newEarlierLaterResponseId !== '' && type !== 'fareIdOnly') {
                    that.updateRadioValue(radioElement, newEarlierLaterResponseId, newDataJourney.journeyId, newFareId);
                } else {
                    that.updateRadioValue(radioElement, null, null, newFareId);
                }

                if (breakdownJSON !== null && (newDataFare.length > 0 || newDataJourney !== null)) {
                    breakdownJSONScriptTag.html($.stringify(breakdownJSON));
                }

            }
        },
        updateJsonScriptId: function (breakdownScriptTag, responseId, journeyId) {
            var currentId = null;
            var newId = 'jsonJourney-';
            if (breakdownScriptTag.length > 0) {
                currentId = breakdownScriptTag[0].id.split('-');

                if (responseId !== null) {
                    newId = newId + responseId + '-';
                } else {
                    newId = newId + currentId[1] + '-';
                }

                if (journeyId !== null) {
                    newId = newId + journeyId;
                } else {
                    newId = newId + currentId[2];
                }

                breakdownScriptTag[0].id = newId;
            }

        },
        updateRadioValue: function (radioElement, responseId, journeyId, fareId) {
            var currentVal = null;
            var newVal = '';
            if (radioElement.length > 0) {
                currentVal = radioElement.val().split('-');

                if (responseId !== null) {
                    newVal = newVal + responseId + '-';
                } else {
                    newVal = newVal + currentVal[0] + '-';
                }

                if (fareId !== null) {
                    newVal = newVal + fareId + '-';
                } else {
                    newVal = newVal + currentVal[1] + '-';
                }

                if (journeyId !== null) {
                    newVal = newVal + journeyId + '-';
                } else {
                    newVal = newVal + currentVal[2] + '-';
                }

                newVal = newVal + currentVal[3];

                radioElement.val(newVal);

            }
        }
    };
    return process;
})(NRE, $);
FC.addBasketTarget = function ($elem) {


    var $form = $("#form1");

    $form.on("click", "button.add-basket", function () {
        $form.attr("target", "_self");
    });


};

FC.basketOrder = (function (FC, $, $elem) {
    var process = {
        basket: $("#basketOrderByTag"),
        basketItemsSorted: [],
        basketItems: {},
        sortSelect: null,
        init: function ($elem) {
            var that = this;

            FC.basketOrder.convertBasketToArray();
            FC.basketOrder.sortSelect = $elem;
            $elem.on("change", function (e) {
                FC.basketOrder.onChange(e, FC.basketOrder);
            });
        },
        onChange: function (e, ctx) {
            var that = ctx;

            that.sortBasket(that.sortSelect.val());
            that.updateBasket();
        },
        sortBasket: function (sortType) {
            var that = this;
            if (that.basketItemsSorted.length === 0) {
                for (var key in that.basketItems) {
                    if (that.basketItems.hasOwnProperty(key)) {
                        that.basketItemsSorted.push(that.basketItems[key]);
                    }
                }
            }

            if (sortType === "recent") {
                that.basketItemsSorted.sort(function (a, b) {
                    if (a.addedDate < b.addedDate) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            } else {
                that.basketItemsSorted.sort(function (a, b) {
                    if (a.journeyDate > b.journeyDate) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            }
        },
        updateBasket: function () {
            var that = this;
            that.basket.empty();
            for (var i = 0, iLen = that.basketItemsSorted.length; i < iLen; i++) {
                that.basket.append(that.basketItemsSorted[i].content);
            }

        },
        convertBasketToArray: function () {
            var that = this;
            var basketItemsHtml = that.basket.find(".basketOrderByCriteria");

            basketItemsHtml.each(function () {
                var $that = $(this);
                var itemDetails = $that.attr("data-sort").split("|");
                var addedOn = itemDetails[0];
                var jDate = itemDetails[1];

                that.basketItems[this.id] = {
                    content: $that,
                    addedDate: addedOn,
                    journeyDate: jDate
                };
            });


        }
    };
    return process;
})(FC, $);

FC.deleteJourney = function () {
    $("<input/>").attr("type", "hidden").attr("name", "javascriptEnabled").attr("value", "true").appendTo("#basketActionForm");
    $("<input/>").attr("type", "hidden").attr("name", "action").attr("value", "Delete").appendTo("#basketActionForm");
    //$("#basketActionForm").attr("action", $("#basketActionForm").attr("action") + "=delete&javascriptEnabled=true");
    $("#basketActionForm").submit();
};

FC.cancelBasketEdit = (function (FC, $) {
    var process = {
        init: function () {
            FC.basketUpdateJourney.basketEvent = "";
            window.location = fcPth.basket;
        }
    };
    return process;
})(FC, $);
/*Delete all or delete individual alert on My Account alert tab*/
NRE.delAlerts = (function (NRE, $, FC) {
    var process = {
        delAll: null,
        delInd: null,
        accAlerts: null,
        ajaxUrl: fcPth.deleteAlerts,
        ajaxAll: '/all',
        init: function () {
            var that = this;
            if ($('.my-account-alerts').length > 0) {
                that.accAlerts = $('.my-account-alerts.side-tab-content');
                that.delAll = that.accAlerts.find('a.delete-all');
                that.delInd = that.accAlerts.find('a.del-ind');

                that.delAll.on('click', $.proxy(that.doDeleteAll, that));
                that.delInd.on('click', $.proxy(that.doDeleteInd, that));
            }
        },
        doDeleteAll: function (e) {
            e.preventDefault();
            FC.genericModalPopup($('.delete-all-modal'), NRE.delAlerts.deleteAllAjax);
        },
        //delete all alerts button
        deleteAllAjax: function (e) {
            var that = NRE.delAlerts;

            that.doAjaxCall(that.ajaxUrl + that.ajaxAll);
        },
        doAjaxCall: function (url) {
            var that = this;

            $.ajax({
                url: url,
                dataType: 'json',
                success: that.doSuccess,
                fail: function () {
                    that.showError(true);
                }
            });
        },
        //remove the successflly deleted alerts in the DOM. AJAX request will respond with what alerts were deleted
        doSuccess: function (data) {
            var that = NRE.delAlerts;
            var results = data.alertResponses;
            var iLen = results.length;
            var i = 0;
            var hasError = false;
            var failedCount = 0;
            var totalCount = 0;

            for (i = 0; i < iLen; i++) {
                if (results[i].status === 'FAILED') {
                    hasError = true;
                    failedCount = failedCount + 1;
                } else if (results[i].status === 'OK') {
                    if (results[i].type === 'LORA_ALERT') {
                        that.accAlerts.find('#loraAlert-' + results[i].id).remove();
                    }
                    if (results[i].type === 'DELAY_ALERT') {
                        that.accAlerts.find('#delayAlert-' + results[i].id).remove();
                    }
                }

                totalCount = totalCount + 1;
            }

            if (hasError) {
                that.showError(failedCount === totalCount);
            } else {
                that.showSuccess(totalCount);
            }
        },
        //delete an individual alert
        doDeleteInd: function (e) {
            var that = this;
            var itemCont = $(e.target).parent().parent().parent().parent();
            var itemId = itemCont.attr('id').toString().split('-');

            e.preventDefault();
            that.doAjaxCall(that.ajaxUrl + '/' + itemId[0] + '/' + itemId[1]);
        },
        showError: function (allFailed) {
            var that = this;
            var errArea = that.accAlerts.find('.my-account-heading p.alerts-msg');
            var errorMsgAll = 'Sorry, there was a problem. Please try again.';
            var errorMsgSome = 'Sorry there was a problem, not all of you alerts were deleted. Please try again.';

            errArea.addClass('del-fail');
            errArea.removeClass('del-success');

            if (allFailed) {
                errArea.text(errorMsgAll);
            } else {
                errArea.text(errorMsgSome);
            }

        },
        /* The delay of 1sec isn't long enough to read the message. Suggest lengthening to 10 or 5 secons*/
        showSuccess: function (totalDeleted) {
            var that = this;
            var successMsg = 'Alert successfully deleted';
            var successMsgMulti = 'Alerts successfully deleted';
            var alertCount = that.accAlerts.find('.alert-item').length;
            var noAlerts = that.accAlerts.find('p.no-alerts').length === 0 ? '<p class="no-alerts">You haven\'t set up any alerts.</p>' : that.accAlerts.find('p.no-alerts');
            var msgArea =that.accAlerts.find('.alerts-msg');

            msgArea.removeClass('del-fail');
            msgArea.addClass('del-success');

            if (totalDeleted > 1) {
                msgArea.text(successMsgMulti).delay(1000).fadeOut();
            } else {
                msgArea.that.accAlerts.find('.alerts-msg').text(successMsg).delay(1000).fadeOut();
            }

            if (alertCount === 0) {
                that.delAll.hide();
                $(that.accAlerts.find('a.alert-popup')[0]).hide();
                that.accAlerts.find('.my-account-alerts.popup').append(noAlerts);
            }
        }
    };
    return process;
})(NRE, $, FC);

NRE.delAlerts.init();
NRE.smePlan = (function (NRE, FC, $) {
    var process = {
        tipWidth: 404,
        lastKeyPress: null,
        isEdit: false,
        init: function () {
            if ($('.sme-plan').length > 0) {
                $('.sme-plan-area').on('keydown', NRE.smePlan.onKeyDown);
                $('.sme-plan-area').on('focus', NRE.smePlan.onFocus);
                $('.sme-plan-area').on('blur', NRE.smePlan.onBlur);
                $('.sme-plan-area').on('mouseenter', function (e) {
                    if (NRE.smePlan.isEdit === false) {
                        NRE.smePlan.onMouseOver(e);
                    }
                });
                $('.sme-plan-area').on('mouseleave blur', function (e) {
                    if (NRE.smePlan.isEdit === false) {
                        NRE.smePlan.hideTip(e);
                    }
                });
                $('.sme-plan-area').on('mousemove', function (e) {
                    if (NRE.smePlan.isEdit === false) {
                        NRE.smePlan.showTip(e, true);
                    }
                });
            }
        },
        onKeyDown: function (e) {
            if (e.which === 9) {
                NRE.smePlan.lastKeyPress = e.which;
            } else {
                NRE.smePlan.lastKeyPress = null;
            }
        },
        onFocus: function (e) {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            var edge = ua.indexOf('Edge');
            var that = NRE.smePlan;
            var currentId = e.target.id;
            var currentTipNumber = currentId.split('-');
            var currentTip = $('#smetool-' + currentTipNumber[1]);

            if (NRE.smePlan.lastKeyPress === 9 || msie > -1 || edge > -1) {
                that.showTip(e);

                $(window).scrollLeft(currentTip.offset().left);
            }
        },
        onBlur: function (e) {
            if (NRE.smePlan.lastKeyPress === 9) {
                NRE.smePlan.hideTip(e);
            }
        },
        onMouseOver: function (e) {
            var that = NRE.smePlan;
            e.preventDefault();
            NRE.smePlan.showTip(e);

        },
        showTip: function (e, isMove) {
            var that = NRE.smePlan;
            var currentId = e.target.id;
            var area = $(e.target);
            var currentTipNumber = currentId.split('-');
            var currentTip = $('#smetool-' + currentTipNumber[1]);
            var adjustmentValue = 5;
            var leftCoordinate = e.pageX + adjustmentValue;
            var topCoordinate = e.pageY + adjustmentValue;
            var windowRightEdge = window.innerWidth + window.pageXOffset;
            var windowBottomEdge = window.innerHeight + window.pageYOffset;
            var tooltipHeight = currentTip.height() + 10;
            var title = area.attr('title');
            var isHover = typeof isMove === 'undefined';
            var coords = area.attr("coords");
            var arcoords = coords.split(",");
            var areaX = parseInt(arcoords[0], 10);
            var areaY = parseInt(arcoords[1], 10);
            var areaHeight = parseInt(arcoords[5], 10) - areaY;
            var areaWidth = parseInt(arcoords[2], 10) - areaX;
            var mapName = area.parent().attr('id');
            var elementPosition = $('img[usemap=#' + mapName + ']').position();
            var outlineDiv = $('#map-outline');
            var currentTitle = currentTip.find('h2');

            if (e.type.toLowerCase() === 'focus') {

                outlineDiv.css({ top: areaY + elementPosition.top, left: areaX + elementPosition.left, width: areaWidth, height: areaHeight });
                outlineDiv.show();
            }

            if (e.type === 'focus') {
                adjustmentValue = 20;
                leftCoordinate = areaX + elementPosition.left + adjustmentValue;
                topCoordinate = areaY + elementPosition.top + adjustmentValue;
            }

            if (title !== '') {
                area.attr('data-title', title);
                area.attr('title', '');
            } else {
                title = area.attr('data-title');
            }

            if (currentTitle.length > 0) {
                currentTitle.remove();
            }

            currentTip.prepend('<h2>' + title + '</h2>');
            currentTip.show();

            if (leftCoordinate + that.tipWidth >= windowRightEdge) {
                leftCoordinate = leftCoordinate - adjustmentValue - that.tipWidth;
            }

            if (topCoordinate + tooltipHeight >= windowBottomEdge) {
                topCoordinate = topCoordinate - adjustmentValue - tooltipHeight;
            }

            currentTip.css({ top: topCoordinate, left: leftCoordinate });
        },
        hideTip: function (e) {
            var currentId = e.target.id;
            var area = $(e.target);
            var currentTipNumber = currentId.split('-');
            var currentTip = $('#smetool-' + currentTipNumber[1]);

            $('#map-outline').hide();
            currentTip.hide();
            if (currentTip.find('h2').length > 0) {
                area.attr('title', currentTip.find('h2').text());
                currentTip.find('h2').remove();
            }
        }
    };
    return process;
})(NRE, FC, $);

NRE.smePlan.init();


NRE.wctdate = (function ($, NRE) {
    var process = {
        init: function () {
            if ($('#pr').length > 0) {
                $('#txtOutboundDay').datepicker({ minDate: "-1M -0D", maxDate: "+3M +0D", constrainInput: false, dateFormat: "dd-M-y", showOn: "both", buttonImage: fcPth.clrImg });
                $('#txtInboundDay').datepicker({ minDate: -0, maxDate: "+3M +0D", constrainInput: false, dateFormat: "dd-M-y", showOn: "both", buttonImage: fcPth.clrImg });
            }
        }
    };
    return process;
})($, NRE);

NRE.wctdate.init();



NRE.ticketInfoDate = (function ($, NRE) {
    var process = {
        init: function () {
            if ($('#rf').length > 0) {
                $('#txtInboundDay').datepicker({ minDate: -0, maxDate: "+3M +0D", constrainInput: false, dateFormat: "dd-M-y", showOn: "both", buttonImage: fcPth.clrImg });
            }
        }
    };
    return process;
})($, NRE);

NRE.ticketInfoDate.init();

(function($) {
    $(document).ready(function(){
        NRE.hffdate = (function ($, NRE) {
            var process = {
                addCSS: function () {
                    if($('.travelAndPurchaseDate').length > 0){
                        $("head link[rel='stylesheet']").last().after("<link rel='stylesheet' type='text/css' href='css/hff.css' media='screen, projection'>");
                    }
                },
                init: function () {
                    this.addCSS();
                    if ($('.travelAndPurchaseDate').length > 0) {
                        $('.travelDate').datepicker({
                            minDate: new Date(2012, 3, 1),
                            maxDate: "+84D",
                            changeMonth: true,
                            changeYear: true,
                            constrainInput: false,
                            dateFormat: "dd-M-y",
                            showOn: "both",
                            buttonImage: fcPth.clrImg });
                        $('.purchaseDate').datepicker({
                            minDate: new Date(2012, 3, 1),
                            maxDate: "+84D",
                            changeMonth: true,
                            changeYear: true,
                            constrainInput: false,
                            dateFormat: "dd-M-y",
                            showOn: "both",
                            buttonImage: fcPth.clrImg });
                    }
                }
            };
            return process;
        })($, NRE);

        NRE.hffdate.init();
    });
})(jQuery);





NRE.numonly = (function ($, NRE) {
    var process = {
        init: function ($element) {
            $($element).on('keyup',function () {
                var val = $(this).val();
                if(isNaN(val)){
                    val = val.replace(/[^0-9\.]/g,'');
                    if(val.split('.').length>2){
                        val =val.replace(/\.+$/,"");
                    }
                }
                $(this).val(val);
            });

        }
    };
    return process;
})($, NRE);


$(document).ready(function() {
    NRE.numonly.init('#prtxtPrice');
});



/*
 * This code used to be in http://web.kb.awsnre.co.uk/javascript/globalFooter.js
 * and created and maintained by CDS.
 *
 * It refers to the twitter feed at http://www.nationalrail.co.uk/service_disruptions/today.aspx
 * Looks like the JS forces the container element to match the height of the parent and 'fix' a css issue relating to the border of the element.
 *
 * If there is a large space at the bottom of the tweets, this means that the height calculation function is likely being run twice; once in
 * functions.other.js and once in globalFooter.js
 *
 * This change was carried out under KBTEST-369
 *
 * */

$(document).ready(function () {
    $('.js-related-tweets').each(function () {
        var parentHeight = $(this).parent().height();
        $(this).height(function (i, x) {
            return x + parentHeight;
        });
    });
});

// sec-patch NREKB-2629

(function($) {

    var dpInput = document.getElementById('TravelDate');
    var form = document.getElementById('currentAndFuture');
    var btnUpdate = document.getElementById('btnUpdate');

    $(document).ready(function(){

        btnUpdate.addEventListener('click',function (e) {
            e.preventDefault();
            var pattern2 = new RegExp("[0-9]{2}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{2}");
            var pattern4 = new RegExp("[0-9]{2}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{4}");
            var dpInputVal = dpInput.value;
            var result1 = pattern2.test(dpInputVal);
            var result2 = pattern4.test(dpInputVal);
            if((result1 === true) || (result2 === true)){
                form.submit();
            }
            else{
                e.preventDefault();
                dpInput.focus();
                dpInput.value = '';
            }
        });

    });
})(jQuery);