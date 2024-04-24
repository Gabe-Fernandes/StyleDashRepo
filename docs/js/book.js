$(function () {
  const modalData = {
    callbackUrl: "/docs/html/docs.html#modalsDiv",
    title: "Modal",
    description: "- A window that appears on screen with a fade transition",
    visualSrc: "/codeImgs/modalVisual.gif",
    reqCode: [`
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
    implementationSrc: ["/codeImgs/modalLibSass0.PNG", "/codeImgs/modalLibSass1.PNG", "/codeImgs/modalLibSass2.PNG", "/codeImgs/modalLibJs.PNG"]
  }
  const hideData = {
    callbackUrl: "/docs/html/docs.html#hideDiv",
    title: "Hide",
    description: "- Change the visibility of elements in various ways",
    visualSrc: "/codeImgs/searchWrapVisual.PNG",
    requirementsSrc: ["/codeImgs/searchWrapHtmlCode.PNG", "/codeImgs/searchWrapSassCode.PNG"],
    directions: ["wrap an img element and an input element in a div", "selecting the div, include SearchDiv with arguments for font-size, width, and height"],
    implementationSrc: ["/codeImgs/searchWrapLibSassCode.PNG"]
  }
  const searchWrapData = {
    callbackUrl: "/docs/html/docs.html#searchWrapDiv",
    title: "Search Wrap",
    description: "- a textbox with an image (usually magnifying glass) in it",
    visualSrc: "/codeImgs/searchWrapVisual.PNG",
    requirementsSrc: ["/codeImgs/searchWrapHtmlCode.PNG", "/codeImgs/searchWrapSassCode.PNG"],
    directions: ["wrap an img element and an input element in a div", "selecting the div, include SearchDiv with arguments for font-size, width, and height"],
    implementationSrc: ["/codeImgs/searchWrapLibSassCode.PNG"]
  }

  function populateData(data) {
    $("#backToDocs").attr("href", data.callbackUrl);
    $("#bookTitle").html(data.title);
    $("#bookDescription").html(data.description);
    $("#visualImg").attr("src", data.visualSrc);

    for (let i = 0; i < data.reqCode.length; i++) {
      $("#reqSlideshowWrap").append(`
      <div id="reqSlideshow${i + 1}" class="req slideshow-shrink">
        <pre>
          <code id="codeEle${i}" class="code-snip">
            ${data.reqCode[i]}
          </code>
          <img tabindex="0" src="/icons/copy.png" id="copyBtn${i}" class="copy-btn btn text-btn" />
        </pre>
      </div>
    `);
    $(`#copyBtn${i}`).on("click", ()=> {
      const text = $(`#codeEle${i}`).text();
      navigator.clipboard.writeText(text);
    });
    $(`#copyBtn${i}`).on("keypress", addKeyboardAccessibility);
    }
    $("#reqSlideshow1").removeClass("slideshow-shrink");

    for (let i = 0; i < data.directions.length; i++) {
      $("#directionsList").append(`<li>${data.directions[i]}</li>`);
    }

    for (let i = 0; i < data.implementationSrc.length; i++) {
      $("#impSlideshowWrap").append(`
        <div id="impSlideshow${i + 1}" class="imp slideshow-shrink">
          <img src="${data.implementationSrc[i]}" />
        </div>
      `);
    }
    $("#impSlideshow1").removeClass("slideshow-shrink");

    hljs.highlightAll();
  }

  function getBookData(bookId) {
    switch (bookId) {
      case "0": populateData(modalData); return;
      case "1": populateData(hideData); return;
      case "2": populateData(searchWrapData); return;
    }
  }

  const bookId = localStorage.getItem("bookId");
  getBookData(bookId);



  // slideshow for lib
  function createSlideShow(namespace) {
    const lastPage = $(`.${namespace}`).length;
    const slideshowWrap = $(`#${namespace}SlideshowWrap`);
    
    slideshowWrap.children(".slideshow-left:first").on("click", ()=> {
      let currentPage = parseInt(slideshowWrap.attr("data-page"));
      if (currentPage > 1) {
        $(`#${namespace}Slideshow${currentPage}`).addClass("slideshow-shrink");
        currentPage--;
        slideshowWrap.attr("data-page", currentPage);
        $(`#${namespace}Slideshow${currentPage}`).removeClass("slideshow-shrink");
      }
    });
    slideshowWrap.children(".slideshow-right:first").on("click", ()=> {
      let currentPage = parseInt(slideshowWrap.attr("data-page"));
      if (currentPage < lastPage) {
        $(`#${namespace}Slideshow${currentPage}`).addClass("slideshow-shrink");
        currentPage++;
        slideshowWrap.attr("data-page", currentPage);
        $(`#${namespace}Slideshow${currentPage}`).removeClass("slideshow-shrink");
      }
    });
    slideshowWrap.children(".slideshow-btn").on("click", ()=> {
      let currentPage = parseInt(slideshowWrap.attr("data-page"));
      $(`#${namespace}SlideshowCounter`).html(`Showing (${currentPage} of ${lastPage})`);
    });

    // init counter
    $(`#${namespace}SlideshowCounter`).html(`Showing (1 of ${lastPage})`);
  }

  // slideshow configuration
  createSlideShow("req");
  createSlideShow("imp");
});
