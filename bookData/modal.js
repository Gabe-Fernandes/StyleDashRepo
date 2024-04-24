const modalData = {
  callbackUrl: "/docs/html/docs.html#modalsDiv",
  title: "Modal",
  description: "- A window that appears on screen with a fade transition",
  visualSrc: "/codeImgs/modalVisual.gif",
  reqCode: [
    `
    &lt;section id=&quot;myPageContentId&quot;&gt;

    &lt;/section&gt;

    &lt;section id=&quot;myModalId&quot; class=&quot;screen-tint fade&quot;&gt;
      &lt;div class=&quot;my-modal-class&quot;&gt;

        &lt;span&gt;My Modal Content&lt;/span&gt;

        &lt;div class=&quot;close-btn&quot; id=&quot;myCloseBtnId&quot;&gt;
          &lt;div class=&quot;close-btn-wrap&quot;&gt;&lt;div&gt;&lt;/div&gt;&lt;div&gt;&lt;/div&gt;&lt;/div&gt;
        &lt;/div&gt;

      &lt;/div&gt;
    &lt;/section&gt;`,

    `
    .my-modal {
      @include Modal("35vw", "50vh", black);
    }`,

    `
    $("#myOpenModalBtnId").on("click", ()=> {
      ToggleModal($("#myPageContentId"), $("#myModalId"), openModal);
    });
    
    $("#myCloseBtnId").on("click", ()=> {
      ToggleModal($("#myPageContentId"), $("#myModalId"), closeModal);
    });`
  ],
  directions: ["create a section element with an id outside of your content with the screen-tint and fade classes", "create a div or form element to be the wrap for the modal itself and style it with @include Modal()", "use the provided close-btn html for a responsive X icon", "call ToggleModal() in JS to open/close the modal"],
  impCode: [
    `
    .screen-tint {
      width: 100vw;
      height: 100vh;
      display: initial;
      position: fixed;
      top: 0%;
      left: 0%;
      background-color: rgba(0,0,0,0.6);
      z-index: $zScreenTint;
      transition: opacity 0.3s, background-color 0.3s;
      .mobile-modal {
        width: 85vw !important;
      }
    }
    .unclickable {
      pointer-events: none;
      filter: blur(0.2rem);
    }`,

    `
    .close-btn {
      @include WidthHeight(2rem, 2rem);
      margin: 0px;
      position: absolute;
      top: 3%;
      right: 3%;
      cursor: pointer;
    
      .close-btn-wrap {
        @include Flex-Row(center, center, 2rem, 2rem);
        border-radius: 2rem;
        position: relative;
        background-color: $cHeader;
        div {
          @include WidthHeight(0.2rem, 1.5rem);
          position: absolute;
          background-color: $cWhite;
        }
        div:first-of-type {
          transform: rotate(45deg);
        }
        div:nth-of-type(2) {
          transform: rotate(-45deg);
        }
      }
    }`,

    `
    @mixin Modal($w, $h, $boxShadowColor) {
      @include Flex-Col(center, center, $w, $h);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: $zModal;
      background-color: $cHeader;
      border-radius: 1rem;
      box-shadow: 0 0 0.2rem 0.1rem $boxShadowColor;
      transition: width 0.25s;
    }`,

    `
    // =========================================================== Modal ===========================================================

    const openModal = "O";
    const closeModal = "C";

    function ToggleModal(main, modal, direction) {
      if (direction === openModal) {
        main.addClass("unclickable");
        modal.removeClass("fade");
      }
      else if (direction === closeModal) {
        main.removeClass("unclickable");
        modal.addClass("fade");
      }
    }

    function switchToMobileModal() {
      // if entering mobile mode
      if ($(window).width() <= 768) {
        for (let i = 0; i < $(".screen-tint").length; i++) {
          $(".screen-tint").eq(i).children().first().addClass("mobile-modal");
        }
      }
      // if exiting mobile mode
      else {
        $(".screen-tint").children().removeClass("mobile-modal");
      }
    }

    $(window).on("resize", switchToMobileModal);
    switchToMobileModal();`
  ]
}
