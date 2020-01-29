/**
 * Created by neilpowers on 25/03/2019.
 */
(function($) {
    $(document).ready(function(){
        //console.log('logs after ready');

        $('.mtx').on('mouseenter',statusMouseEnter);
        $('.mtx').on('mouseleave',clearMouseLeave);



        function statusMouseEnter(){
            var statusCell =  $(this.lastElementChild);
            if(statusCell.hasClass('ok')){
                return;
            }
            else{
                statusCell.addClass('active');
            }
        }



        function clearMouseLeave(){
            var statusCell =  $(this.lastElementChild);
            statusCell.removeClass('active');


        }

    });
})(jQuery);




/*

 LIVE NRE STATUS CELL

 <td class="status">
 <div class="journey-status journey-status-on-time">
 <p>
 <img alt="" class="sprite-main" src="images/clear.gif" width="15" height="15">on time
 </p>
 </div>
 </td>


 journey-status-on-time = green tick // new alt on time
 journey-status-late = yellow warning triangle // new alt caution
 journey-status-bus = blue info triangle // new alt info
 journey-status-disrupted = red warning triangle // new alt warning




 */


/*
 Table manipulation will have to be done in earlierLaterAjax.js as well as HTML! YIKES!!!

 */
