(function($) {
  "use strict";

  /*-- Flexslider ----------------------------------------------------------------------------------*/
  $(window).load(function() {
    $("#landing-slider").flexslider({
      namespace: "flex-",
      controlsContainer: ".landing-container",
      animation: "fade",
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
      before: function(slider) {
        $(slider)
          .find(".animated")
          .each(function() {
            $(this).removeAttr("class");
          });
      },
      start: function(slider) {
        $(slider)
          .find(".flex-active-slide")
          .find("h1")
          .addClass("animated fadeInDown show")
          .next()
          .addClass("animated fadeInUp show");

        $(window).trigger("resize");
      },
      after: function(slider) {
        $(slider)
          .find(".flex-active-slide")
          .find("h1")
          .addClass("animated fadeInDown show")
          .next()
          .addClass("animated fadeInUp show");
      }
    });

    $("#fact-slider").flexslider({
      namespace: "flex-",
      controlsContainer: "",
      animation: "slide",
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false
    });
  });

  /*-- Background Opacity ----------------------------------------------------------------------------*/
  $(window).on("scroll", function() {
    var h = $("header").height();
    var y = $(window).scrollTop();
    var header = $("#nav-header");

    if (y > h + 30 && $(window).outerWidth() > 768) {
      header.addClass("opaque");
    } else {
      if (y < h + 30) {
        header.removeClass("opaque");
      } else {
        header.addClass("opaque");
      }
    }
  });

  /*-- Nav Current ---------------------------------------------------------------------------------*/
  var sections = $("section"),
    navigation_links = $("#nav-wrap a");

  sections.waypoint({
    handler: function(direction) {
      var active_section;

      active_section = $("section#" + this.element.id);

      if (direction === "up") active_section = active_section.prev();

      var active_link = $(
        '#nav-wrap a[href="#' + active_section.attr("id") + '"]'
      );

      navigation_links.parent().removeClass("current");
      active_link.parent().addClass("current");
    },

    offset: "25%"
  });

  /*-- Fit Text ---------------------------------------------------------------------------------*/
  setTimeout(function() {
    $("#landing-slider h1").fitText(1, {
      minFontSize: "30px",
      maxFontSize: "49px"
    });
  }, 100);

  /*-- Mobile Menu --------------------------------------------------------------------------------*/
  var menu_icon = $("<span class='menu-icon'>Menu</span>");
  var toggle_button = $("<a>", {
    id: "toggle-btn",
    html: "",
    title: "Menu",
    href: "#"
  });
  var nav_wrap = $("nav#nav-wrap");
  var nav = $("ul#nav");

  /* if JS is enabled, remove the two a.mobile-btns 
         and dynamically prepend a.toggle-btn to #nav-wrap */
  nav_wrap.find("a.mobile-btn").remove();
  toggle_button.append(menu_icon);
  nav_wrap.prepend(toggle_button);

  toggle_button.on("click", function(e) {
    e.preventDefault();
    nav.slideToggle("fast");
  });

  if (toggle_button.is(":visible")) nav.addClass("mobile");
  $(window).resize(function() {
    if (toggle_button.is(":visible")) nav.addClass("mobile");
    else nav.removeClass("mobile");
  });

  $("ul#nav li a").on("click", function() {
    if (nav.hasClass("mobile")) nav.fadeOut("fast");
  });

  /*-- Smooth Scrolling -------------------------------------------------------------------------------*/
  $(".smoothscroll").on("click", function(e) {
    e.preventDefault();

    var target = this.hash,
      $target = $(target);

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top
        },
        800,
        "swing",
        function() {
          window.location.hash = target;
        }
      );
  });

  /*-- Placeholder ------------------------------------------------------------------------------------*/
  $("input, textarea").placeholder();


  /*-- 24h/7days/30days ----------------------------------------------------------------------------*/
  var elements = `barna30 Toghroinn_San_Niocláis30 Eyre_Squre30 Shantalla30
  Wellpark30 Dangan7 Rahoon7 Ballybane24`
    .split(/\s+/)
    .map(_ => $(`#${_}`));

  function within(j, number) {
    var a = [24, 7, 30].indexOf(j), b = [24, 7, 30].indexOf(number);
    return a <= b;
  }

  $("#7days,#24hours,#30days").click(function() {
    var number = this.id.match(/\d+/)[0];
    if ($("#community").data("days") == number) {
      $("#community").data("days", null);
      elements.forEach(function(e, i) {
        e.show();
      });
    } else {
      $("#community").data("days", number);
      elements.forEach(function(e, i) {
        var j = +(e.attr("id").match(/\d+/)[0]);
        if (within(j, +number)) {
          e.show();
        } else {
          e.hide();
        }
      });
    }
  });

  $("#24h,#7ds,#30ds")
    .mouseover(function() {
      var number = this.id.match(/\d+/)[0];
      elements.forEach(function(e, i) {
        if (e.attr("id").includes(number)) {
          e.show();
        } else {
          e.hide();
        }
      });
    })
    .mouseout(function() {
      var number = $("#community").data("days");
      elements.forEach(function(e, i) {
        var j = +(e.attr("id").match(/\d+/)[0]);
        if ((number && within(j, +number)) || !number) {
          e.show();
        } else {
          e.hide();
        }
      });
    });

  $("#barna30").magnificPopup({
    items: {
      src: `
        <div style="width:600px;margin:0 auto;padding:20px;background-color:white;color:black">
        <h3 style="color:black">Barna</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
        vero repudiandae id, dolor quaerat magni fugit. Accusantium recusandae,
        nam nobis asperiores expedita dicta consequuntur, eos, nesciunt nihil
        pariatur enim quos.</p></div>
      `,
      type: "inline"
    }
  });

  /*-- loadmore ----------------------------------------------------------------------------*/
  $("#loadmore").click(function() {
    $(".reportHidden").show();
    $(this).hide();
  });

  /*-- loadmore ----------------------------------------------------------------------------*/
  $("#infomore").click(function() {
    $(".infoHidden").show();
    $(this).hide();
  });



  /*-- Map --------------------------------------------------------------------------------------------*/
  var map = {
    "GB-NIR": "Northern Ireland",
    "IE-CW": "Carlow",
    "IE-CN": "Cavan",
    "IE-CE": "Clare",
    "IE-CO": "Cork",
    "IE-DL": "Donegal",
    "IE-D": "Dublin",
    "IE-G": "Galway",
    "IE-KE": "Kildare",
    "IE-KK": "Kilkenny",
    "IE-KY": "Kerry",
    "IE-LD": "Longford",
    "IE-LH": "Louth",
    "IE-LK": "Limerick",
    "IE-LM": "Leitrim",
    "IE-LS": "Laois",
    "IE-MH": "Meath",
    "IE-MN": "Monaghan",
    "IE-MO": "Mayo",
    "IE-OY": "Offaly",
    "IE-RN": "Roscommon",
    "IE-SO": "Sligo",
    "IE-TA": "Tipperary",
    "IE-WD": "Waterford",
    "IE-WH": "Westmeath",
    "IE-WX": "Wexford",
    "IE-WW": "Wicklow"
  };

  var fill = {
    "2016": {},
    "2017": {}
  };

  var fill2 = {
    "#B1A2BC": "#BCA2B1",
    "#8957A1": "#A15789",
    "#601986": "#861960",
    "#440062": "#620044",
    "#31004A": "#4A0031"
  };

  var fill3 = {};
  for (var k in fill2) fill3[fill2[k]] = k;

  $("#Ireland path")
    .each(function() {
      $(this).append("<title>" + map[this.id] + "</title>");
      fill["2017"][this.id] = $(this).attr("fill");
      fill["2016"][this.id] = fill2[fill["2017"][this.id]];
    })
    .click(function() {
      var title = map[this.id];
      $("#rate-style h4").each(function() {
        if (
          $(this)
            .text()
            .trim()
            .split(/\s+/)[1] === title
        ) {
          $(this)
            .css("background-color", "white")
            .css("color", "black");
          this.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          $(this)
            .css("background-color", "")
            .css("color", "");
        }
      });
    });

  $("#Ireland rect")
    .mouseover(function() {
      var color = $(this).attr("fill");
      $("#Ireland path").each(function() {
        if (fill[$("#year").val()][this.id] !== color) {
          $(this).attr("fill", "#7d7d7d");
        } else {
          $(this).attr("fill", fill[$("#year").val()][this.id]);
        }
      });
    })
    .mouseout(function() {
      $("#Ireland path").each(function() {
        $(this).attr("fill", fill[$("#year").val()][this.id]);
      });
    });

  var mapdata = {
    2017: [
      ["Dublin", "39.39", "down"],
      ["Kildare", "75.5", "up"],
      ["Louth", "50.43", "down"],
      ["Wicklow", "46.34", "up"],
      ["Waterford", "8.6", "up"],
      ["Limerick", "30.27", "up"],
      ["Meath", "97.93", "up"],
      ["Laois", "20.29", "up"],
      ["Offaly", "20.29", "up"],
      ["Wexford", "16.7", "up"],
      ["Cavan", "91.59", "up"],
      ["Monaghan", "91.59", "up"],
      ["Longford", "49.33", "up"],
      ["Roscommon", "49.33", "up"],
      ["Kilkenny", "9.61", "up"],
      ["Carlow", "9.61", "up"],
      ["Sligo", "58.42", "up"],
      ["Leitrim", "58.42", "up"],
      ["Galway", "10.08", "up"],
      ["Tipperary", "40.11", "down"],
      ["Westmeath", "40.85", "down"],
      ["Clare", "37.87", "down"],
      ["Cork", "30.24", "up"],
      ["Donegal", "49", "up"],
      ["Mayo", "45.97", "down"],
      ["Kerry", "47.39", "up"]
    ],
    2016: [
      ["Dublin", "653.78"],
      ["Louth", "568.73"],
      ["Waterford", "468.26"],
      ["Wicklow", "457.78"],
      ["Kildare", "449.88"],
      ["Limerick", "388.41"],
      ["Laois", "379.32"],
      ["Offaly", "379.32"],
      ["Wexford", "349.31"],
      ["Meath", "305.57"],
      ["Tipperary", "273.26"],
      ["Westmeath", "272.61"],
      ["Longford", "272.25"],
      ["Roscommon", "272.25"],
      ["Kikenny", "272.15"],
      ["Carlow", "272.15"],
      ["Cavan", "259.52"],
      ["Monghan", "259.52"],
      ["Galway", "250.33"],
      ["Clare", "237.34"],
      ["Sligo", "222.38"],
      ["Leitrim", "222.38"],
      ["Mayo", "213.78"],
      ["Cork", "158.25"],
      ["Donegal", "134.43"],
      ["Kerry", "119.83"]
    ]
  };

  function makeRow(i, name, number, fa) {
    var ret = `<div class="rate-grid1"><a href=""><h4><span>${i}</span> ${name} <span class="rate-no">${number}`;
    if (fa) ret += `<i class="fa fa-long-arrow-${fa}" aria-hidden="true"></i>`;
    ret += "</span></h4></a></div>";
    return $(ret);
  }

  $("#year").change(function() {
    $("#Ireland path").each(function() {
      $(this).attr("fill", fill[$("#year").val()][this.id]);
    });
    $("#Ireland rect").each(function() {
      var color = $(this).attr("fill");
      if ($("#year").val() === "2017" && fill3[color]) {
        $(this).attr("fill", fill3[color]);
      } else if (fill2[color]) {
        $(this).attr("fill", fill2[color]);
      }
    });
    $("#rate-style").empty();
    mapdata[$("#year").val()].forEach(function(e, i) {
      $("#rate-style").append(makeRow(i + 1, ...e));
    });
  });

  var reportdata = [
      [
        [1, 2],
        [1, 2, 3, 4],
        [1, 2, 3, 4, 5, 6, 7],
        [1, 2, 3, 4, 5, 6, 7, 8, 9]
      ],
      [[1], [1, 3, 4], [1, 3, 4], [1, 3, 4, 8]],
      [[2], [2], [2, 5, 6, 7], [2, 5, 6, 7]]
    ],
    cursor = [0, 3];
  window.change_country = function(t, x) {
    switch (t) {
      case 0:
        cursor[0] = +x;
        break;
      case 1:
        cursor[1] = +x;
        break;
    }
    var show = reportdata[cursor[0]][cursor[1]];
    $(".report-grid").each(function(i, e) {
      if (show.includes(i + 1)) {
        $(e).show();
      } else {
        $(e).hide();
      }
    });
  };
})(jQuery);
